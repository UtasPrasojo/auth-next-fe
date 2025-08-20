export function Env() {
  return {
    PUBLIC: {
        API: {
            BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        },
    },
    PRIVATE: {
        NODE_ENV: process.env.NODE_ENV
    }
  };
}
