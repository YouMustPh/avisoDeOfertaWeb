import AddTabs from "@/components/admin/listOffer/addTabs";
import ListOffer from "@/components/admin/listOffer/listOffer";

export default function ListOffers() {
  return (
    <div className="flex justify-around w-full">
      <ListOffer />
      <AddTabs />
    </div>
  );
}
