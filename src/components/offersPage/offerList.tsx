"use client";

import { getAllOffers } from "@/app/api/offer";
import { useQuery } from "@tanstack/react-query";
import OfferCard from "./offerCard";
import { Loader2 } from "lucide-react";

export default function OfferList() {
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["offers"],
    queryFn: getAllOffers,
  });

  if (isPending)
    return (
      <div className="h-16">
        <Loader2 className="animate-spin w-full h-full text-white" />
      </div>
    );

  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {data?.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
    </div>
  );
}
