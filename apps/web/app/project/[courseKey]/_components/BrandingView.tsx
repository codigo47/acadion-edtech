import { BrandingData } from './types';

export function BrandingView({ branding }: { branding: BrandingData }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 max-w-md">
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Primary Color:</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md border border-gray-300"
              style={{ backgroundColor: branding.primaryColor }}
            />
            <span className="text-gray-800 font-mono">{branding.primaryColor}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">Secondary Color:</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md border border-gray-300"
              style={{ backgroundColor: branding.secondaryColor }}
            />
            <span className="text-gray-800 font-mono">{branding.secondaryColor}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Typography 1:</span>
          <span className="text-gray-800">{branding.typo1}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Typography 2:</span>
          <span className="text-gray-800">{branding.typo2}</span>
        </div>
        {branding.logo && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Logo:</span>
            <span className="text-gray-800">{branding.logo}</span>
          </div>
        )}
        {branding.guidelines && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Guidelines:</span>
            <span className="text-gray-800">{branding.guidelines}</span>
          </div>
        )}
      </div>
    </div>
  );
}
