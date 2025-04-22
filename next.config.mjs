/** @type {import('next').NextConfig} */
const config = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
        {
          protocol: 'https',
          hostname: 'replicate.com',
        },
        {
          protocol: 'https',
          hostname: 'replicate.delivery',
        },
        {
          protocol: 'https',
          hostname: 'jgvktppjdbligdhehesn.supabase.co',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/mock-**',
        },
      ],
    },
  };
  
  export default config;
  


