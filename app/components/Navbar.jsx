"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWalletConnect = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        window.open("https://metamask.io/download/", "_blank");
      }
    } catch (error) {
      console.error("Error al conectar wallet:", error);
    }
  };

  const navLinks = [
    { name: "Inicio", href: "https://www.defipulse.com" },
    { name: "Características", href: "https://ethereum.org/en/defi/" },
    { name: "Token", href: "https://coinmarketcap.com/" },
    { name: "Cómo Funciona", href: "https://docs.uniswap.org/" },
    { name: "Adquirir Token", href: "https://www.binance.com" },
    { name: "Tokenomics", href: "https://messari.io/" },
  ];

  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.7 });

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-blue-600">
              DeFiHub
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onMouseEnter={playHover}
                onClick={playClick}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                playClick();
                handleWalletConnect();
              }}
            >
              Conectar Billetera
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 py-2 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  playClick();
                }}
                onMouseEnter={playHover}
              >
                {link.name}
              </a>
            ))}
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 w-full mt-2"
              onClick={() => {
                playClick();
                handleWalletConnect();
              }}
            >
              Conectar Billetera
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}