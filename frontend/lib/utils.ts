import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToSentenceCase(input: string): string {
  return input
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (char) => char.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const decodeJWT = (token: string): { exp?: number } => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return {};

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
    );

    return { exp: payload.exp };
  } catch {
    return {};
  }
};

export const getCookieExpiryDate = (exp?: number): Date | undefined => {
  if (!exp || Number.isNaN(exp)) {
    return undefined;
  }

  const expiryDate = new Date(exp * 1000);
  if (Number.isNaN(expiryDate.getTime())) {
    return undefined;
  }

  return expiryDate;
};
export const toDate = (value: unknown): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? undefined : value;
  }

  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }
  if (typeof value === "number") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  }

  return undefined;
};
