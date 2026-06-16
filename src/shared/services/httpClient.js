// src/shared/services/httpClient.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8762";

function normalizeQueryParams(params = {}) {
  const result = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      result[key] = value.map(String);
    } else {
      result[key] = [String(value)];
    }
  });

  return result;
}

export async function httpRequest(endpoint, options = {}) {
  const {
    targetMethod = "GET",
    body = null,
    queryParams = {},
    headers = {},
    auth = true,
  } = options;

  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}${endpoint}`, {
    // Hacia tu Gateway siempre mandas POST
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: JSON.stringify({
      targetMethod,
      queryParams: normalizeQueryParams(queryParams),
      body,
    }),
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error("UNKNOWN_ERROR");
  }

  return data;
}

export function get(endpoint, queryParams = {}, options = {}) {
  return httpRequest(endpoint, {
    targetMethod: "GET",
    queryParams,
    body: null,
    ...options,
  });
}

export function post(endpoint, body = {}, options = {}) {
  return httpRequest(endpoint, {
    targetMethod: "POST",
    queryParams: {},
    body,
    ...options,
  });
}

export function put(endpoint, body = {}, options = {}) {
  return httpRequest(endpoint, {
    targetMethod: "PUT",
    queryParams: {},
    body,
    ...options,
  });
}

export function remove(endpoint, queryParams = {}, options = {}) {
  return httpRequest(endpoint, {
    targetMethod: "DELETE",
    queryParams,
    body: null,
    ...options,
  });
}
