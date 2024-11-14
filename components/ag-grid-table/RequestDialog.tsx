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
import { RowProps } from "./GridTable";
import { RequestDropdown } from "./RequestDropDown";
import { Combobox } from "./ComboBox";

export function RequestDialog({ rowData }: RowProps) {
  console.log(rowData ? rowData : "NO DATA");

  const onChange = () => {
    console.log("Input Changed...");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Request</Button>
      </DialogTrigger>
      {rowData && (
        <DialogContent className="sm:max-w-[900px] text-slate-900">
          <DialogHeader>
            <DialogTitle>Order Number: {rowData.order}</DialogTitle>
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
              value={rowData.product ? rowData.product : " No product found"}
              className="w-auto"
              onChange={() => console.log("Changed Product")}
            />
          </div>
          {/* Request Data Content */}
          <div className="grid grid-cols-3 gap-3 py-4">
            {/* Price */}
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="price" className="text-left">
                  Price
                </Label>
                <Input
                  id="price"
                  value={
                    rowData.price
                      ? `$${rowData.price.toLocaleString()}`
                      : " No price found"
                  }
                  className="col-span-3"
                  onChange={() => console.log("Changed Price")}
                />
              </div>
            </div>

            {/* Month */}
            <div className=" grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="price" className="text-left">
                  Delivery Month
                </Label>
                <Input
                  id="month"
                  value={rowData.month ? rowData.month : " No month found"}
                  className="col-span-3"
                  onChange={() => console.log("Changed Month")}
                />
              </div>
            </div>

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
              <Button type="button">Open Full Request</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
