'use client';

import NavMenu from "@/components/layout/ui/NavBar";
import Container from "./Container";

export default function Header() {
  return (
    <header>
      <Container>
        <NavMenu />
      </Container>
    </header>
  );
}
