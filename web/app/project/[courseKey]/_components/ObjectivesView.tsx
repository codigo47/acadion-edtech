import { ObjectivesData } from './types';

const bloomColors: Record<string, { bg: string; border: string; text: string }> = {
  Remember: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  Understand: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  Apply: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
  Analyze: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  Evaluate: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  Create: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
};

export function ObjectivesView({ objectives }: { objectives: ObjectivesData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 max-w-2xl">
      <div className="space-y-3">
        {objectives.items.map((item, index) => {
          const colors = bloomColors[item.title] || { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' };
          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-3`}
            >
              <div className="flex items-start gap-3">
                <span className={`${colors.text} font-semibold text-sm whitespace-nowrap`}>
                  {item.title}
                </span>
                <span className="text-gray-700 text-sm">{item.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
