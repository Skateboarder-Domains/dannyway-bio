// Danny Way Biography Analyzer
// Comprehensive analysis and reporting for biography book and movie project

const fs = require('fs');
const path = require('path');

class BiographyAnalyzer {
    constructor(biographyData) {
        this.data = biographyData;
    }

    // Analyze career timeline and identify key periods
    analyzeCareerTimeline() {
        const timeline = this.data.timeline;
        const careerPeriods = {
            earlyCareer: timeline.filter(t => parseInt(t.year) <= 1989),
            planBEra: timeline.filter(t => parseInt(t.year) >= 1990 && parseInt(t.year) <= 1995),
            injuryRecovery: timeline.filter(t => parseInt(t.year) >= 1995 && parseInt(t.year) <= 1999),
            megaRampEra: timeline.filter(t => parseInt(t.year) >= 2000 && parseInt(t.year) <= 2009),
            greatWallEra: timeline.filter(t => t.year === '2005'),
            legacyEra: timeline.filter(t => parseInt(t.year) >= 2010)
        };

        return {
            periods: careerPeriods,
            totalEvents: timeline.length,
            majorMilestones: timeline.filter(t => t.significance === 'major').length,
            careerSpan: new Date().getFullYear() - 1989,
            mostSignificantYear: this.findMostSignificantYear(timeline)
        };
    }

    findMostSignificantYear(timeline) {
        const yearCounts = {};
        timeline.forEach(event => {
            const year = event.year;
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        });
        
        return Object.keys(yearCounts).reduce((a, b) => 
            yearCounts[a] > yearCounts[b] ? a : b
        );
    }

    // Analyze media assets and identify content gaps
    analyzeMediaAssets() {
        const media = this.data.mediaAssets;
        const analysis = {
            totalAssets: media.length,
            byType: this.groupBy(media, 'media_type'),
            byYear: this.groupBy(media, 'year'),
            byCategory: this.groupBy(media, 'tags'),
            primaryAssets: media.filter(m => m.is_primary).length,
            contentGaps: this.identifyContentGaps(media)
        };

        return analysis;
    }

    groupBy(array, key) {
        return array.reduce((groups, item) => {
            const value = Array.isArray(item[key]) ? item[key].join(', ') : item[key];
            groups[value] = (groups[value] || 0) + 1;
            return groups;
        }, {});
    }

    identifyContentGaps(media) {
        const gaps = [];
        const years = [...new Set(media.map(m => m.year))].sort();
        
        // Check for years with no media
        for (let year = 1989; year <= new Date().getFullYear(); year++) {
            if (!years.includes(year)) {
                gaps.push({
                    type: 'missing_year',
                    year: year,
                    description: `No media assets found for ${year}`
                });
            }
        }

        // Check for missing media types
        const mediaTypes = [...new Set(media.map(m => m.media_type))];
        const expectedTypes = ['image', 'video', 'document', 'audio'];
        expectedTypes.forEach(type => {
            if (!mediaTypes.includes(type)) {
                gaps.push({
                    type: 'missing_media_type',
                    mediaType: type,
                    description: `No ${type} assets found`
                });
            }
        });

        return gaps;
    }

    // Analyze achievements and records
    analyzeAchievements() {
        const records = this.data.records;
        const contests = this.data.contests;
        const awards = this.data.awards;

        return {
            worldRecords: records.filter(r => r.verified).length,
            competitionWins: contests.filter(c => c.placement === 1).length,
            totalAwards: awards.length,
            skaterOfYearAwards: awards.filter(a => a.category === 'skater_of_year').length,
            xGamesGoldMedals: contests.filter(c => c.event_name.includes('X Games') && c.placement === 1).length,
            hallOfFame: awards.filter(a => a.category === 'lifetime_achievement').length,
            mostSignificantAchievement: this.findMostSignificantAchievement(records, contests, awards)
        };
    }

    findMostSignificantAchievement(records, contests, awards) {
        const allAchievements = [
            ...records.map(r => ({ type: 'record', title: r.record_type, year: r.year })),
            ...contests.filter(c => c.placement === 1).map(c => ({ type: 'contest', title: c.event_name, year: c.year })),
            ...awards.map(a => ({ type: 'award', title: a.award_name, year: a.year }))
        ];

        // The Great Wall jump is considered the most significant
        const greatWall = allAchievements.find(a => a.title.includes('Great Wall'));
        return greatWall || allAchievements[0];
    }

    // Analyze business ventures and impact
    analyzeBusinessImpact() {
        const ventures = this.data.businessVentures;
        const activeVentures = ventures.filter(v => v.is_active);
        const dcShoes = ventures.find(v => v.company_name === 'DC Shoes');

        return {
            totalVentures: ventures.length,
            activeVentures: activeVentures.length,
            dcShoesImpact: {
                founded: dcShoes?.start_year,
                duration: dcShoes ? new Date().getFullYear() - dcShoes.start_year : 0,
                description: dcShoes?.description
            },
            businessDiversity: ventures.map(v => v.role),
            longestVenture: ventures.reduce((longest, current) => 
                (current.end_year || new Date().getFullYear()) - current.start_year > 
                (longest.end_year || new Date().getFullYear()) - longest.start_year ? current : longest
            )
        };
    }

