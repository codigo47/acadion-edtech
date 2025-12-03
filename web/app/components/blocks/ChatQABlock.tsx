'use client';

import React from 'react';
import Chat, { ChatMessageData, ChatParticipant } from './Chat';
import { TextStyle, BackgroundStyle } from './types';

export interface ChatQABlockProps {
  messages: ChatMessageData[];
  sender: ChatParticipant;
  receiver: ChatParticipant;
  senderBubbleColor?: string;
  receiverBubbleColor?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function ChatQABlock({
  messages,
  sender,
  receiver,
  senderBubbleColor = '#9F80DA',
  receiverBubbleColor,
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: ChatQABlockProps) {
  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <Chat
        messages={messages}
        sender={sender}
        receiver={receiver}
        senderBubbleColor={senderBubbleColor}
        receiverBubbleColor={receiverBubbleColor || (dark ? '#374151' : '#E5E7EB')}
        showAvatars={false}
        showNames={true}
        showTime={false}
        textStyle={textStyle}
        dark={dark}
      />
    </div>
  );
}
