# Skater Biography Site

> Part of the **[skateboard.bio network](https://skateboard.bio)** - 150+ professional skateboarder biography sites

## 🚀 Quick Start

**This site connects to a shared database** - all skater content is managed centrally while each site can have unique branding.

### 1. Get Database Access

Contact the skateboard.bio admin for the `NEON_DATABASE_URL` connection string.

### 2. Choose Your Development Environment

#### Replit (Recommended for Beginners)
1. Fork this repo to Replit
2. Add `NEON_DATABASE_URL` to Secrets (🔒 icon)
3. Click Run

#### Lovable / v0 / Bolt
1. Import this repository
2. Add `NEON_DATABASE_URL` environment variable  
3. Deploy from the interface

#### VS Code / Cursor / Claude Code
```bash
git clone <repo-url>
cd <repo-name>
npm install
echo "NEON_DATABASE_URL=postgresql://..." > .dev.vars
npm run dev
```

Open http://localhost:8788

## 📖 Full Documentation

See **[DEV-GUIDE.md](./DEV-GUIDE.md)** for:
- Complete setup instructions for all platforms
- Architecture explanation
- API documentation
- Customization guide
- Troubleshooting help

## 🗄️ How It Works

```
Your Site (Custom Design)
    ↓ queries
Shared Neon Database (empty-cherry-02878215)
    ↓ returns
Skater Profile Data
```

**Benefits**:
- ✅ Update content in one place, propagates to all sites
- ✅ Custom design per skater
- ✅ No database management needed
- ✅ Instant content updates

## 🎨 Customize

Edit `index.html` to change:
- Colors & styling
- Layout & structure  
- Branding & imagery

The `/api/skater` endpoint automatically fetches the right data based on your domain name.

## 🚢 Deploy

### Cloudflare Pages (Auto-deploy)
Pushing to `main` branch triggers automatic deployment.

**Environment Variable Required**:
- `NEON_DATABASE_URL` - Add in Cloudflare Pages settings

## 🔗 Resources

- [Full Development Guide](./DEV-GUIDE.md)
- [skateboard.bio Network](https://skateboard.bio)
- [Example: chloecovell.bio](https://chloecovell.bio)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

**Powered by**: Cloudflare Pages + Neon PostgreSQL + skateboard.bio network
