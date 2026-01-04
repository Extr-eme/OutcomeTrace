import { Bell, User } from 'lucide-react';
import logo from './logo.png';

export default function Header() {
  return (
    <header className="relative flex items-center justify-between px-8 py-4 bg-lime-100 border-b border-gray-200">

      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Platform Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Center: Title */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Government Budget Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Real-time transparency and accountability
        </p>
      </div>

      {/* Right: Icons + User */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <p className="text-sm font-medium text-gray-800">Admin User</p>
        </div>
      </div>

    </header>
  );
}
