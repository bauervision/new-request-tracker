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

function SingleRequest({ params }: { params: { id: string } }) {
  const { selectedRow } = useRequestContext();

  if (!selectedRow) {
    return <div>NoData</div>;
  }

  const handleStatusChange = (newStatus: string) => {
    console.log("Changed..." + newStatus);
  };

  const handleCommentChange = (text: string) => {
    console.log(text);
  };
  // we have good data
  return (
    <div className="requestBG pb-20 h-full">
      <div className=" flex justify-center items-center gradientBG py-4 text-white ">
        <RequestBreadcrumb />
        <h1 className="boldText">Request ID: {params.id}</h1>
      </div>

      {/* First Section */}
      <RequestContent>
        {/* Product */}
        <div>
          <Label htmlFor="product" className="text-left">
            Product
          </Label>
          <Input
            id="product"
            placeholder={selectedRow.product}
            //value=
            className="w-auto"
            onChange={() => console.log("Changed Product")}
          />
        </div>
        {/* Price */}
        <div>
          <Label htmlFor="price" className="text-left">
            Price
          </Label>
          <Input
            id="price"
            placeholder={`$ ${selectedRow.price.toLocaleString()}`}
            value={`$ ${selectedRow.price.toLocaleString()}`}
            className="w-auto"
            onChange={() => console.log("Changed Price")}
          />
        </div>
        {/* Shipped */}
        <div className="flex items-center space-x-2">
          <Switch
            id={JSON.stringify(selectedRow.shipped)}
            checked={selectedRow.shipped}
            disabled={false}
          />
          <Label htmlFor={JSON.stringify(selectedRow.shipped)}>Shipped</Label>
        </div>

        {/* Delivery Date */}
        <RequestCalendar
          data={{
            label: "Delivery Date",
            date: new Date(selectedRow.delivery || ""),
          }}
        />
      </RequestContent>

      <RequestContent>
        <div className=" grid grid-cols-2 items-center gap-4">
          <div>
            <Label htmlFor="price" className="text-left">
              Current Status
            </Label>
            <Combobox
              placeholder="Set Status"
              label="Request Status"
              data={statuses}
              initialStatus={selectedRow.status}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        <RequestComment
          onTextChange={handleCommentChange}
          label="Enter your comments"
        />

        <RequestCommentPopover />
        <Button type="button" variant="default">
          Save Changes
        </Button>
      </RequestContent>
    </div>
  );
}

export default SingleRequest;
