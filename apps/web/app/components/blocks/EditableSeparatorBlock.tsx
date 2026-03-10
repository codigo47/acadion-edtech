'use client';

export function EditableSeparatorBlock({ content }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const showLine = content.showLine !== false;
  const showNumber = content.showNumber === true;
  const lineColor = (content.lineColor as string) || '#d1d5db';
  const numberColor = (content.numberColor as string) || '#FFFFFF';
  const thickness = (content.thickness as string) || 'thin';

  const thicknessMap: Record<string, string> = { thin: '1px', medium: '2px', thick: '4px' };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="py-4">
        {showLine ? (
          <div className="flex items-center gap-3">
            <div className="flex-1" style={{ borderTop: `${thicknessMap[thickness]} solid ${lineColor}` }} />
            {showNumber && (
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: lineColor, color: numberColor }}>1</span>
            )}
            {showNumber && <div className="flex-1" style={{ borderTop: `${thicknessMap[thickness]} solid ${lineColor}` }} />}
          </div>
        ) : (
          <div className="h-8 border border-dashed border-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-400">Spacer</span>
          </div>
        )}
      </div>
    </div>
  );
}
