// components/monitors/Monitor.js

"use client";
import React, { useState, useEffect } from "react";
import { monitorUrl } from "@/utils/monitor";

const MONITOR_INTERVAL = 1 * 60 * 1000;
const TARGET_URL = "https://sabini.io";

export default function Monitor() {
  const [monitorData, setMonitorData] = useState({
    status: null,
    responseTime: null,
    uptime: 0,
    lastCheck: null,
    error: null,
  });

  useEffect(() => {
    const startTime = Date.now();

    // Initial check
    const checkStatus = async () => {
      const result = await monitorUrl(TARGET_URL);
      setMonitorData((prev) => ({
        status: result.statusCode,
        responseTime: result.responseTime,
        uptime: Math.floor((Date.now() - startTime) / 1000),
        lastCheck: result.timestamp,
        error: result.error,
      }));
    };

    // Run initial check
    checkStatus();

    // Set up interval for subsequent checks
    const intervalId = setInterval(checkStatus, MONITOR_INTERVAL);

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  return (
    <article className="border-[#2F4C39]/60 border bg-[#16201D]/50 rounded-3xl w-[540px]">
      <div className="border-b border-[#2F4C39]/60 px-6 py-4 flex justify-between items-center">
        <MonitorHeader />
        <MonitorStatusIcon
          status={monitorData.status}
          error={monitorData.error}
        />
      </div>
      <div className="flex px-6 py-4 justify-between">
        <MonitorCurrentStatus status={monitorData.status} />
        <MonitorCheckFrequency />
        <MonitorResponseTime responseTime={monitorData.responseTime} />
      </div>
    </article>
  );
}

function MonitorHeader() {
  return (
    <div>
      <h1>Sabini.io</h1>
      <p className="text-sm">{TARGET_URL}</p>
    </div>
  );
}

function MonitorStatusIcon({ status, error }) {
  const isUp = !error && status && status < 400;

  return (
    <div
      className="mr-4 border-2 rounded-full pulsing-shadow"
      title={error || (isUp ? "Online" : "Offline")}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7" r="7" fill={isUp ? "#3F8658" : "#DC2626"} />
      </svg>
    </div>
  );
}

function MonitorCurrentStatus({ status }) {
  const isUp = status && status < 400;

  return (
    <div>
      <h2>Status</h2>
      <p className="text-sm">
        {status ? (isUp ? "up" : "down") : "checking..."}
      </p>
    </div>
  );
}

function MonitorCheckFrequency() {
  return (
    <div>
      <h2>Check Frequency</h2>
      <p className="text-sm">every 60s</p>
    </div>
  );
}

function MonitorResponseTime({ responseTime }) {
  const [lastResponseTime, setLastResponseTime] = useState(null);

  useEffect(() => {
    if (responseTime) {
      setLastResponseTime(responseTime);
    }
  }, [responseTime]);

  const formatResponseTime = (ms) => {
    if (!ms) return "checking...";
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div>
      <h2>Response Time</h2>
      <p className="text-sm">
        {formatResponseTime(responseTime || lastResponseTime)}
      </p>
    </div>
  );
}
