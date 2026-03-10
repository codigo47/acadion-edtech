'use client';

import { useState } from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'default' | 'danger' | 'primary';
}

const VARIANT_CLASSES: Record<string, string> = {
  default: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
  danger: 'text-red-500 hover:text-red-700 hover:bg-red-50',
  primary: 'text-[#9F80DA] hover:text-[#8A6BC5] hover:bg-[#9F80DA]/10',
};

export default function IconButton({ icon, tooltip, onClick, variant = 'default' }: IconButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-1.5 rounded-lg transition-colors ${VARIANT_CLASSES[variant]}`}
      >
        {icon}
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap pointer-events-none">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  );
}
