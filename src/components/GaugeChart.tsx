interface GaugeChartProps {
  value: number;
  title: string;
  subtitle?: string;
}

export default function GaugeChart({ value, title, subtitle }: GaugeChartProps) {
  const getColor = (val: number) => {
    if (val >= 80) return '#10b981';
    if (val >= 60) return '#f59e0b';
    if (val >= 40) return '#ef4444';
    return '#dc2626';
  };

  const getLabel = (val: number) => {
    if (val >= 80) return 'Excellent';
    if (val >= 60) return 'Good';
    if (val >= 40) return 'Fair';
    return 'Poor';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const color = getColor(value);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">{title}</h3>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 mb-4">
          <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset="0"
            />

            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold" style={{ color }}>
              {value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{getLabel(value)}</p>
          </div>
        </div>

        {subtitle && <p className="text-sm text-gray-600 text-center mt-2">{subtitle}</p>}

        <div className="flex items-center gap-8 mt-8 pt-6 border-t border-gray-200 w-full justify-center text-xs">
          <div className="text-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">Poor</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">Fair</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">Good</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-600">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
