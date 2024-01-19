
import OfferList from "@/components/offersPage/offerList";
import { Input } from "@/components/ui/input";
import Image from "next/image";


export default async function Home() {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <OfferList />
    </main>
  );
}
