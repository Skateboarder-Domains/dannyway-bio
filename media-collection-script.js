#!/usr/bin/env node

/**
 * Danny Way Media Collection Script
 * 
 * This script helps identify and collect media assets for Danny Way's biography.
 * It generates a comprehensive list of media sources and provides tools for
 * organizing and processing the collected content.
 * 
 * Usage:
 *   node media-collection-script.js [--generate-list] [--process-folder=path]
 * 
 * Options:
 *   --generate-list: Generate a comprehensive media collection list
 *   --process-folder: Process a folder of collected media files
 */

const fs = require('fs');
const path = require('path');

// Media collection configuration
const mediaSources = {
    videos: {
        'Plan B Questionable (1992)': {
            description: 'Danny Way\'s groundbreaking part in Plan B\'s "Questionable" video',
            priority: 'high',
            sources: [
                'YouTube: Search "Danny Way Questionable Plan B"',
                'Vimeo: Search "Danny Way Questionable"',
                'Skateboard video archives',
                'Plan B official channels'
            ],
            tags: ['plan b', 'questionable', '1992', 'classic', 'groundbreaking']
        },
        'Plan B Virtual Reality (1993)': {
            description: 'Danny Way\'s legendary part from "Virtual Reality"',
            priority: 'high',
            sources: [
                'YouTube: Search "Danny Way Virtual Reality Plan B"',
                'Vimeo: Search "Danny Way Virtual Reality"',
                'Skateboard video archives',
                'Plan B official channels'
            ],
            tags: ['plan b', 'virtual reality', '1993', 'legendary', 'influential']
        },
        'DC Shoes The DC Video (2003)': {
            description: 'Danny Way\'s part in the DC Video showcasing Mega Ramp progression',
            priority: 'high',
            sources: [
                'YouTube: Search "Danny Way DC Video"',
                'DC Shoes official channels',
                'Skateboard video archives'
            ],
            tags: ['dc shoes', 'dc video', '2003', 'mega ramp', 'progression']
        },
        'Great Wall of China Jump (2005)': {
            description: 'Historic moment of Danny Way jumping the Great Wall of China',
            priority: 'critical',
            sources: [
                'YouTube: Search "Danny Way Great Wall China"',
                'ESPN archives',
                'DC Shoes official channels',
                'News archives (CNN, BBC, etc.)'
            ],
            tags: ['great wall', 'china', '2005', 'historic', 'world record']
        },
        'X Games Big Air Competitions (2000-2007)': {
            description: 'Danny Way\'s X Games Big Air victories and performances',
            priority: 'high',
            sources: [
                'ESPN X Games archives',
                'YouTube: Search "Danny Way X Games Big Air"',
                'ESPN official channels'
            ],
            tags: ['x games', 'big air', 'competition', 'gold medal', 'mega ramp']
        },
        'Mega Ramp World Records': {
            description: 'Danny Way setting world records on the Mega Ramp',
            priority: 'high',
            sources: [
                'YouTube: Search "Danny Way Mega Ramp World Record"',
                'ESPN archives',
                'DC Shoes official channels'
            ],
            tags: ['mega ramp', 'world record', 'height', 'distance', 'innovation']
        },
        'The Nine Club Interview (2018)': {
            description: 'Comprehensive podcast interview covering Danny\'s entire career',
            priority: 'high',
            sources: [
                'The Nine Club YouTube channel',
                'The Nine Club podcast platforms',
                'Spotify, Apple Podcasts, etc.'
            ],
            tags: ['interview', 'podcast', 'nine club', '2018', 'comprehensive']
        }
    },
    images: {
        'Early Career Photos (1980s-1990s)': {
            description: 'Photos from Danny\'s early skateboarding career',
            priority: 'medium',
            sources: [
                'Thrasher Magazine archives',
                'Transworld Skateboarding archives',
                'Skateboard photography collections',
                'Personal archives'
            ],
            tags: ['early career', '1980s', '1990s', 'young', 'progression']
        },
        'Plan B Era Photos': {
            description: 'Photos from Danny\'s time with Plan B Skateboards',
            priority: 'high',
            sources: [
                'Plan B official archives',
                'Thrasher Magazine archives',
                'Transworld Skateboarding archives',
                'Skateboard photography collections'
            ],
            tags: ['plan b', '1990s', 'classic', 'influential', 'video parts']
        },
        'DC Shoes Business Photos': {
            description: 'Photos of Danny with DC Shoes co-founders and business events',
            priority: 'medium',
            sources: [
                'DC Shoes official archives',
                'Business photography collections',
                'Company events and meetings'
            ],
            tags: ['dc shoes', 'business', 'co-founder', 'damon way', 'ken block']
        },
        'X Games Competition Photos': {
            description: 'Photos from Danny\'s X Games victories and competitions',
            priority: 'high',
            sources: [
                'ESPN X Games archives',
                'Sports photography collections',
                'Competition event photos'
            ],
            tags: ['x games', 'competition', 'gold medal', 'victory', 'mega ramp']
        },
        'Great Wall of China Photos': {
            description: 'Photos from the historic Great Wall of China jump',
            priority: 'critical',
            sources: [
                'News photography archives',
                'DC Shoes official archives',
                'Event photography collections',
                'International media archives'
            ],
            tags: ['great wall', 'china', '2005', 'historic', 'world record']
        },
        'Mega Ramp Progression Photos': {
            description: 'Photos showing Danny\'s Mega Ramp development and progression',
            priority: 'high',
            sources: [
                'DC Shoes official archives',
                'Skateboard photography collections',
                'Training session photos'
            ],
            tags: ['mega ramp', 'progression', 'innovation', 'development', 'training']
        },
        'Recent Photos (2010-Present)': {
            description: 'Recent photos of Danny Way and his current projects',
            priority: 'medium',
            sources: [
                'Social media archives',
                'Recent interviews and features',
                'Current project documentation'
            ],
            tags: ['recent', '2010s', 'present', 'current', 'legacy']
        }
    },
    documents: {
        'Thrasher Magazine Features': {
            description: 'Complete collection of Danny Way Thrasher Magazine features',
            priority: 'high',
            sources: [
                'Thrasher Magazine archives',
                'Digital magazine collections',
                'Library archives'
            ],
            tags: ['thrasher', 'magazine', 'features', 'interviews', 'articles']
        },
        'Transworld Skateboarding Articles': {
            description: 'Danny Way articles and features in Transworld Skateboarding',
            priority: 'medium',
            sources: [
                'Transworld Skateboarding archives',
                'Digital magazine collections',
                'Library archives'
            ],
            tags: ['transworld', 'magazine', 'articles', 'features', 'interviews']
        },
        'ESPN X Games Coverage': {
            description: 'ESPN coverage of Danny Way\'s X Games performances',
            priority: 'high',
            sources: [
                'ESPN archives',
                'Sports journalism collections',
                'Competition coverage archives'
            ],
            tags: ['espn', 'x games', 'coverage', 'sports', 'competition']
        },
        'Business Documentation': {
            description: 'DC Shoes business documentation and company history',
            priority: 'medium',
            sources: [
                'DC Shoes official archives',
                'Business documentation collections',
                'Company history archives'
            ],
            tags: ['dc shoes', 'business', 'documentation', 'company', 'history']
        }
    }
};

