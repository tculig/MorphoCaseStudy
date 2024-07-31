import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../infra/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Morpho Case Study",
  description: "Developing a Vault withdrawal app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
