"use client";

import { RowData } from "@/components/ag-grid-table/GridTable";
import { RequestBreadcrumb } from "@/components/Requests/RequestBreadcrumb";
import React, { useContext } from "react";
import { useRequestContext } from "@/app/context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RequestForm } from "@/components/Requests/RequestForm";
import { Card, CardContent } from "@/components/ui/card";
import { RequestCalendar } from "@/components/Requests/RequestCalendar";
import RequestContent from "@/components/Requests/RequestContent";
import { Combobox } from "@/components/Requests/ComboBox";
import { Button } from "@/components/ui/button";
import { RequestComment } from "@/components/Requests/RequestComment";
import { RequestCommentPopover } from "@/components/Requests/RequestsCommentPopover";

import { statuses } from "../../../components/Requests/requestPages/requestData";
import RequestTrackerNavBar from "../RequestTrackerNavBar";
import { RequestTabs } from "../RequestTabs";

function SingleRequest({ params }: { params: { id: string } }) {
  return (
    <div className="requestBG ">
      <RequestTrackerNavBar />
      <div className=" flex justify-center items-center  py-4 text-white ">
        <RequestBreadcrumb />
        <h1 className="boldText">Request ID: {params.id}</h1>
      </div>

      <RequestTabs />
    </div>
  );
}

export default SingleRequest;
