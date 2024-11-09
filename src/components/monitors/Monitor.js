// components/monitors/Monitor.js

"use client";
import { useEffect, useState } from "react";

export default function Monitor({ monitor }) {
  const [averageResponse, setAverageResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/monitors/check-records");
        const data = await response.json();

        if (data.success && data.records) {
          const monitorRecords = data.records.filter(
            (record) => record.monitorId === monitor.id
          );
          if (monitorRecords.length > 0) {
            const average =
              monitorRecords.reduce(
                (acc, record) => acc + record.responseTime,
                0
              ) / monitorRecords.length;
            setAverageResponse(Math.round(average));
          } else {
            setAverageResponse(0);
          }
        }
      } catch (error) {
        console.error("Error fetching response times:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [monitor.id]);

  return (
    <article className="border-[#2F4C39]/60 border bg-[#16201D]/50 rounded-3xl w-[500px]">
      <div className="border-b border-[#2F4C39]/60 px-6 py-4 flex justify-between items-center">
        <MonitorHeader monitor={monitor} />
        <MonitorStatusIcon />
      </div>
      <div className="flex px-6 py-4 justify-between">
        <MonitorCurrentStatus />
        <MonitorCheckFrequency checkFrequency={monitor.frequency} />
        <MonitorResponseTime
          averageResponse={averageResponse}
          isLoading={isLoading}
        />
      </div>
    </article>
  );
}

function MonitorHeader({ monitor }) {
  return (
    <div>
      <h1>{monitor.name}</h1>
    </div>
  );
}

function MonitorStatusIcon() {
  return (
    <div className="mr-4 border-2 rounded-full pulsing-shadow">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7" r="7" fill="#3F8658" />
      </svg>
    </div>
  );
}

function MonitorCurrentStatus() {
  return (
    <div>
      <h4>Status</h4>
      <p className="text-sm">up</p>
    </div>
  );
}

function MonitorCheckFrequency({ checkFrequency }) {
  return (
    <div>
      <h4>Check Frequency</h4>
      <p className="text-sm">every {checkFrequency / 60}m</p>
    </div>
  );
}

function MonitorResponseTime({ averageResponse, isLoading }) {
  return (
    <div>
      <h4>Response Time</h4>
      <p className="text-sm">
        {isLoading ? "Loading..." : `${averageResponse}ms`}
      </p>
    </div>
  );
}
