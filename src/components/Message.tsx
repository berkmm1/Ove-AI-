import { Bot, User } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

interface MessageProps {
  role: "user" | "ai";
  content: string;
}

export function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex w-full gap-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm sm:text-base shadow-sm",
          isUser
            ? "bg-message-user text-foreground"
            : "bg-transparent text-foreground prose dark:prose-invert" // prose for future markdown support
        )}
      >
        <div className="whitespace-pre-wrap leading-relaxed">{content}</div>

        {!isUser && (
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">
            {/* Action buttons like copy, thumbs up/down would go here */}
            <button className="hover:text-foreground">Copy</button>
            <button className="hover:text-foreground">Good</button>
            <button className="hover:text-foreground">Bad</button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <User className="h-5 w-5" />
        </div>
      )}
    </motion.div>
  );
}
