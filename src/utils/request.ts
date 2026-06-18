import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import type { ApiResponse } from "@/types/api";
import {
  getFileNameFromDisposition,
  parseBlobErrorMessage,
} from "@/utils/download";

export interface BlobDownloadResult {
  blob: Blob;
  fileName: string;
}

const TOKEN_KEY = "token";

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 60_000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    let msg = error.message || "网络异常";
    const data = error.response?.data;

    if (data instanceof Blob) {
      msg = await parseBlobErrorMessage(data);
    } else {
      msg = data?.msg || data?.message || msg;
    }

    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }

    ElMessage.error(msg);
    return Promise.reject(error);
  },
);

function unwrap<T>(response: AxiosResponse<ApiResponse<T>>): T {
  const { code, msg, data } = response.data;

  if (code === 0 || code === 200) {
    return data;
  }

  ElMessage.error(msg || "请求失败");
  throw new Error(msg || "请求失败");
}

const request = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return service
      .get<ApiResponse<T>>(url, config)
      .then((response) => unwrap(response));
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return service
      .post<ApiResponse<T>>(url, data, config)
      .then((response) => unwrap(response));
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return service
      .put<ApiResponse<T>>(url, data, config)
      .then((response) => unwrap(response));
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return service
      .delete<ApiResponse<T>>(url, config)
      .then((response) => unwrap(response));
  },

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return service
      .patch<ApiResponse<T>>(url, data, config)
      .then((response) => unwrap(response));
  },

  postBlob(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    defaultFileName = "download",
  ): Promise<BlobDownloadResult> {
    return service
      .post<Blob>(url, data, { ...config, responseType: "blob" })
      .then(async (response) => {
        const blob = response.data;

        if (blob.type.includes("application/json")) {
          const msg = await parseBlobErrorMessage(blob);
          ElMessage.error(msg);
          throw new Error(msg);
        }

        const disposition = response.headers["content-disposition"];
        const fileName = getFileNameFromDisposition(
          typeof disposition === "string" ? disposition : undefined,
          defaultFileName,
        );

        return { blob, fileName };
      });
  },
};

export default request;
export { service as axiosInstance };
