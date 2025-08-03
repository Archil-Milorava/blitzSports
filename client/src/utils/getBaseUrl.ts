export const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL;
};



