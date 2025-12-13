import { Users, AlertTriangle, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Attrition Models", href: "/attrition", icon: Users },
  { name: "Leakage Demo", href: "/leakage", icon: AlertTriangle },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="p-2 rounded-lg bg-sidebar-primary/20">
          <Activity className="h-6 w-6 text-sidebar-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">HR Analytics</h1>
          <p className="text-xs text-sidebar-foreground/60">Machine Learning Lab</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-3 mb-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
          Assignments
        </p>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="px-3 py-2 rounded-lg bg-sidebar-accent/50">
          <p className="text-xs text-sidebar-foreground/60">API Status</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-sidebar-foreground">Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
