import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  Settings,
  ChevronDown,
  User,
  LogOut,
  Settings2,
  FileCog,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddRegion from "../forms/AddRegion";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
  onProfileClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  title,
  subtitle,
  onProfileClick,
}) => {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<number>(30);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }

      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    onProfileClick?.(); // optional custom handler
    setShowUserMenu(false);
    navigate("/profile"); // navigate to the profile page
  };

  // ✅ Handle save
  const handleSave = () => {
    console.log("Polling Interval saved:", pollingInterval);
    setShowModal(false);
  };

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search devices, sites..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
            onClick={() => navigate("/management/alerts")}
          >
            <span className="sr-only">Notifications</span>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
          </button>

          <div className="relative" ref={settingsRef}>
            {/* Settings */}
            <button
              className="p-2 text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
              // onClick={()=>setShowSettingsMenu(!showSettingsMenu)}
              onClick={() => setShowSettingsMenu((prev) => !prev)}
            >
              <span className="sr-only">Settings</span>
              <Settings className="w-5 h-5" />
            </button>
            {/* Settings Dropdown */}
            {showSettingsMenu && (
              <div className="absolute left-0 mt-4 w-54 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                <button
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors hover:cursor-pointer"
                  onClick={() => {
                    setShowSettingsMenu(false);
                    setShowModal(true);
                  }}
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Polling Interval</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors hover:cursor-pointer">
                  <FileCog className="w-4 h-4" />
                  <span>Configure Management</span>
                </button>
              </div>
            )}

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-96 border border-gray-700">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Device Polling Information
                  </h2>

                  <label className="block text-gray-300 text-sm mb-2">
                    Polling Interval (seconds)
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    value={pollingInterval}
                    onChange={(e) => setPollingInterval(Number(e.target.value))}
                  />

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors hover:cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JC
              </div>
              <span className="hidden md:block text-sm font-medium text-white">
                John Carter
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors hover:cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors hover:cursor-pointer"
                  onClick={() => (
                    navigate("/settings/credentials"), setShowUserMenu(false)
                  )}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-1 border-gray-700" />
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors hover:cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
