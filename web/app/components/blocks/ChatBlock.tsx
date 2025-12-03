'use client';

import React from 'react';
import ChatFeedbackBlock, { ChatFeedbackBlockProps } from './ChatFeedbackBlock';

export interface ChatBlockProps extends ChatFeedbackBlockProps {}

export default function ChatBlock(props: ChatBlockProps) {
  return <ChatFeedbackBlock {...props} />;
}
