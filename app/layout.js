import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import Footer from "../components/Footer";
import { LoaderProvider } from "./context/LoaderContext"; // 👈 import LoaderProvider

export const metadata = {
  title: "AlaCarte Publishing",
  description: "Professional Book Publishing Services",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.className} ${inter.className}`}>
      <body>
        {/* 👇 Wrap the entire app with LoaderProvider */}
        <LoaderProvider>
          <ClientLayout>
            {children}
            <Footer />
          </ClientLayout>
        </LoaderProvider>
      </body>
    </html>
  );
}