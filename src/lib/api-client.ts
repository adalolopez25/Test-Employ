export const fetcher = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {

  const isExternal = endpoint.startsWith("http");

  const url = isExternal
    ? endpoint
    : `${process.env.NEXT_PUBLIC_APP_URL || ""}${endpoint}`;

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...options,
    headers,

    // SOLO usar credentials para APIs internas
    ...(isExternal ? {} : { credentials: "include" }),
  });

  if (!res.ok) {
    let errorMessage = `Request failed: ${res.status}`;

    try {
      const errorData = await res.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch {}

    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
};