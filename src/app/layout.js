import TheNavbar from "@/components/layout/TheNavbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Your best curly friend",
  description: "Send curls and show the results on your status page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex h-screen text-sm`}>
        <TheNavbar />
        {children}
      </body>
    </html>
  );
}
