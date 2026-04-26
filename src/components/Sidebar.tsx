import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Plus, MessageSquare, MoreHorizontal, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onNewChat: () => void;
  chats: { id: string; title: string; date: string }[];
  activeChatId?: string;
  onSelectChat: (id: string) => void;
}

export function Sidebar({ isOpen, setIsOpen, onNewChat, chats, activeChatId, onSelectChat }: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full bg-muted border-r border-border flex flex-col flex-shrink-0 overflow-hidden relative z-20"
          >
            <div className="p-3">
              <button
                onClick={onNewChat}
                className="w-full flex items-center gap-2 px-3 py-2 bg-background border border-border hover:bg-accent rounded-md text-sm transition-colors"
              >
                <Plus size={16} />
                New chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-hide">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Recent</div>
              <div className="flex flex-col gap-1">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={cn(
                      "flex items-center gap-2 px-2 py-2.5 rounded-md text-sm text-left hover:bg-accent transition-colors group w-[236px]",
                      activeChatId === chat.id ? "bg-accent text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <MessageSquare size={16} className="flex-shrink-0" />
                    <span className="truncate flex-1">{chat.title}</span>
                    <MoreHorizontal size={16} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-border flex flex-col gap-1">
              <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm text-muted-foreground transition-colors w-full">
                <Settings size={16} />
                Settings
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm text-muted-foreground transition-colors w-full">
                <User size={16} />
                Upgrade plan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle Button (floating when closed, or part of header when open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-10 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-10"
          />
        )}
      </AnimatePresence>
    </>
  );
}
