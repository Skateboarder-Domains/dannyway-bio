# Skater Bio - Development Guide

This repository is part of the **skateboard.bio network** - a content delivery system serving 150+ professional skateboarder biography sites. Each skater gets their own custom-designed site, but all sites query the **same shared Neon PostgreSQL database** for content.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│  150+ Individual Skater Repos                           │
│  (tonyhawk.bio, rodneymullen.bio, chloecovell.bio...)  │
│                                                          │
│  • Custom designs (unique per skater)                   │
│  • Independent deployments (Cloudflare Pages)           │
│  • Own GitHub repositories                              │
└──────────────┬──────────────────────────────────────────┘
               │
               │ All query the same database ↓
               │
┌──────────────▼──────────────────────────────────────────┐
│  Shared Neon PostgreSQL Database                        │
│  (empty-cherry-02878215)                                │
│                                                          │
│  Tables: skaters, media_assets, timeline, parts,        │
│          contests, domains                              │
└─────────────────────────────────────────────────────────┘
```

**Benefits**:
- ✅ Single source of truth for all content
- ✅ Each skater can have unique branding
- ✅ Content updates propagate to all sites
- ✅ Independent scaling per domain
- ✅ Centralized data management

## 🚀 Quick Start

### Environment Variables

You need one required environment variable and one optional variable:

#### Required:
```bash
NEON_DATABASE_URL=<get_from_admin>
```

**Where to get it**: 
- **DO NOT use any credentials from this repository or commits** - they have been rotated
- Contact the skateboard.bio admin for current credentials
- Or check Domain Steward project settings if you have admin access
- Format: `postgresql://username:password@host/database?sslmode=require`

#### Optional (for local development):
```bash
SKATER_SLUG=tonyhawk
```

**When to use**: The API automatically detects the skater slug from the domain name in production (e.g., `tonyhawk.bio` → `tonyhawk`). In local development environments where the domain doesn't match this pattern, you can:

1. **Set `SKATER_SLUG` environment variable** (recommended for consistency)
2. **Use a query parameter**: `http://localhost:8788/api/skater?slug=tonyhawk`
3. **Let it auto-detect**: The API will try to extract the slug from your hostname (works for `tonyhawk-bio.replit.dev`, etc.)

### Local Development

#### Option 1: Replit

1. Fork this repository to your Replit account
2. Replit will detect the `.replit` configuration automatically
3. Add environment variables to Secrets:
   - Click the lock icon 🔒 in the left sidebar
   - Add secret: `NEON_DATABASE_URL` with the connection string
   - Add secret: `SKATER_SLUG` with the skater's slug (e.g., `tonyhawk`)
4. Click **Run** - the site will start on `https://<your-repl>.replit.dev`
5. Test the API: Visit `https://<your-repl>.replit.dev/api/skater`

**Advantages**: Zero setup, instant preview, collaborative editing

**Note**: The skater slug will be auto-detected from the repository name if you named it correctly (e.g., `tonyhawk-bio`). Setting `SKATER_SLUG` manually ensures it always works.

#### Option 2: Lovable / v0

1. Import this repository
2. Add environment variable `NEON_DATABASE_URL`
3. The platform will auto-detect Cloudflare Pages configuration
4. Deploy directly from the interface

**Advantages**: AI-assisted development, visual editing, instant deploys

#### Option 3: Claude Code / Cursor / VS Code

1. Clone the repository:
   ```bash
   git clone https://github.com/Skateboarder-Domains/<repo-name>.git
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.dev.vars` file (for Cloudflare Pages local dev):
   ```bash
   NEON_DATABASE_URL=<get_from_admin>
   SKATER_SLUG=tonyhawk
   ```
   
   **Security**: Never commit `.dev.vars` to Git - it's already in `.gitignore`

4. Run local development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:8788
6. Test the API: Visit http://localhost:8788/api/skater

**Alternative without `.dev.vars`**: Use query parameter: `http://localhost:8788/api/skater?slug=tonyhawk`

**Advantages**: Full IDE features, debugging, local control

## 📁 Project Structure

```
.
├── index.html              # Homepage (customize per skater)
├── functions/
│   └── api/
│       └── skater.ts      # API endpoint - fetches from shared DB
├── package.json           # Dependencies
├── wrangler.toml          # Cloudflare Pages config
├── .replit                # Replit configuration
├── replit.nix             # Replit environment setup
├── DEV-GUIDE.md          # This file
└── README.md              # Project overview
```

## 🎨 Customization

### Change the Design

