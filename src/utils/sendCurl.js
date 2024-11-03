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
