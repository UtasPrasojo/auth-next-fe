/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.plugins.push(
      require("unplugin-auto-import/webpack")({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          "react",
          {
            "next/link": [["default", "Link"]],
            swr: [["default", "useSWR"]],
            "swr/mutator": [["default", "useMutation"]],
            "next/router": [["useRouter", "useRouter"],],
            'next/head': [["default", "Head"]]
          },
        ],
        dirs: ["./src/plugins/**", "./src/config/**", "./src/components/**", "./src/layouts/**"],
        eslintrc: {
          enabled:true,
        }
      })
    );
    return config;
  },
};

module.exports = nextConfig;
