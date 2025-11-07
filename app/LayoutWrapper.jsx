"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ImageKitProvider } from "@imagekit/next";
import { Poppins, Nunito } from "next/font/google";

const font = Poppins({
  weight: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

// const font = Nunito({
//   variable: "--font-nunito",
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "600", "700", "800"],
//   style: ["normal", "italic"],
// });

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <body
      className={`flex flex-col min-h-screen antialiased ${font.className}`}
    >
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        publicKey={process.env.IMAGEKIT_PUBLIC_KEY}
      >
        {/* Navbar - only show on non-admin routes */}
        {!isAdminRoute && <Navbar />}
        {/* Main content */}
        <main className="flex-grow">{children}</main>
        {/* Footer - only show on non-admin routes */}
        {!isAdminRoute && <Footer />}{" "}
      </ImageKitProvider>
    </body>
  );
}
