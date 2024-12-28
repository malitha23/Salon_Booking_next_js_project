const path = require("path");
const stylexPlugin = require("@stylexjs/nextjs-plugin");
const babelrc = require("./.babelrc.js");
const plugins = babelrc.plugins;
const [_name, options] = plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === "@stylexjs/babel-plugin"
);
const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname;
const aliases = options.aliases ?? undefined;
const useCSSLayers = options.useCSSLayers ?? undefined;

module.exports = stylexPlugin({ rootDir, aliases, useCSSLayers })({
  transpilePackages: ["@stylexjs/open-props"],
  images: {
    domains: ['localhost:3000'],
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "**",
      },
    ],
  },
});
