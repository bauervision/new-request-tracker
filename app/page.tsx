"use client";

import Image from "next/image";
import Background from "/assets/branding/visionary.png";
import { clearLinkClicks, getFrequentLinks } from "./utils/trackLinkClicks";
import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState<string[]>([]);
  useEffect(() => {
    clearLinkClicks(); // Clear the link clicks when the component mounts
    setLinks(getFrequentLinks());
  }, []);

  return (
    <div>
      <Image src={Background} alt="background" sizes="100vw" />
    </div>
  );
}
