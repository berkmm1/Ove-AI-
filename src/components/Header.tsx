import React from 'react';
import { Sparkles, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 border-b border-[#313244] bg-[#1e1e2f] flex items-center px-4 justify-between md:justify-center">
      <button className="md:hidden text-[#a6adc8] hover:text-[#cdd6f4]">
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] flex items-center justify-center text-white shadow-lg">
          <Sparkles size={14} />
        </div>
        <span className="font-semibold text-[#cdd6f4] tracking-wide">DeepSeek <span className="text-[#a6adc8] font-normal">AI</span></span>
      </div>

      <div className="w-6 md:hidden" /> {/* Spacer for centering on mobile */}
    </header>
  );
};
