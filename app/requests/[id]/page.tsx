"use client";

import { RowData } from "@/components/ag-grid-table/GridTable";
import { RequestBreadcrumb } from "@/components/Requests/RequestBreadcrumb";
import React, { useContext } from "react";
import { RequestContext } from "@/app/context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RequestForm } from "@/components/Requests/RequestForm";
import { Card, CardContent } from "@/components/ui/card";
import { RequestCalendar } from "@/components/Requests/RequestCalendar";

function SingleRequest({ params }: { params: { id: string } }) {
  const requestData = useContext(RequestContext);

  //   handle possible null case
  if (!requestData) {
    return (
      <div>
        <div className=" flex justify-center items-center gradientBG py-4 text-white">
          <h1 className="boldText">Request ID: {params.id}</h1>
          <p>No Data Loaded</p>
        </div>
      </div>
    );
  }

  // we have good data
  return (
    <div>
      <div className=" flex justify-center items-center gradientBG py-4 text-white">
        <RequestBreadcrumb />
        <h1 className="boldText">Request ID: {params.id}</h1>
      </div>

      <div className="gap-4 py-8 requestBG pb-20">
        <Card>
          <CardContent className="flex  items-center justify-center ">
            <div className=" grid   items-center gap-4">
              {/* Product */}
              <div>
                <Label htmlFor="product" className="text-left">
                  Product
                </Label>
                <Input
                  id="product"
                  placeholder={requestData.data?.product}
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
                  placeholder={`$ ${requestData.data?.price.toLocaleString()}`}
                  value={`$ ${requestData.data?.price.toLocaleString()}`}
                  className="w-auto"
                  onChange={() => console.log("Changed Price")}
                />
              </div>
              {/* Shipped */}
              <div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={JSON.stringify(requestData.data?.shipped)}
                    checked={requestData.data?.shipped}
                  />
                  <Label htmlFor={JSON.stringify(requestData.data?.shipped)}>
                    Shipped
                  </Label>
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <RequestCalendar
                  data={{
                    label: "Delivery Date",
                    date: new Date(requestData.data?.delivery || ""),
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <RequestForm />
      </div>
    </div>
  );
}

export default SingleRequest;
