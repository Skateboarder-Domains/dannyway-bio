// Danny Way Biography Database Manager
// Comprehensive database management for biography book and movie project

const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

class DannyWayDatabaseManager {
    constructor(databaseUrl) {
        this.sql = neon(databaseUrl);
    }

    // Initialize the database with schema and data
    async initializeDatabase() {
        try {
            console.log('🚀 Initializing Danny Way Biography Database...');
            
            // Read and execute schema
            const schemaSQL = fs.readFileSync(path.join(__dirname, 'database_schema.sql'), 'utf8');
            await this.sql`${schemaSQL}`;
            console.log('✅ Database schema created successfully');

            // Read and execute data
            const dataSQL = fs.readFileSync(path.join(__dirname, 'danny_way_data.sql'), 'utf8');
            await this.sql`${dataSQL}`;
            console.log('✅ Danny Way data populated successfully');

            // Read and execute media assets
            const mediaSQL = fs.readFileSync(path.join(__dirname, 'media_assets_data.sql'), 'utf8');
            await this.sql`${mediaSQL}`;
            console.log('✅ Media assets data populated successfully');

            console.log('🎉 Database initialization complete!');
        } catch (error) {
            console.error('❌ Database initialization failed:', error);
            throw error;
        }
    }

    // Get comprehensive Danny Way profile
    async getDannyWayProfile() {
        try {
            const profile = await this.sql`
                SELECT * FROM skaters WHERE slug = 'dannyway'
            `;
            return profile[0];
        } catch (error) {
            console.error('Error fetching Danny Way profile:', error);
            throw error;
        }
    }

    // Get complete timeline
    async getTimeline() {
        try {
            const timeline = await this.sql`
                SELECT * FROM timeline 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year ASC
            `;
            return timeline;
        } catch (error) {
            console.error('Error fetching timeline:', error);
            throw error;
        }
    }

    // Get all media assets
    async getMediaAssets() {
        try {
            const media = await this.sql`
                SELECT * FROM media_assets 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year DESC, created_at DESC
            `;
            return media;
        } catch (error) {
            console.error('Error fetching media assets:', error);
            throw error;
        }
    }

    // Get video parts
    async getVideoParts() {
        try {
            const parts = await this.sql`
                SELECT * FROM parts 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year DESC
            `;
            return parts;
        } catch (error) {
            console.error('Error fetching video parts:', error);
            throw error;
        }
    }

    // Get records and achievements
    async getRecords() {
        try {
            const records = await this.sql`
                SELECT * FROM records 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year DESC
            `;
            return records;
        } catch (error) {
            console.error('Error fetching records:', error);
            throw error;
        }
    }

    // Get contests and competitions
    async getContests() {
        try {
            const contests = await this.sql`
                SELECT * FROM contests 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year DESC
            `;
            return contests;
        } catch (error) {
            console.error('Error fetching contests:', error);
            throw error;
        }
    }

    // Get business ventures
    async getBusinessVentures() {
        try {
            const ventures = await this.sql`
                SELECT * FROM business_ventures 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY start_year DESC
            `;
            return ventures;
        } catch (error) {
            console.error('Error fetching business ventures:', error);
            throw error;
        }
    }

    // Get injuries
    async getInjuries() {
        try {
            const injuries = await this.sql`
                SELECT * FROM injuries 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY injury_date DESC
            `;
            return injuries;
        } catch (error) {
            console.error('Error fetching injuries:', error);
            throw error;
        }
    }

    // Get quotes
    async getQuotes() {
        try {
            const quotes = await this.sql`
                SELECT * FROM quotes 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year DESC
            `;
            return quotes;
        } catch (error) {
            console.error('Error fetching quotes:', error);
            throw error;
        }
    }

    // Get relationships
    async getRelationships() {
        try {
            const relationships = await this.sql`
                SELECT * FROM relationships 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY relationship_type
            `;
            return relationships;
        } catch (error) {
            console.error('Error fetching relationships:', error);
            throw error;
        }
    }

    // Get awards
    async getAwards() {
        try {
            const awards = await this.sql`
                SELECT * FROM awards 
                WHERE skater_id = (SELECT id FROM skaters WHERE slug = 'dannyway')
                ORDER BY year DESC
            `;
            return awards;
        } catch (error) {
            console.error('Error fetching awards:', error);
            throw error;
        }
    }

