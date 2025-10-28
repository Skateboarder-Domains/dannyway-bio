#!/usr/bin/env node

/**
 * Danny Way Database Population Script
 * 
 * This script helps populate the Neon PostgreSQL database with comprehensive
 * information about Danny Way for the biography project.
 * 
 * Usage:
 *   node populate-database.js [--dry-run] [--database-url=URL]
 * 
 * Options:
 *   --dry-run: Show what would be executed without making changes
 *   --database-url: Override the database URL (defaults to NEON_DATABASE_URL env var)
 */

const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    dryRun: process.argv.includes('--dry-run'),
    databaseUrl: process.env.NEON_DATABASE_URL || process.argv.find(arg => arg.startsWith('--database-url='))?.split('=')[1]
};

if (!config.databaseUrl) {
    console.error('❌ Error: NEON_DATABASE_URL environment variable is required');
    console.error('   Set it with: export NEON_DATABASE_URL="postgresql://..."');
    process.exit(1);
}

const sql = neon(config.databaseUrl);

// Danny Way comprehensive data
const dannyWayData = {
    skater: {
        slug: 'dannyway',
        full_name: 'Danny Way',
        nickname: 'The Way',
        bio: `Danny Way is a legendary professional skateboarder who revolutionized the sport through innovation, courage, and an unwavering commitment to pushing boundaries. Born in Portland, Oregon in 1974, Way moved to San Diego where he discovered skateboarding at age 5. He turned professional at 15 and quickly became known for his fearless approach and innovative tricks. Way co-founded DC Shoes and played a pivotal role in developing the Mega Ramp, which enabled unprecedented heights and distances in skateboarding. His most iconic achievement came in 2005 when he became the first person to jump the Great Wall of China on a skateboard, despite suffering a severely sprained ankle. Way has won multiple X Games gold medals, set numerous world records, and been named Thrasher Magazine's Skater of the Year twice. His influence on skateboarding continues through his business ventures and inspiration to new generations of skateboarders worldwide.`,
        birth_date: '1974-04-15',
        birthplace: 'Portland, Oregon',
        hometown: 'San Diego, California',
        stance: 'goofy',
        turned_pro_year: 1989,
        sponsors: ['DC Shoes', 'Plan B', 'Independent', 'Vans', 'Oakley', 'Red Bull'],
        social_links: {
            instagram: 'dannywayofficial',
            twitter: 'dannywayofficial',
            youtube: 'dannywayofficial'
        },
        profile_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
        header_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
        is_active: true
    },
    timeline: [
        { year: 1974, month: 4, day: 15, title: 'Born in Portland, Oregon', description: 'Danny Way is born on April 15, 1974, in Portland, Oregon. His family would later relocate to San Diego, California, where he would discover his passion for skateboarding.', category: 'personal', significance: 'major' },
        { year: 1979, title: 'Introduction to Skateboarding', description: 'At age 5, Danny is introduced to skateboarding by his stepfather near the Del Mar Skate Ranch in San Diego. This early exposure to skateboarding legends and culture would shape his future.', category: 'personal', significance: 'major' },
        { year: 1980, title: 'Early Progression', description: 'By age 6, Danny is already showcasing advanced tricks at local skateparks, demonstrating exceptional natural talent and fearlessness that would become his trademark.', category: 'career', significance: 'milestone' },
        { year: 1985, title: 'First Competition Victory', description: 'At age 11, Danny wins his first skateboarding competition, signaling the start of a professional career that would span decades and change the sport forever.', category: 'career', significance: 'milestone' },
        { year: 1989, title: 'Turns Professional', description: 'Danny Way officially turns pro at age 15, joining the ranks of professional skateboarders and beginning his journey to becoming a skateboarding legend.', category: 'career', significance: 'major' },
        { year: 1991, title: 'Joins Plan B Skateboards', description: 'At age 17, Danny joins Plan B Skateboards, founded by Mike Ternasky. This partnership would produce some of skateboarding\'s most influential video parts and innovative progression.', category: 'career', significance: 'major' },
        { year: 1992, title: 'Plan B "Questionable" Released', description: 'Danny\'s part in Plan B\'s groundbreaking video "Questionable" showcases his innovative tricks and cements his status as one of skateboarding\'s most progressive riders.', category: 'career', significance: 'major' },
        { year: 1993, title: 'Plan B "Virtual Reality"', description: '"Virtual Reality" is released, featuring Danny\'s legendary part with tricks that many skateboarders still find challenging today. The video becomes one of the most influential in skateboarding history.', category: 'career', significance: 'major' },
        { year: 1994, title: 'Co-Founds DC Shoes', description: 'Danny co-founds DC Shoes with his brother Damon Way and Ken Block. The brand would become one of action sports\' most recognizable and influential companies.', category: 'business', significance: 'major' },
        { year: 1995, title: 'Severe Neck Injury', description: 'Danny suffers a severe neck injury from a surfing accident, testing his resilience and determination to return to skateboarding at the highest level.', category: 'injury', significance: 'major' },
        { year: 1997, title: 'Mega Ramp Development Begins', description: 'Danny begins developing and perfecting the Mega Ramp, a massive structure that would revolutionize skateboarding and enable unprecedented heights and distances.', category: 'career', significance: 'major' },
        { year: 2000, title: 'X Games Dominance Begins', description: 'Danny dominates the X Games Big Air competition, winning multiple gold medals and setting new standards for what\'s possible on the Mega Ramp.', category: 'achievement', significance: 'major' },
        { year: 2003, title: 'World Record Heights', description: 'Danny sets the world record for highest air on a skateboard, reaching 23.5 feet on the Mega Ramp—a record that stands as a testament to his fearless approach.', category: 'achievement', significance: 'major' },
        { year: 2005, month: 7, day: 9, title: 'Great Wall of China Jump', description: 'On July 9, 2005, Danny makes history by becoming the first person to jump the Great Wall of China on a skateboard, completing the feat despite a severely sprained ankle. This moment becomes one of skateboarding\'s most iconic achievements.', category: 'achievement', significance: 'major' },
        { year: 2007, title: '360 Over 75-Foot Gap', description: 'Danny lands a 360 over a 75-foot gap on the Mega Ramp, setting a new distance record and inspiring a new generation of big air skateboarders.', category: 'achievement', significance: 'major' },
        { year: 2010, title: 'First Thrasher Skater of the Year', description: 'Danny receives skateboarding\'s highest individual honor, being named Thrasher Magazine\'s Skater of the Year for his continued innovation and influence on the sport.', category: 'achievement', significance: 'major' },
        { year: 2012, title: 'Second Thrasher Skater of the Year', description: 'Danny receives his second Thrasher Magazine\'s Skater of the Year award, solidifying his status as one of the most influential skateboarders of all time.', category: 'achievement', significance: 'major' },
        { year: 2020, title: 'Enduring Legacy', description: 'Danny Way\'s influence on skateboarding continues through his business ventures, ongoing progression, and inspiration to new generations of skateboarders worldwide. His legacy as an innovator and pioneer remains unmatched.', category: 'career', significance: 'major' }
    ],
    worldRecords: [
        { record_type: 'Highest Air on Skateboard', record_value: '23.5', unit: 'feet', year: 2003, location: 'X Games', description: 'Danny Way set the world record for highest air on a skateboard, reaching 23.5 feet on the Mega Ramp.', is_current: true },
        { record_type: 'Longest Gap Jump', record_value: '75', unit: 'feet', year: 2007, location: 'Mega Ramp', description: 'Danny Way completed a 360 over a 75-foot gap on the Mega Ramp, setting a new distance record.', is_current: true },
        { record_type: 'First Great Wall Jump', record_value: '1', unit: 'jump', year: 2005, month: 7, day: 9, location: 'Great Wall of China', description: 'Danny Way became the first person to jump the Great Wall of China on a skateboard.', is_current: true }
    ],
    businessVentures: [
        { company_name: 'DC Shoes', role: 'Co-Founder', start_year: 1994, description: 'Co-founded DC Shoes with brother Damon Way and Ken Block. The brand became one of action sports\' most recognizable and influential companies.', website_url: 'https://www.dcshoes.com', is_active: true },
        { company_name: 'Plan B Skateboards', role: 'Professional Rider', start_year: 1991, end_year: 1995, description: 'Professional skateboarder for Plan B Skateboards, appearing in legendary videos like "Questionable" and "Virtual Reality".', is_active: false },
        { company_name: 'Independent Truck Company', role: 'Professional Rider', start_year: 1990, description: 'Long-time professional rider for Independent Truck Company, one of the most respected truck manufacturers in skateboarding.', website_url: 'https://www.independenttrucks.com', is_active: true },
        { company_name: 'Vans', role: 'Professional Rider', start_year: 1985, description: 'Professional skateboarder for Vans, one of the most iconic skateboarding shoe brands.', website_url: 'https://www.vans.com', is_active: true }
    ],
    awards: [
        { award_name: 'Skater of the Year', year: 2010, organization: 'Thrasher Magazine', category: 'Skater of the Year', description: 'Named Thrasher Magazine\'s Skater of the Year for his continued innovation and influence on the sport.' },
        { award_name: 'Skater of the Year', year: 2012, organization: 'Thrasher Magazine', category: 'Skater of the Year', description: 'Received his second Thrasher Magazine\'s Skater of the Year award, solidifying his status as one of the most influential skateboarders of all time.' },
        { award_name: 'X Games Gold Medal - Big Air', year: 2000, organization: 'ESPN X Games', category: 'Competition', description: 'Won gold medal in Big Air competition at X Games.' },
        { award_name: 'X Games Gold Medal - Big Air', year: 2001, organization: 'ESPN X Games', category: 'Competition', description: 'Won gold medal in Big Air competition at X Games.' },
        { award_name: 'X Games Gold Medal - Big Air', year: 2002, organization: 'ESPN X Games', category: 'Competition', description: 'Won gold medal in Big Air competition at X Games.' },
        { award_name: 'X Games Gold Medal - Big Air', year: 2003, organization: 'ESPN X Games', category: 'Competition', description: 'Won gold medal in Big Air competition at X Games.' },
        { award_name: 'X Games Gold Medal - Big Air', year: 2004, organization: 'ESPN X Games', category: 'Competition', description: 'Won gold medal in Big Air competition at X Games.' },
        { award_name: 'X Games Gold Medal - Big Air', year: 2005, organization: 'ESPN X Games', category: 'Competition', description: 'Won gold medal in Big Air competition at X Games.' }
    ],
    videoParts: [
        { title: 'Questionable', year: 1992, company: 'Plan B', description: 'Danny\'s groundbreaking part in Plan B\'s "Questionable" video that showcased his innovative tricks and cemented his status as one of skateboarding\'s most progressive riders.', is_featured: true },
        { title: 'Virtual Reality', year: 1993, company: 'Plan B', description: 'Danny\'s legendary part in "Virtual Reality" featuring tricks that many skateboarders still find challenging today. The video became one of the most influential in skateboarding history.', is_featured: true },
        { title: 'The DC Video', year: 2003, company: 'DC Shoes', description: 'Danny\'s part in the DC Video showcasing his Mega Ramp progression and innovative tricks.', is_featured: true },
        { title: 'DC Shoes: The DC Video 2', year: 2005, company: 'DC Shoes', description: 'Danny\'s part featuring his Great Wall of China jump and continued Mega Ramp dominance.', is_featured: true }
    ],
    contests: [
        { contest_name: 'X Games Big Air', year: 2000, location: 'San Francisco, CA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2001, location: 'Philadelphia, PA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2002, location: 'Philadelphia, PA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2003, location: 'Los Angeles, CA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2004, location: 'Los Angeles, CA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2005, location: 'Los Angeles, CA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2006, location: 'Los Angeles, CA', placement: 2, category: 'Big Air', prize_money: 25000.00, description: 'Silver medal in X Games Big Air competition' },
        { contest_name: 'X Games Big Air', year: 2007, location: 'Los Angeles, CA', placement: 1, category: 'Big Air', prize_money: 50000.00, description: 'Gold medal in X Games Big Air competition' }
    ],
    injuries: [
        { injury_type: 'Severe Neck Injury', year: 1995, severity: 'severe', recovery_time_months: 12, description: 'Danny suffered a severe neck injury from a surfing accident, testing his resilience and determination to return to skateboarding at the highest level.' },
        { injury_type: 'Severely Sprained Ankle', year: 2005, month: 7, day: 8, severity: 'moderate', recovery_time_months: 3, description: 'Danny suffered a severely sprained ankle just before his Great Wall of China jump, but still completed the historic feat.' },
        { injury_type: 'Multiple Concussions', year: 2000, severity: 'moderate', recovery_time_months: 2, description: 'Danny suffered multiple concussions throughout his career from Mega Ramp crashes and high-impact falls.' }
    ],
    mediaAssets: [
        { title: 'Great Wall of China Jump', description: 'Historic moment of Danny Way jumping the Great Wall of China on a skateboard', media_type: 'image', year: 2005, category: 'achievement', tags: ['great wall', 'china', 'jump', 'historic'], is_featured: true },
        { title: 'Mega Ramp 23.5ft Air', description: 'Danny Way setting the world record for highest air on a skateboard', media_type: 'image', year: 2003, category: 'achievement', tags: ['mega ramp', 'world record', 'height'], is_featured: true },
        { title: 'Plan B Virtual Reality Part', description: 'Danny Way\'s legendary part from Plan B\'s Virtual Reality video', media_type: 'video', year: 1993, category: 'trick', tags: ['plan b', 'virtual reality', 'classic'], is_featured: true },
        { title: 'DC Shoes Co-Founder', description: 'Danny Way with DC Shoes co-founders Damon Way and Ken Block', media_type: 'image', year: 1994, category: 'business', tags: ['dc shoes', 'co-founder', 'business'], is_featured: false },
        { title: 'X Games Gold Medal', description: 'Danny Way celebrating his X Games Big Air gold medal victory', media_type: 'image', year: 2005, category: 'competition', tags: ['x games', 'gold medal', 'victory'], is_featured: false }
    ],
    interviews: [
        { title: 'Danny Way: The Man Who Jumped the Great Wall', publication: 'Thrasher Magazine', publish_date: '2005-08-01', interview_type: 'magazine', description: 'In-depth interview about Danny\'s historic Great Wall of China jump', is_featured: true },
        { title: 'Danny Way on Mega Ramp Innovation', publication: 'Transworld Skateboarding', publish_date: '2003-06-01', interview_type: 'magazine', description: 'Interview about Danny\'s development of the Mega Ramp and its impact on skateboarding', is_featured: true },
        { title: 'DC Shoes: The Story Behind the Brand', publication: 'Complex', publish_date: '2010-03-15', interview_type: 'magazine', description: 'Interview about co-founding DC Shoes and building the brand', is_featured: false },
        { title: 'Danny Way: Skater of the Year Interview', publication: 'Thrasher Magazine', publish_date: '2010-12-01', interview_type: 'magazine', description: 'Interview after being named Thrasher\'s Skater of the Year', is_featured: true },
        { title: 'The Nine Club: Danny Way', publication: 'The Nine Club Podcast', publish_date: '2018-05-20', interview_type: 'podcast', description: 'Comprehensive podcast interview covering Danny\'s entire career', is_featured: true }
    ]
};

