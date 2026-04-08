import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import QRCodeSection from "@/components/QRCodeSection";
import { menuData } from "@/data/mockData";

export default function StaticMenu() {
  const platosFresh = menuData[0];
  const bowl = menuData[1];
  const sandwich = menuData[2];

  // Helper to group by price
  const groupProteinsByPrice = (proteins: any[]) => {
    return proteins.reduce((acc, p) => {
      const price = p.price || 0;
      if (!acc[price]) acc[price] = [];
      acc[price].push(p.name);
      return acc;
    }, {} as Record<number, string[]>);
  };

  const freshProteins = groupProteinsByPrice(platosFresh?.ingredients?.proteins || []);
  const bowlProteins = groupProteinsByPrice(bowl?.ingredients?.proteins || []);

  const getBowlCategoryName = (price: string) => {
    if (price === "5500") return "Clásica";
    if (price === "6000") return "Platinum";
    if (price === "6600") return "Premium";
    return "Proteína";
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-24 text-brand-black flex flex-col font-poppins selection:bg-brand-gold selection:text-white relative w-full overflow-x-hidden">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-5 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-brand-gray hover:text-brand-black transition-colors rounded-full p-1 -ml-2 bg-gray-50 border border-gray-100">
          {/*<ChevronLeft size={20} /> Flecha para volver atras*/}
        </Link>
        <div className="flex flex-col items-center">
          {/* Usamos el logo proporcionado (logo negro sobre fondo blanco del header) */}
          <img src="/pit market-01.png" alt="Pitmarket" className="h-[80px] object-contain mb-1 transition-transform hover:scale-105 rounded-[24px]" />
          <p className="text-[10px] uppercase tracking-widest text-brand-gray font-semibold mt-0.5">Menú del día</p>
        </div>
        <div className="w-8" /> {/* Spacer */}
      </header>

      <div className="px-6 py-8 md:py-12 flex flex-col gap-10 md:gap-16 w-full max-w-5xl mx-auto">

        {/* Banner Decorativo */}
        <div className="w-full h-32 md:h-48 rounded-[24px] overflow-hidden relative animate-slide-up shadow-sm group bg-brand-brown flex items-center justify-center border border-gray-100">
           {/* Usamos el logo alternativo como decoración */}
           <img src="/pit market-02.png" alt="Pitmarket Banner" className="h-32 object-contain transition-transform duration-700 group-hover:scale-110" />
           <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent" />
        </div>

        {/* --- PLATOS FRESH --- */}
        <section className="animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-outfit font-bold text-brand-black uppercase tracking-wider">
              {platosFresh?.name}
            </h2>
            <p className="text-brand-gold font-medium mt-1 text-sm max-w-[350px] mx-auto leading-relaxed">
              Proteína 200gr + 1 acompañamiento + 2 salsas
            </p>
            <div className="w-12 h-0.5 bg-brand-gold/30 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12">
            
            {/* Left Column: Proteínas */}
            <div>
              <h3 className="font-outfit font-bold text-lg mb-3 text-brand-brown">Elige tu Proteína</h3>
              <div className="flex flex-col gap-4">
                {Object.entries(freshProteins).map(([price, names]) => (
                  <div key={price} className="flex flex-col border-l-2 border-brand-gold/40 pl-3">
                    <span className="text-brand-gold font-semibold text-sm mb-1">${Number(price).toLocaleString("es-CL")}</span>
                    <p className="text-sm text-brand-gray leading-relaxed">
                      {Array.isArray(names) ? names.join(" • ") : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-gray-100 md:hidden" />

            {/* Right Column: Acompañamientos y Salsas */}
            <div className="flex flex-col gap-8 md:gap-2">
              {/* Acompañamientos */}
              <div>
                <h3 className="font-outfit font-bold text-lg mb-1 text-brand-brown">Acompañamientos</h3>
                <ul className="flex flex-col gap-1">
                  {platosFresh?.ingredients.sides?.map(side => (
                    <li key={side.id} className="flex justify-between items-center text-sm">
                      <span className="text-brand-gray">{side.name}</span>
                      <span className="font-medium text-brand-black">${side.price?.toLocaleString("es-CL")}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px w-full bg-gray-100 md:hidden" />

              {/* Salsas */}
              <div>
                <h3 className="font-outfit font-bold text-lg  text-brand-brown">Salsas <span className="text-xs font-normal text-brand-gray tracking-wide ml-1">(elige 2)</span></h3>
                <p className="text-sm text-brand-gray leading-relaxed font-light">
                  {platosFresh?.ingredients.sauces?.map(s => s.name).join(" | ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- BOWL TRADICIONAL --- */}
        <section className="animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-outfit font-bold text-brand-black uppercase tracking-wider">
              {bowl?.name}
            </h2>
            <p className="text-brand-gold font-medium mt-1 text-sm max-w-[350px] mx-auto leading-relaxed">
              Base + 4 vegetales + 4 toques + 4 salsas
            </p>
            <div className="w-12 h-0.5 bg-brand-gold/30 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-brand-black rounded-[24px] p-6 md:p-10 shadow-[0_12px_30px_rgb(0,0,0,0.15)] flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 text-white relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-brown/20 rounded-full blur-3xl pointer-events-none" />

            {/* Col 1: Base & Proteinas (5 span) */}
            <div className="md:col-span-5 flex flex-col gap-6 z-10">
              <div className="mb-2">
                <h3 className="font-outfit font-bold text-lg mb-2 text-brand-gold">I. Base </h3>
                <p className="text-[14px] text-gray-300 font-light leading-relaxed">
                  {bowl?.ingredients.bases?.map(b => b.name).join(" • ")}
                </p>
              </div>
              
              <div className="h-px w-full bg-white/10 md:hidden" />
              
              <div>
                <h3 className="font-outfit font-bold text-lg mb-4 text-brand-gold">II. Proteínas</h3>
                <div className="flex flex-col gap-4">
                  {Object.entries(bowlProteins).map(([price, names]) => (
                    <div key={price} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                         <span className="font-outfit font-bold tracking-wide text-white">{getBowlCategoryName(price)}</span>
                         <span className="text-brand-gold font-semibold text-sm bg-brand-gold/10 px-2 py-0.5 rounded">${Number(price).toLocaleString("es-CL")}</span>
                      </div>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        {Array.isArray(names) ? names.join(" • ") : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 relative z-10 md:hidden" />

            {/* Col 2: Vegetales y Toques (4 span) */}
            <div className="md:col-span-4 flex flex-col gap-6 z-10">
                <div>
                  <h3 className="font-outfit font-bold text-sm mb-2 text-brand-gold">III. Vegetales </h3> <span className="text-xs font-normal text-brand-gray tracking-wide ml-1">(elige 4)</span>
                  <ul className="text-[13px] text-gray-300 font-light flex flex-col gap-1.5 list-disc pl-4 marker:text-brand-brown">
                    {bowl?.ingredients.veggies?.map(v => (
                      <li key={v.id}>{v.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-sm mb-2 text-brand-gold">IV. Toques </h3><span className="text-xs font-normal text-brand-gray tracking-wide ml-1">(elige 4)</span>
                  <ul className="text-[13px] text-gray-300 font-light flex flex-col gap-1.5 list-disc pl-4 marker:text-brand-brown">
                    {bowl?.ingredients.touches?.map(t => (
                      <li key={t.id}>{t.name}</li>
                    ))}
                  </ul>
                </div>
            </div>

            <div className="h-px w-full bg-white/10 relative z-10 md:hidden" />

            {/* Col 3: Agregados y Salsas (3 span) */}
            <div className="md:col-span-3 flex flex-col gap-6 z-10">
                 <div>
                    <h3 className="font-outfit font-bold text-sm mb-1 text-brand-gold">Salsas </h3><span className="text-xs font-normal text-brand-gray tracking-wide ml-1">(elige 4)</span>
                    <p className="text-[12px] text-gray-400 font-light leading-relaxed">
                      Ajo | Soya | Ají | Albahaca | Cilantro | Perejil | Ciboulette | Mayo | Ketchup | Agridulce | Jengibre | Ají limón | Mostaza | Champiñón
                    </p>
                 </div>
                 <div>
                    <h3 className="font-outfit font-bold text-sm mb-2 text-brand-gold">Agregados extras</h3>
                    <div className="flex flex-wrap gap-4">
                      {bowl?.ingredients.extras?.map(e => (
                         <span key={e.id} className="text-[13px] text-gray-300 font-light bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                           {e.name} <span className="text-brand-gold font-medium">${e.price}</span>
                         </span>
                      ))}
                    </div>
                 </div>
            </div>

          </div>
        </section>

        {/* --- SÁNDWICH --- */}
        <section className="animate-slide-up" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
           <div className="text-center mb-6">
            <h2 className="text-3xl font-outfit font-bold text-brand-black uppercase tracking-wider">
              {sandwich?.name}
            </h2>
            <div className="w-12 h-0.5 bg-brand-gold/30 mx-auto mt-3 rounded-full" />
          </div>

          <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12">
             
             {/* Left Column: Opciones */}
             <div className="flex flex-col gap-3">
                {sandwich?.ingredients.bases?.map((base, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="font-medium text-brand-black text-sm">{base.name}</span>
                    <span className="font-semibold text-brand-gold">${sandwich.basePrice?.toLocaleString("es-CL")}</span>
                  </div>
                ))}
             </div>

             <div className="h-px w-full bg-gray-100 md:hidden" />

             {/* Right Column: Salsas y Agregados */}
             <div className="flex flex-col gap-6 md:gap-1">
               {/* Salsas sándwich */}
               <div>
                  <h3 className="font-outfit font-bold text-[15px] mb-2 text-brand-brown">Elige 2 Salsas</h3>
                  <div className="flex flex-wrap gap-2">
                    {sandwich?.ingredients.sauces?.map(s => (
                       <span key={s.id} className="text-[13px] text-brand-gray bg-white border border-gray-200 px-3 py-1 rounded-full">
                         {s.name}
                       </span>
                    ))}
                  </div>
               </div>

               {/* Agregados sándwich */}
               <div>
                  <h3 className="font-outfit font-bold text-[15px text-brand-brown">Agregados</h3>
                  <div className="flex flex-wrap gap-3">
                    {sandwich?.ingredients.extras?.map(e => (
                       <div key={e.id} className="text-[13px] text-brand-gray flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                         {e.name} <span className="font-medium text-brand-black ml-0.5">+${e.price}</span>
                       </div>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        </section>

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
