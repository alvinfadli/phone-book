import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SelectedContactProvider } from "@/context/selectedContactContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phone Book",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full sm:w-9/12 md:w-8/12 lg:w-6/12 px-5 mx-auto">
          <Navbar />
          <Toaster position="top-center" />
          <SelectedContactProvider>{children}</SelectedContactProvider>
          <div id="modal-root"></div>
        </div>
      </body>
    </html>
  );
}
