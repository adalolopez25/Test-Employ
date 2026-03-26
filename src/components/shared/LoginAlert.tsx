"use client";

interface LoginAlertProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const LoginAlert = ({ isOpen, onClose, message }: LoginAlertProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z- flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] max-w-70 w-full text-center shadow-2xl shadow-blue-500/20 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
          <span className="text-blue-500 text-2xl font-bold">!</span>
        </div>
        
        <h3 className="text-white font-black uppercase tracking-tight text-lg mb-2">
          ¡Atención!
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {message || "Para realizar esta acción, primero debes iniciar sesión en tu cuenta."}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};