// Media processing configuration
const mediaProcessing = {
    imageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff'],
    videoFormats: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
    documentFormats: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
    maxFileSize: 100 * 1024 * 1024, // 100MB
    thumbnailSizes: [
        { width: 150, height: 150, suffix: '_thumb' },
        { width: 400, height: 400, suffix: '_medium' },
        { width: 800, height: 600, suffix: '_large' }
    ]
};

function generateMediaCollectionList() {
    console.log('🎬 Danny Way Media Collection List\n');
    console.log('=' .repeat(50));
    
    // Videos
    console.log('\n📹 VIDEOS (Priority Order):\n');
    Object.entries(mediaSources.videos).forEach(([title, info], index) => {
        console.log(`${index + 1}. ${title}`);
        console.log(`   Description: ${info.description}`);
        console.log(`   Priority: ${info.priority.toUpperCase()}`);
        console.log(`   Sources:`);
        info.sources.forEach(source => console.log(`     - ${source}`));
        console.log(`   Tags: ${info.tags.join(', ')}`);
        console.log('');
    });
    
    // Images
    console.log('\n📸 IMAGES (Priority Order):\n');
    Object.entries(mediaSources.images).forEach(([title, info], index) => {
        console.log(`${index + 1}. ${title}`);
        console.log(`   Description: ${info.description}`);
        console.log(`   Priority: ${info.priority.toUpperCase()}`);
        console.log(`   Sources:`);
        info.sources.forEach(source => console.log(`     - ${source}`));
        console.log(`   Tags: ${info.tags.join(', ')}`);
        console.log('');
    });
    
    // Documents
    console.log('\n📄 DOCUMENTS (Priority Order):\n');
    Object.entries(mediaSources.documents).forEach(([title, info], index) => {
        console.log(`${index + 1}. ${title}`);
        console.log(`   Description: ${info.description}`);
        console.log(`   Priority: ${info.priority.toUpperCase()}`);
        console.log(`   Sources:`);
        info.sources.forEach(source => console.log(`     - ${source}`));
        console.log(`   Tags: ${info.tags.join(', ')}`);
        console.log('');
    });
    
    console.log('\n' + '=' .repeat(50));
    console.log('\n📋 COLLECTION CHECKLIST:');
    console.log('\nHigh Priority Items:');
    console.log('□ Plan B Questionable video part');
    console.log('□ Plan B Virtual Reality video part');
    console.log('□ Great Wall of China jump footage');
    console.log('□ X Games Big Air competitions (2000-2007)');
    console.log('□ Mega Ramp world record footage');
    console.log('□ The Nine Club interview');
    console.log('□ Plan B era photos');
    console.log('□ X Games competition photos');
    console.log('□ Great Wall of China photos');
    console.log('□ Thrasher Magazine features');
    console.log('□ ESPN X Games coverage');
    
    console.log('\nMedium Priority Items:');
    console.log('□ Early career photos');
    console.log('□ DC Shoes business photos');
    console.log('□ Recent photos');
    console.log('□ Transworld Skateboarding articles');
    console.log('□ Business documentation');
    
    console.log('\n🔧 PROCESSING INSTRUCTIONS:');
    console.log('1. Download media files to organized folders');
    console.log('2. Rename files with descriptive names');
    console.log('3. Generate thumbnails for images and videos');
    console.log('4. Extract metadata (date, location, photographer)');
    console.log('5. Tag files with relevant keywords');
    console.log('6. Upload to CDN or media storage');
    console.log('7. Update database with media asset information');
}

function processMediaFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.error(`❌ Folder does not exist: ${folderPath}`);
        return;
    }
    
    console.log(`🔍 Processing media folder: ${folderPath}`);
    
    const mediaFiles = [];
    const stats = {
        images: 0,
        videos: 0,
        documents: 0,
        totalSize: 0,
        errors: []
    };
    
    function scanDirectory(dir) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                scanDirectory(filePath);
            } else {
                const ext = path.extname(file).toLowerCase().substring(1);
                const fileSize = stat.size;
                
                if (mediaProcessing.imageFormats.includes(ext)) {
                    stats.images++;
                    mediaFiles.push({
                        type: 'image',
                        path: filePath,
                        name: file,
                        size: fileSize,
                        extension: ext
                    });
                } else if (mediaProcessing.videoFormats.includes(ext)) {
                    stats.videos++;
                    mediaFiles.push({
                        type: 'video',
                        path: filePath,
                        name: file,
                        size: fileSize,
                        extension: ext
                    });
                } else if (mediaProcessing.documentFormats.includes(ext)) {
                    stats.documents++;
                    mediaFiles.push({
                        type: 'document',
                        path: filePath,
                        name: file,
                        size: fileSize,
                        extension: ext
                    });
                }
                
                stats.totalSize += fileSize;
                
                if (fileSize > mediaProcessing.maxFileSize) {
                    stats.errors.push(`Large file: ${file} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`);
                }
            }
        });
    }
    
    scanDirectory(folderPath);
    
    console.log('\n📊 Media Processing Results:');
    console.log(`   Images: ${stats.images}`);
    console.log(`   Videos: ${stats.videos}`);
    console.log(`   Documents: ${stats.documents}`);
    console.log(`   Total Size: ${(stats.totalSize / 1024 / 1024).toFixed(2)}MB`);
    
    if (stats.errors.length > 0) {
        console.log('\n⚠️  Warnings:');
        stats.errors.forEach(error => console.log(`   ${error}`));
    }
    
    console.log('\n📁 Media Files Found:');
    mediaFiles.forEach(file => {
        console.log(`   ${file.type.toUpperCase()}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    });
    
    // Generate processing recommendations
    console.log('\n🔧 Processing Recommendations:');
    console.log('1. Generate thumbnails for images and videos');
    console.log('2. Compress large files if necessary');
    console.log('3. Extract metadata from files');
    console.log('4. Organize files by category and date');
    console.log('5. Upload to media storage/CDN');
    console.log('6. Update database with media information');
    
    return mediaFiles;
}

function generateMediaDatabaseScript(mediaFiles) {
    const script = `-- Media Assets Database Insert Script
-- Generated from media collection processing

INSERT INTO media_assets (skater_id, title, description, media_type, url, thumbnail_url, year, category, tags, is_featured) VALUES
${mediaFiles.map(file => {
    const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const category = file.type === 'image' ? 'lifestyle' : file.type === 'video' ? 'trick' : 'document';
    const tags = [file.type, file.extension];
    
    return `(danny_way_id, '${title}', '${file.name}', '${file.type}', 'https://cdn.example.com/media/${file.name}', 'https://cdn.example.com/thumbnails/${file.name}', NULL, '${category}', ARRAY[${tags.map(tag => `'${tag}'`).join(', ')}], false)`;
}).join(',\n')};`;

    fs.writeFileSync('media-assets-insert.sql', script);
    console.log('\n💾 Generated media-assets-insert.sql');
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--generate-list')) {
    generateMediaCollectionList();
} else if (args.find(arg => arg.startsWith('--process-folder='))) {
    const folderPath = args.find(arg => arg.startsWith('--process-folder=')).split('=')[1];
    const mediaFiles = processMediaFolder(folderPath);
    if (mediaFiles && mediaFiles.length > 0) {
        generateMediaDatabaseScript(mediaFiles);
    }
} else {
    console.log('Danny Way Media Collection Script');
    console.log('\nUsage:');
    console.log('  node media-collection-script.js --generate-list');
    console.log('  node media-collection-script.js --process-folder=/path/to/media');
    console.log('\nOptions:');
    console.log('  --generate-list     Generate comprehensive media collection list');
    console.log('  --process-folder    Process a folder of collected media files');
}