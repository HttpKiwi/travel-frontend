/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
				port: '',
				pathname: '/media/*',
			},
		],
	},
};

module.exports = nextConfig;
