import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequestContext } from "../context/DataContext";
import RequestContent from "@/components/Requests/RequestContent";
import { Switch } from "@/components/ui/switch";
import { RequestCalendar } from "@/components/Requests/RequestCalendar";
import { Combobox } from "@/components/Requests/ComboBox";
import { statuses } from "@/components/Requests/requestPages/requestData";
import { RequestComment } from "@/components/Requests/RequestComment";
import { RequestCommentPopover } from "@/components/Requests/RequestsCommentPopover";

import RequestToast, { showToast } from "@/components/Requests/RequestToast";

import { useFetchWithToast } from "@/hooks/fetchWithToast";

export function RequestTabs() {
  const { selectedRow } = useRequestContext();
  const { fetchWithToast } = useFetchWithToast();

  if (!selectedRow) {
    return <div>NoData</div>;
  }

  const handleRequestSave = async (newStatus?: string) => {
    const result = await fetchWithToast("test");
  };

  const handleCommentChange = (text: string) => {
    console.log(text);
  };

  return (
    <Tabs defaultValue="info" className=" mx-6">
      <RequestToast />
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="info">Request Information</TabsTrigger>
        <TabsTrigger value="docs" disabled={false}>
          Documents
        </TabsTrigger>
        <TabsTrigger value="lines" disabled>
          Request Line Items
        </TabsTrigger>

        <TabsTrigger value="orders" disabled>
          Orders
        </TabsTrigger>
        <TabsTrigger value="ship" disabled>
          Shipments
        </TabsTrigger>
        <TabsTrigger value="forms" disabled>
          Forms
        </TabsTrigger>
        <TabsTrigger value="comments" disabled>
          Status Comments
        </TabsTrigger>
      </TabsList>

      {/* Request Information Tab */}
      <TabsContent value="info">
        <Card>
          <CardHeader>
            <div className=" flex flex-row w-full  items-center justify-between ">
              {/* <RequestBreadcrumb /> */}
            </div>
            <div className="flex flex-row space-x-5"></div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
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
                    <Label htmlFor={JSON.stringify(selectedRow.shipped)}>
                      Shipped
                    </Label>
                  </div>

                  {/* Delivery Date */}
                  <RequestCalendar
                    data={{
                      label: "Delivery Date",
                      date: new Date(selectedRow.delivery || ""),
                    }}
                  />

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
                        //onStatusChange={handleRequestSave}
                      />
                    </div>
                  </div>

                  <RequestComment
                    onTextChange={handleCommentChange}
                    label="Enter your comments"
                  />

                  <RequestCommentPopover />
                  <Button
                    type="button"
                    variant="default"
                    className="bg-blue-800 text-white"
                    onClick={() => handleRequestSave()}
                  >
                    Save Changes
                  </Button>
                </RequestContent>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Documents Tab */}
      <TabsContent value="docs">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>All documents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <Label htmlFor="current">Current Documents</Label>
                <div>Document Table Here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Line Items Tab */}
      <TabsContent value="lines">
        <Card>
          <CardHeader>
            <CardTitle>Request Line Items</CardTitle>
            <CardDescription>All line items for requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <Label htmlFor="current">Current Line Items</Label>
                <div>Line Item Data Here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Orders Tab */}
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Orders for requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <Label htmlFor="current">Current Status</Label>
                <div>Status Data Here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Shipments Tab */}
      <TabsContent value="ship">
        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
            <CardDescription>Shipments requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <Label htmlFor="current">Current Status</Label>
                <div>Status Data Here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Forms Tab */}
      <TabsContent value="forms">
        <Card>
          <CardHeader>
            <CardTitle>Forms</CardTitle>
            <CardDescription>Forms for requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <Label htmlFor="current">Current Status</Label>
                <div>Status Data Here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Comments Tab */}
      <TabsContent value="comments">
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
            <CardDescription>All comments for requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <Label htmlFor="current">Current Status</Label>
                <div>Status Data Here</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
