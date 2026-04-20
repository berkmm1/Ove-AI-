import { Plus, MessageSquare, Settings, User } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-border transition-transform duration-300 ease-in-out md:static md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <button className="flex w-full items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-2">Recent</div>
        {[1, 2, 3].map((i) => (
          <button
            key={i}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-left"
          >
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <span className="truncate">Previous conversation {i}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          User
        </button>
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors text-gray-500">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
