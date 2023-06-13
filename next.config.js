/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'a0.muscache.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
				port: '',
				pathname: '/media/*',
			},
			{
				protocol: 'https',
				hostname: 'www.eltiempo.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'colombia.travel',
				port: '',
			},
		],
	},
};
module.exports = nextConfig;
