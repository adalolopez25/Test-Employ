// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { Language } from "@/languages/dictionary";

// interface LangState {
//   lang: Language;
//   setLang: (lang: Language) => void;
//   toggleLang: () => void;
// }

// export const useLangStore = create<LangState>()(
//   persist(
//     (set) => ({
//       lang: "es",
//       setLang: (lang) => set({ lang }),
//       toggleLang: () => set((state) => ({ 
//         lang: state.lang === "es" ? "en" : "es" 
//       })),
//     }),
//     { 
//       name: "animehero-lang", // Nombre de la key en localStorage
//     }
//   )
// );