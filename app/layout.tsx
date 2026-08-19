import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const noto = Noto_Sans_SC({ subsets: ["latin"], variable: "--font-noto" });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "我们为什么会遇见｜七夕限定双人关系实验";
  const description = "世界上有这么多人，我们刚好活在认识彼此的这一种。";
  return {
    title, description,
    openGraph: { title, description, type: "website", images: [{ url: image, width: 1733, height: 909, alt: "两条星轨在七夕夜空相遇" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, viewportFit: "cover", themeColor: "#151633" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN"><body className={noto.variable}>{children}</body></html>
  );
}
