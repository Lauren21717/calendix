import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./../globals.css";
import Header from "@/app/components/Header";

const noto = Noto_Sans({ subsets: ['latin'], weight: ['200', '300', '400', '700', '800'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <main className="container">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}