Edit `index.html` to customize:
- **Colors**: Update CSS variables in the `<style>` section
- **Layout**: Modify HTML structure
- **Fonts**: Change font-family declarations
- **Branding**: Add logos, update text, change imagery

### Change the Data

The `/api/skater` endpoint automatically fetches data based on the domain's slug (extracted from the repository name).

**Example**: For `tonyhawk.bio`:
- Repo name: `tonyhawk-bio`
- Slug extracted: `tonyhawk`
- Database query: `SELECT * FROM skaters WHERE slug = 'tonyhawk'`

**To add your skater data**: Contact the admin to add your record to the shared database, or use the database management tools in Domain Steward.

## 🔌 API Endpoints

### `GET /api/skater`

Returns the skater's complete profile from the shared database.

**Response**:
```json
{
  "id": "uuid",
  "slug": "tonyhawk",
  "full_name": "Tony Hawk",
  "nickname": "Birdman",
  "bio": "...",
  "birth_date": "1968-05-12",
  "birthplace": "San Diego, California",
  "hometown": "San Diego, California",
  "stance": "goofy",
  "turned_pro_year": 1982,
  "sponsors": ["Birdhouse", "Vans", "Independent"],
  "social_links": {
    "instagram": "tonyhawk",
    "twitter": "tonyhawk",
    "youtube": "tonyhawk"
  },
  "profile_image_url": "https://...",
  "is_active": true
}
```

## 🚢 Deployment

### Cloudflare Pages (Recommended)

This repository is configured for Cloudflare Pages deployment:

1. **Automatic Deployment**: Pushing to `main` branch triggers deployment
2. **Build Settings** (configure in Cloudflare dashboard):
   - Build command: `npm install`
   - Build output directory: `.`
   - Root directory: (leave blank)

3. **Environment Variables** (add in Cloudflare Pages settings):
   - `NEON_DATABASE_URL`: Connection string to shared database

4. **Custom Domain**: Configure in Cloudflare Pages > Custom domains

### Manual Deployment

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy .
```

## 🗄️ Database Schema

The shared database includes:

### `skaters` Table
- `id` (uuid)
- `slug` (text, unique)
- `full_name`, `nickname`, `bio`
- `birth_date`, `birthplace`, `hometown`
- `stance` (regular/goofy)
- `turned_pro_year` (integer)
- `sponsors` (text array)
- `social_links` (jsonb)
- `profile_image_url`, `header_image_url`
- `is_active` (boolean)
- `created_at`, `updated_at`

### Other Tables
- `media_assets`: Photos, videos
- `timeline`: Career events
- `parts`: Video parts
- `contests`: Competition results
- `domains`: Domain mapping

## 🔧 Troubleshooting

### Build Error: "Could not resolve @neondatabase/serverless"

**Problem**: Cloudflare Pages build fails with error about `@neondatabase/serverless`.

**Solution**: The `wrangler.toml` file must include Node.js compatibility:
```toml
compatibility_flags = ["nodejs_compat"]
```

This is already in the template. If you're seeing this error:
1. Verify your `wrangler.toml` includes `compatibility_flags = ["nodejs_compat"]`
2. Commit and push the change to GitHub
3. Cloudflare Pages will automatically redeploy

### API Returns HTML Instead of JSON

**Problem**: The `/api/skater` endpoint serves the homepage instead of JSON.

**Solution**: Configure build settings in Cloudflare Pages:
1. Go to Pages > Your project > Settings > Builds & deployments
2. Set build command: `npm install`
3. Set build output directory: `.`
4. Redeploy

### Database Connection Errors

**Problem**: Cannot connect to Neon database.

**Symptoms**:
- 500 errors on API endpoints
- "Connection refused" messages
- Empty data responses

**Solutions**:
1. Verify `NEON_DATABASE_URL` is set correctly
2. Check the connection string format includes `?sslmode=require`
3. Ensure database is accessible (not paused in Neon dashboard)
4. Test connection: `curl https://your-domain.bio/api/skater`

### Skater Data Not Found

**Problem**: API returns 404 or empty data.

**Solution**: Your skater record might not exist in the database yet. Contact admin or add via Domain Steward database tools.

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Neon PostgreSQL Docs](https://neon.tech/docs/)
- [skateboard.bio Main Site](https://skateboard.bio)
- [Domain Steward Dashboard](https://domain-steward.replit.app)

## 🤝 Support

- **Technical Issues**: Open an issue on GitHub
- **Database Access**: Contact skateboard.bio admin
- **Domain Configuration**: Use Domain Steward dashboard
- **Design Help**: See examples at chloecovell.bio

---

**Part of the skateboard.bio network** | Powered by Cloudflare Pages + Neon PostgreSQL
