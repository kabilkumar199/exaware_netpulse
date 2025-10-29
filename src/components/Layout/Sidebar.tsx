import React, { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Play,
  History,
  Network,
  Server,
  Share2,
  Map,
  BarChart3,
  Route,
  CheckCircle,
  FileText,
  Settings,
  Key,
  Tag,
  Link,
  Clock,
  Activity,
  TrendingUp,
  Wifi,
  Layers,
  Cloud,
  Database,
  ChevronRight,
  X,
  HardDrive,
  Wrench,
  Bell,
  Users,
  Shield,
  MapPin,
  Building2,
  Factory,
  UserCheck,
} from "lucide-react";
import type { NavigationItem } from "../../types";
import { mockNavigationItems } from "../../data/mockData";
import Logo from "./Logo";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  currentView,
  onNavigate,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "nav-dashboard",
  ]);

  const getIcon = (iconName: string) => {
    const iconMap: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = {
      dashboard: LayoutDashboard,
      search: Search,
      play: Play,
      history: History,
      network: Network,
      server: Server,
      share: Share2,
      map: Map,
      chart: BarChart3,
      route: Route,
      "check-circle": CheckCircle,
      "file-text": FileText,
      settings: Settings,
      key: Key,
      tag: Tag,
      link: Link,
      clock: Clock,
      activity: Activity,
      "trending-up": TrendingUp,
      "bar-chart": BarChart3,
      wifi: Wifi,
      layers: Layers,
      cloud: Cloud,
      database: Database,
      harddrive: HardDrive,
      wrench: Wrench,
      bell: Bell,
      users: Users,
      shield: Shield,
      "map-pin": MapPin,
      "building-2": Building2,
      factory: Factory,
      "server-rack": Server,
      "user-check": UserCheck,
    };
    return iconMap[iconName] || Settings;
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = currentView === item.id;
    const IconComponent = getIcon(item.icon);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onNavigate(item.id);
            }
          }}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            level === 0 ? "mb-1" : "ml-4 mb-1"
          } ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <IconComponent className="w-4 h-4 mr-3" />
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            <ChevronRight
              className={`w-4 h-4 ml-2 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          )}
          {item.badge && (
            <span className="ml-2 px-2 py-1 text-xs bg-red-900 text-red-300 rounded-full">
              {item.badge}
            </span>
          )}
        </button>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children!.map((child) =>
              renderNavigationItem(child, level + 1)
            )}
          </div>
        )}
      </div>
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
          {/* Logo */}
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

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {mockNavigationItems.map((item) => renderNavigationItem(item))}
        </div>
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
