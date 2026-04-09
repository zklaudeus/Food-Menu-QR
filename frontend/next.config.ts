import type { NextConfig } from "next";

// =========================================================================
// SECURITY HEADERS — Protección contra Clickjacking, MIME Sniffing,
// Content Injection y fuga de datos por Referer.
// =========================================================================

const isDev = process.env.NODE_ENV === "development";

// CSP de script-src:
// - En DESARROLLO: se agrega 'unsafe-eval' porque React HMR y el
//   reconstructor de callstacks lo necesitan. Nunca llega a producción.
// - En PRODUCCIÓN: estricto, sin eval().
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com"
  : "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com";

const securityHeaders = [
  // Evita que DNS haga prefetch de dominios externos innecesarios
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // HSTS: Forzar HTTPS por 1 año (Vercel ya usa HTTPS, esto lo refuerza)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Clickjacking: Nadie puede embeber tu menú en un <iframe>
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // MIME Sniffing: El browser no puede "adivinar" el tipo de un archivo
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Referer: Solo envía el origen, no la URL completa, al navegar a externos
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Permisos de hardware: Bloquea acceso a cámara, micrófono y GPS
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy: Define exactamente qué recursos pueden cargarse
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      // Estilos: dominio propio + inline (necesario para Tailwind/Next.js) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fuentes tipográficas: dominio propio + Google Fonts CDN
      "font-src 'self' https://fonts.gstatic.com",
      // Imágenes: dominio propio + data URIs (para el QR code generado)
      "img-src 'self' data: blob:",
      // Conexiones fetch/XHR: dominio propio + Vercel Insights
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      // frame-ancestors reemplaza X-Frame-Options en browsers modernos
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Aplicar headers a TODAS las rutas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;