interface CommandSuggestionsProps {
  suggestions: string[];
  isVisible: boolean;
  onSelect: (suggestion: string) => void;
  position?: 'top' | 'bottom';
}

const CommandSuggestions = ({
  suggestions,
  isVisible,
  onSelect,
  position = 'top'
}: CommandSuggestionsProps) => {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div
      className={`absolute ${
        position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
      } left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50`}
    >
      <div className="max-h-48 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center space-x-2"
            onClick={() => onSelect(suggestion)}
          >
            <span className="text-blue-500">/</span>
            <span>{suggestion.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandSuggestions;
