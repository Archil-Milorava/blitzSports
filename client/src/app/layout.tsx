import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarMain from "@/features/navbar/NavbarMain";
import Footer from "@/features/footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/state/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blitz Sports",
  description: "Sport News on Blitz Sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider
        clientId={
          "307096408214-ofhvm2ic332to511seao0q3np5k6ek37.apps.googleusercontent.com"
        }
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col bg-[#D9D9D9]`}
        >
          <Providers>
            <>
          <Analytics />
          <NavbarMain />
          <main className="">
          {children}
          </main>
          <Footer />
            </>
          </Providers>
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
