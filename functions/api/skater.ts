import { neon } from '@neondatabase/serverless';

interface Env {
  NEON_DATABASE_URL: string;
  SKATER_SLUG?: string; // Optional: Override slug detection for local development
}

/**
 * Auto-detect skater slug from the deployment context
 * Works by extracting from: environment variable, query parameter, domain name, or request URL
 */
function getSkaterSlug(request: Request, env?: Env): string {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // 1. Check for environment variable (best for local development)
  if (env?.SKATER_SLUG) {
    return env.SKATER_SLUG;
  }
  
  // 2. Check for query parameter (e.g., ?slug=tonyhawk)
  const slugParam = url.searchParams.get('slug');
  if (slugParam) {
    return slugParam.replace(/-/g, '');
  }
  
  // 3. Extract slug from production domain name (e.g., tonyhawk.bio → tonyhawk)
  const domainMatch = hostname.match(/^([a-z0-9-]+)\.bio$/);
  if (domainMatch) {
    return domainMatch[1].replace(/-/g, '');
  }
  
  // 4. Extract from Cloudflare Pages subdomain (e.g., tonyhawk-bio.pages.dev → tonyhawk)
  const pagesMatch = hostname.match(/^([a-z0-9-]+)-bio\.pages\.dev$/);
  if (pagesMatch) {
    return pagesMatch[1].replace(/-/g, '');
  }
  
  // 5. Development environments: extract from hostname pattern
  // Handles: tonyhawk-bio.replit.dev, tonyhawk-bio--*.pages.dev (preview), localhost
  const devMatch = hostname.match(/^([a-z0-9-]+)-bio[.-]/);
  if (devMatch) {
    return devMatch[1].replace(/-/g, '');
  }
  
  // Fallback: return 'unknown' with helpful error
  return 'unknown';
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    // Check if database URL is configured
    if (!context.env.NEON_DATABASE_URL) {
      return new Response(JSON.stringify({ 
        error: 'Database not configured',
        message: 'NEON_DATABASE_URL environment variable is missing. See DEV-GUIDE.md for setup instructions.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const sql = neon(context.env.NEON_DATABASE_URL);
    const skaterSlug = getSkaterSlug(context.request, context.env);
    
    console.log(`[API] Fetching skater with slug: ${skaterSlug}`);
    
    // Query the shared database
    const skaters = await sql`
      SELECT * FROM skaters 
      WHERE slug = ${skaterSlug}
      LIMIT 1
    `;
    
    if (skaters.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Skater not found',
        slug: skaterSlug,
        message: `No skater record found for slug '${skaterSlug}'. Contact admin to add this skater to the database.`
      }), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    return new Response(JSON.stringify(skaters[0]), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error: any) {
    console.error('[API] Error fetching skater:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
