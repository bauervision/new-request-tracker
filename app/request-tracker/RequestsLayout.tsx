// components/NewLayout.tsx

import FrequentLinks from "@/components/Requests/FrequentLinks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

type NewLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
  pageComponents?: ReactNode[];
};

const RequestsLayout: React.FC<NewLayoutProps> = ({
  children,
  title,
  description,
  pageComponents,
}) => {
  return (
    <div className="bg-slate-300  container flex flex-col items-start ">
      <FrequentLinks />
      <div className="mx-auto w-11/12 py-4">
        <Card>
          <CardHeader>
            <div className="flex flex-row space-x-6 justify-between">
              <div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                {description && (
                  <CardDescription>{description}</CardDescription>
                )}
              </div>
              {pageComponents && pageComponents.length > 0 && (
                <div className="flex flex-row space-x-6 justify-between">
                  {React.Children.map(pageComponents, (child, index) => (
                    <div key={index}> {child} </div>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="space-y-1">
              <div className="gap-4 py-8 requestBG pb-20">{children}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestsLayout;
