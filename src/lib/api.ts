import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ Default to Flask backend if env is missing
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Generic API request function
export async function apiRequest(
  endpoint: string,
  method = "GET",
  body?: any
) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = null;

  try {
    // Safely parse JSON only if available
    const text = await res.text();
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    console.error("Response is not valid JSON:", err);
  }

  if (!res.ok) {
    throw new Error(
      data?.error || data?.message || res.statusText || "Something went wrong"
    );
  }

  return data;
}
