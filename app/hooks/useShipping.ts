import { useState, useEffect } from "react";

export interface ShippingOption {
  id: number;
  label: string;
  price: string;
  time: string;
}

export function useShipping() {
  const [cep, setCep] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("@ghfly:cep") || "";
    }
    return "";
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<ShippingOption[] | null>(null);

  useEffect(() => {
    if (cep.length === 9) {
      // 00000-000
      localStorage.setItem("@ghfly:cep", cep);
    }
  }, [cep]);

  const handleCepChange = (value: string) => {
    let formatted = value.replace(/\D/g, "");
    if (formatted.length > 5) {
      formatted = formatted.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    setCep(formatted);
    setError("");
  };

  const calculate = async () => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setError("Por favor, digite um CEP válido.");
      setOptions(null);
      return;
    }

    setLoading(true);
    localStorage.setItem("@ghfly:cep", cep); // Persistência de dados

    // Simulando API
    setTimeout(() => {
      setOptions([
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
      ]);
      setLoading(false);
    }, 1200);
  };

  return { cep, loading, error, options, handleCepChange, calculate };
}
