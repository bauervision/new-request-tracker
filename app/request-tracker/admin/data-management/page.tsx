import React from "react";
import RequestsLayout from "../../RequestsLayout";

import { Button } from "@/components/ui/button";
import DataSetup from "@/components/data-setup/DataSetup";

function AdminDataManagementPage() {
  return (
    <RequestsLayout title="Catēna Administration: Data Management">
      <div className="flex h-screen items-start justify-center ">
        <DataSetup />
      </div>
    </RequestsLayout>
  );
}

export default AdminDataManagementPage;
