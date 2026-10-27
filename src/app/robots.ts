import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // Replace with actual production URL when known
  const baseUrl = 'https://www.zeuspower.lk';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
