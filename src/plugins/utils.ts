import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility untuk merge className (Tailwind + kondisi dinamis)
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format tanggal ke bentuk lokal
 * @example formatDate(new Date(), "id-ID") => "20 Agustus 2025"
 */
export function formatDate(date: Date | string, locale: string = "en-US") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Potong teks panjang dengan "..."
 * @example truncateText("Hello World", 5) => "Hello..."
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Kapitalisasi huruf pertama
 * @example capitalize("hello") => "Hello"
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Debounce untuk event handler (misalnya search)
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number
) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

/**
 * Slugify string untuk URL
 * @example slugify("Hello World!") => "hello-world"
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // spasi jadi -
    .replace(/[^\w-]+/g, "") // hapus karakter aneh
    .replace(/--+/g, "-") // hapus duplikat -
    .replace(/^-+/, "") // hapus - di awal
    .replace(/-+$/, ""); // hapus - di akhir
}
