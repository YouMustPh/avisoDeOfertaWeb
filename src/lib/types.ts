export type OfferRes = {
  id: string;
  title: string;
  price: number;
  image: string;
  savingAmount: number;
  savingPercent: number;
  url: string;

  createdAt?: string;
  updatedAt?: string;
};

export type OfferReq = {
  id: string;
};
