import { AuthReq, AuthRes } from "@/lib/types";
import api from "./api";

export const auth = async ({ email, password }: AuthReq): Promise<AuthRes> => {
  const response = await api.post("/auth", {
    email,
    password,
  });

  return response.data;
};
