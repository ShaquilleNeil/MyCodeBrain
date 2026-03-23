const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 🔥 add riv support
config.resolver.assetExts = [...config.resolver.assetExts, "riv"];

module.exports = config;