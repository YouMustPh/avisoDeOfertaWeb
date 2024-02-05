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

export type UserRes = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthRes = {
  token: string;
  refreshToken: string;
  user: UserRes;
};

export type AuthReq = {
  email: string;
  password: string;
};
