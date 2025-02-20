"use client";
import { useEffect, useState } from "react";

export default function Monitor({ monitor }) {
  const [averageResponse, setAverageResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
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
            const latestRecord = monitorRecords[0];

            setStatusCode(latestRecord.statusCode);

            const average =
              monitorRecords.reduce(
                (acc, record) => acc + record.responseTime,
                0
              ) / monitorRecords.length;
            setAverageResponse(Math.round(average));
          } else {
            setAverageResponse(0);
            setStatusCode(null);
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

  const getStatusText = (code) => {
    if (!code) return "Unknown";
    if (code >= 200 && code < 300) return "up";
    if (code >= 300 && code < 400) return "redirected";
    if (code >= 400 && code < 500) return "client error";
    if (code >= 500) return "server error";
    return "Unknown";
  };

  const getStatusColor = (code) => {
    if (!code) return "#gray";
    if (code >= 200 && code < 400) return "#3F8658";
    if (code >= 400) return "#D53030";
    return "#gray";
  };

  return (
    <article className="border-[#2F4C39]/60 border flex bg-[#16201D]/80 rounded-3xl w-[1000px]">
      <div className="px-7 py-4 flex items-center w-96">
        <MonitorStatusIcon
          color={getStatusColor(statusCode)}
          statusCode={statusCode}
        />
        <MonitorHeader monitor={monitor} />
      </div>
      <div className="flex pl-8 pr-9 py-4 justify-between flex-1">
        <MonitorCurrentStatus
          status={getStatusText(statusCode)}
          statusCode={statusCode}
        />
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
  return <div>{monitor.name}</div>;
}

function MonitorStatusIcon({ color, statusCode }) {
  const containerClasses = `mr-5 border-2 rounded-full ${
    !statusCode || statusCode >= 400
      ? "animate-pulse border-red-700 bg-red-600"
      : "pulsing-shadow"
  }`;

  return (
    <div className={containerClasses}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7" r="7" fill={color} />
      </svg>
    </div>
  );
}

function MonitorCurrentStatus({ status }) {
  return (
    <div>
      <h4>Current Status</h4>
      <p className="text-sm">{status}</p>
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
      <h4>Avg Response Time</h4>
      <p className="text-sm">
        {isLoading ? "Loading..." : `${averageResponse}ms`}
      </p>
    </div>
  );
}
