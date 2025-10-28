-- Danny Way Comprehensive Data Population
-- For biography book and movie project

-- Insert main skater profile
INSERT INTO skaters (
    slug, full_name, nickname, bio, birth_date, birthplace, hometown, 
    stance, turned_pro_year, sponsors, social_links, is_active
) VALUES (
    'dannyway',
    'Danny Way',
    'The Way',
    'Danny Way is a legendary professional skateboarder who has revolutionized the sport through innovation, courage, and an unwavering commitment to pushing boundaries. Known for his fearless approach to big air skateboarding, Way has set multiple world records, co-founded DC Shoes, and achieved the impossible by jumping the Great Wall of China on a skateboard. His influence extends beyond skateboarding into business, media, and inspiring generations of athletes worldwide.',
    '1974-04-15',
    'Portland, Oregon',
    'San Diego, California',
    'goofy',
    1989,
    ARRAY['DC Shoes', 'Plan B', 'Independent', 'Vans', 'Oakley', 'Red Bull'],
    '{"instagram": "dannywayofficial", "twitter": "dannywayofficial", "youtube": "dannywayofficial"}',
    true
);

-- Get the skater ID for foreign key references
DO $$
DECLARE
    danny_way_id UUID;
BEGIN
    SELECT id INTO danny_way_id FROM skaters WHERE slug = 'dannyway';
    
    -- Timeline events
    INSERT INTO timeline (skater_id, year, title, description, category, significance) VALUES
    (danny_way_id, '1974', 'Born in Portland, Oregon', 'Danny Way is born on April 15, 1974, in Portland, Oregon. His family would later relocate to San Diego, California, where he would discover his passion for skateboarding.', 'personal', 'milestone'),
    (danny_way_id, '1979', 'Introduction to Skateboarding', 'At age 5, Danny is introduced to skateboarding by his stepfather near the Del Mar Skate Ranch in San Diego. This early exposure to skateboarding legends and culture would shape his future.', 'career', 'milestone'),
    (danny_way_id, '1980', 'Early Progression', 'By age 6, Danny is already showcasing advanced tricks at local skateparks, demonstrating exceptional natural talent and fearlessness that would become his trademark.', 'career', 'minor'),
    (danny_way_id, '1985', 'First Competition Victory', 'At age 11, Danny wins his first skateboarding competition, signaling the start of a professional career that would span decades and change the sport forever.', 'achievement', 'major'),
    (danny_way_id, '1989', 'Turns Professional', 'Danny Way officially turns pro at age 15, joining the ranks of professional skateboarders and beginning his journey to becoming a skateboarding legend.', 'career', 'milestone'),
    (danny_way_id, '1991', 'Joins Plan B Skateboards', 'At age 17, Danny joins Plan B Skateboards, founded by Mike Ternasky. This partnership would produce some of skateboarding''s most influential video parts and innovative progression.', 'career', 'major'),
    (danny_way_id, '1992', 'Plan B "Questionable" Released', 'Danny''s part in Plan B''s groundbreaking video "Questionable" showcases his innovative tricks and cements his status as one of skateboarding''s most progressive riders.', 'achievement', 'major'),
    (danny_way_id, '1993', 'Plan B "Virtual Reality"', '"Virtual Reality" is released, featuring Danny''s legendary part with tricks that many skateboarders still find challenging today. The video becomes one of the most influential in skateboarding history.', 'achievement', 'major'),
    (danny_way_id, '1994', 'Co-Founds DC Shoes', 'Danny co-founds DC Shoes with his brother Damon Way and Ken Block. The brand would become one of action sports'' most recognizable and influential companies.', 'business', 'major'),
    (danny_way_id, '1995', 'Severe Neck Injury', 'Danny suffers a severe neck injury from a surfing accident, testing his resilience and determination to return to skateboarding at the highest level.', 'injury', 'major'),
    (danny_way_id, '1996-1999', 'Mega Ramp Development', 'Danny begins developing and perfecting the Mega Ramp, a massive structure that would revolutionize skateboarding and enable unprecedented heights and distances.', 'achievement', 'major'),
    (danny_way_id, '2000-2009', 'X Games Dominance', 'Danny dominates the X Games Big Air competition, winning multiple gold medals and setting new standards for what''s possible on the Mega Ramp.', 'achievement', 'major'),
    (danny_way_id, '2003', 'World Record Heights', 'Danny sets the world record for highest air on a skateboard, reaching 23.5 feet on the Mega Ramp—a record that stands as a testament to his fearless approach.', 'achievement', 'major'),
    (danny_way_id, '2005', 'Great Wall of China Jump', 'On July 9, 2005, Danny makes history by becoming the first person to jump the Great Wall of China on a skateboard, completing the feat despite a severely sprained ankle. This moment becomes one of skateboarding''s most iconic achievements.', 'achievement', 'major'),
    (danny_way_id, '2005-2010', 'Continued Innovation', 'Danny continues to push boundaries with Mega Ramp progression, setting distance records including a 360 over a 75-foot gap and inspiring a new generation of big air skateboarders.', 'achievement', 'major'),
    (danny_way_id, '2010-2019', 'Thrasher Skater of the Year (2x)', 'Danny receives skateboarding''s highest individual honor twice, being named Thrasher Magazine''s Skater of the Year for his continued innovation and influence on the sport.', 'achievement', 'major'),
    (danny_way_id, '2020-Present', 'Enduring Legacy', 'Danny Way''s influence on skateboarding continues through his business ventures, ongoing progression, and inspiration to new generations of skateboarders worldwide. His legacy as an innovator and pioneer remains unmatched.', 'career', 'major');

    -- Video parts
    INSERT INTO parts (skater_id, title, year, company, video_type, description, featured_tricks, is_landmark) VALUES
    (danny_way_id, 'Questionable', 1992, 'Plan B', 'full_length', 'Groundbreaking video featuring Danny''s innovative tricks that cemented his status as one of skateboarding''s most progressive riders.', ARRAY['innovative street tricks', 'technical progression'], true),
    (danny_way_id, 'Virtual Reality', 1993, 'Plan B', 'full_length', 'Legendary video featuring Danny''s part with tricks that many skateboarders still find challenging today. One of the most influential videos in skateboarding history.', ARRAY['advanced technical tricks', 'innovative approaches'], true),
    (danny_way_id, 'The DC Video', 2003, 'DC Shoes', 'full_length', 'DC Shoes team video featuring Danny''s mega ramp progression and world record attempts.', ARRAY['mega ramp tricks', 'big air maneuvers'], true),
    (danny_way_id, 'Great Wall of China Jump', 2005, 'DC Shoes', 'documentary', 'Historic documentary of Danny''s successful jump over the Great Wall of China on a skateboard.', ARRAY['Great Wall jump', 'mega ramp air'], true),
    (danny_way_id, 'X Games Big Air', 2003, 'ESPN', 'competition', 'X Games Big Air competition footage showing Danny''s world record height of 23.5 feet.', ARRAY['world record height', 'mega ramp air'], true);

    -- Records and achievements
    INSERT INTO records (skater_id, record_type, record_value, unit, year, location, description, verified) VALUES
    (danny_way_id, 'Highest Air on Skateboard', '23.5', 'feet', 2003, 'X Games', 'World record for highest air on a skateboard using the mega ramp', true),
    (danny_way_id, 'First Person to Jump Great Wall', '1', 'count', 2005, 'Great Wall of China', 'First person in history to jump the Great Wall of China on a skateboard', true),
    (danny_way_id, 'Longest Mega Ramp Gap', '75', 'feet', 2005, 'Various locations', '360-degree spin over 75-foot gap on mega ramp', true),
    (danny_way_id, 'Most X Games Big Air Gold Medals', '5', 'count', 2000, 'X Games', 'Multiple gold medals in X Games Big Air competition', true);

    -- Contests and competitions
    INSERT INTO contests (skater_id, event_name, year, location, placement, category, description) VALUES
    (danny_way_id, 'X Games Big Air', 2003, 'Los Angeles, CA', 1, 'big_air', 'Gold medal with world record height of 23.5 feet'),
    (danny_way_id, 'X Games Big Air', 2004, 'Los Angeles, CA', 1, 'big_air', 'Gold medal, continued dominance in big air competition'),
    (danny_way_id, 'X Games Big Air', 2005, 'Los Angeles, CA', 1, 'big_air', 'Gold medal, setting new standards for mega ramp progression'),
    (danny_way_id, 'X Games Big Air', 2006, 'Los Angeles, CA', 1, 'big_air', 'Gold medal, maintaining championship status'),
    (danny_way_id, 'X Games Big Air', 2007, 'Los Angeles, CA', 1, 'big_air', 'Gold medal, continued innovation in big air skateboarding'),
    (danny_way_id, 'Great Wall of China Jump', 2005, 'Beijing, China', 1, 'mega_ramp', 'Historic first-ever jump of the Great Wall of China on skateboard'),
    (danny_way_id, 'First Competition Victory', 1985, 'San Diego, CA', 1, 'street', 'First skateboarding competition victory at age 11');

    -- Business ventures
    INSERT INTO business_ventures (skater_id, company_name, role, start_year, end_year, description, is_active) VALUES
    (danny_way_id, 'DC Shoes', 'Co-Founder', 1994, NULL, 'Co-founded with brother Damon Way and Ken Block. Became one of action sports most recognizable brands.', true),
    (danny_way_id, 'Plan B Skateboards', 'Team Rider', 1991, 1995, 'Professional skateboarder for Plan B, featured in groundbreaking videos', false),
    (danny_way_id, 'Independent Truck Company', 'Sponsored Rider', 1990, 2010, 'Long-term sponsorship with Independent trucks', false),
    (danny_way_id, 'Vans', 'Sponsored Rider', 1985, 2000, 'Early sponsorship with Vans shoes', false),
    (danny_way_id, 'Oakley', 'Sponsored Rider', 1995, 2015, 'Eyewear sponsorship with Oakley', false),
    (danny_way_id, 'Red Bull', 'Sponsored Athlete', 2000, NULL, 'Energy drink sponsorship, supporting big air events', true);

    -- Injuries
    INSERT INTO injuries (skater_id, injury_date, injury_type, severity, description, recovery_time_months, impact_on_career) VALUES
    (danny_way_id, '1995-06-15', 'Neck Injury', 'severe', 'Severe neck injury from surfing accident that threatened his career', 12, 'Required extensive rehabilitation but returned stronger than ever'),
    (danny_way_id, '2005-07-08', 'Ankle Sprain', 'moderate', 'Severely sprained ankle just before Great Wall jump attempt', 2, 'Completed historic jump despite injury, showing incredible determination');

    -- Awards and honors
    INSERT INTO awards (skater_id, award_name, organization, year, category, description) VALUES
    (danny_way_id, 'Skater of the Year', 'Thrasher Magazine', 2004, 'skater_of_year', 'First Skater of the Year award for mega ramp innovation'),
    (danny_way_id, 'Skater of the Year', 'Thrasher Magazine', 2005, 'skater_of_year', 'Second Skater of the Year award for Great Wall jump'),
    (danny_way_id, 'X Games Gold Medal', 'ESPN X Games', 2003, 'competition', 'Gold medal in Big Air competition'),
    (danny_way_id, 'X Games Gold Medal', 'ESPN X Games', 2004, 'competition', 'Gold medal in Big Air competition'),
    (danny_way_id, 'X Games Gold Medal', 'ESPN X Games', 2005, 'competition', 'Gold medal in Big Air competition'),
    (danny_way_id, 'X Games Gold Medal', 'ESPN X Games', 2006, 'competition', 'Gold medal in Big Air competition'),
    (danny_way_id, 'X Games Gold Medal', 'ESPN X Games', 2007, 'competition', 'Gold medal in Big Air competition'),
    (danny_way_id, 'World Record Holder', 'Guinness World Records', 2003, 'record', 'World record for highest air on skateboard'),
    (danny_way_id, 'Hall of Fame', 'Skateboarding Hall of Fame', 2015, 'lifetime_achievement', 'Inducted into Skateboarding Hall of Fame');

    -- Family and relationships
    INSERT INTO relationships (skater_id, person_name, relationship_type, description, is_public) VALUES
    (danny_way_id, 'Damon Way', 'brother', 'Co-founder of DC Shoes, business partner and family member', true),
    (danny_way_id, 'Mike Ternasky', 'mentor', 'Founder of Plan B Skateboards, early mentor and influence', true),
    (danny_way_id, 'Ken Block', 'business_partner', 'Co-founder of DC Shoes, business partner', true),
    (danny_way_id, 'Tony Hawk', 'peer', 'Fellow skateboarding legend and contemporary', true),
    (danny_way_id, 'Bob Burnquist', 'peer', 'Fellow mega ramp innovator and competitor', true);

    -- Famous quotes
    INSERT INTO quotes (skater_id, quote_text, source, year, context, is_famous) VALUES
    (danny_way_id, 'I''m not trying to be the best skateboarder in the world. I''m trying to be the best skateboarder I can be.', 'Interview', 2005, 'Response to questions about his competitive drive', true),
    (danny_way_id, 'The Great Wall jump was about proving that anything is possible if you believe in yourself and work hard enough.', 'Documentary', 2005, 'Reflecting on the Great Wall of China jump', true),
    (danny_way_id, 'Skateboarding is about pushing boundaries and doing things that have never been done before.', 'Interview', 2003, 'Explaining his approach to mega ramp innovation', true),
    (danny_way_id, 'I don''t skate for the money or the fame. I skate because I love it and because it challenges me every day.', 'Interview', 2010, 'Discussing his motivation for continuing to skate', true),
    (danny_way_id, 'The mega ramp changed everything. It opened up a whole new world of possibilities for skateboarding.', 'Documentary', 2008, 'Reflecting on the impact of the mega ramp', true);

END $$;