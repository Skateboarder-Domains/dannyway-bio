-- Danny Way Comprehensive Data Population
-- This file contains all known information about Danny Way for the biography database

-- Insert main skater profile
INSERT INTO skaters (
    slug, full_name, nickname, bio, birth_date, birthplace, hometown, 
    stance, turned_pro_year, sponsors, social_links, profile_image_url, 
    header_image_url, is_active
) VALUES (
    'dannyway',
    'Danny Way',
    'The Way',
    'Danny Way is a legendary professional skateboarder who revolutionized the sport through innovation, courage, and an unwavering commitment to pushing boundaries. Born in Portland, Oregon in 1974, Way moved to San Diego where he discovered skateboarding at age 5. He turned professional at 15 and quickly became known for his fearless approach and innovative tricks. Way co-founded DC Shoes and played a pivotal role in developing the Mega Ramp, which enabled unprecedented heights and distances in skateboarding. His most iconic achievement came in 2005 when he became the first person to jump the Great Wall of China on a skateboard, despite suffering a severely sprained ankle. Way has won multiple X Games gold medals, set numerous world records, and been named Thrasher Magazine''s Skater of the Year twice. His influence on skateboarding continues through his business ventures and inspiration to new generations of skateboarders worldwide.',
    '1974-04-15',
    'Portland, Oregon',
    'San Diego, California',
    'goofy',
    1989,
    ARRAY['DC Shoes', 'Plan B', 'Independent', 'Vans', 'Oakley', 'Red Bull'],
    '{"instagram": "dannywayofficial", "twitter": "dannywayofficial", "youtube": "dannywayofficial"}',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    true
);

-- Get the skater ID for foreign key references
DO $$
DECLARE
    danny_way_id UUID;
