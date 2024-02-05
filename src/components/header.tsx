import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-transparent">
      <Image alt="logo" src="/logo.svg" width={170} height={170} />
    </div>
  );
}
