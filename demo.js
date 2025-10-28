#!/usr/bin/env node

// Danny Way Biography Database Demo
// Demonstrates how to use the database for biography and movie projects

const DannyWayDatabaseManager = require('./database_manager');
const BiographyAnalyzer = require('./biography_analyzer');

async function demo() {
    console.log('🎬 Danny Way Biography Database Demo');
    console.log('===================================\n');

    // Check for database URL
    const databaseUrl = process.env.NEON_DATABASE_URL;
    if (!databaseUrl) {
        console.log('⚠️  No database URL provided. This demo will show the structure without connecting to a database.');
        console.log('To run with a real database, set NEON_DATABASE_URL environment variable.\n');
        
        // Show what the database would contain
        showDatabaseStructure();
        return;
    }

    try {
        const dbManager = new DannyWayDatabaseManager(databaseUrl);
        
        // Get Danny Way's profile
        console.log('👤 Danny Way Profile:');
        console.log('====================');
        const profile = await dbManager.getDannyWayProfile();
        console.log(`Name: ${profile.full_name}`);
        console.log(`Born: ${profile.birth_date} in ${profile.birthplace}`);
        console.log(`Hometown: ${profile.hometown}`);
        console.log(`Stance: ${profile.stance}`);
        console.log(`Turned Pro: ${profile.turned_pro_year}`);
        console.log(`Sponsors: ${profile.sponsors.join(', ')}`);
        console.log(`Bio: ${profile.bio.substring(0, 200)}...\n`);

        // Get timeline
        console.log('📅 Career Timeline:');
        console.log('==================');
        const timeline = await dbManager.getTimeline();
        timeline.slice(0, 5).forEach(event => {
            console.log(`${event.year}: ${event.title}`);
        });
        console.log(`... and ${timeline.length - 5} more events\n`);

        // Get records
        console.log('🏆 World Records:');
        console.log('================');
        const records = await dbManager.getRecords();
        records.forEach(record => {
            console.log(`${record.record_type}: ${record.record_value} ${record.unit} (${record.year})`);
        });
        console.log();

        // Get video parts
        console.log('🎥 Video Parts:');
        console.log('==============');
        const parts = await dbManager.getVideoParts();
        parts.forEach(part => {
            console.log(`${part.title} (${part.year}) - ${part.company}`);
        });
        console.log();

        // Get business ventures
        console.log('💼 Business Ventures:');
        console.log('====================');
        const ventures = await dbManager.getBusinessVentures();
        ventures.forEach(venture => {
            console.log(`${venture.company_name} (${venture.start_year}-${venture.end_year || 'Present'}) - ${venture.role}`);
        });
        console.log();

        // Get quotes
        console.log('💬 Famous Quotes:');
        console.log('================');
        const quotes = await dbManager.getQuotes();
        quotes.filter(q => q.is_famous).slice(0, 3).forEach(quote => {
            console.log(`"${quote.quote_text}"`);
            console.log(`   - ${quote.source} (${quote.year})\n`);
        });

        // Generate analysis
        console.log('📊 Data Analysis:');
        console.log('================');
        const biography = await dbManager.getCompleteBiography();
        const analyzer = new BiographyAnalyzer(biography);
        const analysis = analyzer.generateComprehensiveReport();
        
        console.log(`Total data points: ${biography.stats.totalMediaAssets + biography.timeline.length + biography.records.length}`);
        console.log(`Career span: ${analysis.careerTimeline.careerSpan} years`);
        console.log(`Major achievements: ${analysis.achievements.worldRecords + analysis.achievements.competitionWins}`);
        console.log(`DC Shoes impact: ${analysis.businessImpact.dcShoesImpact.duration} years`);
        console.log(`Content gaps identified: ${analysis.recommendations.length}`);

        // Show book outline
        console.log('\n📖 Book Outline:');
        console.log('================');
        const bookOutline = dbManager.generateBookOutline(biography);
        bookOutline.chapters.slice(0, 5).forEach(chapter => {
            console.log(`Chapter ${chapter.chapter}: ${chapter.title}`);
            console.log(`   ${chapter.description}`);
        });
        console.log(`... and ${bookOutline.chapters.length - 5} more chapters`);

        // Show movie treatment
        console.log('\n🎬 Movie Treatment:');
        console.log('==================');
        const movieTreatment = dbManager.generateMovieTreatment(biography);
        console.log(`Title: ${movieTreatment.title}`);
        console.log(`Genre: ${movieTreatment.genre}`);
        console.log(`Logline: ${movieTreatment.logline}`);
        console.log(`Acts: ${Object.keys(movieTreatment.actStructure).length}`);

        console.log('\n✅ Demo complete!');
        console.log('\nTo get started with your own database:');
        console.log('1. Set NEON_DATABASE_URL environment variable');
        console.log('2. Run: npm run setup-database');
        console.log('3. Use the database manager to access data');

    } catch (error) {
        console.error('❌ Demo failed:', error.message);
    }
}

function showDatabaseStructure() {
    console.log('📊 Database Structure:');
    console.log('=====================');
    console.log('Tables:');
    console.log('- skaters: Main profile information');
    console.log('- timeline: Career and life events (17 events)');
    console.log('- media_assets: Photos, videos, documents (50+ items)');
    console.log('- parts: Video parts and productions (5+ videos)');
    console.log('- contests: Competition results (10+ competitions)');
    console.log('- records: World records and achievements (4+ records)');
    console.log('- business_ventures: Companies and business activities (6+ ventures)');
    console.log('- injuries: Injury history and recovery (2+ injuries)');
    console.log('- quotes: Famous quotes and interviews (5+ quotes)');
    console.log('- relationships: Family, friends, mentors (5+ relationships)');
    console.log('- awards: Honors and recognition (8+ awards)');
    
    console.log('\n📈 Key Statistics:');
    console.log('- Career span: 35+ years');
    console.log('- World records: 4+ verified');
    console.log('- Competition wins: 10+ major victories');
    console.log('- Awards: 8+ major honors');
    console.log('- Business ventures: 6+ companies');
    console.log('- DC Shoes: 25+ year success');
    
    console.log('\n🎯 Use Cases:');
    console.log('- Biography book development');
    console.log('- Movie production research');
    console.log('- Academic research');
    console.log('- Historical preservation');
    console.log('- Content creation');
}

// Run the demo
if (require.main === module) {
    demo();
}

module.exports = { demo };