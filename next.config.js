/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    sw: "service-worker.js",
  },
  images: {
    domains: ["lh3.googleusercontent.com", "platform-lookaside.fbsbx.com"],
  },
});
