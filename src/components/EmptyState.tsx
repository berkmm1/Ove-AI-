import { Code, Edit3, Lightbulb, Terminal } from 'lucide-react';

interface EmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  const suggestions = [
    {
      icon: <Code size={20} className="text-blue-500" />,
      title: 'Write a Python script',
      description: 'to automate renaming multiple files in a directory'
    },
    {
      icon: <Lightbulb size={20} className="text-yellow-500" />,
      title: 'Brainstorm ideas',
      description: 'for a sci-fi novel set on a rogue planet'
    },
    {
      icon: <Edit3 size={20} className="text-green-500" />,
      title: 'Draft an email',
      description: 'requesting a deadline extension for a project'
    },
    {
      icon: <Terminal size={20} className="text-purple-500" />,
      title: 'Explain concepts',
      description: 'like quantum entanglement to a 10-year-old'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4 w-full pt-12 md:pt-24 pb-8">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-8">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/>
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        How can I help you today?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(`${item.title} ${item.description}`)}
            className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all text-left group"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                {item.title}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {item.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
