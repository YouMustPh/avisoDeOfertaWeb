"use client";

import { OfferRes } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOffer } from "@/app/api/offer";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

export const offerColumns: ColumnDef<OfferRes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "image",
    header: "Imagem",
    cell: ({ row }) => (
      <Image
        src={row.getValue("image")}
        alt={row.getValue("title")}
        width={50}
        height={50}
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price = (row.getValue("price") as number) / 100;

      const formattedPrice = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return <span>{formattedPrice}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = format(new Date(row.getValue("createdAt")), "dd/MM/yyyy");
      return <span>{date}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const offer = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient();

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const mutation = useMutation({
        mutationFn: deleteOffer,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["offers"],
          });
          toast({
            title: "Oferta excluída",
          });
        },
        onError: (e) => {
          console.log("error", e);
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black text-slate-500">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(offer.url)}
            >
              Copiar URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2 text-red-500"
              onClick={() => mutation.mutate(offer.id)}
            >
              <Trash2 className="h-5" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
