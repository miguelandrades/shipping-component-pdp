import ShippingCalculator from "./components/ShippingCalculator";

export default function Home() {
  return (
    // Mudamos o fundo para um cinza bem leve e garantimos altura total
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ShippingCalculator />
    </main>
  );
}
