/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: false,
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
