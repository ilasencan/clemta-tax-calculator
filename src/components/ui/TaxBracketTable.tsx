import { LLCBracketDetail } from '@/types/tax';
import { formatCurrency, formatPercent } from '@/lib/formatters';

interface TaxBracketTableProps {
  brackets: LLCBracketDetail[];
}

export default function TaxBracketTable({ brackets }: TaxBracketTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 text-gray-500 font-medium">Tax Bracket</th>
            <th className="text-right py-2 px-3 text-gray-500 font-medium">Rate</th>
            <th className="text-right py-2 px-3 text-gray-500 font-medium">Taxable Amount</th>
            <th className="text-right py-2 px-3 text-gray-500 font-medium">Tax</th>
          </tr>
        </thead>
        <tbody>
          {brackets.map((b, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-2 px-3 text-gray-700">
                {formatCurrency(b.bracket.min)} – {b.bracket.max ? formatCurrency(b.bracket.max) : '∞'}
              </td>
              <td className="py-2 px-3 text-right text-gray-700">{formatPercent(b.bracket.rate)}</td>
              <td className="py-2 px-3 text-right text-gray-700">{formatCurrency(b.taxableInBracket)}</td>
              <td className="py-2 px-3 text-right font-medium text-gray-900">{formatCurrency(b.taxForBracket)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
