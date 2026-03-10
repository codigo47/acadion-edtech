import { ExerciseTypesData } from './types';

export function ExerciseTypesView({ data }: { data: ExerciseTypesData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 max-w-md">
      <div className="flex flex-wrap gap-2">
        {data.exerciseTypes.map((type, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
