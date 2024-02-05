"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createOffer } from "../api/offer";
import { Label } from "@/components/ui/label";
import LoginPage from "@/components/admin/loginPage";
import { clearCookie } from "@/lib/cookies";

export default function AdminPage() {
  const [value, setValue] = useState("");

  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: createOffer,
  //   onSuccess: (e) => {
  //     console.log(e);
  //     queryClient.invalidateQueries({
  //       queryKey: ["offers"],
  //     });
  //   },
  //   onError: (e) => {
  //     console.log("error", e);
  //   },
  // });

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
      // onClick={() => {
      //   mutation.mutate({
      //     id: value,
      //   });
      // }}
      >
        Criar
      </Button>
      <Button
        onClick={() => {
          clearCookie("token");
          clearCookie("refreshToken");
          sessionStorage.removeItem("user");
        }}
      >
        Sair
      </Button>
    </div>
  );
}
