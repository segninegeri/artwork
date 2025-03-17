import type React from "react";
import "@/app/globals.css";
import GalleryMount from "./gallery-mount";

export const metadata = {
  title: "Art Gallery",
  description: "Experience fine art in an immersive digital gallery",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ fontFamily: "'EagleHorizon', sans-serif" }}>
      <body>
        {children}
        <GalleryMount />
      </body>
    </html>
  );
}
