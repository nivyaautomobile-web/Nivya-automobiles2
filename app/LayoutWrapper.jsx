"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ImageKitProvider } from "@imagekit/next";
import { Poppins } from "next/font/google";

const font = Poppins({
  weight: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={`flex flex-col min-h-screen antialiased ${font.className}`}>
      {/* Toast */}
      <Toaster position="top-center" />

      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      >
        {!isAdminRoute && <Navbar />}

        <main className="flex-grow">{children}</main>

        {!isAdminRoute && <Footer />}
      </ImageKitProvider>
    </div>
  );
}
