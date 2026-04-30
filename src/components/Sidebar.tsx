import React from 'react';
import { Plus, MessageSquare, PanelLeftClose, PanelLeft, Moon, Sun } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const {
    sessions,
    currentSessionId,
    createNewSession,
    isSidebarOpen,
    toggleSidebar,
    theme,
    toggleTheme
  } = useChat();

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-screen bg-ds-sidebar dark:bg-ds-sidebar-dark border-r border-ds-border dark:border-ds-border-dark flex flex-col flex-shrink-0 overflow-hidden"
          >
            <div className="p-3">
              <button
                onClick={createNewSession}
                className="w-full flex items-center gap-2 bg-ds-primary text-white hover:bg-opacity-90 px-4 py-2.5 rounded-full font-medium transition-colors"
              >
                <Plus size={20} />
                <span>Yeni Sohbet</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
              <div className="text-xs font-semibold text-ds-muted dark:text-ds-muted-dark mb-2 px-2">
                Geçmiş Sohbetler
              </div>
              {sessions.map(session => (
                <button
                  key={session.id}
                  className={cn(
                    "w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group",
                    currentSessionId === session.id
                      ? "bg-ds-border dark:bg-ds-border-dark text-ds-text dark:text-ds-text-dark"
                      : "text-ds-muted dark:text-ds-muted-dark hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  <MessageSquare size={16} className="flex-shrink-0" />
                  <span className="truncate flex-1">{session.title}</span>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-ds-border dark:border-ds-border-dark flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="p-2 text-ds-muted dark:text-ds-muted-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                title="Tema Değiştir"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={toggleSidebar}
                className="p-2 text-ds-muted dark:text-ds-muted-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors md:hidden"
              >
                <PanelLeftClose size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSidebarOpen && (
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-ds-bg dark:bg-ds-bg-dark border border-ds-border dark:border-ds-border-dark text-ds-muted dark:text-ds-muted-dark hover:text-ds-text dark:hover:text-ds-text-dark rounded-lg shadow-sm transition-colors"
          >
            <PanelLeft size={20} />
          </button>
        </div>
      )}
    </>
  );
};
