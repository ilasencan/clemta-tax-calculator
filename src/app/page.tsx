import TaxCalculator from '@/components/tax-calculator/TaxCalculator';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          US Tax Calculator for Global Founders
        </h1>
        <p className="mt-2 text-gray-500 max-w-lg mx-auto">
          Estimate your US tax obligations based on your country&apos;s tax treaty,
          company type, and income.
        </p>
      </div>
      <TaxCalculator />
    </main>
  );
}
