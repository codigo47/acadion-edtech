'use client';

import React from 'react';
import Image from 'next/image';
import { TextStyle, BackgroundStyle } from './types';

export interface ChatParticipant {
  name: string;
  avatar?: string;
}

export interface ChatMessage {
  participantId: 'sender' | 'receiver';
  text: string;
  time?: string;
}

export interface ChatBlockProps {
  messages: ChatMessage[];
  sender: ChatParticipant;
  receiver: ChatParticipant;
  senderBubbleColor?: string;
  receiverBubbleColor?: string;
  senderTextColor?: string;
  receiverTextColor?: string;
  showAvatars?: boolean;
  showNames?: boolean;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
}

export default function ChatBlock({
  messages,
  sender,
  receiver,
  senderBubbleColor = '#9F80DA',
  receiverBubbleColor = '#E5E7EB',
  senderTextColor = '#FFFFFF',
  receiverTextColor = '#1F2937',
  showAvatars = true,
  showNames = true,
  textStyle = {},
  textBackgroundStyle = {},
}: ChatBlockProps) {
  const getParticipant = (id: 'sender' | 'receiver') => {
    return id === 'sender' ? sender : receiver;
  };

  return (
    <div
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || '#F9FAFB',
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="space-y-4 max-w-2xl mx-auto">
        {messages.map((message, index) => {
          const participant = getParticipant(message.participantId);
          const isSender = message.participantId === 'sender';

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {showAvatars && participant.avatar && (
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src={participant.avatar}
                    alt={participant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              {showAvatars && !participant.avatar && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-600">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                {showNames && (
                  <span className="text-xs text-gray-500 mb-1 px-2">
                    {participant.name}
                  </span>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    isSender ? 'rounded-br-sm' : 'rounded-bl-sm'
                  }`}
                  style={{
                    backgroundColor: isSender ? senderBubbleColor : receiverBubbleColor,
                    color: isSender ? senderTextColor : receiverTextColor,
                  }}
                >
                  <p
                    style={{
                      fontSize: textStyle.fontSize || '14px',
                      fontWeight: textStyle.fontWeight,
                      fontStyle: textStyle.fontStyle,
                      lineHeight: textStyle.lineHeight || '1.4',
                    }}
                  >
                    {message.text}
                  </p>
                </div>
                {message.time && (
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {message.time}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
