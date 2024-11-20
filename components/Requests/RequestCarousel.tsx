import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export function RequestCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        className="border h-[300px] flex  items-center justify-center"
      >
        <CarouselContent>
          {/* Page 1 */}
          <CarouselItem className="h-full">
            <Card>
              <CardContent className="flex  items-center justify-center ">
                <div className=" text-4xl font-semibold">
                  First Page
                  <div className=" grid  items-center gap-4">
                    <Label htmlFor="product" className="text-left">
                      Product
                    </Label>
                    <Input
                      id="product"
                      value="data"
                      className="w-auto"
                      onChange={() => console.log("Changed Product")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {/* Page 2 */}
          <CarouselItem className="h-full">
            <Card>
              <CardContent className="flex  items-center justify-center ">
                <div className=" text-4xl font-semibold">
                  Second Page
                  <div className=" grid  items-center gap-4">
                    <Label htmlFor="product" className="text-left">
                      Product
                    </Label>
                    <Input
                      id="product"
                      value="data"
                      className="w-auto"
                      onChange={() => console.log("Changed Product")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {/* Page 3 */}
          <CarouselItem className="h-full">
            <Card>
              <CardContent className="flex  items-center justify-center ">
                <div className=" text-4xl font-semibold">
                  Third Page
                  <div className=" grid  items-center gap-4">
                    <Label htmlFor="product" className="text-left">
                      Product
                    </Label>
                    <Input
                      id="product"
                      value="data"
                      className="w-auto"
                      onChange={() => console.log("Changed Product")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {/* Page 4 */}
          <CarouselItem className="h-full">
            <Card>
              <CardContent className="flex  items-center justify-center ">
                <div className=" text-4xl font-semibold">
                  Fourth Page
                  <div className=" grid  items-center gap-4">
                    <Label htmlFor="product" className="text-left">
                      Product
                    </Label>
                    <Input
                      id="product"
                      value="data"
                      className="w-auto"
                      onChange={() => console.log("Changed Product")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>

          {/* Page 5 */}
          <CarouselItem className="h-100">
            <Card>
              <CardContent className="flex  items-center justify-center ">
                <div className=" text-4xl font-semibold">
                  Fifth Page
                  <div className=" grid  items-center gap-4">
                    <Label htmlFor="product" className="text-left">
                      Product
                    </Label>
                    <Input
                      id="product"
                      value="data"
                      className="w-auto"
                      onChange={() => console.log("Changed Product")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </>
  );
}
