"use client";

import { Truck, Loader2, AlertCircle } from "lucide-react";
import { useShipping } from "../hooks/useShipping";

export default function ShippingCalculator() {
  const { cep, loading, error, options, handleCepChange, calculate } =
    useShipping();

  return (
    <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-md font-sans">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <Truck size={20} className="text-blue-600" />
        <span className="font-semibold text-sm uppercase tracking-wider">
          Calcular Frete
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={9}
            value={cep}
            onChange={(e) => handleCepChange(e.target.value)}
            placeholder="00000-000"
            suppressHydrationWarning
            className={`
    flex-1 px-4 py-2.5 
    bg-white 
    border rounded-md 
    text-sm text-gray-900 
    placeholder:text-gray-500 
    outline-none transition-all
    ${
      error
        ? "border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
    }
  `}
          />
          <button
            onClick={calculate}
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
      </div>

      {options && !loading && (
        <div className="mt-5 space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-md hover:border-blue-200 transition-colors"
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
