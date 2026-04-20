import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { APP_COLOR, APP_META } from "@/constants";
import { cn } from "lib/utils";
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = APP_META;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn("font-sans", figtree.variable)}
    >
      <body suppressHydrationWarning>
        <NextTopLoader
          color={APP_COLOR}
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          easing="ease"
          speed={200}
          zIndex={1600}
        />
        <ThemeProvider>
          <NuqsAdapter>
            <TanStackQueryProvider>{children}</TanStackQueryProvider>
          </NuqsAdapter>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
