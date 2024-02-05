import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AmazonTab from "./amazonTab";

export default function AddTabs() {
  return (
    <Tabs
      defaultValue="amazon"
      className="border border-white rounded-lg text-white h-fit"
    >
      <TabsList className="w-full bg-slate-800 text-slate-500 p-6">
        <TabsTrigger
          value="amazon"
          className="data-[state=active]:bg-slate-600"
        >
          Link Amazon
        </TabsTrigger>
        <TabsTrigger
          value="outhers"
          className="data-[state=active]:bg-slate-600"
        >
          Link Geral
        </TabsTrigger>
      </TabsList>
      <TabsContent value="amazon">
        <AmazonTab />
      </TabsContent>
      <TabsContent value="outhers">A ser implementado</TabsContent>
    </Tabs>
  );
}
