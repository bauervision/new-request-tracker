import React from "react";

import { handleLinkClick } from "@/app/utils/trackLinkClicks";
import Link from "next/link";

const FrequentNavigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link
            href="/request-tracker/catalog"
            onClick={() => handleLinkClick("/request-tracker/catalog")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => handleLinkClick("/about")}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => handleLinkClick("/contact")}>
            Contact
          </Link>
        </li>
        {/* Add other links as needed */}
      </ul>
    </nav>
  );
};

export default FrequentNavigation;
