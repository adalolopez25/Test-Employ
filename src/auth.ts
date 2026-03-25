// src/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Esto permite que Google nos dé el perfil completo
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user", // Asignamos rol por defecto
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      // Inyectamos el ID y el ROL en la sesión para que tu Front lo use
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role || "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirige a tu página personalizada de login
  },
});