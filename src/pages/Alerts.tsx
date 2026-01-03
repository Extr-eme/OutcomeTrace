import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { alerts, projects } from '../data/mockData';

export default function Alerts() {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'good':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600',
          label: 'Good Standing',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600',
          label: 'Needs Attention',
        };
      case 'low':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: AlertCircle,
          iconColor: 'text-red-600',
          label: 'Critical',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: AlertCircle,
          iconColor: 'text-gray-600',
          label: 'Unknown',
        };
    }
  };

  const criticalAlerts = alerts.filter(a => a.severity === 'low').length;
  const mediumAlerts = alerts.filter(a => a.severity === 'medium').length;
  const goodProjects = projects.filter(p => p.status === 'good').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Alerts & Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time monitoring of project health and transparency</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{criticalAlerts}</p>
              <p className="text-sm text-gray-600">Critical Issues</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{mediumAlerts}</p>
              <p className="text-sm text-gray-600">Needs Attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{goodProjects}</p>
              <p className="text-sm text-gray-600">Healthy Projects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Alerts</h2>

        <div className="space-y-4">
          {alerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${config.border} ${config.bg} transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Icon className={config.iconColor} size={20} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{alert.projectName}</h3>
                        <p className={`text-xs font-medium ${config.text} mt-1`}>{config.label}</p>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(alert.date).toLocaleDateString()}</span>
                    </div>

                    <p className="text-sm text-gray-700 mt-2">{alert.issue}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        View Details
                      </button>
                      <button className="text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors">
                        Mark as Reviewed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects by Status</h2>

        <div className="space-y-3">
          {projects.map((project) => {
            const config = getSeverityConfig(project.status);

            return (
              <div key={project.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${config.iconColor.replace('text-', 'bg-')}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Transparency</p>
                    <p className="text-sm font-semibold text-gray-800">{project.transparencyScore}%</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${config.border} ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparency Guidelines</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <p><span className="font-medium">Good (85-100%):</span> Project meets all transparency requirements with regular updates and clear documentation</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">•</span>
            <p><span className="font-medium">Medium (65-84%):</span> Project needs improvement in reporting frequency or documentation completeness</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <p><span className="font-medium">Low (0-64%):</span> Critical transparency gaps requiring immediate attention and intervention</p>
          </div>
        </div>
      </div>
    </div>
  );
}
