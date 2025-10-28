#!/usr/bin/env node

// Danny Way Biography Database Setup Script
// Complete setup and population of Danny Way biography database

const DannyWayDatabaseManager = require('./database_manager');
const BiographyAnalyzer = require('./biography_analyzer');
const fs = require('fs');
const path = require('path');

async function main() {
    console.log('🎬 Danny Way Biography Database Setup');
    console.log('=====================================\n');

    // Check for database URL
    const databaseUrl = process.env.NEON_DATABASE_URL;
    if (!databaseUrl) {
        console.error('❌ NEON_DATABASE_URL environment variable is required');
        console.log('Please set your database URL:');
        console.log('export NEON_DATABASE_URL="postgresql://username:password@host/database?sslmode=require"');
        process.exit(1);
    }

    try {
        // Initialize database manager
        const dbManager = new DannyWayDatabaseManager(databaseUrl);
        
        // Initialize database with schema and data
        console.log('📊 Setting up database...');
        await dbManager.initializeDatabase();
        
        // Get complete biography data
        console.log('📚 Gathering biography data...');
        const biography = await dbManager.getCompleteBiography();
        
        // Analyze the data
        console.log('🔍 Analyzing data...');
        const analyzer = new BiographyAnalyzer(biography);
        const analysis = analyzer.generateComprehensiveReport();
        
        // Export data
        console.log('💾 Exporting data...');
        const exportDir = await dbManager.exportToJSON('./exports');
        const analysisDir = analyzer.exportAnalysis('./analysis');
        
        // Generate book outline
        console.log('📖 Generating book outline...');
        const bookOutline = dbManager.generateBookOutline(biography);
        fs.writeFileSync('./book_outline.json', JSON.stringify(bookOutline, null, 2));
        
        // Generate movie treatment
        console.log('🎬 Generating movie treatment...');
        const movieTreatment = dbManager.generateMovieTreatment(biography);
        fs.writeFileSync('./movie_treatment.json', JSON.stringify(movieTreatment, null, 2));
        
        // Print summary
        console.log('\n✅ Database setup complete!');
        console.log('========================');
        console.log(`📊 Total data points: ${biography.stats.totalMediaAssets + biography.timeline.length + biography.records.length}`);
        console.log(`📚 Timeline events: ${biography.timeline.length}`);
        console.log(`🎥 Media assets: ${biography.stats.totalMediaAssets}`);
        console.log(`🏆 Records: ${biography.stats.totalRecords}`);
        console.log(`🏅 Awards: ${biography.stats.totalAwards}`);
        console.log(`📈 Career span: ${biography.stats.careerSpan} years`);
        console.log(`🎯 Major achievements: ${biography.stats.majorAchievements}`);
        
        console.log('\n📁 Files created:');
        console.log(`   - Database exports: ${exportDir}/`);
        console.log(`   - Analysis reports: ${analysisDir}/`);
        console.log(`   - Book outline: book_outline.json`);
        console.log(`   - Movie treatment: movie_treatment.json`);
        
        console.log('\n🎯 Next steps:');
        console.log('   1. Review the analysis reports for content gaps');
        console.log('   2. Use the book outline to structure your biography');
        console.log('   3. Use the movie treatment for film development');
        console.log('   4. Gather additional media assets for identified gaps');
        console.log('   5. Conduct additional interviews for personal stories');
        
        // Print key insights
        console.log('\n🔍 Key Insights:');
        console.log(`   - Most significant year: ${analysis.careerTimeline.mostSignificantYear}`);
        console.log(`   - Most significant achievement: ${analysis.achievements.mostSignificantAchievement.title}`);
        console.log(`   - DC Shoes impact: ${analysis.businessImpact.dcShoesImpact.duration} years`);
        console.log(`   - Content gaps identified: ${analysis.recommendations.length}`);
        
        if (analysis.recommendations.length > 0) {
            console.log('\n⚠️  Recommendations:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`   ${index + 1}. [${rec.priority.toUpperCase()}] ${rec.description}`);
            });
        }
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

// Run the setup
if (require.main === module) {
    main();
}

module.exports = { main };