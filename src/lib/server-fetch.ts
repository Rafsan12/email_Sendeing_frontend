import { getCookie } from "@/service/auth/tokenHandler";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const serverFetchHelper = async (
  endPoint: string,
  option: RequestInit
): Promise<Response> => {
  const { headers, ...restOption } = option;
  const accessToken = getCookie("accessToken");
  const response = await fetch(`${backendUrl}${endPoint}`, {
    headers: {
      ...headers,
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    ...restOption,
  });
  return response;
};

export const serverFetch = {
  get: async (endPoint: string, option: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...option, method: "GET" }),

  post: async (endPoint: string, option: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...option, method: "POST" }),

  patch: async (endPoint: string, option: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...option, method: "PATCH" }),

  put: async (endPoint: string, option: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...option, method: "PUT" }),

  delete: async (endPoint: string, option: RequestInit = {}) =>
    serverFetchHelper(endPoint, { ...option, method: "DELETE" }),
};
