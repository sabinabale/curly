// add monitor

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMonitorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    frequency: "5",
    description: "",
    timeout: "5000",
    expectedStatusCode: "200",
    maxResponseTime: "2000",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.url.trim()) return "URL is required";

    try {
      new URL(formData.url);
    } catch {
      return "Please enter a valid URL";
    }

    const frequency = parseInt(formData.frequency);
    if (isNaN(frequency) || frequency < 1) {
      return "Frequency must be at least 1 minute";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-monitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          frequency: parseInt(formData.frequency * 60),
          timeout: parseInt(formData.timeout),
          expectedStatusCode: parseInt(formData.expectedStatusCode),
          maxResponseTime: parseInt(formData.maxResponseTime),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create monitor");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add New Monitor</h1>
      <p>Create a new uptime monitor to track your service availability</p>

      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red" }}>{error}</div>}

        <div>
          <label htmlFor="name">Monitor Name:</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="My Service Monitor"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="url">URL to Monitor:</label>
          <input
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://example.com/health"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="frequency">Check Frequency (minutes):</label>
          <input
            id="frequency"
            name="frequency"
            type="number"
            min="1"
            value={formData.frequency}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="timeout">Timeout (milliseconds):</label>
          <input
            id="timeout"
            name="timeout"
            type="number"
            min="1000"
            value={formData.timeout}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="expectedStatusCode">Expected Status Code:</label>
          <input
            id="expectedStatusCode"
            name="expectedStatusCode"
            type="number"
            min="100"
            max="599"
            value={formData.expectedStatusCode}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="maxResponseTime">Max Response Time (ms):</label>
          <input
            id="maxResponseTime"
            name="maxResponseTime"
            type="number"
            min="100"
            value={formData.maxResponseTime}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description">Description (Optional):</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description of what this monitor checks"
            disabled={loading}
          />
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Monitor"}
          </button>
        </div>
      </form>
    </div>
  );
}
