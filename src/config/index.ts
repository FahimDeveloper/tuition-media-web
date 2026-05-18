const version = {
  development: "DEVELOPMENT",
  live: "LIVE_PRODUCTION",
  test: "TEST_PRODUCTION",
};

const activeEnv: string = version.development;

const envKeys: Record<
  string,
  {
    BASE_URL: string;
    AUTH_REFRESH_URL: string;
  }
> = {
  LIVE_PRODUCTION: {
    BASE_URL: import.meta.env.VITE_APP_LIVE_API_URL,
    AUTH_REFRESH_URL: import.meta.env.VITE_APP_LIVE_AUTH_REFRESH_URL,
  },
  DEVELOPMENT: {
    BASE_URL: import.meta.env.VITE_APP_LOCAL_API_URL,
    AUTH_REFRESH_URL: import.meta.env.VITE_APP_LOCAL_AUTH_REFRESH_URL,
  },
  TEST_PRODUCTION: {
    BASE_URL: import.meta.env.VITE_APP_TEST_API_URL,
    AUTH_REFRESH_URL: import.meta.env.VITE_APP_TEST_AUTH_REFRESH_URL,
  },
};

export const baseUrl = {
  BASE_URL: envKeys[activeEnv].BASE_URL,
  AUTH_REFRESH_URL: envKeys[activeEnv].AUTH_REFRESH_URL,
};
