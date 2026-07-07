# Maranatha Christian Church - Deployment Guide

## Table of Contents
1. [Project Status](#project-status)
2. [Vercel Deployment](#vercel-deployment)
3. [Domain Configuration](#domain-configuration)
4. [SSL Certificate](#ssl-certificate)
5. [Google Analytics Setup](#google-analytics-setup)
6. [Post-Deployment Checklist](#post-deployment-checklist)

## Project Status

### ✅ Completed Features
- **Multi-Language Support**: 4 languages (English, Spanish, French, Dutch)
- **Sermon Upload System**: Video and photo upload with automatic organization
- **Performance Optimization**: Lazy loading, image optimization, monitoring
- **Accessibility Features**: Complete accessibility compliance with panel
- **SEO Optimization**: Meta tags, structured data, sitemap
- **Mobile Responsive**: Perfect mobile experience
- **Content Populated**: Realistic sermons and events content
- **Admin Guide**: Comprehensive management documentation

### 🚀 Ready for Deployment
The website is production-ready with all Phase 11 and Phase 12 features implemented.

## Vercel Deployment

### Prerequisites
- Node.js 18+ installed locally
- Vercel account (free tier is sufficient)
- Git repository (GitHub, GitLab, or Bitbucket)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy the Website
```bash
# From the project root directory
cd "c:\Users\mussi\Music\church website"
vercel --prod
```

### Step 4: Configure Environment Variables
In Vercel dashboard, set these environment variables:
```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@your-domain.com
```

### Step 5: Verify Deployment
- Check that the site loads correctly
- Test all language switching
- Verify sermon upload functionality
- Test mobile responsiveness
- Check accessibility features

### Step 4: Configure Project Settings
1. Visit your Vercel dashboard
2. Go to Project Settings
3. Set environment variables:
   - `NEXT_PUBLIC_BASE_URL`: Your production URL
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Your GA4 measurement ID
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your webhook secret
   - `JWT_SECRET`: Your JWT secret
   - `ADMIN_EMAIL`: Admin email address

### Step 5: Add Custom Domain
1. In Vercel dashboard, go to Domains
2. Add your custom domain (e.g., maranatha.church)
3. Follow the DNS configuration instructions

### Step 6: Verify Deployment
1. Visit your deployed site
2. Test all functionality
3. Check console for errors
4. Test mobile responsiveness

## Domain Configuration

### DNS Settings
Once you've added your domain to Vercel, you'll need to configure DNS:

#### For Root Domain (maranatha.church)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 300
```

#### For WWW Subdomain (www.maranatha.church)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

#### For Email (Optional)
```
Type: MX
Name: @
Value: aspmx.l.google.com
Priority: 10
TTL: 300
```

### DNS Propagation
- DNS changes typically take 24-48 hours to propagate
- You can check propagation using tools like dnschecker.org
- Vercel will automatically detect when DNS is configured correctly

## SSL Certificate

### Automatic SSL
Vercel provides free SSL certificates for all deployments:
- **Automatic**: SSL is automatically configured
- **Renewal**: Certificates auto-renew before expiration
- **HTTPS**: All traffic is automatically redirected to HTTPS
- **Wildcard**: Supports subdomains

### SSL Configuration
1. In Vercel dashboard, go to Settings → Domains
2. Verify your domain shows "Valid SSL"
3. Check that "Force HTTPS" is enabled
4. Test SSL certificate using SSL Labs test

### SSL Best Practices
- Ensure all internal links use HTTPS
- Update any hardcoded HTTP URLs
- Verify third-party scripts support HTTPS
- Test SSL certificate on different browsers

## Google Analytics Setup

### Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create account: "Maranatha Christian Church"
5. Create property: "Maranatha Church Website"
6. Choose industry: "Religious Organizations"
7. Choose business size: "Small business"
8. Accept terms and conditions

### Get Measurement ID
1. After setup, go to Admin → Data Streams
2. Find your Web Data Stream
3. Copy the Measurement ID (format: G-XXXXXXXXXX)

### Configure in Application
1. Add measurement ID to environment variables:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

2. Update Vercel environment variables
3. Redeploy the application

### Analytics Configuration
1. Enable Enhanced Measurement
2. Set up Goals:
   - Newsletter signups
   - Prayer requests
   - Event registrations
   - Donations
3. Configure Custom Events:
   - sermons_downloaded
   - prayer_requests_submitted
   - donations_completed
   - members_registered

### Privacy Compliance
1. Update privacy policy to mention Google Analytics
2. Add cookie consent banner if needed
3. Configure data retention settings
4. Enable anonymize IP addresses

## Post-Deployment Checklist

### Functionality Testing
- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] Mobile responsive design
- [ ] Prayer request form submission
- [ ] Donation form processing
- [ ] Member registration and login
- [ ] Live streaming functionality
- [ ] Contact form submission

### Performance Testing
- [ ] Page load speed under 3 seconds
- [ ] Mobile performance score above 90
- [ ] Core Web Vitals passing
- [ ] Image optimization working
- [ ] Caching configured correctly

### SEO Verification
- [ ] Meta tags displaying correctly
- [ ] Open Graph tags working
- [ ] Structured data valid
- [ ] Sitemap.xml accessible
- [ ] Robots.txt correct
- [ ] Google Search Console setup

### Security Verification
- [ ] HTTPS redirect working
- [ ] SSL certificate valid
- [ ] Security headers present
- [ ] No console errors
- [ ] Environment variables secure
- [ ] CSRF protection active

### Analytics Verification
- [ ] Google Analytics tracking visits
- [ ] Custom events firing correctly
- [ ] Goals conversion tracking
- [ ] Real-time data showing
- [ ] Demographics data collecting

### Content Verification
- [ ] Sample sermons displaying
- [ ] Events calendar functional
- [ ] Blog posts accessible
- [ ] Images loading correctly
- [ ] Videos playing properly
- [ ] Forms validating correctly

## Monitoring and Maintenance

### Regular Tasks
- **Weekly**: Check analytics, monitor performance
- **Monthly**: Review security updates, backup data
- **Quarterly**: Update content, review SEO
- **Annually**: Major updates, security audit

### Monitoring Tools
- **Vercel Analytics**: Performance monitoring
- **Google Analytics**: User behavior tracking
- **Google Search Console**: SEO monitoring
- **Uptime monitoring**: Site availability

### Backup Strategy
- **Code backups**: Git repository
- **Content backups**: CMS database
- **Analytics data**: Google Analytics export
- **Configuration**: Environment variables backup

## Troubleshooting

### Common Issues

#### Build Errors
- Check Node.js version compatibility
- Verify all dependencies installed
- Check for TypeScript errors
- Review environment variables

#### Deployment Issues
- Verify Vercel CLI authentication
- Check environment variable names
- Review vercel.json configuration
- Check build logs for errors

#### DNS Issues
- Verify DNS configuration
- Check propagation status
- Clear local DNS cache
- Contact domain registrar if needed

#### SSL Issues
- Wait for DNS propagation
- Check domain configuration
- Verify Vercel SSL settings
- Contact Vercel support if needed

### Support Resources
- **Vercel Documentation**: vercel.com/docs
- **Google Analytics Help**: support.google.com/analytics
- **Google Search Console**: search.google.com/search-console
- **Community Forums**: Stack Overflow, Reddit

---

## Quick Reference

### Important URLs
- **Vercel Dashboard**: vercel.com/dashboard
- **Google Analytics**: analytics.google.com
- **Search Console**: search.google.com/search-console
- **SSL Labs**: ssllabs.com/ssltest

### Environment Variables
```bash
NEXT_PUBLIC_BASE_URL=https://maranatha.church
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@maranatha.church
```

### DNS Records
```
A @ 76.76.21.21
CNAME www cname.vercel-dns.com
MX @ aspmx.l.google.com
```

---

*Last updated: [Current Date]*  
*Version: 1.0*  
*For technical support, contact the development team.*
