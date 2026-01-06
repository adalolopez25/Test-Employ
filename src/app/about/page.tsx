'use client';

import Container from "@/components/layout/header/Container";

export default function About() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen bg-slate-900 py-16">
      {/* Card con contenido */}
      <div className="bg-slate-800 rounded-2xl shadow-xl max-w-6xl w-full p-10 flex flex-col gap-8">
        {/* Título principal */}
        <h1 className="text-5xl font-extrabold text-white text-center">
          About this project
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          Este proyecto está construido con{" "}
          <span className="font-semibold text-white">Next.js</span> y{" "}
          <span className="font-semibold text-white">Tailwind CSS</span>.  
          Consume la{" "}
          <span className="font-semibold text-white">API de Rick and Morty</span> 
          para mostrar información detallada de los personajes, incluyendo su estado, especie, tipo y foto.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
          El objetivo es practicar la integración de APIs, manejo de estados con React Hooks, y construcción de componentes reutilizables como{" "}
          <span className="font-semibold text-white">Cards</span> para cada personaje.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
          Además, incluye una interfaz moderna y responsive con navbar, contenedores centrados y un sistema de loading elegante, ofreciendo una experiencia de usuario profesional.
        </p>

        {/* Link a la API oficial */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            API oficial de Rick and Morty:{" "}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 font-medium hover:underline"
            >
              rickandmortyapi.com
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
}
