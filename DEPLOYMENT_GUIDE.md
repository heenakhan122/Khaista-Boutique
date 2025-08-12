# Deployment Guide for Khaista Boutique

This guide covers deploying your Khaista Boutique e-commerce application to various platforms.

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database setup and migrations run
- [ ] Build process tested locally
- [ ] All tests passing
- [ ] Assets optimized and included

## Platform-Specific Deployment

### Vercel (Recommended for Full-Stack)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   DATABASE_URL=your_postgres_url
   SESSION_SECRET=random_secret_string
   STRIPE_SECRET_KEY=sk_live_... (if using Stripe)
   VITE_STRIPE_PUBLIC_KEY=pk_live_... (if using Stripe)
   ```

4. **Database Setup**
   - Use Vercel Postgres or external provider
   - Run migrations after deployment

### Railway

1. **Create Railway Project**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   ```

2. **Configure Build**
   ```bash
   railway add postgresql
   railway deploy
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set DATABASE_URL=$DATABASE_URL
   railway variables set SESSION_SECRET=your_secret
   ```

### Render

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repo

2. **Build Configuration**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   Add in Render dashboard:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - Stripe keys (if applicable)

### Netlify (Frontend Only)

For static deployment (without backend):

1. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Database Options

### Neon (Recommended)
- Serverless PostgreSQL
- Free tier available
- Easy setup and scaling

### Supabase
- PostgreSQL with additional features
- Real-time capabilities
- Built-in auth (if needed)

### PlanetScale
- MySQL-compatible
- Branching for database schemas
- Easy scaling

## Environment Setup

### Production Environment Variables
```env
# Production Database
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# Session Secret (generate strong random string)
SESSION_SECRET="super-strong-random-secret-for-production"

# Stripe Live Keys
STRIPE_SECRET_KEY="sk_live_..."
VITE_STRIPE_PUBLIC_KEY="pk_live_..."

# Environment
NODE_ENV="production"
```

### Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong random secrets
   - Rotate keys regularly

2. **Database Security**
   - Enable SSL connections
   - Use connection pooling
   - Regular backups

3. **HTTPS**
   - Ensure SSL certificates
   - Redirect HTTP to HTTPS
   - Secure cookie settings

## Performance Optimization

### Build Optimization
```bash
# Optimize bundle size
npm run build -- --analyze

# Compress assets
npm install -g gzip-cli
gzip-cli dist/**/*.{js,css,html}
```

### CDN Setup
- Configure CDN for static assets
- Enable image optimization
- Set appropriate cache headers

## Monitoring

### Error Tracking
- Sentry for error monitoring
- LogRocket for user sessions
- Google Analytics for traffic

### Performance
- Lighthouse CI for performance testing
- Core Web Vitals monitoring
- Database query optimization

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### Code Backups
- GitHub as primary repository
- Multiple deployment environments
- Tagged releases for rollback

## Custom Domain Setup

1. **DNS Configuration**
   ```
   A     @     your-server-ip
   CNAME www   your-domain.com
   ```

2. **SSL Certificate**
   - Let's Encrypt (free)
   - CloudFlare SSL
   - Platform-provided SSL

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Review build logs

2. **Database Connection**
   - Verify connection string format
   - Check SSL requirements
   - Test connection locally

3. **Environment Variables**
   - Ensure all required vars set
   - Check variable naming
   - Verify secrets are correct

### Debug Commands
```bash
# Check build locally
npm run build && npm start

# Test database connection
npm run db:check

# Verify environment
npm run env:check
```

## Post-Deployment

### Final Checks
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Database operations work
- [ ] Forms submit properly
- [ ] Images load correctly
- [ ] Mobile responsiveness
- [ ] Performance acceptable

### Going Live
1. Update DNS records
2. Enable monitoring
3. Set up backups
4. Monitor for 24-48 hours
5. Announce launch

## Support

For deployment issues:
- Check platform documentation
- Review logs and error messages
- Contact platform support if needed
- Create GitHub issue for code-related problems