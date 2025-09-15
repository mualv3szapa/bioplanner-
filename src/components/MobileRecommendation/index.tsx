"use client";

import React, { useState, useEffect } from "react";

const MobileRecommendation: React.FC = () => {
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      // Define um breakpoint para considerar como desktop. Ex: 768px para tablets/desktops
      // Você pode ajustar este valor conforme a necessidade do seu design.
      const isDesktop = window.innerWidth > 768;
      setShowRecommendation(isDesktop);
    };

    // Verifica na montagem do componente
    checkScreenWidth();

    // Adiciona um listener para redimensionamento da janela
    window.addEventListener("resize", checkScreenWidth);

    // Remove o listener na desmontagem do componente
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  if (!showRecommendation) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-[#0F2167] mb-4">
          Melhor Experiência em Dispositivos Móveis
        </h2>
        <p className="text-gray-700 mb-4">
          Para uma experiência otimizada e completa, recomendamos que você
          acesse esta página em um celular.
        </p>
        <p className="text-sm text-gray-500">
          O design foi pensado para se adaptar perfeitamente a telas menores.
        </p>
      </div>
    </div>
  );
};

export default MobileRecommendation;
