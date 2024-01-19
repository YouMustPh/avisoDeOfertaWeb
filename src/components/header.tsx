import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-transparent">
      <Image alt="logo" src="/logo.svg" width={200} height={200} />
    </div>
  );
}
