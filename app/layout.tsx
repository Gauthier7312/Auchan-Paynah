import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import {
  SanaSansAltMedium,
  SanaSansAltHeavy,
  SanaSansAltBold,
  SanaSansAltBlack,
  SanaSansAltItalic,
  SanaSansAltMediumItalic,
} from "../lib/fonts";

export const metadata: Metadata = {
  title: "Auchan",
  description: "Auchan - Paynah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SanaSansAltMedium.variable} ${SanaSansAltHeavy.variable} ${SanaSansAltBold.variable} ${SanaSansAltBlack.variable} ${SanaSansAltItalic.variable} ${SanaSansAltMediumItalic.variable} antialiased`}
      >
        <NuqsAdapter>
          <Toaster position="bottom-right" />
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
