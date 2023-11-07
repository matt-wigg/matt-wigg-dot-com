import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import HeaderNotification from "@/components/HeaderNotification";
import Player from "@/components/Player/Player";
import { ThemeProvider } from "@/hooks/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Matt Wigg: Software Engineer",
  description:
    "I am a Software Engineer based in San Diego, CA. I specialize in building web applications using React, Node.js, and TypeScript. I am passionate about creating accessible and inclusive experiences for all users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <div className="min-h-screen relative">
            <Player />
            <Navbar />
            <main className="md:pl-52 md:min-h-[120%]">
              <HeaderNotification />
              <div className="container mx-auto px-4">
                {children}
                <Analytics />
              </div>
            </main>
          </div>
          <ThreeBackground />
        </ThemeProvider>
      </body>
    </html>
  );
}
