import { OfferRes } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OfferCardProps = {
  offer: OfferRes;
};

export default function OfferCard({ offer }: OfferCardProps) {
  const savingAmount = offer.savingAmount / 100;
  const price = offer.price / 100;
  const totalPrice = price + savingAmount;

  const totalText = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const priceText = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="bg-[#F9EBE0] p-10 rounded-lg gap-4 flex flex-col relative">
      <span className="bg-red-600 text-white absolute -right-7 top-0 z-10 p-1 font-bold rotate-45 rounded-lg text-xl px-4">
        {offer.savingPercent}%
      </span>
      <Image
        alt={offer.title}
        src={offer.image}
        width={200}
        height={200}
        className="rounded-md"
      />
      <div>
        <h1 className="font-semibold text-center">{offer.title}</h1>
        <p className="line-through m-0 text-center">{totalText}</p>
        <p className="m-0 text-center font-bold text-3xl">{priceText}</p>
      </div>
      <Link
        href={offer.url}
        className="flex items-center justify-center gap-2 bg-amber-200 rounded-lg p-3"
        target="_blank"
      >
        Comprar agora <ExternalLink />
      </Link>
    </div>
  );
}
