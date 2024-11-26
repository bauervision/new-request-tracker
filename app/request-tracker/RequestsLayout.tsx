// components/NewLayout.tsx

import React, { ReactNode } from "react";
import Link from "next/link";
import RequestTrackerNavBar from "./RequestTrackerNavBar";

type NewLayoutProps = {
  children: ReactNode;
};

const RequestsLayout: React.FC<NewLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-300 container flex flex-row justify-center items-center flex-wrap gap-4">
      <RequestTrackerNavBar />
      {children}
    </div>
  );
};

export default RequestsLayout;
