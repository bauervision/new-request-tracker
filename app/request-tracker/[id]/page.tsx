"use client";

import { RequestBreadcrumb } from "@/components/Requests/RequestBreadcrumb";
import React from "react";

import RequestTrackerNavBar from "../RequestTrackerNavBar";
import { RequestTabs } from "../RequestTabs";

function SingleRequest({ params }: { params: { id: string } }) {
  return (
    <div className="requestBG ">
      <div className=" flex justify-center items-center  py-4 text-white ">
        <RequestBreadcrumb />
        <h1 className="boldText">Request ID: {params.id}</h1>
      </div>

      <RequestTabs />
    </div>
  );
}

export default SingleRequest;
