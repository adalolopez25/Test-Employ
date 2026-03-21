"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const ContactPage = () => {
  // Tipado actualizado y específico para evitar el aviso de deprecación/ambigüedad
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Aquí podrías usar FormData para obtener los valores de forma moderna
    const formData = new FormData(e.currentTarget);
    console.log("Enviando datos de:", formData.get("nombre"));
    
    alert("¡Registro dimensional enviado con éxito!");
  };

  return (
    <section className="w-full px-4 md:px-8 py-24 bg-transparent">
      {/* max-w-[1400px] para alineación perfecta con el resto de la App */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Info de contacto (Izquierda) */}
        <div className="space-y-10" data-aos="fade-right">
          <div className="pl-6 border-l-4 border-blue-600">
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">
              Canales de Enlace
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
              CONTÁC<span className="text-blue-600">TANOS</span>
            </h1>
            <p className="text-white/50 text-lg max-w-md mt-6 italic">
              ¿Tienes alguna duda sobre el multiverso? Establece una conexión con nuestra terminal de soporte.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfo 
              icon={<Mail className="text-blue-400" size={20} />} 
              title="Transmisión Email" 
              detail="soporte@animehero.com" 
            />
            <ContactInfo 
              icon={<MapPin className="text-blue-400" size={20} />} 
              title="Coordenadas" 
              detail="Barranquilla, Colombia" 
            />
            <ContactInfo 
              icon={<Phone className="text-blue-400" size={20} />} 
              title="Línea de Enlace" 
              detail="+57 (300) 000-000" 
            />
          </div>

          <div className="flex gap-4 pt-4">
            <SocialIcon icon={<Github size={20} />} href="#" />
            <SocialIcon icon={<Linkedin size={20} />} href="#" />
          </div>
        </div>

        {/* Formulario Estilo Glassmorphism (Derecha) */}
        <div 
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[3.5rem] shadow-[0_0_80px_rgba(37,99,235,0.1)]"
          data-aos="fade-left"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-blue-500 tracking-[0.2em] ml-2">Nombre</label>
                <input 
                  name="nombre"
                  type="text" 
                  required
                  placeholder="Rick Sanchez"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all italic font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-blue-500 tracking-[0.2em] ml-2">Email</label>
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="c-137@citadel.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all italic font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black text-blue-500 tracking-[0.2em] ml-2">Mensaje</label>
              <textarea 
                name="mensaje"
                rows={4}
                required
                placeholder="Escribe tu reporte interdimensional..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none italic font-medium"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-tighter py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-[0.98]"
            >
              Enviar Mensaje
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

// Componentes internos (Sub-componentes)
const ContactInfo = ({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) => (
  <div className="flex items-center gap-5 group">
    <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-600/20 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest">{title}</p>
      <p className="text-white font-bold italic text-lg">{detail}</p>
    </div>
  </div>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a 
    href={href} 
    className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-xl active:scale-90"
  >
    {icon}
  </a>
);

export default ContactPage;