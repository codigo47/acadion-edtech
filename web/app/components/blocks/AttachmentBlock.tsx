'use client';

import React from 'react';
import { FileText, Download, File, FileImage, FileVideo, FileAudio, FileArchive, FileSpreadsheet, FileCode } from 'lucide-react';
import { TextStyle } from './types';

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size?: string;
  type?: string;
}

export interface AttachmentBlockProps {
  attachments: Attachment[];
  textStyle?: TextStyle;
  dark?: boolean;
}

const getFileIcon = (name: string, type?: string) => {
  const extension = name.split('.').pop()?.toLowerCase();

  // Check by type first
  if (type?.startsWith('image/')) return FileImage;
  if (type?.startsWith('video/')) return FileVideo;
  if (type?.startsWith('audio/')) return FileAudio;

  // Check by extension
  switch (extension) {
    case 'pdf':
      return FileText;
    case 'doc':
    case 'docx':
      return FileText;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return FileSpreadsheet;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return FileImage;
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'webm':
      return FileVideo;
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return FileAudio;
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return FileArchive;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
    case 'json':
    case 'py':
    case 'java':
    case 'cpp':
    case 'c':
      return FileCode;
    default:
      return File;
  }
};

const getFileColor = (name: string) => {
  const extension = name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return '#EF4444'; // red
    case 'doc':
    case 'docx':
      return '#3B82F6'; // blue
    case 'xls':
    case 'xlsx':
    case 'csv':
      return '#22C55E'; // green
    case 'ppt':
    case 'pptx':
      return '#F97316'; // orange
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return '#8B5CF6'; // purple
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'webm':
      return '#EC4899'; // pink
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return '#14B8A6'; // teal
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return '#F59E0B'; // amber
    default:
      return '#6B7280'; // gray
  }
};

export default function AttachmentBlock({
  attachments,
  textStyle = {},
  dark = false,
}: AttachmentBlockProps) {
  const handleDownload = (attachment: Attachment) => {
    window.open(attachment.url, '_blank');
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="space-y-3">
        {attachments.map((attachment) => {
          const IconComponent = getFileIcon(attachment.name, attachment.type);
          const iconColor = getFileColor(attachment.name);

          return (
            <div
              key={attachment.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                dark
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleDownload(attachment)}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${iconColor}20` }}
              >
                <IconComponent className="w-6 h-6" style={{ color: iconColor }} />
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium truncate ${dark ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
                  }}
                >
                  {attachment.name}
                </p>
                {attachment.size && (
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {attachment.size}
                  </p>
                )}
              </div>

              {/* Download Button */}
              <button
                className={`p-2 rounded-full transition-colors ${
                  dark
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(attachment);
                }}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
