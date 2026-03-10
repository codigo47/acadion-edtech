import { ProposedIndex } from './types';

export function CourseIndexView({ index }: { index: ProposedIndex }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 max-w-2xl">
      <div className="text-lg font-semibold text-[#1a1a1a] mb-4">{index.title}</div>
      <div className="space-y-4">
        {index.modules.map((module) => (
          <div key={module.number} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#9F80DA] text-white text-sm font-medium">
                {module.number}
              </span>
              <span className="font-medium text-[#1a1a1a]">{module.title}</span>
            </div>
            <div className="ml-9 space-y-1">
              {module.units.map((unit) => (
                <div
                  key={unit.code}
                  className="flex items-center gap-2 text-sm text-gray-600 py-1 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-[#9F80DA] font-medium">{unit.code}</span>
                  <span>{unit.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
