'use client';

import React from "react";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ onClose, title, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl font-bold hover:text-red-400"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
