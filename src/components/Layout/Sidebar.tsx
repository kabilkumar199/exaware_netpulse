import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Network,
  Server,
  Settings,
  Activity,
  Wrench,
  Building2,
  ChevronDown,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { NAVIGATION_ITEMS } from "../../router/routes";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
}) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const getIcon = (iconName: string) => {
    const iconMap: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = {
      dashboard: LayoutDashboard,
      search: Search,
      network: Network,
      server: Server,
      settings: Settings,
      activity: Activity,
      wrench: Wrench,
      'building-2': Building2,
    };
    return iconMap[iconName] || Settings;
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (item: any) => {
    if (item.children) {
      return item.children.some((child: any) => isActive(child.path));
    }
    return isActive(item.path);
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col border-r border-gray-700 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative lg:inset-auto`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Logo width={120} height={16} className="text-white" />
        </div>
        <button
          onClick={onToggle}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <span className="sr-only">Close sidebar</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {NAVIGATION_ITEMS.map((item) => {
            const IconComponent = getIcon(item.icon);
            const hasChildren = 'children' in item && item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.id);
            const isParentActiveItem = isParentActive(item);

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => {
                    if (hasChildren) {
                      toggleExpanded(item.id);
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isParentActiveItem
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {hasChildren && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                
                {/* Submenu */}
                {hasChildren && isExpanded && 'children' in item && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.children.map((child: any) => (
                      <li key={child.id}>
                        <Link
                          to={child.path}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(child.path)
                              ? 'bg-blue-700 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              John Carter
            </p>
            <p className="text-xs text-gray-400 truncate">
              john.carter@company.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
