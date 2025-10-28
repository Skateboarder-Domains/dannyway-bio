# Danny Way Official Biography Website

An SEO-optimized, comprehensive 10+ page biography website dedicated to legendary professional skateboarder **Danny Way**.

![Part of the skateboard.bio network](https://img.shields.io/badge/skateboard.bio-network-red)

## 🌟 Overview

This website celebrates the life, career, and achievements of Danny Way - a pioneering professional skateboarder known for:
- Jumping the Great Wall of China (2005)
- Pioneering the Mega Ramp
- 2x Thrasher Skater of the Year
- Multiple X Games gold medals
- Co-founding Plan B Skateboards and DC Shoes

## 📁 Site Structure

### Pages (10+ Total)

1. **index.html** - Homepage with hero section, quick stats, and featured content
2. **biography.html** - Comprehensive life story from birth to present
3. **achievements.html** - World records, awards, and accomplishments
4. **great-wall.html** - Dedicated page about the historic Great Wall jump
5. **mega-ramp.html** - The innovation that revolutionized skateboarding
6. **videos.html** - Video parts and media appearances
7. **companies.html** - Plan B Skateboards & DC Shoes ventures
8. **gallery.html** - Photo gallery of iconic moments
9. **timeline.html** - Complete career timeline from 1974 to present
10. **contact.html** - Social media links and connection information

### Assets

- **styles.css** - Comprehensive, mobile-responsive CSS with modern design
- **main.js** - Navigation, animations, and interactive features
- **sitemap.xml** - SEO sitemap for search engines
- **robots.txt** - Search engine crawling instructions

## 🎨 Design Features

### Modern, Professional Design
- Clean, modern aesthetic with custom color scheme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Accessible navigation with mobile hamburger menu
- Consistent branding throughout

### Color Palette
- Primary: `#1a1a1a` (Dark charcoal)
- Secondary: `#e74c3c` (Bold red)
- Accent: `#3498db` (Vibrant blue)

### Typography
- System fonts for optimal performance
- Clear hierarchy and readability
- Optimized line heights and spacing

## 🚀 Technical Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No dependencies, lightweight
- **Cloudflare Pages Functions** - Serverless API

### Backend
- **Neon PostgreSQL** - Shared database across 150+ skater sites
- **Cloudflare Pages** - Global CDN hosting
- **Node.js compatibility** - For database connections

## 📊 SEO Optimization

### Meta Tags
- Unique title and description for each page
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data
- JSON-LD schema for Person
- Social media profile links
- Career achievements and awards

### Performance
- Minimal dependencies
- Optimized CSS and JavaScript
- Fast loading times
- Mobile-first approach

### Discoverability
- XML sitemap
- Robots.txt configuration
- Semantic HTML
- Internal linking structure
- Alt text for accessibility

## 🗄️ Database Integration

### API Endpoint
`GET /api/skater` - Returns Danny Way's profile data

### Data Schema
```javascript
{
  id: "uuid",
  slug: "dannyway",
  full_name: "Danny Way",
  nickname: "The Daredevil",
  bio: "...",
  birth_date: "1974-04-15",
  birthplace: "Portland, Oregon",
  hometown: "San Diego, California",
  stance: "goofy",
  turned_pro_year: 1989,
  sponsors: ["DC Shoes", "Plan B Skateboards"],
  social_links: {
    instagram: "dannywayofficial",
    twitter: "dannywayofficial"
  }
}
```

## 🌐 Deployment

### Cloudflare Pages Setup

1. **Connect Repository**
   - Link GitHub repository to Cloudflare Pages

2. **Build Settings**
   - Build command: `npm install`
   - Build output directory: `.`
   - Root directory: (leave blank)

3. **Environment Variables**
   ```
   NEON_DATABASE_URL=<connection-string>
   ```

4. **Custom Domain**
   - Configure `dannyway.bio` in Cloudflare Pages dashboard

### Local Development

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Setup
```bash
# Install dependencies
npm install --omit=dev

# Create .dev.vars file
echo "NEON_DATABASE_URL=<your-connection-string>" > .dev.vars
echo "SKATER_SLUG=dannyway" >> .dev.vars

# Run development server
npm run dev
```

**Note**: Windows ARM64 users may encounter issues with `wrangler`. Use WSL2, Replit, or deploy to Cloudflare Pages instead.

## 🎯 Key Features

### Content Highlights
- ✅ Comprehensive biography with early life, career, and legacy
- ✅ Detailed achievements and world records
- ✅ Historic Great Wall jump documentation
- ✅ Mega Ramp innovation story
- ✅ Video parts and media history
- ✅ Business ventures (Plan B, DC Shoes)
- ✅ Complete career timeline
- ✅ Photo gallery sections
- ✅ Social media integration

### Technical Highlights
- ✅ 10+ fully functional pages
- ✅ Mobile-responsive design
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Database-driven content
- ✅ Fast load times
- ✅ Accessible navigation
- ✅ Structured data (JSON-LD)
- ✅ Social sharing optimization

## 📱 Responsive Design

The site is fully responsive across all devices:
- **Desktop** (1200px+) - Full layout with navigation bar
- **Tablet** (768px-1199px) - Adaptive grid layouts
- **Mobile** (<768px) - Hamburger menu, stacked layouts

## 🔍 SEO Keywords

Primary keywords:
- Danny Way
- Danny Way biography
- Danny Way Great Wall
- Mega Ramp skateboarding
- Professional skateboarder
- Plan B Skateboards
- DC Shoes founder

## 🤝 Part of skateboard.bio Network

This site is part of the **skateboard.bio network** - a content delivery system serving 150+ professional skateboarder biography sites.

### Network Benefits
- Single source of truth (shared database)
- Unique branding per skater
- Consistent data across all sites
- Centralized management
- Independent deployments

## 📄 License

MIT License - Part of the skateboard.bio network

## 🔗 Links

- **Live Site**: https://dannyway.bio
- **Network**: https://skateboard.bio
- **Instagram**: [@dannywayofficial](https://instagram.com/dannywayofficial)
- **Twitter**: [@dannywayofficial](https://twitter.com/dannywayofficial)

## 📈 Future Enhancements

Potential additions:
- [ ] Video embeds from YouTube/Vimeo
- [ ] Photo gallery with actual images
- [ ] Blog/news section
- [ ] Interactive timeline with filters
- [ ] E-commerce integration for merchandise
- [ ] Newsletter subscription
- [ ] Multi-language support

## 👨‍💻 Development

Built with:
- Extensive research on Danny Way's career
- SEO best practices
- Modern web standards
- Accessibility guidelines
- Performance optimization

---

**Built for the skateboard.bio network** | Celebrating skateboarding legends since 2024
