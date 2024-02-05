"use client";

import { getAllOffers } from "@/app/api/offer";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { offerColumns } from "./columns";

export default function ListOffer() {
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
    <div>
      <DataTable columns={offerColumns} data={data ? data : []} />
    </div>
  );
}
