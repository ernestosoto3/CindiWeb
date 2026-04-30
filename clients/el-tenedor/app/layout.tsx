import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Tenedor — Restaurante Fine Dining · Juncos, Puerto Rico",
  description:
    "Desde 1974, un ícono gastronómico de Juncos. Carnes a la parrilla, mariscos frescos y una atmósfera única dentro de una antigua destilería de ron familiar. 19 premios Mesones Gastronómicos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Raleway:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}