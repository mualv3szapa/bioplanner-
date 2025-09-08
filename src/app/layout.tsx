// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Supondo que você tenha este arquivo

export const metadata: Metadata = {
  title: "Teste de Layout",
  description: "Testando se o layout está quebrando a aplicação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <h1>Layout Mínimo</h1>
        {children}
      </body>
    </html>
  );
}
