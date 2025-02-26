import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeFiHub - Tu puerta de entrada a las finanzas descentralizadas",
  description: "Explora servicios DeFi como préstamos, staking y más en nuestra plataforma segura y fácil de usar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}