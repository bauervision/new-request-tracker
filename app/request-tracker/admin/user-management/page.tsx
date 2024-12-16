import React from "react";
import RequestsLayout from "../../RequestsLayout";

import { Button } from "@/components/ui/button";

function AdminUserManagementPage() {
  return (
    <RequestsLayout title="Catēna Administration">
      <div className="flex h-screen items-start justify-center">
        <div className="text-center text-lg font-semibold">
          User Management Data
        </div>
      </div>
    </RequestsLayout>
  );
}

export default AdminUserManagementPage;
