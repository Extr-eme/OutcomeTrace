import { Region } from '../types';

interface RegionalMapProps {
  regions: Region[];
  title: string;
}

export default function RegionalMap({ regions, title }: RegionalMapProps) {
  const getRegionColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      <div className="space-y-3">
        {regions.map((region, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
            style={{ backgroundColor: `${getRegionColor(region.score)}15` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full transition-all group-hover:scale-125"
                style={{ backgroundColor: getRegionColor(region.score) }}
              ></div>
              <div>
                <p className="text-sm font-medium text-gray-800">{region.name}</p>
                <p className="text-xs text-gray-500">{region.department}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: getRegionColor(region.score) }}>
                {region.score}
              </p>
              <p className="text-xs text-gray-500">Transparency %</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-3 font-medium">Score Range</p>
        <div className="grid grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 rounded bg-red-50">
            <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-700">0-40%</span>
          </div>
          <div className="p-2 rounded bg-yellow-50">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-700">40-60%</span>
          </div>
          <div className="p-2 rounded bg-blue-50">
            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-700">60-80%</span>
          </div>
          <div className="p-2 rounded bg-green-50">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1"></div>
            <span className="text-gray-700">80-100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
