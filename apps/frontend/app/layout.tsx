import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import React from "react";

export const metadata: Metadata = {
  title: "Canvas",
  description: "Create, collaborate and share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
