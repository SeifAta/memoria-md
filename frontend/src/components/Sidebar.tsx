import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Moon,
  Sun,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { DashboardView } from "../types";
import { useState, useEffect } from "react";

interface SidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onLogout: () => void;
}

export function Sidebar({
  activeView,
  onViewChange,
  onLogout,
}: SidebarProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");

    if (saved) {
      setDarkMode(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      darkMode.toString()
    );

    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );
  }, [darkMode]);

  const navItems = [
    {
      id: "home",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "custom-study",
      label: "Custom Study",
      icon: BookOpen,
    },
    {
      id: "progress",
      label: "Progress",
      icon: TrendingUp,
    },
  ] as const;

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col shadow-sm z-20 transition-colors duration-300">

      {/* Header */}

      <div className="h-20 flex items-center px-6 border-b border-gray-50 dark:border-slate-800">

      <div className="flex items-center gap-3">

        <img
          src="/logo.jpg"
          alt="MemoriaMD"
          className="w-10 h-10 rounded-xl object-cover"
        />

        <span className="font-bold text-lg text-text-main dark:text-white">
          Memoria<span className="text-primary">MD</span>
        </span>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 py-6 px-4 space-y-1">

        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`

                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-text-muted dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:translate-x-1"
                }

              `}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-white"
                    : ""
                }`}
              />

              <span className="font-medium text-sm">
                {item.label}
              </span>

            </button>
          );
        })}

      </div>

      {/* Footer */}

      <div className="p-4 border-t border-gray-50 dark:border-slate-800 space-y-1">

        {/* <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:translate-x-1 transition-all duration-200"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}

          <span className="font-medium text-sm">
            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </span>
        </button> */}

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:translate-x-1 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />

          <span className="font-medium text-sm">
            Sign Out
          </span>
        </button>

        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center gap-3 px-2">

          <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-primary font-bold">
            DR
          </div>

          <div className="flex-1 min-w-0">

            <p className="text-sm font-semibold text-text-main dark:text-white truncate">
              Dr. John
            </p>

            <p className="text-xs text-text-muted dark:text-slate-400 truncate">
              Internal Medicine
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}