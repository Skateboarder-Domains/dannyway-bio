-- Danny Way Comprehensive Database Schema
-- This schema extends the existing skateboard.bio network database

-- Main skater profile table (extends existing skaters table)
CREATE TABLE IF NOT EXISTS skaters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    bio TEXT,
    birth_date DATE,
    birthplace VARCHAR(100),
    hometown VARCHAR(100),
    stance VARCHAR(10) CHECK (stance IN ('regular', 'goofy')),
    turned_pro_year INTEGER,
    sponsors TEXT[],
    social_links JSONB,
    profile_image_url TEXT,
    header_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Timeline events table
CREATE TABLE IF NOT EXISTS timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    month INTEGER,
    day INTEGER,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'career', 'achievement', 'injury', 'business', 'personal'
    significance VARCHAR(20), -- 'major', 'minor', 'milestone'
    created_at TIMESTAMP DEFAULT NOW()
);

-- Media assets table
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    media_type VARCHAR(20) CHECK (media_type IN ('image', 'video', 'audio', 'document')),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    year INTEGER,
    category VARCHAR(50), -- 'competition', 'interview', 'trick', 'lifestyle', 'business'
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Video parts table
CREATE TABLE IF NOT EXISTS parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    video_url TEXT,
    thumbnail_url TEXT,
    year INTEGER NOT NULL,
    company VARCHAR(100), -- 'Plan B', 'DC Shoes', etc.
    description TEXT,
    duration_seconds INTEGER,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Competition results table
CREATE TABLE IF NOT EXISTS contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    contest_name VARCHAR(200) NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER,
    day INTEGER,
    location VARCHAR(100),
    placement INTEGER,
    category VARCHAR(50), -- 'Big Air', 'Vert', 'Street', 'Overall'
    prize_money DECIMAL(10,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- World records table
CREATE TABLE IF NOT EXISTS world_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    record_type VARCHAR(100) NOT NULL,
    record_value VARCHAR(50) NOT NULL,
    unit VARCHAR(20), -- 'feet', 'meters', 'seconds', etc.
    year INTEGER NOT NULL,
    month INTEGER,
    day INTEGER,
    location VARCHAR(100),
    description TEXT,
    is_current BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Business ventures table
CREATE TABLE IF NOT EXISTS business_ventures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    company_name VARCHAR(100) NOT NULL,
    role VARCHAR(100), -- 'Co-Founder', 'Owner', 'Partner', etc.
    start_year INTEGER,
    end_year INTEGER,
    description TEXT,
    website_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Awards and honors table
CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    award_name VARCHAR(200) NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER,
    day INTEGER,
    organization VARCHAR(100),
    category VARCHAR(50), -- 'Skater of the Year', 'Hall of Fame', 'Lifetime Achievement'
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Interviews and articles table
CREATE TABLE IF NOT EXISTS interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    title VARCHAR(300) NOT NULL,
    publication VARCHAR(100),
    url TEXT,
    publish_date DATE,
    interview_type VARCHAR(50), -- 'magazine', 'podcast', 'video', 'newspaper'
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Injury history table
CREATE TABLE IF NOT EXISTS injuries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    injury_type VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER,
    day INTEGER,
    severity VARCHAR(20), -- 'minor', 'moderate', 'severe', 'career-threatening'
    recovery_time_months INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skaters_slug ON skaters(slug);
CREATE INDEX IF NOT EXISTS idx_timeline_skater_year ON timeline(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_media_skater_type ON media_assets(skater_id, media_type);
CREATE INDEX IF NOT EXISTS idx_parts_skater_year ON parts(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_contests_skater_year ON contests(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_records_skater_type ON world_records(skater_id, record_type);
CREATE INDEX IF NOT EXISTS idx_business_skater ON business_ventures(skater_id);
CREATE INDEX IF NOT EXISTS idx_awards_skater_year ON awards(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_interviews_skater ON interviews(skater_id);
CREATE INDEX IF NOT EXISTS idx_injuries_skater ON injuries(skater_id);