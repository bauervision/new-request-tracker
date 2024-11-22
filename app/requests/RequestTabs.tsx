import GridTable from "@/components/ag-grid-table/GridTable";
import { RequestDialog } from "@/components/Requests/RequestDialog";
import { RequestDrawer } from "@/components/Requests/RequestDrawer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequestContext } from "../context";

export function RequestTabs() {
  const { selectedRow } = useRequestContext();

  return (
    <Tabs defaultValue="info" className="w-full mx-6">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="info">Request Information</TabsTrigger>
        <TabsTrigger value="docs" disabled={false}>
          Documents
        </TabsTrigger>
        <TabsTrigger value="lines" disabled>
          Request Line Items
        </TabsTrigger>
        <TabsTrigger value="progress" disabled>
          Progress/Status
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
            <CardTitle>Requests</CardTitle>
            <CardDescription>Request and Order Tracking</CardDescription>
            <div className="flex flex-row space-x-5">
              <RequestDrawer />
              {selectedRow && <RequestDialog />}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">
                <GridTable />
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

      {/* Progress Tab */}
      <TabsContent value="progress">
        <Card>
          <CardHeader>
            <CardTitle>Progress / Status</CardTitle>
            <CardDescription>Progress status for requests.</CardDescription>
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
