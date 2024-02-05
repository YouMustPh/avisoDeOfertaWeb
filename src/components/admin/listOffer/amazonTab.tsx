"use client";

import { createOffer } from "@/app/api/offer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { AmazonLinkSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AmazonTab() {
  const form = useForm<z.infer<typeof AmazonLinkSchema>>({
    resolver: zodResolver(AmazonLinkSchema),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createOffer,
    onSuccess: (e) => {
      queryClient.invalidateQueries({
        queryKey: ["offers"],
      });

      toast({
        title: "Oferta adicionada com sucesso",
      });
    },
    onError: (e) => {
      console.log("error", e);
      toast({
        title: "Erro ao adicionar oferta",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof AmazonLinkSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 flex flex-col w-full text-center p-4 ${
          mutation.isPending ? "pointer-events-none" : ""
        }`}
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link de afiliado</FormLabel>
              <FormControl>
                <Textarea
                  className="text-black"
                  placeholder="Cole o link aqui"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`flex gap-2`}
          disabled={mutation.isPending}
        >
          <Loader2
            className={`animate-spin w-6 h-6 ${
              mutation.isPending ? "block" : "hidden"
            }`}
          />
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
