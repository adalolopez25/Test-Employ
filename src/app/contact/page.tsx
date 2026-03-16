"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Mensaje enviado con éxito!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8" data-aos="fade-right">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-4">
              CONTÁCTANOS
            </h1>
            <p className="text-blue-300 text-lg max-w-md">
              ¿Tienes alguna duda sobre el multiverso de rick and morty? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfo 
              icon={<Mail className="text-blue-400" />} 
              title="Email" 
              detail="soporte@animehero.com" 
            />
            <ContactInfo 
              icon={<MapPin className="text-blue-400" />} 
              title="Ubicación" 
              detail="Barranquilla, Colombia" 
            />
            <ContactInfo 
              icon={<Phone className="text-blue-400" />} 
              title="Teléfono" 
              detail="+57 (300) 000-000" 
            />
          </div>

          <div className="flex gap-4 pt-4">
            <SocialIcon icon={<Github />} href="#" />
            <SocialIcon icon={<Linkedin />} href="#" />
          </div>
        </div>

        <div 
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
          data-aos="fade-left"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">Nombre</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">Email</label>
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-slate-400 tracking-widest">Mensaje</label>
              <textarea 
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group"
            >
              Enviar Mensaje
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};


const ContactInfo = ({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{title}</p>
      <p className="text-white font-medium">{detail}</p>
    </div>
  </div>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a 
    href={href} 
    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
  >
    {icon}
  </a>
);

export default ContactPage;