import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =========================================================================
// ESCUDO DE VERCEL EDGE & FIREWALL MÍNIMO
// =========================================================================

// Configuración del Rate Limiter
// En Vercel Edge, estas variables en memoria viven por instancia y por región.
// No es perfecto globalmente sin Redis (Upstash), pero frenará maravillosamente
// espasmos de tráfico de miles de peticiones (spam o DDoS scripts).
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const BLOCK_THRESHOLD = 60; // Máximo 60 peticiones por ventana temporal.
const WINDOW_MS = 60 * 1000; // Ventana de 1 minuto.

export function middleware(request: NextRequest) {
  // 1. OBTENER INFORMACIÓN DEL CLIENTE Y NORMALIZACIÓN DE RUTA
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anon';
  const url = request.nextUrl;

  // ---------------------------------------------------------------------------------
  // 2. ATAQUE DE CACHE BYPASS (ELIMINAR QUERY PARAMS INNECESARIOS)
  // Atacantes añadirán parámetros mutantes (?v=124, ?p=abc) para que Vercel
  // genere infinitas páginas re-procesando Next.js, agotando Serverless Hours.
  // ---------------------------------------------------------------------------------
  if (url.search) {
     // Como es un simple menú estático, podemos podar cualquier parámetro extra forzando un redir puro.
     // Si eventualmente necesitas leer un "?id", lo agregas a una whitelist.
     // Redirigir elimina el parámetro forzando al atacante a leer del Caché (Costo $0).
     const cleanUrl = new URL(url.pathname, url.origin);
     return NextResponse.redirect(cleanUrl, 308); 
  }

  // ---------------------------------------------------------------------------------
  // 3. RATE LIMITING DE PROTECCIÓN "DENIAL OF WALLET"
  // Frena a bots abusivos bloqueando sus IP a nivel Edge y evitando que
  // entren a React / Componentes Pesados / Imagenes.
  // ---------------------------------------------------------------------------------
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip);
  
  if (rateLimitData) {
    if (now - rateLimitData.timestamp > WINDOW_MS) {
       // Ha pasado el minuto, perdonar IP
       rateLimitMap.set(ip, { count: 1, timestamp: now });
    } else {
       // Sumar petición a la ventana actual
       rateLimitData.count += 1;
       if (rateLimitData.count > BLOCK_THRESHOLD) {
          // IP Excedió límites de uso normal
          return new NextResponse('Estás interactuando demasiado rápido con el Menú. Espera un minuto.', { status: 429 });
       }
    }
  } else {
     // Registrar nueva visita
     rateLimitMap.set(ip, { count: 1, timestamp: now });
  }

  // Para evitar que el mapa colapse la memoria sobre el tiempo,
  // limpiezas automáticas son gestionadas por el Vercel Edge Runtime Destroy.
  
  // Continuar el renderizado normal.
  return NextResponse.next();
}

// ---------------------------------------------------------------------------------
// CONFIGURACIÓN DE EJECUCIÓN (Matcher)
// Qué rutas debería auditar el middleware:
// ---------------------------------------------------------------------------------
export const config = {
  // Ignoramos activos estáticos de sistema interior (CSS, JS) para no malgastar
  // lógica middleware, solo filtramos visitas de Rutas de Usuarios y APIs.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
