import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

export default function SummaryCard({ title, value, subtitle, icon: Icon, color, trend }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color} mb-2`}>{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {trend && (
            <p className="text-xs text-green-600 mt-2 font-medium">{trend}</p>
          )}
        </div>
        <div className={`p-3 ${color.replace('text-', 'bg-').replace('600', '100')} rounded-lg`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );
}
