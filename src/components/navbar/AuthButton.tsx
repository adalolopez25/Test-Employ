interface Props {
  onClick: () => void;
}

export default function AuthButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden group px-10 py-3 rounded-full border border-blue-600/30 text-white font-black italic uppercase text-xs tracking-[0.2em]"
    >
      <span className="relative z-10">Iniciar Sesión</span>

      <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
    </button>
  );
}