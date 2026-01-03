import { TransparencyTrend } from '../types';

interface LineChartProps {
  data: TransparencyTrend[];
  title: string;
}

export default function LineChart({ data, title }: LineChartProps) {
  const maxScore = 100;
  const minScore = 0;
  const height = 200;
  const width = 600;
  const padding = 40;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((item.score - minScore) / (maxScore - minScore)) * (height - padding * 2);
    return { x, y, score: item.score };
  });

  const pathD = points.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`}
          fill="url(#gradient)"
        />

        <path
          d={pathD}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </g>
        ))}

        {data.map((item, index) => (
          <text
            key={index}
            x={points[index].x}
            y={height - 15}
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {item.month}
          </text>
        ))}

        <text x="10" y="30" className="text-xs fill-gray-600">100</text>
        <text x="10" y={height - padding + 5} className="text-xs fill-gray-600">0</text>
      </svg>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Current Score: <span className="font-semibold text-blue-600">{data[data.length - 1].score}%</span>
        </p>
      </div>
    </div>
  );
}