    // Analyze personal life and relationships
    analyzePersonalLife() {
        const relationships = this.data.relationships;
        const injuries = this.data.injuries;
        const quotes = this.data.quotes;

        return {
            keyRelationships: relationships.filter(r => r.is_public),
            familyMembers: relationships.filter(r => ['brother', 'father', 'mother'].includes(r.relationship_type)),
            mentors: relationships.filter(r => r.relationship_type === 'mentor'),
            peers: relationships.filter(r => r.relationship_type === 'peer'),
            totalInjuries: injuries.length,
            mostSeriousInjury: injuries.reduce((most, current) => 
                this.getInjurySeverity(current) > this.getInjurySeverity(most) ? current : most
            ),
            famousQuotes: quotes.filter(q => q.is_famous),
            totalQuotes: quotes.length
        };
    }

    getInjurySeverity(injury) {
        const severityMap = { 'minor': 1, 'moderate': 2, 'severe': 3, 'career_threatening': 4 };
        return severityMap[injury.severity] || 0;
    }

    // Generate comprehensive report
    generateComprehensiveReport() {
        const careerAnalysis = this.analyzeCareerTimeline();
        const mediaAnalysis = this.analyzeMediaAssets();
        const achievementAnalysis = this.analyzeAchievements();
        const businessAnalysis = this.analyzeBusinessImpact();
        const personalAnalysis = this.analyzePersonalLife();

        const report = {
            executiveSummary: {
                totalDataPoints: this.data.stats.totalMediaAssets + this.data.timeline.length + this.data.records.length,
                careerSpan: careerAnalysis.careerSpan,
                majorAchievements: achievementAnalysis.worldRecords + achievementAnalysis.competitionWins,
                businessSuccess: businessAnalysis.dcShoesImpact.duration > 25,
                culturalImpact: 'Revolutionized skateboarding through mega ramp innovation and historic achievements'
            },
            careerTimeline: careerAnalysis,
            mediaAssets: mediaAnalysis,
            achievements: achievementAnalysis,
            businessImpact: businessAnalysis,
            personalLife: personalAnalysis,
            recommendations: this.generateRecommendations(mediaAnalysis, careerAnalysis),
            contentPriorities: this.generateContentPriorities(mediaAnalysis, achievementAnalysis)
        };

        return report;
    }

    generateRecommendations(mediaAnalysis, careerAnalysis) {
        const recommendations = [];

        if (mediaAnalysis.contentGaps.length > 0) {
            recommendations.push({
                priority: 'high',
                category: 'content_gaps',
                description: 'Address missing media assets for key years',
                details: mediaAnalysis.contentGaps
            });
        }

        if (mediaAnalysis.byType.video < 10) {
            recommendations.push({
                priority: 'medium',
                category: 'video_content',
                description: 'Increase video content collection for dynamic storytelling',
                details: 'More video assets needed for movie production'
            });
        }

        if (careerAnalysis.earlyCareer.length < 5) {
            recommendations.push({
                priority: 'medium',
                category: 'early_career',
                description: 'Gather more information about early career years',
                details: 'Important for establishing character development'
            });
        }

        return recommendations;
    }

    generateContentPriorities(mediaAnalysis, achievementAnalysis) {
        return {
            highPriority: [
                'Great Wall of China jump (2005) - most iconic moment',
                'Mega ramp development and world records',
                'DC Shoes founding and business success',
                'X Games dominance and gold medals'
            ],
            mediumPriority: [
                'Plan B video parts and early career',
                'Neck injury and recovery story',
                'Thrasher Skater of the Year awards',
                'Hall of Fame induction'
            ],
            lowPriority: [
                'Early childhood and family background',
                'Recent business ventures',
                'Personal relationships and quotes',
                'Minor competitions and achievements'
            ]
        };
    }

    // Export analysis to files
    exportAnalysis(outputDir = './analysis') {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const report = this.generateComprehensiveReport();
        
        // Export full report
        fs.writeFileSync(
            path.join(outputDir, 'comprehensive_analysis.json'), 
            JSON.stringify(report, null, 2)
        );

        // Export individual analyses
        fs.writeFileSync(
            path.join(outputDir, 'career_timeline_analysis.json'), 
            JSON.stringify(report.careerTimeline, null, 2)
        );

        fs.writeFileSync(
            path.join(outputDir, 'media_assets_analysis.json'), 
            JSON.stringify(report.mediaAssets, null, 2)
        );

        fs.writeFileSync(
            path.join(outputDir, 'achievements_analysis.json'), 
            JSON.stringify(report.achievements, null, 2)
        );

        fs.writeFileSync(
            path.join(outputDir, 'business_impact_analysis.json'), 
            JSON.stringify(report.businessImpact, null, 2)
        );

        fs.writeFileSync(
            path.join(outputDir, 'personal_life_analysis.json'), 
            JSON.stringify(report.personalLife, null, 2)
        );

        // Export recommendations
        fs.writeFileSync(
            path.join(outputDir, 'recommendations.json'), 
            JSON.stringify(report.recommendations, null, 2)
        );

        // Export content priorities
        fs.writeFileSync(
            path.join(outputDir, 'content_priorities.json'), 
            JSON.stringify(report.contentPriorities, null, 2)
        );

        console.log(`✅ Analysis exported to ${outputDir}`);
        return outputDir;
    }
}

module.exports = BiographyAnalyzer;