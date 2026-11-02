import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="font-mono text-sm tracking-widest text-gray-500 mb-4">
        ERROR_CODE // 404
      </p>
      <h1 className="text-5xl md:text-7xl font-black mb-4">PAGE NOT FOUND</h1>
      <p className="max-w-md text-gray-400 mb-8">
        The coordinates you navigated to do not exist or have been relocated.
      </p>
      <Link
        href="/"
        className="rounded-full bg-white px-8 py-3 text-black font-medium transition-all hover:bg-neutral-200"
      >
        Return to Home
      </Link>
    </main>
  );
}
