interface Segment {
  label: string;
  value: number;
  color: string;
}

interface TaxBreakdownChartProps {
  segments: Segment[];
  total: number;
}

export default function TaxBreakdownChart({ segments, total }: TaxBreakdownChartProps) {
  if (total <= 0) return null;

  return (
    <div>
      <div className="flex rounded-lg overflow-hidden h-8">
        {segments.map((seg, i) => {
          const pct = (seg.value / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={i}
              className="flex items-center justify-center text-xs font-medium text-white transition-all"
              style={{ width: `${pct}%`, backgroundColor: seg.color, minWidth: pct > 3 ? undefined : '4px' }}
            >
              {pct > 8 ? `${pct.toFixed(0)}%` : ''}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-gray-600">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
