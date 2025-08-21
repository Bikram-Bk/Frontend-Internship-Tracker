import { APP_BASE_URL } from "./cofig";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.ok) return response;

  // Try token refresh on 401
  if (response.status === 401 && retry) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      const retryHeaders: HeadersInit = {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      response = await fetch(url, {
        ...options,
        headers: retryHeaders,
      });

      if (!response.ok && response.status === 401) {
        console.error("Retry failed after token refresh (401)");
      }

      return response;
    }
  }

  return response;
};

const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    clearTokens(); // only clear tokens, no logout request
    return false;
  }

  try {
    const res = await fetch(`${APP_BASE_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const json = await res.json();

    if (!json.success || !json.data?.accessToken) {
      throw new Error("Invalid token response");
    }

    const { accessToken, refreshToken: newRefreshToken } = json.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return true;
  } catch {
    clearTokens(); // just clean up tokens
    return false;
  }
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
