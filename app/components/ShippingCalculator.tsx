"use client";

import React, { useState } from "react";
import { Truck, Loader2, AlertCircle } from "lucide-react";

interface ShippingOption {
  id: number;
  label: string;
  price: string;
  time: string;
}

export default function ShippingCalculator() {
  const [cep, setCep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [options, setOptions] = useState<ShippingOption[] | null>(null);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Coloca o hífen
    }
    setCep(value);
    setError("");
  };

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setError("Por favor, digite um CEP válido (8 números).");
      setOptions(null);
      return;
    }

    setError("");
    setLoading(true);

    // Mock da simulação de frete, setTimeout para simular o delay da API
    setTimeout(() => {
      const mockResults: ShippingOption[] = [
        {
          id: 1,
          label: "Expressa",
          price: "R$ 25,90",
          time: "Até 2 dias úteis",
        },
        {
          id: 2,
          label: "Econômica",
          price: "R$ 12,00",
          time: "Até 6 dias úteis",
        },
      ];

      setOptions(mockResults);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow-sm font-sans">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <Truck size={20} className="text-blue-600" />
        <span className="font-semibold text-sm uppercase tracking-wider">
          Calcular Frete
        </span>
      </div>

      <form onSubmit={handleCalculate} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={9}
            value={cep}
            onChange={handleCepChange}
            placeholder="00000-000"
            className={`flex-1 px-3 py-2 border rounded-md text-sm outline-none transition-all ${
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-300 focus:border-blue-500"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center justify-center min-w-[100px]"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "Calcular"
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </form>

      {options && !loading && (
        <div className="mt-5 space-y-2 animate-in fade-in slide-in-from-top-1">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-md"
            >
              <div>
                <p className="text-xs font-bold text-gray-700">
                  {option.label}
                </p>
                <p className="text-[10px] text-gray-500">{option.time}</p>
              </div>
              <span className="text-sm font-bold text-green-600">
                {option.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
