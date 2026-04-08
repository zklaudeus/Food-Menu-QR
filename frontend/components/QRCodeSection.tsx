"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // En producción, esto podría venir de una variable de entorno como process.env.NEXT_PUBLIC_APP_URL
  const menuUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/menu` 
    : "https://food-menu-qr.vercel.app/";

  return (
    <section className="animate-slide-up bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-gray-50 flex flex-col items-center justify-center text-center mt-4">
      <h3 className="font-outfit font-bold text-2xl text-brand-black mb-2">
        Escanea y Ordena
      </h3>
      <p className="text-brand-gray text-sm mb-8 font-light max-w-[250px]">
        Accede a nuestro menú digital desde tu celular en cualquier momento.
      </p>

      <div className="relative bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 min-h-[180px] flex items-center justify-center">
        {mounted ? (
          <QRCodeSVG
            value={menuUrl}
            size={180}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}  
            includeMargin={false}
            imageSettings={{
              src: "/pit market-02.png",  
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true, 
            }}
          />
        ) : (
          <div className="w-[180px] h-[180px] bg-gray-50 animate-pulse rounded-lg" />
        )}
      </div>

      
    </section>
  );
}
