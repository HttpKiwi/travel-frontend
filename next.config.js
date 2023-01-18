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
			},{
				protocol: 'https',
				hostname: 'www.eltiempo.com',
				port: '',
			},
		],
	},
};
module.exports = nextConfig;
