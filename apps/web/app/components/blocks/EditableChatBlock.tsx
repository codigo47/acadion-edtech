'use client';

import { useState, useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function isChatBlock(name: string): boolean {
  return ['ChatBlock', 'ChatFeedbackBlock', 'ChatQABlock'].includes(name);
}

export function EditableChatBlock({ content, onDataChange, componentName }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; componentName: string }) {
  const messages = (content.messages as Array<{ participantId: string; text: string }>) || [];
  const sender = (content.sender as { name: string; avatar?: string }) || { name: '' };
  const receiver = (content.receiver as { name: string; avatar?: string }) || { name: '' };
  const isQAVariant = componentName === 'ChatQABlock';
  const variantLabel = componentName === 'ChatQABlock' ? 'Q&A Chat (no avatars, names only)' : componentName === 'ChatFeedbackBlock' ? 'Feedback Chat (avatars, names, timestamps)' : 'Chat (avatars, names, timestamps)';
  const [showAvatarPicker, setShowAvatarPicker] = useState<'sender' | 'receiver' | null>(null);

  const updateMessage = useCallback((idx: number, field: string, value: string) => {
    const n = [...messages]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, messages: n });
  }, [messages, content, onDataChange]);

  const toggleParticipant = (idx: number) => {
    const n = [...messages]; n[idx] = { ...n[idx], participantId: messages[idx].participantId === 'sender' ? 'receiver' : 'sender' };
    onDataChange({ ...content, messages: n });
  };

  const addMessage = () => {
    const last = messages.length > 0 ? messages[messages.length - 1].participantId : 'sender';
    onDataChange({ ...content, messages: [...messages, { participantId: last === 'sender' ? 'receiver' : 'sender', text: '' }] });
  };

  const removeMessage = (idx: number) => { onDataChange({ ...content, messages: messages.filter((_, i) => i !== idx) }); };

  return (
    <div className="w-full p-4 rounded-lg space-y-4" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="mb-3 px-3 py-1.5 bg-white border border-gray-200 rounded-lg flex items-center gap-2">
        <span className="text-xs font-medium text-gray-400">Variant:</span>
        <span className="text-xs font-semibold text-[#9F80DA]">{variantLabel}</span>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-500">Sender</label>
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full shrink-0 cursor-pointer relative group/avatar overflow-hidden border-2 border-gray-200 hover:border-[#9F80DA] transition-colors"
              onClick={() => setShowAvatarPicker('sender')}
            >
              {sender.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sender.avatar} alt={sender.name || 'Sender'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-300 flex items-center justify-center text-xs text-white font-bold">{(sender.name || 'S')[0].toUpperCase()}</div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
              <EditableText value={sender.name} onChange={(v) => onDataChange({ ...content, sender: { ...sender, name: v } })} tag="span" className="text-sm" placeholder="Sender name..." multiline={false} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-500">Receiver</label>
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full shrink-0 cursor-pointer relative group/avatar overflow-hidden border-2 border-gray-200 hover:border-[#9F80DA] transition-colors"
              onClick={() => setShowAvatarPicker('receiver')}
            >
              {receiver.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={receiver.avatar} alt={receiver.name || 'Receiver'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-green-300 flex items-center justify-center text-xs text-white font-bold">{(receiver.name || 'R')[0].toUpperCase()}</div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
              <EditableText value={receiver.name} onChange={(v) => onDataChange({ ...content, receiver: { ...receiver, name: v } })} tag="span" className="text-sm" placeholder="Receiver name..." multiline={false} />
            </div>
          </div>
        </div>
      </div>
      {messages.map((msg, idx) => {
        const isSender = msg.participantId === 'sender';
        const participant = isSender ? sender : receiver;
        const avatarBg = isSender ? 'bg-gray-300' : 'bg-gray-300';
        return (
          <div key={idx} className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'} group/msg`}>
            {!isQAVariant && (
              <div
                className="w-8 h-8 rounded-full shrink-0 cursor-pointer relative group/avatar overflow-hidden"
                onClick={() => setShowAvatarPicker(isSender ? 'sender' : 'receiver')}
              >
                {participant.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={participant.avatar} alt={participant.name || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full ${avatarBg} flex items-center justify-center text-xs font-semibold text-gray-600`}>{(participant.name || (isSender ? 'S' : 'R'))[0].toUpperCase()}</div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            <div className={`flex flex-col max-w-[70%] ${isSender ? 'items-end' : 'items-start'}`}>
              <button onClick={() => toggleParticipant(idx)} className="text-xs font-medium text-gray-500 mb-1 px-2 hover:text-[#9F80DA]">{participant.name || (isSender ? 'Sender' : 'Receiver')} &#8596;</button>
              <div
                className={`px-4 py-2 rounded-2xl ${isSender ? 'rounded-br-sm' : 'rounded-bl-sm'} cursor-text`}
                style={{ backgroundColor: isSender ? '#9F80DA' : '#E5E7EB', color: isSender ? '#FFFFFF' : '#1F2937' }}
              >
                <EditableText value={msg.text} onChange={(v) => updateMessage(idx, 'text', v)} tag="p" className="text-sm" style={{ color: isSender ? '#ffffff' : '#1F2937', lineHeight: '1.4' }} placeholder="Message text..." />
              </div>
              {!isQAVariant && <span className="text-[10px] text-gray-400 mt-1 px-2 block">timestamp shown in preview</span>}
              <button onClick={() => removeMessage(idx)} className="text-xs text-gray-400 hover:text-red-500 mt-1 px-2">Remove</button>
            </div>
          </div>
        );
      })}
      <div onClick={addMessage} className="max-w-[80%] p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New message...</div>
      {showAvatarPicker && (
        <ImagePickerModal
          currentUrl={String(showAvatarPicker === 'sender' ? sender.avatar || '' : receiver.avatar || '')}
          onSelect={(url) => {
            const participant = showAvatarPicker === 'sender' ? sender : receiver;
            onDataChange({ ...content, [showAvatarPicker]: { ...participant, avatar: url } });
            setShowAvatarPicker(null);
          }}
          onClose={() => setShowAvatarPicker(null)}
        />
      )}
    </div>
  );
}
