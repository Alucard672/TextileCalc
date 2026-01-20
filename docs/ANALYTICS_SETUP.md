# Analytics Setup Guide

## Google Analytics 4 (GA4)

### Setup Instructions

1. **Create a GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for your website
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Configure Environment Variable**
   - Add the following to your `.env.local` file:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. **Deploy**
   - The Google Analytics component is already integrated in `app/[locale]/layout.tsx`
   - It will automatically load when `NEXT_PUBLIC_GA_ID` is set
   - No code changes needed after setting the environment variable

### Features
- Automatic page view tracking
- Multi-language support (tracks locale in path)
- Privacy-friendly (respects user consent)
- Server-side rendering compatible

## Google Search Console

### Setup Instructions

1. **Verify Ownership**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property (domain or URL prefix)
   - Choose verification method:
     - **HTML file**: Upload the verification file to `public/` directory
     - **HTML tag**: Add meta tag to `app/[locale]/layout.tsx`
     - **DNS**: Add TXT record to your DNS

2. **Submit Sitemap**
   - After verification, go to Sitemaps section
   - Submit: `https://yourdomain.com/sitemap.xml`
   - Google will automatically discover all language versions

3. **Monitor Performance**
   - Check search performance metrics
   - Monitor indexing status
   - Review search queries and click-through rates

### Recommended Actions
- Submit sitemap after deployment
- Monitor indexing status weekly
- Review search queries monthly
- Fix any crawl errors promptly

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Base URL (for sitemap and metadata)
NEXT_PUBLIC_BASE_URL=https://calctextile.com
```

## Testing

### Local Development
- Analytics will not track in development mode unless explicitly enabled
- Test with `NEXT_PUBLIC_GA_ID` set to verify integration

### Production
- Verify GA4 is receiving data in Real-Time reports
- Check Search Console for indexing status
- Monitor both tools regularly for insights
