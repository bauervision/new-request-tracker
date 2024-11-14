import Image from "next/image";
import Background from "/assets/branding/visionary.png";
export default function Home() {
  return (
    <div>
      <Image src={Background} alt="background" sizes="100vw" />
    </div>
  );
}
