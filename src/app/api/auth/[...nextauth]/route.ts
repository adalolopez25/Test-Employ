// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"; // Importas los handlers ya configurados
export const { GET, POST } = handlers;