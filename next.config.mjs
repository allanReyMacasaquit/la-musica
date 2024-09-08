/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'kjdehuchhoskyogeohhc.supabase.co',
				port: '', // Leave empty if not required
				pathname: '/**', // Wildcard to allow all paths, or customize as needed
			},
		],
	},
};

export default nextConfig;