    // Get comprehensive biography data
    async getCompleteBiography() {
        try {
            const profile = await this.getDannyWayProfile();
            const timeline = await this.getTimeline();
            const mediaAssets = await this.getMediaAssets();
            const videoParts = await this.getVideoParts();
            const records = await this.getRecords();
            const contests = await this.getContests();
            const businessVentures = await this.getBusinessVentures();
            const injuries = await this.getInjuries();
            const quotes = await this.getQuotes();
            const relationships = await this.getRelationships();
            const awards = await this.getAwards();

            return {
                profile,
                timeline,
                mediaAssets,
                videoParts,
                records,
                contests,
                businessVentures,
                injuries,
                quotes,
                relationships,
                awards,
                stats: {
                    totalMediaAssets: mediaAssets.length,
                    totalVideoParts: videoParts.length,
                    totalRecords: records.length,
                    totalContests: contests.length,
                    totalAwards: awards.length,
                    careerSpan: new Date().getFullYear() - 1989,
                    majorAchievements: timeline.filter(t => t.significance === 'major').length
                }
            };
        } catch (error) {
            console.error('Error fetching complete biography:', error);
            throw error;
        }
    }

    // Export data to JSON files for backup
    async exportToJSON(outputDir = './exports') {
        try {
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const biography = await this.getCompleteBiography();
            
            // Export individual sections
            fs.writeFileSync(path.join(outputDir, 'danny_way_profile.json'), JSON.stringify(biography.profile, null, 2));
            fs.writeFileSync(path.join(outputDir, 'timeline.json'), JSON.stringify(biography.timeline, null, 2));
            fs.writeFileSync(path.join(outputDir, 'media_assets.json'), JSON.stringify(biography.mediaAssets, null, 2));
            fs.writeFileSync(path.join(outputDir, 'video_parts.json'), JSON.stringify(biography.videoParts, null, 2));
            fs.writeFileSync(path.join(outputDir, 'records.json'), JSON.stringify(biography.records, null, 2));
            fs.writeFileSync(path.join(outputDir, 'contests.json'), JSON.stringify(biography.contests, null, 2));
            fs.writeFileSync(path.join(outputDir, 'business_ventures.json'), JSON.stringify(biography.businessVentures, null, 2));
            fs.writeFileSync(path.join(outputDir, 'injuries.json'), JSON.stringify(biography.injuries, null, 2));
            fs.writeFileSync(path.join(outputDir, 'quotes.json'), JSON.stringify(biography.quotes, null, 2));
            fs.writeFileSync(path.join(outputDir, 'relationships.json'), JSON.stringify(biography.relationships, null, 2));
            fs.writeFileSync(path.join(outputDir, 'awards.json'), JSON.stringify(biography.awards, null, 2));

            // Export complete biography
            fs.writeFileSync(path.join(outputDir, 'complete_biography.json'), JSON.stringify(biography, null, 2));

            console.log(`✅ Data exported to ${outputDir}`);
            return outputDir;
        } catch (error) {
            console.error('Error exporting data:', error);
            throw error;
        }
    }

    // Generate biography book outline
    generateBookOutline(biography) {
        const outline = {
            title: "Danny Way: The Way Forward - A Complete Biography",
            chapters: [
                {
                    chapter: 1,
                    title: "The Beginning (1974-1989)",
                    description: "Early life, introduction to skateboarding, first competitions",
                    timelineEvents: biography.timeline.filter(t => parseInt(t.year) <= 1989),
                    mediaAssets: biography.mediaAssets.filter(m => m.year <= 1989)
                },
                {
                    chapter: 2,
                    title: "Plan B Revolution (1990-1995)",
                    description: "Joining Plan B, groundbreaking videos, co-founding DC Shoes",
                    timelineEvents: biography.timeline.filter(t => parseInt(t.year) >= 1990 && parseInt(t.year) <= 1995),
                    mediaAssets: biography.mediaAssets.filter(m => m.year >= 1990 && m.year <= 1995)
                },
                {
                    chapter: 3,
                    title: "The Injury and Comeback (1995-1999)",
                    description: "Neck injury, recovery, determination to return",
                    timelineEvents: biography.timeline.filter(t => parseInt(t.year) >= 1995 && parseInt(t.year) <= 1999),
                    mediaAssets: biography.mediaAssets.filter(m => m.year >= 1995 && m.year <= 1999)
                },
                {
                    chapter: 4,
                    title: "Mega Ramp Innovation (2000-2004)",
                    description: "Development of mega ramp, X Games dominance, world records",
                    timelineEvents: biography.timeline.filter(t => parseInt(t.year) >= 2000 && parseInt(t.year) <= 2004),
                    mediaAssets: biography.mediaAssets.filter(m => m.year >= 2000 && m.year <= 2004)
                },
                {
                    chapter: 5,
                    title: "The Great Wall (2005)",
                    description: "Historic Great Wall of China jump, global recognition",
                    timelineEvents: biography.timeline.filter(t => t.year === '2005'),
                    mediaAssets: biography.mediaAssets.filter(m => m.year === 2005)
                },
                {
                    chapter: 6,
                    title: "Continued Innovation (2006-2010)",
                    description: "Ongoing mega ramp progression, multiple Skater of the Year awards",
                    timelineEvents: biography.timeline.filter(t => parseInt(t.year) >= 2006 && parseInt(t.year) <= 2010),
                    mediaAssets: biography.mediaAssets.filter(m => m.year >= 2006 && m.year <= 2010)
                },
                {
                    chapter: 7,
                    title: "Legacy and Influence (2010-Present)",
                    description: "Hall of Fame induction, continued business success, inspiring new generations",
                    timelineEvents: biography.timeline.filter(t => parseInt(t.year) >= 2010),
                    mediaAssets: biography.mediaAssets.filter(m => m.year >= 2010)
                },
                {
                    chapter: 8,
                    title: "The Business Empire",
                    description: "DC Shoes success, other ventures, business philosophy",
                    timelineEvents: biography.timeline.filter(t => t.category === 'business'),
                    mediaAssets: biography.mediaAssets.filter(m => m.tags && m.tags.includes('business'))
                },
                {
                    chapter: 9,
                    title: "Personal Life and Relationships",
                    description: "Family, mentors, peers, personal philosophy",
                    timelineEvents: [],
                    mediaAssets: biography.mediaAssets.filter(m => m.tags && m.tags.includes('personal'))
                },
                {
                    chapter: 10,
                    title: "The Way Forward",
                    description: "Legacy, influence on skateboarding, future vision",
                    timelineEvents: [],
                    mediaAssets: []
                }
            ]
        };

        return outline;
    }

