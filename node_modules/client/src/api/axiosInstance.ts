import axios, {
  AxiosError,
  AxiosInstance,
} from "axios";

const axiosInstance: AxiosInstance =
  axios.create({
    baseURL:
      import.meta.env
        .VITE_API_BASE_URL,
    headers: {
      "Content-Type":
        "application/json",
    },
  });

/**
 * Request interceptor
 * Attach JWT token
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (
      token &&
      config.headers
    ) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

/**
 * Response interceptor
 */
axiosInstance.interceptors.response.use(
  (response) =>
    response,

  (
    error: AxiosError<{
      message?: string;
    }>
  ) => {
    const status =
      error.response
        ?.status;

    const message =
      error.response
        ?.data?.message ||
      "Something went wrong";

    if (status === 401) {
      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(
      new Error(message)
    );
  }
);

export default axiosInstance;