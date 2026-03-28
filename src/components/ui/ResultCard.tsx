interface ResultCardProps {
  title: string;
  value: string;
  subtitle?: string;
  variant?: 'default' | 'highlight' | 'success';
}

export default function ResultCard({ title, value, subtitle, variant = 'default' }: ResultCardProps) {
  const bgClass = {
    default: 'bg-white border-gray-200',
    highlight: 'bg-[var(--clemta-blue-light)] border-[var(--clemta-blue)]',
    success: 'bg-[var(--clemta-green-light)] border-green-400',
  }[variant];

  const valueClass = {
    default: 'text-gray-900',
    highlight: 'text-[var(--clemta-blue)]',
    success: 'text-green-700',
  }[variant];

  return (
    <div className={`p-4 rounded-lg border-2 ${bgClass}`}>
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className={`text-2xl font-bold mt-1 ${valueClass}`}>{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );
}
