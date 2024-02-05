"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookies = (
  name: string,
  value: string,
  options?: Partial<ResponseCookie>
) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, options);
};

export const clearCookie = (name: string) => {
  const cookieStore = cookies();
  cookieStore.delete(name);
};
