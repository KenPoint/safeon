import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // добавили импорт Script
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeOn — Security Camera Installation in Toronto",
  description:
    "SafeOn offers professional security camera installation services in Toronto. Fixed-price packages with warranty. Book your home surveillance today!",
  keywords: [
    "security cameras",
    "video surveillance",
    "camera installation",
    "Toronto security systems",
    "SafeOn",
    "home security",
    "NVR installation",
    "Lorex camera installation",
    "security camera for home",
    "install cameras in Toronto",
    "wired security camera setup",
    "remote camera access Toronto"
  ],
  authors: [{ name: "SafeOn Team", url: "https://safe-on.ca" }],
  creator: "SafeOn",
  metadataBase: new URL("https://safe-on.ca"),
  openGraph: {
    title: "SafeOn — Expert Video Surveillance Installation",
    description:
      "Fixed-price security camera systems installed by professionals in Toronto. From CA$250. Warranty included.",
    url: "https://safe-on.ca",
    siteName: "SafeOn",
    images: [
      {
        url: "https://safe-on.ca/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SafeOn Security Camera Installation",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeOn — Expert Security Installation",
    description:
      "SafeOn provides reliable and affordable camera installation in Toronto. Get peace of mind today.",
    site: "@safeon",
    creator: "@safeon",
    images: ["https://safe-on.ca/og-image.jpg"],
  },
  alternates: {
    canonical: "https://safe-on.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GA4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6M5QLCD11Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6M5QLCD11Q');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
