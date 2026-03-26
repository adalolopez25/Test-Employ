"use client";

import { useState } from "react";

interface Item {
  name: string;
  description: string;
  src: string;
}

export default function About() {
  const [openSection, setOpenSection] = useState<"info" | "tech" | "db" | null>(
    "info",
  );
  const [modalItem, setModalItem] = useState<Item | null>(null);

  const toggleSection = (section: "info" | "tech" | "db") => {
    setOpenSection(openSection === section ? null : section);
  };

  const technologies: Item[] = [
    {
      name: "Next.js 16",
      description:
        "Framework React moderno con SSR y optimización de imágenes.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/next.webp",
    },
    {
      name: "React 18",
      description: "Librería principal para construir UI reactivas.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/react.webp",
    },
    {
      name: "TypeScript",
      description: "Tipado estático para mayor seguridad en el código.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/ts.webp",
    },
    {
      name: "TailwindCSS v4",
      description: "Framework de utilidades para diseño rápido y responsivo.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/tailwindcss.webp",
    },
    {
      name: "Lucide React",
      description: "Biblioteca de íconos vectoriales.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/lucide.webp",
    },
    {
      name: "Render",
      description: "Plataformas de despliegue y hosting.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/render.webp",
    },
    {
      name: "Glassmorphism UI",
      description: "Estética de interfaz con efectos de vidrio y blur.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/ui.webp",
    },
  ];

  const databases: Item[] = [
    {
      name: "MongoDB",
      description:
        "Base de datos principal para personajes, episodios y favoritos.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/mongo.webp",
    },
    {
      name: "Nextjs API",
      description: "Almacena información de calificaciones y atributos únicos.",
      src: "https://rick-morty.s3.us-east-2.amazonaws.com/Rick-and-Morty/Imagenes/webp/next.webp",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-12 bg-transparent">
      <div className="max-w-300 mx-auto flex flex-col gap-8">
        {/* Botones de secciones */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => toggleSection("info")}
            className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${
              openSection === "info"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/5 text-white hover:bg-blue-600/20"
            }`}
          >
            Información
          </button>
          <button
            onClick={() => toggleSection("tech")}
            className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${
              openSection === "tech"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/5 text-white hover:bg-blue-600/20"
            }`}
          >
            Tecnologías
          </button>
          <button
            onClick={() => toggleSection("db")}
            className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${
              openSection === "db"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/5 text-white hover:bg-blue-600/20"
            }`}
          >
            Base de datos
          </button>
        </div>

        {/* Contenedor de contenido */}
        <div className="relative overflow-hidden transition-all duration-500 h-150">
          {/* Información del proyecto */}
          {/* Información del proyecto */}
          <div
            className={`transition-all duration-500 absolute inset-0 overflow-auto ${
              openSection === "info" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-white/80 space-y-4 h-full">
              <h2 className="text-center text-4xl md:text-6xl font-black italic text-white mb-4">
                Información del Proyecto
              </h2>
              <div className="text-justify text-2xl tracking-wider font-light flex items-center flex-col justify-stretch mt-20">
                <p className="mb-15">
                  El objetivo principal de este proyecto fue refactorizar la
                  aplicación existente, agregando tipado fuerte con TypeScript
                  para mejorar la seguridad y robustez del código.
                </p>
                <p>
                  Además, se organizó la estructura del proyecto de forma
                  escalable, facilitando futuras extensiones y corrigiendo
                  errores previos para lograr un código más limpio y mantenible.
                </p>
                <p>
                  Todo esto se implementa dentro de una interfaz moderna con
                  técnicas de Glassmorphism y un sistema de cuadrícula
                  adaptativo, garantizando consistencia visual y funcional en
                  cualquier dispositivo.
                </p>
              </div>
            </div>
          </div>

          {/* Tecnologías */}
          <div
            className={`transition-all duration-500 absolute inset-0 overflow-auto p-4 ${
              openSection === "tech" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  onClick={() => setModalItem(tech)}
                  className="relative bg-white/5 border border-white/10 rounded-3xl flex flex-col justify-end cursor-pointer overflow-hidden transition-all duration-500 group shadow-lg hover:shadow-2xl"
                  style={{ height: "200px" }} // altura más grande estilo card de película
                >
                  {/* Imagen ocupando todo el contenedor */}
                  <img
                    src={tech.src}
                    alt={tech.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay negro con nombre */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                  <span className="relative z-10 text-white font-bold text-center px-4 py-2 bg-black/50 m-4 rounded-lg">
                    {tech.name}
                  </span>

                  {/* Icono + al hacer hover */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    +
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Base de datos */}
          <div
            className={`transition-all duration-500 relative overflow-hidden flex flex-col gap-6 h-full ${
              openSection === "db" ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {databases.map((db) => (
              <div
                key={db.name}
                onClick={() => setModalItem(db)}
                className="relative w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 group"
                style={{ height: "45%" }} // cada card ocupa casi la mitad del contenedor
              >
                {/* Imagen que se expande */}
                <img
                  src={db.src}
                  alt={db.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Nombre encima de la imagen */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-center bg-black/30 px-4 py-1 rounded">
                  {db.name}
                </span>

                {/* Icono + al hacer hover */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  +
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setModalItem(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl p-8 max-w-lg w-full text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold">{modalItem.name}</h3>
            <p>{modalItem.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 font-bold"
              onClick={() => setModalItem(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
