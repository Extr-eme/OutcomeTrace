import { useState } from 'react';
import { Search, ChevronRight, Download } from 'lucide-react';
import { projects } from '../data/mockData';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'good':
        return 'Good';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Project Portfolio</h1>
          <p className="text-sm text-gray-500 mt-1">Detailed view of all government projects</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Departments</option>
            <option>Infrastructure</option>
            <option>Education</option>
            <option>Healthcare</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Project Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Budget Allocated</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Budget Spent</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Outcome %</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Transparency</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-800">{project.name}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{project.department}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm text-gray-800">${(project.budgetAllocated / 1000000).toFixed(2)}M</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm text-gray-800">${(project.budgetSpent / 1000000).toFixed(2)}M</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.outcomePercent}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{project.outcomePercent}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-gray-800">{project.transparencyScore}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => setSelectedProject(project.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProjectData && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{selectedProjectData.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedProjectData.department} Department</p>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Budget Overview</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Allocated</span>
                  <span className="text-sm font-semibold text-gray-800">
                    ${(selectedProjectData.budgetAllocated / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Spent</span>
                  <span className="text-sm font-semibold text-gray-800">
                    ${(selectedProjectData.budgetSpent / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Utilization Rate</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {((selectedProjectData.budgetSpent / selectedProjectData.budgetAllocated) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Performance Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Outcome Completion</span>
                    <span className="text-sm font-semibold text-gray-800">{selectedProjectData.outcomePercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProjectData.outcomePercent}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Transparency Score</span>
                    <span className="text-sm font-semibold text-gray-800">{selectedProjectData.transparencyScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProjectData.transparencyScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedProjectData.status)}`}>
                    {getStatusLabel(selectedProjectData.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Timeline</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Start:</span> {new Date(selectedProjectData.startDate).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">End:</span> {new Date(selectedProjectData.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
