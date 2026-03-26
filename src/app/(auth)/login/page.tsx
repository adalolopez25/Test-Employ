import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black italic text-blue-500 tracking-tighter uppercase">Bienvenido</h2>
          <p className="text-slate-500 text-[10px] tracking-[0.4em] mt-2 font-black uppercase">Identifícate</p>
        </div>

        <LoginForm />

        <p className="text-center text-slate-500 mt-10 text-[10px] font-bold uppercase tracking-widest">
          ¿Aún no tienes acceso? <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}