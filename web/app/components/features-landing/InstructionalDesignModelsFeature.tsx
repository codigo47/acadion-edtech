'use client';

export default function InstructionalDesignModelsFeature() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6">
      {/* Bloom's Taxonomy Pyramid */}
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-0.5 md:gap-1">
          {/* Level 6 - Crear */}
          <div className="bg-[#9F80DA] text-white py-2 md:py-3 px-3 md:px-4 text-center text-sm md:text-base font-medium rounded-t-lg">
            Crear
          </div>

          {/* Level 5 - Evaluar */}
          <div className="bg-[#A88FDD] text-white py-2 md:py-3 px-4 md:px-6 text-center text-sm md:text-base font-medium">
            Evaluar
          </div>

          {/* Level 4 - Analizar */}
          <div className="bg-[#B19FE0] text-white py-2 md:py-3 px-5 md:px-8 text-center text-sm md:text-base font-medium">
            Analizar
          </div>

          {/* Level 3 - Aplicar */}
          <div className="bg-[#BAAFE3] text-white py-2 md:py-3 px-6 md:px-10 text-center text-sm md:text-base font-medium">
            Aplicar
          </div>

          {/* Level 2 - Comprender */}
          <div className="bg-[#C3BFE6] text-white py-2 md:py-3 px-7 md:px-12 text-center text-sm md:text-base font-medium">
            Comprender
          </div>

          {/* Level 1 - Recordar */}
          <div className="bg-[#CCCFE9] text-gray-700 py-2 md:py-3 px-8 md:px-14 text-center text-sm md:text-base font-medium rounded-b-lg">
            Recordar
          </div>
        </div>
      </div>
    </div>
  );
}
