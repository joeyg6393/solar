# Deployment Guide - Solar Solutions Website

## Quick Start Deployment (5 minutes)

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from project directory**
   ```bash
   cd C:\Users\gent3\Documents\Code\Tyler\claude-code-agents-wizard-v2\solar-website
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project? No
   - Project name: solar-solutions-springfield
   - Which directory? ./ (current directory)
   - Production? Yes

4. **Your site is live!**
   - URL: https://solar-solutions-springfield.vercel.app
   - Custom domain can be added in Vercel dashboard

**Advantages:**
- Free tier includes 100 GB bandwidth
- Automatic HTTPS
- Global CDN (300+ edge locations)
- Automatic deployments on git push
- Analytics included
- Environment variables UI
- Zero configuration needed

---

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Follow prompts:**
   - Create & configure site
   - Publish directory: `.next`

**Advantages:**
- Free tier with 100 GB bandwidth
- Form handling built-in
- Split testing
- Edge functions

---

### Option 3: Digital Ocean App Platform

1. **Install doctl CLI**
   ```bash
   # Download from: https://docs.digitalocean.com/reference/doctl/
   ```

2. **Authenticate**
   ```bash
   doctl auth init
   ```

3. **Create app.yaml**
   ```yaml
   name: solar-solutions
   region: nyc
   services:
   - name: web
     github:
       repo: your-username/solar-solutions
       branch: main
       deploy_on_push: true
     build_command: npm run build
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     http_port: 3000
     routes:
     - path: /
   ```

4. **Deploy**
   ```bash
   doctl apps create --spec app.yaml
   ```

**Cost:** ~$5/month for basic tier

---

### Option 4: Traditional VPS (Any Linux Server)

#### Using PM2 (Production Process Manager)

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js (if not installed)**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone/upload your project**
   ```bash
   cd /var/www
   git clone your-repo
   # OR upload via SCP/SFTP
   ```

4. **Install dependencies and build**
   ```bash
   cd solar-website
   npm install
   npm run build
   ```

5. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

6. **Start with PM2**
   ```bash
   pm2 start npm --name "solar-website" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx as reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Advantages:**
- Full control
- No platform limitations
- Can host multiple apps

---

### Option 5: Docker Container

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production

   COPY --from=builder /app/next.config.ts ./
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build image**
   ```bash
   docker build -t solar-website .
   ```

3. **Run container**
   ```bash
   docker run -d -p 3000:3000 --name solar-website solar-website
   ```

4. **Deploy to any Docker host** (DigitalOcean, AWS ECS, etc.)

---

## Environment Variables

Create `.env.local` file:

