"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/app/api/user";
import { setCookies } from "@/lib/cookies";
import { toast } from "../ui/use-toast";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const signIn = useMutation({
    mutationFn: auth,
    onSuccess: (e) => {
      const oneDay = 24 * 60 * 60 * 1000;
      const oneMonth = oneDay * 30;
      setCookies("token", e.token, {
        secure: true,
        expires: new Date(Date.now() + oneDay),
      });
      setCookies("refreshToken", e.refreshToken, {
        secure: true,
        expires: new Date(Date.now() + oneMonth),
      });

      sessionStorage.setItem("user", JSON.stringify(e.user));

      toast({
        title: "Login efetuado com sucesso",
      });
    },
    onError: (e: any) => {
      console.log("error", e.response.data.message);
      toast({
        title: e.response.data.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    signIn.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col w-full"
      >
        <div className="flex flex-col gap-4 text-white">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu email"
                    className="text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  );
}
