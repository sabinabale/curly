"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select } from "@/components/ui/Input";
import { InputLabel } from "@/components/ui/InputLabel";
import { Button } from "@/components/ui/Button";

export default function AddMonitorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    frequency: "3",
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
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create monitor");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[500px]">
      <h1>Create monitor</h1>

      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red" }}>{error}</div>}

        <div>
          <InputLabel htmlFor="name">Monitor name:</InputLabel>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="My blog"
            disabled={loading}
          />
        </div>

        <div>
          <InputLabel htmlFor="url">Endpoint to monitor:</InputLabel>
          <Input
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://example.com/"
            disabled={loading}
          />
        </div>

        <div>
          <InputLabel htmlFor="numberSelect">Check monitor every:</InputLabel>
          <Select id="numberSelect" name="number">
            <option value="3">3 minutes</option>
            <option value="5">5 minutes</option>
          </Select>
        </div>

        <div className="mt-8 flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create monitor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