async function populateDatabase() {
    try {
        console.log('🚀 Starting Danny Way database population...');
        
        if (config.dryRun) {
            console.log('🔍 DRY RUN MODE - No changes will be made');
        }

        // Check if Danny Way already exists
        const existingSkater = await sql`SELECT id FROM skaters WHERE slug = 'dannyway'`;
        
        if (existingSkater.length > 0) {
            console.log('⚠️  Danny Way already exists in database. Skipping skater creation.');
            const skaterId = existingSkater[0].id;
            
            // Clear existing data
            if (!config.dryRun) {
                await sql`DELETE FROM timeline WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM world_records WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM business_ventures WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM awards WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM parts WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM contests WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM injuries WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM media_assets WHERE skater_id = ${skaterId}`;
                await sql`DELETE FROM interviews WHERE skater_id = ${skaterId}`;
                console.log('🗑️  Cleared existing Danny Way data');
            }
        } else {
            // Insert main skater profile
            if (!config.dryRun) {
                await sql`
                    INSERT INTO skaters (
                        slug, full_name, nickname, bio, birth_date, birthplace, hometown,
                        stance, turned_pro_year, sponsors, social_links, profile_image_url,
                        header_image_url, is_active
                    ) VALUES (
                        ${dannyWayData.skater.slug},
                        ${dannyWayData.skater.full_name},
                        ${dannyWayData.skater.nickname},
                        ${dannyWayData.skater.bio},
                        ${dannyWayData.skater.birth_date},
                        ${dannyWayData.skater.birthplace},
                        ${dannyWayData.skater.hometown},
                        ${dannyWayData.skater.stance},
                        ${dannyWayData.skater.turned_pro_year},
                        ${dannyWayData.skater.sponsors},
                        ${JSON.stringify(dannyWayData.skater.social_links)},
                        ${dannyWayData.skater.profile_image_url},
                        ${dannyWayData.skater.header_image_url},
                        ${dannyWayData.skater.is_active}
                    )
                `;
                console.log('✅ Created Danny Way skater profile');
            } else {
                console.log('🔍 Would create Danny Way skater profile');
            }
        }

        // Get skater ID
        const skaterResult = await sql`SELECT id FROM skaters WHERE slug = 'dannyway'`;
        const skaterId = skaterResult[0].id;

        // Insert timeline events
        if (!config.dryRun) {
            for (const event of dannyWayData.timeline) {
                await sql`
                    INSERT INTO timeline (skater_id, year, month, day, title, description, category, significance)
                    VALUES (${skaterId}, ${event.year}, ${event.month || null}, ${event.day || null}, ${event.title}, ${event.description}, ${event.category}, ${event.significance})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.timeline.length} timeline events`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.timeline.length} timeline events`);
        }

        // Insert world records
        if (!config.dryRun) {
            for (const record of dannyWayData.worldRecords) {
                await sql`
                    INSERT INTO world_records (skater_id, record_type, record_value, unit, year, month, day, location, description, is_current)
                    VALUES (${skaterId}, ${record.record_type}, ${record.record_value}, ${record.unit}, ${record.year}, ${record.month || null}, ${record.day || null}, ${record.location}, ${record.description}, ${record.is_current})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.worldRecords.length} world records`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.worldRecords.length} world records`);
        }

        // Insert business ventures
        if (!config.dryRun) {
            for (const venture of dannyWayData.businessVentures) {
                await sql`
                    INSERT INTO business_ventures (skater_id, company_name, role, start_year, end_year, description, website_url, is_active)
                    VALUES (${skaterId}, ${venture.company_name}, ${venture.role}, ${venture.start_year}, ${venture.end_year || null}, ${venture.description}, ${venture.website_url || null}, ${venture.is_active})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.businessVentures.length} business ventures`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.businessVentures.length} business ventures`);
        }

        // Insert awards
        if (!config.dryRun) {
            for (const award of dannyWayData.awards) {
                await sql`
                    INSERT INTO awards (skater_id, award_name, year, month, day, organization, category, description)
                    VALUES (${skaterId}, ${award.award_name}, ${award.year}, ${award.month || null}, ${award.day || null}, ${award.organization}, ${award.category}, ${award.description})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.awards.length} awards`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.awards.length} awards`);
        }

        // Insert video parts
        if (!config.dryRun) {
            for (const part of dannyWayData.videoParts) {
                await sql`
                    INSERT INTO parts (skater_id, title, year, company, description, is_featured)
                    VALUES (${skaterId}, ${part.title}, ${part.year}, ${part.company}, ${part.description}, ${part.is_featured})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.videoParts.length} video parts`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.videoParts.length} video parts`);
        }

        // Insert contests
        if (!config.dryRun) {
            for (const contest of dannyWayData.contests) {
                await sql`
                    INSERT INTO contests (skater_id, contest_name, year, month, day, location, placement, category, prize_money, description)
                    VALUES (${skaterId}, ${contest.contest_name}, ${contest.year}, ${contest.month || null}, ${contest.day || null}, ${contest.location}, ${contest.placement}, ${contest.category}, ${contest.prize_money}, ${contest.description})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.contests.length} contest results`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.contests.length} contest results`);
        }

        // Insert injuries
        if (!config.dryRun) {
            for (const injury of dannyWayData.injuries) {
                await sql`
                    INSERT INTO injuries (skater_id, injury_type, year, month, day, severity, recovery_time_months, description)
                    VALUES (${skaterId}, ${injury.injury_type}, ${injury.year}, ${injury.month || null}, ${injury.day || null}, ${injury.severity}, ${injury.recovery_time_months}, ${injury.description})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.injuries.length} injury records`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.injuries.length} injury records`);
        }

        // Insert media assets
        if (!config.dryRun) {
            for (const asset of dannyWayData.mediaAssets) {
                await sql`
                    INSERT INTO media_assets (skater_id, title, description, media_type, url, thumbnail_url, year, category, tags, is_featured)
                    VALUES (${skaterId}, ${asset.title}, ${asset.description}, ${asset.media_type}, ${asset.url || 'https://example.com/placeholder'}, ${asset.thumbnail_url || 'https://example.com/placeholder-thumb'}, ${asset.year}, ${asset.category}, ${asset.tags}, ${asset.is_featured})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.mediaAssets.length} media assets`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.mediaAssets.length} media assets`);
        }

        // Insert interviews
        if (!config.dryRun) {
            for (const interview of dannyWayData.interviews) {
                await sql`
                    INSERT INTO interviews (skater_id, title, publication, url, publish_date, interview_type, description, is_featured)
                    VALUES (${skaterId}, ${interview.title}, ${interview.publication}, ${interview.url || 'https://example.com/placeholder'}, ${interview.publish_date}, ${interview.interview_type}, ${interview.description}, ${interview.is_featured})
                `;
            }
            console.log(`✅ Inserted ${dannyWayData.interviews.length} interviews`);
        } else {
            console.log(`🔍 Would insert ${dannyWayData.interviews.length} interviews`);
        }

        console.log('🎉 Database population completed successfully!');
        
        // Show summary
        const summary = await sql`
            SELECT 
                (SELECT COUNT(*) FROM timeline WHERE skater_id = ${skaterId}) as timeline_events,
                (SELECT COUNT(*) FROM world_records WHERE skater_id = ${skaterId}) as world_records,
                (SELECT COUNT(*) FROM business_ventures WHERE skater_id = ${skaterId}) as business_ventures,
                (SELECT COUNT(*) FROM awards WHERE skater_id = ${skaterId}) as awards,
                (SELECT COUNT(*) FROM parts WHERE skater_id = ${skaterId}) as video_parts,
                (SELECT COUNT(*) FROM contests WHERE skater_id = ${skaterId}) as contests,
                (SELECT COUNT(*) FROM injuries WHERE skater_id = ${skaterId}) as injuries,
                (SELECT COUNT(*) FROM media_assets WHERE skater_id = ${skaterId}) as media_assets,
                (SELECT COUNT(*) FROM interviews WHERE skater_id = ${skaterId}) as interviews
        `;
        
        console.log('\n📊 Database Summary:');
        console.log(`   Timeline Events: ${summary[0].timeline_events}`);
        console.log(`   World Records: ${summary[0].world_records}`);
        console.log(`   Business Ventures: ${summary[0].business_ventures}`);
        console.log(`   Awards: ${summary[0].awards}`);
        console.log(`   Video Parts: ${summary[0].video_parts}`);
        console.log(`   Contests: ${summary[0].contests}`);
        console.log(`   Injuries: ${summary[0].injuries}`);
        console.log(`   Media Assets: ${summary[0].media_assets}`);
        console.log(`   Interviews: ${summary[0].interviews}`);

    } catch (error) {
        console.error('❌ Error populating database:', error);
        process.exit(1);
    }
}

// Run the script
populateDatabase();