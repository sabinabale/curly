import React from "react";
import CreateMonitorForm from "../../../components/monitors/CreateMonitorForm";
import TheContainer from "@/components/layout/TheContainer";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <TheContainer>
        <CreateMonitorForm />
      </TheContainer>
    </div>
  );
}
