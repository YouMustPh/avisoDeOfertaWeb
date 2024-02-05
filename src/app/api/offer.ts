import { OfferReq, OfferRes } from "@/lib/types";
import api from "./api";

export const getAllOffers = async (): Promise<OfferRes[]> => {
  const response = await api.get("/offer");
  return response.data;
};

export const createOffer = async (data: OfferReq): Promise<OfferRes> => {
  const response = await api.post("/offer", data);
  return response.data;
};

export const deleteOffer = async (id: string): Promise<void> => {
  await api.delete(`/offer/${id}`);
};
