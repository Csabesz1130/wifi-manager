import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WiFi Manager",
    description: "Manage your WiFi networks efficiently",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}

// File: app/layout.tsx
// Purpose: This file defines the root layout for the entire application.
//
// Components:
// - RootLayout: The main layout component that wraps all pages.
//
// Functions:
// - RootLayout:
//   Input: { children: React.ReactNode }
//   Purpose: Wraps the entire application with a common layout, including the font and language settings.
//
// Notable elements:
// - inter: An instance of the Inter font from Google Fonts, used throughout the application.
// - metadata: Defines the default metadata for all pages, including title and description.