```env
# Database (from parent project)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Optional: Forms/CRM
SENDGRID_API_KEY="your-key"
HUBSPOT_API_KEY="your-key"

# Site URL
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

**Important:** Never commit `.env.local` to git!

---

## Custom Domain Setup

### On Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Update DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### On Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### On Digital Ocean
1. Go to App Settings > Domains
2. Add domain
3. Update DNS to point to App Platform

---

## Post-Deployment Checklist

### Immediate (Do First)
- [ ] Verify all 434 pages load correctly
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Verify phone click-to-call works
- [ ] Test navigation on all page types
- [ ] Check images load properly

### SEO Setup (First Week)
- [ ] Submit sitemap to Google Search Console
  - URL: https://your-domain.com/sitemap.xml
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
  - URL: https://your-domain.com/robots.txt
- [ ] Set up Google Analytics
- [ ] Set up Google Tag Manager
- [ ] Create Google My Business listing
- [ ] Claim local business listings (Yelp, Yellow Pages, etc.)

### Performance (First Week)
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test on PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Test on GTmetrix
- [ ] Verify CDN is working
- [ ] Check image optimization

### Marketing (First Month)
- [ ] Set up email marketing integration
- [ ] Configure CRM connections
- [ ] Add live chat widget (optional)
- [ ] Set up call tracking
- [ ] Configure lead notifications
- [ ] Create email autoresponders

### Monitoring (Ongoing)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Set up analytics dashboards
- [ ] Monitor form submissions
- [ ] Track conversion rates
- [ ] Review search rankings weekly

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Pages Not Found (404)
- Verify JSON files exist in parent `/pages/` directory
- Check `generateStaticParams` in `app/[slug]/page.tsx`
- Ensure data loading paths are correct

### Images Not Loading
- Check Next.js Image configuration in `next.config.ts`
- Verify Unsplash URLs are accessible
- Add image domains to `remotePatterns`

### Contact Form Not Working
- Verify API route exists: `/app/api/contact/route.ts`
- Check database connection
- Review Prisma schema
- Test endpoint directly: `POST /api/contact`

### Slow Build Times
- Build is slow due to 434 static pages (normal)
- Use ISR (Incremental Static Regeneration) if needed
- Consider on-demand revalidation for dynamic content

---

## Scaling Considerations

### High Traffic (10k+ visitors/day)
- Use Vercel Pro plan or Enterprise
- Enable Vercel Analytics
- Configure ISR for popular pages
- Add Redis caching layer
- Use CDN for static assets

### Multiple Locations/Services
- Current structure supports unlimited combinations
- Add new locations to `/locations.json`
- Add new services to `/service-schema-template.json`
- Generate new page JSONs
- Rebuild site

### Database Load
- Index frequently queried fields
- Use connection pooling (PgBouncer)
- Consider read replicas for high traffic
- Cache database queries (Redis)

---

## Backup Strategy

### Code Backup
- Git repository (primary backup)
- GitHub/GitLab (remote backup)
- Local clones on multiple machines

### Database Backup
```bash
# Daily automated backup
pg_dump database_name > backup_$(date +%Y%m%d).sql

# Restore from backup
psql database_name < backup_20241229.sql
```

### Static Files Backup
- Vercel automatically backs up deployments
- Keep copy of `/public` directory
- Backup JSON data files regularly

---

## Support Resources

### Documentation
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

### Community
- Next.js Discord: https://discord.gg/nextjs
- Stack Overflow: https://stackoverflow.com/questions/tagged/next.js
- GitHub Issues: https://github.com/vercel/next.js/issues

### Professional Support
- Vercel Support (Pro/Enterprise plans)
- Hire Next.js developer
- Digital agency partnerships

---

## Cost Estimate

### Vercel (Hobby - Free)
- 100 GB bandwidth/month
- Unlimited websites
- Automatic SSL
- **Cost: $0/month**

### Vercel (Pro)
- 1 TB bandwidth/month
- Enhanced performance
- Analytics
- **Cost: $20/month**

### Traditional VPS
- Digital Ocean Droplet
- 1 GB RAM, 25 GB SSD
- **Cost: $6/month**

### Domain Name
- .com domain registration
- **Cost: $10-15/year**

### Total Minimum Monthly Cost
- **Free tier**: $0/month (+ domain ~$1/month)
- **Recommended**: $20/month (Vercel Pro + domain)

---

## Launch Timeline

### Day 1: Deployment
- Deploy to Vercel/Netlify
- Configure custom domain
- Test all functionality

### Days 2-3: SEO Setup
- Submit sitemaps
- Set up Google Search Console
- Configure analytics
- Create Google My Business

### Week 1: Marketing Setup
- Configure lead capture
- Set up email marketing
- Add tracking pixels
- Create social media profiles

### Week 2: Content Review
- Review all service descriptions
- Add real testimonials
- Replace placeholder images
- Verify contact information

### Month 1: Optimization
- Review analytics
- Optimize high-traffic pages
- A/B test CTAs
- Build initial backlinks

---

**Ready to deploy?** Choose your platform above and follow the steps. Most deployments take less than 10 minutes!

For questions or support, refer to the platform documentation linked above.
