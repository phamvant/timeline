/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  //   async redirects() {
  //     return [
  //       {
  //         source: "/",
  //         destination: "/login",
  //         permanent: true,
  //       },
  //       {
  //         source: "/register",
  //         destination: "/register",
  //         permanent: true,
  //       },
  //     ];
  //   },
};

module.exports = nextConfig;
