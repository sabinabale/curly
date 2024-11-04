// export async function monitorUrl(url) {
//   try {
//     const startTime = performance.now();
//     const response = await fetch(url);
//     const endTime = performance.now();

//     return {
//       statusCode: response.status,
//       responseTime: Math.round(endTime - startTime),
//       error: null,
//     };
//   } catch (error) {
//     return {
//       statusCode: 0,
//       responseTime: null,
//       error: error.message,
//     };
//   }
// }

import { Client } from "@upstash/qstash";

// Initialize Qstash client
const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function monitorUrl(url) {
  try {
    const startTime = performance.now();
    const response = await fetch(url);
    const endTime = performance.now();

    return {
      statusCode: response.status,
      responseTime: Math.round(endTime - startTime),
      error: null,
    };
  } catch (error) {
    return {
      statusCode: 0,
      responseTime: null,
      error: error.message,
    };
  }
}

// Function to set up the cron schedule with Qstash
export async function setupUrlMonitoringSchedule(targetUrl, webhookUrl) {
  try {
    // Schedule the monitoring task to run every 3 minutes
    const response = await qstash.publishJSON({
      url: webhookUrl, // The endpoint that will handle the monitoring
      body: { url: targetUrl },
      cron: "*/3 * * * *", // Every 3 minutes
    });

    return {
      success: true,
      scheduleId: response.scheduleId,
      message: "URL monitoring scheduled successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Webhook handler function (needs to be exposed as an API endpoint)
export async function handleMonitoringWebhook(req, res) {
  const { url } = req.body;

  // Verify Qstash signature if needed
  // const isValid = await qstash.verify({
  //   signature: req.headers['upstash-signature'],
  //   body: req.body
  // });

  const result = await monitorUrl(url);

  // Here you could save the result to a database
  // or trigger notifications based on the status

  return result;
}
