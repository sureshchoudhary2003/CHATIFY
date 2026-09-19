export const ENV = {
  API_URL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api"),
  BACKEND_URL:
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"),
};
