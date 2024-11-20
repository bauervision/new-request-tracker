import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Combobox } from "./ComboBox";
import Link from "next/link";
import { RequestContext } from "@/app/context";
import { useContext } from "react";
import { RequestCalendar } from "./RequestCalendar";
import { Switch } from "../ui/switch";

export function RequestDialog() {
  const rowData = useContext(RequestContext);

  if (!rowData) {
    return (
      <div>
        <div className=" flex justify-center items-center gradientBG py-4 text-white">
          <h1 className="boldText">No Data</h1>
          <p>No Data Loaded</p>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View Request</Button>
      </DialogTrigger>
      {rowData && (
        <DialogContent className="sm:max-w-[900px] text-slate-900">
          <DialogHeader>
            <DialogTitle>Order Number: {rowData.data?.order}</DialogTitle>
            <DialogDescription>
              Make changes to this request here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* Product */}
          <div className=" grid  items-center gap-4">
            <Label htmlFor="product" className="text-left">
              Product
            </Label>
            <Input
              id="product"
              value={
                rowData.data?.product
                  ? rowData.data?.product
                  : " No product found"
              }
              className="w-auto"
              onChange={() => console.log("Changed Product")}
            />
          </div>
          {/* Request Data Content */}
          <div className="grid grid-cols-4 gap-3 py-4 items-center ">
            {/* Price */}
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="price" className="text-left">
                  Price
                </Label>
                <Input
                  id="price"
                  value={
                    rowData.data?.price
                      ? `$${rowData.data?.price.toLocaleString()}`
                      : " No price found"
                  }
                  className="col-span-3"
                  onChange={() => console.log("Changed Price")}
                />
              </div>
            </div>

            {/* Delivery Month */}
            <div className=" grid grid-cols-2 items-center gap-4">
              <div>
                <RequestCalendar
                  data={{
                    label: "Delivery Date",
                    date: rowData.data?.delivery,
                  }}
                />
              </div>
            </div>

            {/* Shipped? */}
            <div className="flex items-center space-x-2">
              <Switch
                id={JSON.stringify(rowData.data?.shipped)}
                checked={rowData.data?.shipped}
              />
              <Label htmlFor={JSON.stringify(rowData.data?.shipped)}>
                Shipped
              </Label>
            </div>
            {/* Status */}
            <div className=" grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="price" className="text-left">
                  Current Status
                </Label>
                <Combobox />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Save Changes
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Link href={`/requests/${rowData.data?.order}`}>
                <Button type="button">Open Full Request</Button>
              </Link>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