BEGIN
    SELECT id INTO danny_way_id FROM skaters WHERE slug = 'dannyway';
    
    -- Timeline events
    INSERT INTO timeline (skater_id, year, month, day, title, description, category, significance) VALUES
    (danny_way_id, 1974, 4, 15, 'Born in Portland, Oregon', 'Danny Way is born on April 15, 1974, in Portland, Oregon. His family would later relocate to San Diego, California, where he would discover his passion for skateboarding.', 'personal', 'major'),
    (danny_way_id, 1979, NULL, NULL, 'Introduction to Skateboarding', 'At age 5, Danny is introduced to skateboarding by his stepfather near the Del Mar Skate Ranch in San Diego. This early exposure to skateboarding legends and culture would shape his future.', 'personal', 'major'),
    (danny_way_id, 1980, NULL, NULL, 'Early Progression', 'By age 6, Danny is already showcasing advanced tricks at local skateparks, demonstrating exceptional natural talent and fearlessness that would become his trademark.', 'career', 'milestone'),
    (danny_way_id, 1985, NULL, NULL, 'First Competition Victory', 'At age 11, Danny wins his first skateboarding competition, signaling the start of a professional career that would span decades and change the sport forever.', 'career', 'milestone'),
    (danny_way_id, 1989, NULL, NULL, 'Turns Professional', 'Danny Way officially turns pro at age 15, joining the ranks of professional skateboarders and beginning his journey to becoming a skateboarding legend.', 'career', 'major'),
    (danny_way_id, 1991, NULL, NULL, 'Joins Plan B Skateboards', 'At age 17, Danny joins Plan B Skateboards, founded by Mike Ternasky. This partnership would produce some of skateboarding''s most influential video parts and innovative progression.', 'career', 'major'),
    (danny_way_id, 1992, NULL, NULL, 'Plan B "Questionable" Released', 'Danny''s part in Plan B''s groundbreaking video "Questionable" showcases his innovative tricks and cements his status as one of skateboarding''s most progressive riders.', 'career', 'major'),
    (danny_way_id, 1993, NULL, NULL, 'Plan B "Virtual Reality"', '"Virtual Reality" is released, featuring Danny''s legendary part with tricks that many skateboarders still find challenging today. The video becomes one of the most influential in skateboarding history.', 'career', 'major'),
    (danny_way_id, 1994, NULL, NULL, 'Co-Founds DC Shoes', 'Danny co-founds DC Shoes with his brother Damon Way and Ken Block. The brand would become one of action sports'' most recognizable and influential companies.', 'business', 'major'),
    (danny_way_id, 1995, NULL, NULL, 'Severe Neck Injury', 'Danny suffers a severe neck injury from a surfing accident, testing his resilience and determination to return to skateboarding at the highest level.', 'injury', 'major'),
    (danny_way_id, 1997, NULL, NULL, 'Mega Ramp Development Begins', 'Danny begins developing and perfecting the Mega Ramp, a massive structure that would revolutionize skateboarding and enable unprecedented heights and distances.', 'career', 'major'),
    (danny_way_id, 2000, NULL, NULL, 'X Games Dominance Begins', 'Danny dominates the X Games Big Air competition, winning multiple gold medals and setting new standards for what''s possible on the Mega Ramp.', 'achievement', 'major'),
    (danny_way_id, 2003, NULL, NULL, 'World Record Heights', 'Danny sets the world record for highest air on a skateboard, reaching 23.5 feet on the Mega Ramp—a record that stands as a testament to his fearless approach.', 'achievement', 'major'),
    (danny_way_id, 2005, 7, 9, 'Great Wall of China Jump', 'On July 9, 2005, Danny makes history by becoming the first person to jump the Great Wall of China on a skateboard, completing the feat despite a severely sprained ankle. This moment becomes one of skateboarding''s most iconic achievements.', 'achievement', 'major'),
    (danny_way_id, 2007, NULL, NULL, '360 Over 75-Foot Gap', 'Danny lands a 360 over a 75-foot gap on the Mega Ramp, setting a new distance record and inspiring a new generation of big air skateboarders.', 'achievement', 'major'),
    (danny_way_id, 2010, NULL, NULL, 'First Thrasher Skater of the Year', 'Danny receives skateboarding''s highest individual honor, being named Thrasher Magazine''s Skater of the Year for his continued innovation and influence on the sport.', 'achievement', 'major'),
    (danny_way_id, 2012, NULL, NULL, 'Second Thrasher Skater of the Year', 'Danny receives his second Thrasher Magazine''s Skater of the Year award, solidifying his status as one of the most influential skateboarders of all time.', 'achievement', 'major'),
    (danny_way_id, 2020, NULL, NULL, 'Enduring Legacy', 'Danny Way''s influence on skateboarding continues through his business ventures, ongoing progression, and inspiration to new generations of skateboarders worldwide. His legacy as an innovator and pioneer remains unmatched.', 'career', 'major');

    -- World Records
    INSERT INTO world_records (skater_id, record_type, record_value, unit, year, month, day, location, description, is_current) VALUES
    (danny_way_id, 'Highest Air on Skateboard', '23.5', 'feet', 2003, NULL, NULL, 'X Games', 'Danny Way set the world record for highest air on a skateboard, reaching 23.5 feet on the Mega Ramp.', true),
    (danny_way_id, 'Longest Gap Jump', '75', 'feet', 2007, NULL, NULL, 'Mega Ramp', 'Danny Way completed a 360 over a 75-foot gap on the Mega Ramp, setting a new distance record.', true),
    (danny_way_id, 'First Great Wall Jump', '1', 'jump', 2005, 7, 9, 'Great Wall of China', 'Danny Way became the first person to jump the Great Wall of China on a skateboard.', true);

    -- Business Ventures
    INSERT INTO business_ventures (skater_id, company_name, role, start_year, end_year, description, website_url, is_active) VALUES
    (danny_way_id, 'DC Shoes', 'Co-Founder', 1994, NULL, 'Co-founded DC Shoes with brother Damon Way and Ken Block. The brand became one of action sports'' most recognizable and influential companies.', 'https://www.dcshoes.com', true),
    (danny_way_id, 'Plan B Skateboards', 'Professional Rider', 1991, 1995, 'Professional skateboarder for Plan B Skateboards, appearing in legendary videos like "Questionable" and "Virtual Reality".', NULL, false),
    (danny_way_id, 'Independent Truck Company', 'Professional Rider', 1990, NULL, 'Long-time professional rider for Independent Truck Company, one of the most respected truck manufacturers in skateboarding.', 'https://www.independenttrucks.com', true),
    (danny_way_id, 'Vans', 'Professional Rider', 1985, NULL, 'Professional skateboarder for Vans, one of the most iconic skateboarding shoe brands.', 'https://www.vans.com', true);

    -- Awards and Honors
    INSERT INTO awards (skater_id, award_name, year, organization, category, description) VALUES
    (danny_way_id, 'Skater of the Year', 2010, 'Thrasher Magazine', 'Skater of the Year', 'Named Thrasher Magazine''s Skater of the Year for his continued innovation and influence on the sport.'),
    (danny_way_id, 'Skater of the Year', 2012, 'Thrasher Magazine', 'Skater of the Year', 'Received his second Thrasher Magazine''s Skater of the Year award, solidifying his status as one of the most influential skateboarders of all time.'),
    (danny_way_id, 'X Games Gold Medal - Big Air', 2000, 'ESPN X Games', 'Competition', 'Won gold medal in Big Air competition at X Games.'),
    (danny_way_id, 'X Games Gold Medal - Big Air', 2001, 'ESPN X Games', 'Competition', 'Won gold medal in Big Air competition at X Games.'),
    (danny_way_id, 'X Games Gold Medal - Big Air', 2002, 'ESPN X Games', 'Competition', 'Won gold medal in Big Air competition at X Games.'),
    (danny_way_id, 'X Games Gold Medal - Big Air', 2003, 'ESPN X Games', 'Competition', 'Won gold medal in Big Air competition at X Games.'),
    (danny_way_id, 'X Games Gold Medal - Big Air', 2004, 'ESPN X Games', 'Competition', 'Won gold medal in Big Air competition at X Games.'),
    (danny_way_id, 'X Games Gold Medal - Big Air', 2005, 'ESPN X Games', 'Competition', 'Won gold medal in Big Air competition at X Games.');

    -- Video Parts
    INSERT INTO parts (skater_id, title, year, company, description, is_featured) VALUES
    (danny_way_id, 'Questionable', 1992, 'Plan B', 'Danny''s groundbreaking part in Plan B''s "Questionable" video that showcased his innovative tricks and cemented his status as one of skateboarding''s most progressive riders.', true),
    (danny_way_id, 'Virtual Reality', 1993, 'Plan B', 'Danny''s legendary part in "Virtual Reality" featuring tricks that many skateboarders still find challenging today. The video became one of the most influential in skateboarding history.', true),
    (danny_way_id, 'The DC Video', 2003, 'DC Shoes', 'Danny''s part in the DC Video showcasing his Mega Ramp progression and innovative tricks.', true),
    (danny_way_id, 'DC Shoes: The DC Video', 2004, 'DC Shoes', 'Danny''s continued progression in the DC Video series, featuring more Mega Ramp innovation.', false),
    (danny_way_id, 'DC Shoes: The DC Video 2', 2005, 'DC Shoes', 'Danny''s part featuring his Great Wall of China jump and continued Mega Ramp dominance.', true);

    -- Competition Results
    INSERT INTO contests (skater_id, contest_name, year, month, day, location, placement, category, prize_money, description) VALUES
    (danny_way_id, 'X Games Big Air', 2000, 6, NULL, 'San Francisco, CA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2001, 6, NULL, 'Philadelphia, PA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2002, 6, NULL, 'Philadelphia, PA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2003, 6, NULL, 'Los Angeles, CA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2004, 6, NULL, 'Los Angeles, CA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2005, 6, NULL, 'Los Angeles, CA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2006, 6, NULL, 'Los Angeles, CA', 2, 'Big Air', 25000.00, 'Silver medal in X Games Big Air competition'),
    (danny_way_id, 'X Games Big Air', 2007, 6, NULL, 'Los Angeles, CA', 1, 'Big Air', 50000.00, 'Gold medal in X Games Big Air competition');

    -- Injuries
    INSERT INTO injuries (skater_id, injury_type, year, month, day, severity, recovery_time_months, description) VALUES
    (danny_way_id, 'Severe Neck Injury', 1995, NULL, NULL, 'severe', 12, 'Danny suffered a severe neck injury from a surfing accident, testing his resilience and determination to return to skateboarding at the highest level.'),
    (danny_way_id, 'Severely Sprained Ankle', 2005, 7, 8, 'moderate', 3, 'Danny suffered a severely sprained ankle just before his Great Wall of China jump, but still completed the historic feat.'),
    (danny_way_id, 'Multiple Concussions', 2000, NULL, NULL, 'moderate', 2, 'Danny suffered multiple concussions throughout his career from Mega Ramp crashes and high-impact falls.');

    -- Media Assets (placeholder URLs - these would need to be replaced with actual media)
    INSERT INTO media_assets (skater_id, title, description, media_type, url, thumbnail_url, year, category, tags, is_featured) VALUES
    (danny_way_id, 'Great Wall of China Jump', 'Historic moment of Danny Way jumping the Great Wall of China on a skateboard', 'image', 'https://example.com/great-wall-jump.jpg', 'https://example.com/great-wall-thumb.jpg', 2005, 'achievement', ARRAY['great wall', 'china', 'jump', 'historic'], true),
    (danny_way_id, 'Mega Ramp 23.5ft Air', 'Danny Way setting the world record for highest air on a skateboard', 'image', 'https://example.com/mega-ramp-air.jpg', 'https://example.com/mega-ramp-thumb.jpg', 2003, 'achievement', ARRAY['mega ramp', 'world record', 'height'], true),
    (danny_way_id, 'Plan B Virtual Reality Part', 'Danny Way''s legendary part from Plan B''s Virtual Reality video', 'video', 'https://example.com/virtual-reality-part.mp4', 'https://example.com/virtual-reality-thumb.jpg', 1993, 'trick', ARRAY['plan b', 'virtual reality', 'classic'], true),
    (danny_way_id, 'DC Shoes Co-Founder', 'Danny Way with DC Shoes co-founders Damon Way and Ken Block', 'image', 'https://example.com/dc-cofounders.jpg', 'https://example.com/dc-cofounders-thumb.jpg', 1994, 'business', ARRAY['dc shoes', 'co-founder', 'business'], false),
    (danny_way_id, 'X Games Gold Medal', 'Danny Way celebrating his X Games Big Air gold medal victory', 'image', 'https://example.com/xgames-gold.jpg', 'https://example.com/xgames-gold-thumb.jpg', 2005, 'competition', ARRAY['x games', 'gold medal', 'victory'], false);

    -- Interviews and Articles
    INSERT INTO interviews (skater_id, title, publication, url, publish_date, interview_type, description, is_featured) VALUES
    (danny_way_id, 'Danny Way: The Man Who Jumped the Great Wall', 'Thrasher Magazine', 'https://example.com/thrasher-great-wall', '2005-08-01', 'magazine', 'In-depth interview about Danny''s historic Great Wall of China jump', true),
    (danny_way_id, 'Danny Way on Mega Ramp Innovation', 'Transworld Skateboarding', 'https://example.com/transworld-mega-ramp', '2003-06-01', 'magazine', 'Interview about Danny''s development of the Mega Ramp and its impact on skateboarding', true),
    (danny_way_id, 'DC Shoes: The Story Behind the Brand', 'Complex', 'https://example.com/complex-dc-story', '2010-03-15', 'magazine', 'Interview about co-founding DC Shoes and building the brand', false),
    (danny_way_id, 'Danny Way: Skater of the Year Interview', 'Thrasher Magazine', 'https://example.com/thrasher-soty-2010', '2010-12-01', 'magazine', 'Interview after being named Thrasher''s Skater of the Year', true),
    (danny_way_id, 'The Nine Club: Danny Way', 'The Nine Club Podcast', 'https://example.com/nine-club-danny-way', '2018-05-20', 'podcast', 'Comprehensive podcast interview covering Danny''s entire career', true);

END $$;