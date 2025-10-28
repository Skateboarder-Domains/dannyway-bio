-- Danny Way Biography Database Schema
-- Comprehensive database for Danny Way biography book and movie project

-- Skaters table (main profile)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timeline events table
CREATE TABLE IF NOT EXISTS timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    year VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'career', 'personal', 'achievement', 'injury', 'business'
    significance VARCHAR(20), -- 'major', 'minor', 'milestone'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media assets table (photos, videos, documents)
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    media_type VARCHAR(20) NOT NULL, -- 'image', 'video', 'document', 'audio'
    file_format VARCHAR(10), -- 'jpg', 'mp4', 'pdf', 'mp3'
    year INTEGER,
    event_id UUID REFERENCES timeline(id),
    is_primary BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Video parts table
CREATE TABLE IF NOT EXISTS parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    video_url TEXT,
    thumbnail_url TEXT,
    year INTEGER,
    company VARCHAR(100), -- 'Plan B', 'DC', etc.
    video_type VARCHAR(50), -- 'full_length', 'part', 'commercial', 'documentary'
    duration_seconds INTEGER,
    description TEXT,
    featured_tricks TEXT[],
    is_landmark BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contests and competitions
CREATE TABLE IF NOT EXISTS contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    event_name VARCHAR(200) NOT NULL,
    year INTEGER NOT NULL,
    location VARCHAR(100),
    placement INTEGER,
    category VARCHAR(50), -- 'big_air', 'street', 'vert', 'mega_ramp'
    prize_money DECIMAL(10,2),
    description TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Records and achievements
CREATE TABLE IF NOT EXISTS records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    record_type VARCHAR(100) NOT NULL, -- 'height', 'distance', 'first', 'most'
    record_value VARCHAR(50), -- '23.5 feet', '75 feet', 'first person'
    unit VARCHAR(20), -- 'feet', 'meters', 'count'
    year INTEGER,
    location VARCHAR(100),
    verified BOOLEAN DEFAULT true,
    description TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Business ventures and companies
CREATE TABLE IF NOT EXISTS business_ventures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    company_name VARCHAR(100) NOT NULL,
    role VARCHAR(100), -- 'co-founder', 'owner', 'sponsor', 'ambassador'
    start_year INTEGER,
    end_year INTEGER,
    description TEXT,
    website_url TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Injuries and recovery
CREATE TABLE IF NOT EXISTS injuries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    injury_date DATE,
    injury_type VARCHAR(100), -- 'neck', 'ankle', 'knee', 'concussion'
    severity VARCHAR(20), -- 'minor', 'moderate', 'severe', 'career_threatening'
    description TEXT,
    recovery_time_months INTEGER,
    impact_on_career TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes and interviews
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    quote_text TEXT NOT NULL,
    source VARCHAR(200), -- 'interview', 'video', 'article', 'book'
    year INTEGER,
    context TEXT,
    is_famous BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Family and personal relationships
CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    person_name VARCHAR(100) NOT NULL,
    relationship_type VARCHAR(50), -- 'brother', 'father', 'mother', 'wife', 'mentor'
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Awards and honors
CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skater_id UUID REFERENCES skaters(id) ON DELETE CASCADE,
    award_name VARCHAR(200) NOT NULL,
    organization VARCHAR(100),
    year INTEGER,
    category VARCHAR(100), -- 'skater_of_year', 'hall_of_fame', 'lifetime_achievement'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skaters_slug ON skaters(slug);
CREATE INDEX IF NOT EXISTS idx_timeline_skater_year ON timeline(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_media_skater_type ON media_assets(skater_id, media_type);
CREATE INDEX IF NOT EXISTS idx_parts_skater_year ON parts(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_contests_skater_year ON contests(skater_id, year);
CREATE INDEX IF NOT EXISTS idx_records_skater_type ON records(skater_id, record_type);