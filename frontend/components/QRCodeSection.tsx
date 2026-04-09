"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeSection() {
  const menuUrl = "https://pit-market.vercel.app/";

  return (
    <section className="animate-slide-up bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-gray-50 flex flex-col items-center justify-center text-center mt-4">
      <h3 className="font-outfit font-bold text-2xl text-brand-black mb-2">
        Escanea y Ordena
      </h3>
      <p className="text-brand-gray text-sm mb-6 font-light max-w-[250px]">
        Accede a nuestro menú digital desde tu celular en cualquier momento.
      </p>

      <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 min-h-[240px] flex flex-col items-center justify-center">
        <QRCodeCanvas
          id="qr-code-canvas"
          value={menuUrl}
          size={1080}
          style={{ width: "180px", height: "180px" }}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}  
          includeMargin={false}
          imageSettings={{
            src: "/pit market-02.png",  
            x: undefined,
            y: undefined,
            height: 240,
            width: 240,
            excavate: true, 
          }}
        />
      </div>
    </section>
  );
}
