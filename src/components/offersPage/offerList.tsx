"use client";

import { createOffer, getAllOffers } from "@/app/api/offer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OfferCard from "./offerCard";

export default function OfferList() {
  const queryClient = useQueryClient();

  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["offers"],
    queryFn: getAllOffers,
  });

  const mutation = useMutation({
    mutationFn: createOffer,
    onSuccess: (e) => {
      console.log(e);
      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {data?.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
      {/* <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() => {
          mutation.mutate({
            id: value,
          });
        }}
      >
        Criar
      </Button> */}
    </div>
  );
}
