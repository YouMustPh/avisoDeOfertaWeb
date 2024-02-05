"use client";

import DynamicOfferCard from "@/components/offersPage/dynamicOfferCard";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OfferPage({ params }: { params: { offerId: string } }) {
  const router = useRouter();

  return (
    <div className="">
      <ArrowLeft
        className="absolute top-4 left-4 text-slate-500 z-10 cursor-pointer"
        size={32}
        onClick={() => router.back()}
      />
      <DynamicOfferCard offerId={params.offerId} />
    </div>
  );
}
