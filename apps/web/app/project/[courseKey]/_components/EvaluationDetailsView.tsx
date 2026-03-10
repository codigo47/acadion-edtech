import { EvaluationDetailsData } from './types';

export function EvaluationDetailsView({ details }: { details: EvaluationDetailsData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 max-w-md">
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Knowledge check at end of unit:</span>
          <span className={details.knowledgeCheckEndUnit ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {details.knowledgeCheckEndUnit ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Knowledge check at end of module:</span>
          <span className={details.knowledgeCheckEndModule ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {details.knowledgeCheckEndModule ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Final exercise:</span>
          <span className={details.finalExercise ? 'text-green-600 font-medium' : 'text-gray-400'}>
            {details.finalExercise ? 'Yes' : 'No'}
          </span>
        </div>
        {details.restrictions && (
          <div className="pt-2 border-t border-gray-100">
            <span className="text-gray-600">Restrictions: </span>
            <span className="text-gray-800">{details.restrictions}</span>
          </div>
        )}
      </div>
    </div>
  );
}
