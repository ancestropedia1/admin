import { Geist, Geist_Mono } from "next/font/google";
import ProtectionWrapper from "@/component/ProtectionWrapper";
import "./globals.css";
import LayOutShell from "@/component/initials/LayoutShell";
import StoreProvider from "./storeProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard - Ancestropedia",
  description: "Admin Dashboard for Ancestropedia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          <StoreProvider>
            <LayOutShell>{children}</LayOutShell>
          </StoreProvider>
        
      </body>
    </html>
  );
}