    // Generate movie treatment outline
    generateMovieTreatment(biography) {
        const treatment = {
            title: "The Way: The Danny Way Story",
            genre: "Biographical Sports Drama",
            logline: "The incredible true story of Danny Way, the skateboarder who defied gravity, conquered the Great Wall of China, and revolutionized his sport through fearless innovation and unwavering determination.",
            actStructure: {
                act1: {
                    title: "The Foundation",
                    description: "Early life, discovery of skateboarding, first competitions, turning pro",
                    keyScenes: [
                        "5-year-old Danny getting his first skateboard",
                        "First competition victory at age 11",
                        "Turning pro at 15",
                        "Joining Plan B Skateboards"
                    ],
                    timeline: "1974-1991"
                },
                act2: {
                    title: "Rise and Fall",
                    description: "Plan B success, DC Shoes founding, devastating neck injury, recovery",
                    keyScenes: [
                        "Questionable and Virtual Reality video releases",
                        "Co-founding DC Shoes with brother Damon",
                        "Devastating neck injury from surfing",
                        "Painful recovery and determination to return"
                    ],
                    timeline: "1992-1999"
                },
                act3: {
                    title: "Revolution",
                    description: "Mega ramp development, X Games dominance, world records, Great Wall jump",
                    keyScenes: [
                        "First mega ramp construction",
                        "X Games world record height of 23.5 feet",
                        "Great Wall of China jump preparation",
                        "Historic jump and celebration"
                    ],
                    timeline: "2000-2005"
                },
                act4: {
                    title: "Legacy",
                    description: "Continued innovation, Hall of Fame induction, inspiring new generations",
                    keyScenes: [
                        "Multiple Skater of the Year awards",
                        "Hall of Fame induction speech",
                        "Mentoring young skateboarders",
                        "Reflection on his impact"
                    ],
                    timeline: "2006-Present"
                }
            },
            keyCharacters: [
                {
                    name: "Danny Way",
                    description: "Protagonist - fearless skateboarder and innovator",
                    ageRange: "5-50",
                    arc: "From young prodigy to legendary innovator"
                },
                {
                    name: "Damon Way",
                    description: "Danny's brother and DC Shoes co-founder",
                    relationship: "Supportive brother and business partner"
                },
                {
                    name: "Mike Ternasky",
                    description: "Plan B founder and early mentor",
                    relationship: "Mentor who believed in Danny's potential"
                },
                {
                    name: "Ken Block",
                    description: "DC Shoes co-founder",
                    relationship: "Business partner and friend"
                }
            ],
            visualStyle: {
                cinematography: "Dynamic, kinetic camera work matching skateboarding energy",
                colorPalette: "Vibrant, high-contrast colors reflecting skateboard culture",
                music: "Punk rock, alternative, and electronic music from different eras",
                specialEffects: "Practical effects for skateboarding stunts, CGI for impossible shots"
            },
            targetAudience: "Sports fans, skateboarders, general audiences interested in inspirational stories",
            budget: "Mid-range ($15-25 million)",
            boxOffice: "Potential for strong international appeal"
        };

        return treatment;
    }
}

module.exports = DannyWayDatabaseManager;