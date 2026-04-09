import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ProductCategory from "@/components/ProductCategory";
import { fetchMenus } from "@/services/menuService";
import BowlCategory from "@/components/BowlCategory";
import SandwichCategory from "@/components/SandwichCategory";

const QRCodeSection = dynamic(() => import("@/components/QRCodeSection"), { 
  loading: () => (
    <div className="w-full flex items-center justify-center min-h-[300px] mt-4">
      <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default async function StaticMenu() {
  const menuData = await fetchMenus();
  
  const platosFresh = menuData[0];
  const bowl = menuData[1];
  const sandwich = menuData[2];

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-24 text-brand-black flex flex-col font-poppins selection:bg-brand-gold selection:text-white relative w-full overflow-x-hidden">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-5 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-brand-gray hover:text-brand-black transition-colors rounded-full p-1 -ml-2 bg-gray-50 border border-gray-100">
          {/* Flecha para volver atras si fuese necesario */}
        </Link>
        <div className="flex flex-col items-center">
          <Image 
            src="/pit market-01.png" 
            alt="Pitmarket" 
            width={80} 
            height={80}
            className="object-contain mb-1 transition-transform hover:scale-105 rounded-[24px]" 
            priority
          />
          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-semibold mt-0.5">Menú del día</p>
        </div>
        <div className="w-8" /> {/* Spacer */}
      </header>

      <div className="px-6 py-8 md:py-12 flex flex-col gap-10 md:gap-16 w-full max-w-5xl mx-auto">

        {/* Banner Decorativo */}
        <div className="w-full h-32 md:h-48 rounded-[24px] overflow-hidden relative animate-slide-up shadow-sm group bg-brand-brown flex items-center justify-center border border-gray-100">
           <Image 
             src="/pit market-02.png" 
             alt="Pitmarket Banner" 
             fill
             className="object-contain transition-transform duration-700 group-hover:scale-110 p-4" 
           />
           <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent" />
        </div>

        {/* COMPONENTES DE CATEGORÍAS */}
        {platosFresh && <ProductCategory product={platosFresh} />}
        {bowl && <BowlCategory product={bowl} />}
        {sandwich && <SandwichCategory product={sandwich} />}

        {/* QR CODE SECTION */}
        <QRCodeSection />
        <div className="text-center py-6 pb-4">
           <div className="w-8 h-8 mx-auto border border-gray-200 rounded-full flex items-center justify-center text-brand-gray/50 mb-3">
             <span className="font-outfit text-[10px] font-bold">PM</span>
           </div>
        </div>

      </div>
    </main>
  );
}
