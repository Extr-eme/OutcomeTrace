import { BudgetData } from '../types';

interface BarChartProps {
  data: BudgetData[];
  title: string;
}

export default function BarChart({ data, title }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.budget, d.spent)));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      <div className="space-y-6">
        {data.map((item, index) => {
          const budgetWidth = (item.budget / maxValue) * 100;
          const spentWidth = (item.spent / maxValue) * 100;

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.department}</span>
                <span className="text-xs text-gray-500">
                  ${(item.spent / 1000000).toFixed(1)}M / ${(item.budget / 1000000).toFixed(1)}M
                </span>
              </div>

              <div className="relative h-8">
                <div className="absolute inset-0 bg-gray-100 rounded-lg"></div>
                <div
                  className="absolute inset-y-0 left-0 bg-blue-200 rounded-lg transition-all duration-500"
                  style={{ width: `${budgetWidth}%` }}
                ></div>
                <div
                  className="absolute inset-y-0 left-0 bg-blue-600 rounded-lg transition-all duration-500"
                  style={{ width: `${spentWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-200 rounded"></div>
          <span className="text-xs text-gray-600">Budget Allocated</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span className="text-xs text-gray-600">Budget Spent</span>
        </div>
      </div>
    </div>
  );
}
