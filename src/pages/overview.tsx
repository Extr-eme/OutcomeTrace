import { DollarSign, TrendingUp, Award } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import GaugeChart from '../components/GaugeChart';
import RegionalMap from '../components/RegionalMap';
import { budgetByDepartment, transparencyTrend, projects, regions } from '../data/mockData';
import { useState } from 'react';

export default function Overview() {
  const [selectedYear] = useState('2024');
  const [selectedDepartment] = useState('All Departments');

  const totalBudget = budgetByDepartment.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpent = budgetByDepartment.reduce((sum, dept) => sum + dept.spent, 0);
  const utilizationRate = ((totalSpent / totalBudget) * 100).toFixed(1);
  const avgTransparency = (projects.reduce((sum, p) => sum + p.transparencyScore, 0) / projects.length).toFixed(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budget Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Comprehensive view of government spending and transparency</p>
        </div>

        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>{selectedDepartment}</option>
            <option>Infrastructure</option>
            <option>Education</option>
            <option>Healthcare</option>
            <option>Agriculture</option>
            <option>Transport</option>
            <option>Environment</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>Infrastructure</option>
            <option>Social Welfare</option>
            <option>Development</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Budget Allocated"
          value={`$${(totalBudget / 1000000).toFixed(1)}M`}
          subtitle={`Fiscal Year ${selectedYear}`}
          icon={DollarSign}
          color="text-blue-600"
        />
        <SummaryCard
          title="Spending Utilized"
          value={`${utilizationRate}%`}
          subtitle={`$${(totalSpent / 1000000).toFixed(1)}M spent of allocated`}
          icon={TrendingUp}
          color="text-green-600"
          trend="↑ 3.2% from last quarter"
        />
        <SummaryCard
          title="Transparency Score"
          value={`${avgTransparency}%`}
          subtitle="Average across all projects"
          icon={Award}
          color="text-orange-600"
          trend="↑ 5.1% improvement YoY"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={budgetByDepartment}
          title="Budget vs Actual Spending by Department"
        />
        <GaugeChart
          value={parseInt(avgTransparency)}
          title="Overall Transparency Score"
          subtitle="Government-wide transparency index"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          data={transparencyTrend}
          title="Transparency Score Trend (2024)"
        />
        <RegionalMap
          regions={regions}
          title="Regional Transparency Comparison"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">High Performers</p>
              <p className="text-xs text-gray-600 mt-1">
                5 projects with transparency scores above 85% are on track
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">Attention Required</p>
              <p className="text-xs text-gray-600 mt-1">
                3 projects need review due to low transparency or delays
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
