'use client';

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface UserSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (userIds: string[]) => void;
  users: User[];
}

export default function UserSelectorModal({ isOpen, onClose, onSelect, users }: UserSelectorModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const query = search.toLowerCase();
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query)
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = () => {
    if (selected.size === 0) return;
    onSelect(Array.from(selected));
    setSelected(new Set());
    setSearch('');
  };

  const handleClose = () => {
    setSelected(new Set());
    setSearch('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Select Users</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#9F80DA] transition-colors"
          />
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">No users found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((user) => {
                const isChecked = selected.has(user.id);
                return (
                  <label
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                      isChecked ? 'bg-[#9F80DA]/5 border border-[#9F80DA]' : 'border border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(user.id)}
                      className="w-4 h-4 accent-[#9F80DA] cursor-pointer flex-shrink-0"
                    />
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#1a1a1a] truncate">{user.name || '---'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {selected.size > 0 ? `${selected.size} selected` : 'No users selected'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSelect}
              disabled={selected.size === 0}
              className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
            >
              {selected.size > 1 ? 'Select All' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
