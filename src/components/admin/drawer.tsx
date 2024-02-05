"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerPortal,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ChevronRightCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { UserRes } from "@/lib/types";
import { clearCookie } from "@/lib/cookies";
import { useEffect, useState } from "react";

export const AdminDrawer = () => {
  const [user, setUser] = useState<UserRes>();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    setUser(user);
  }, []);

  const logout = () => {
    clearCookie("token");
    clearCookie("refreshToken");
    sessionStorage.removeItem("user");
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button className="text-white bg-transparent">
          <ChevronRightCircleIcon />
        </Button>
      </DrawerTrigger>
      <DrawerPortal />
      <DrawerContent
        className="left-0 inset-y-0 w-fit bg-slate-900 rounded-t-none rounded-tr-xl"
        hasPush={false}
      >
        <DrawerHeader>
          <DrawerTitle className="flex w-full items-center flex-col text-center">
            <h1 className="text-slate-700">{user?.name}</h1>
            <Image src="/logo.svg" width={100} height={100} alt="logo" />
          </DrawerTitle>
          <DrawerDescription className="flex flex-col gap-2 text-center">
            <Link
              href="/admin/listOffers"
              className="hover:bg-slate-700 flex flex-col gap-x-2 rounded-lg p-2"
            >
              Lista de Ofertas
            </Link>
            <Separator className="bg-slate-700" />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            className="bg-slate-700 hover:bg-slate-600 text-white"
            onClick={logout}
          >
            Sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
