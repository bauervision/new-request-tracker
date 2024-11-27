"use client";

import React, { useEffect, useState } from "react";

import { getFrequentLinks } from "@/app/utils/trackLinkClicks";
import Link from "next/link";
import { Button } from "../ui/button";

const FrequentLinks: React.FC = () => {
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    setLinks(getFrequentLinks());
  }, []);

  const getButtonText = (route: string) => {
    const parts = route.split("/");
    const text = parts[parts.length - 1] || parts[parts.length - 2];
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="flex space-x-2">
      {links.map((route) => (
        <Link href={route} key={route} className="btn">
          <Button variant="outline">{getButtonText(route)}</Button>
        </Link>
      ))}
    </div>
  );
};

export default FrequentLinks;
