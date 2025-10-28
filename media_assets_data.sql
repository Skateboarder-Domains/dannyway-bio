-- Danny Way Media Assets Data
-- Comprehensive collection of images, videos, and documents for biography project

DO $$
DECLARE
    danny_way_id UUID;
    great_wall_event_id UUID;
    x_games_2003_event_id UUID;
    mega_ramp_dev_event_id UUID;
    plan_b_questionable_event_id UUID;
    plan_b_vr_event_id UUID;
    neck_injury_event_id UUID;
    dc_foundation_event_id UUID;
BEGIN
    -- Get Danny Way's ID
    SELECT id INTO danny_way_id FROM skaters WHERE slug = 'dannyway';
    
    -- Get specific event IDs for media associations
    SELECT id INTO great_wall_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'Great Wall of China Jump';
    SELECT id INTO x_games_2003_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'World Record Heights';
    SELECT id INTO mega_ramp_dev_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'Mega Ramp Development';
    SELECT id INTO plan_b_questionable_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'Plan B "Questionable" Released';
    SELECT id INTO plan_b_vr_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'Plan B "Virtual Reality"';
    SELECT id INTO neck_injury_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'Severe Neck Injury';
    SELECT id INTO dc_foundation_event_id FROM timeline WHERE skater_id = danny_way_id AND title = 'Co-Founds DC Shoes';

    -- Images - Early Career (1979-1990)
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Danny Way Age 5 with First Skateboard', 'Early photo of Danny with his first skateboard at age 5', 'image', 'jpg', 1979, NULL, false, ARRAY['early_career', 'childhood', 'first_board']),
    (danny_way_id, 'Danny Way at Del Mar Skate Ranch', 'Photo of young Danny skating at Del Mar Skate Ranch', 'image', 'jpg', 1980, NULL, false, ARRAY['early_career', 'del_mar', 'skatepark']),
    (danny_way_id, 'First Competition Victory 1985', 'Photo of Danny winning his first competition at age 11', 'image', 'jpg', 1985, NULL, true, ARRAY['competition', 'victory', 'early_career']),
    (danny_way_id, 'Danny Way Street Skating 1988', 'Action shot of Danny street skating before turning pro', 'image', 'jpg', 1988, NULL, false, ARRAY['street_skating', 'pre_pro', 'action']),
    (danny_way_id, 'Danny Way Pro Debut 1989', 'Official pro debut photo at age 15', 'image', 'jpg', 1989, NULL, true, ARRAY['pro_debut', 'milestone', 'portrait']);

    -- Images - Plan B Era (1991-1995)
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Danny Way Plan B Team Photo', 'Team photo with Plan B skateboarders', 'image', 'jpg', 1991, NULL, false, ARRAY['plan_b', 'team', 'portrait']),
    (danny_way_id, 'Questionable Video Cover', 'Cover art for Plan B Questionable video', 'image', 'jpg', 1992, plan_b_questionable_event_id, true, ARRAY['video_cover', 'questionable', 'plan_b']),
    (danny_way_id, 'Danny Way Questionable Part Screenshot', 'Screenshot from Danny''s part in Questionable video', 'image', 'jpg', 1992, plan_b_questionable_event_id, false, ARRAY['video_screenshot', 'trick', 'questionable']),
    (danny_way_id, 'Virtual Reality Video Cover', 'Cover art for Plan B Virtual Reality video', 'image', 'jpg', 1993, plan_b_vr_event_id, true, ARRAY['video_cover', 'virtual_reality', 'plan_b']),
    (danny_way_id, 'Danny Way VR Part Screenshot', 'Screenshot from Danny''s legendary Virtual Reality part', 'image', 'jpg', 1993, plan_b_vr_event_id, false, ARRAY['video_screenshot', 'trick', 'virtual_reality']),
    (danny_way_id, 'Danny Way Street Trick 1993', 'Action shot of Danny performing street trick', 'image', 'jpg', 1993, NULL, false, ARRAY['street_trick', 'action', 'plan_b_era']);

    -- Images - DC Shoes Era (1994-2000)
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'DC Shoes Founding Photo', 'Photo of Danny, Damon Way, and Ken Block founding DC Shoes', 'image', 'jpg', 1994, dc_foundation_event_id, true, ARRAY['dc_shoes', 'founding', 'business']),
    (danny_way_id, 'Danny Way DC Shoes Ad', 'Early DC Shoes advertisement featuring Danny', 'image', 'jpg', 1995, NULL, false, ARRAY['advertisement', 'dc_shoes', 'commercial']),
    (danny_way_id, 'Danny Way Neck Injury Recovery', 'Photo of Danny during neck injury recovery', 'image', 'jpg', 1995, neck_injury_event_id, false, ARRAY['injury', 'recovery', 'personal']),
    (danny_way_id, 'Danny Way Return to Skating', 'Photo of Danny returning to skating after neck injury', 'image', 'jpg', 1996, NULL, false, ARRAY['comeback', 'recovery', 'determination']),
    (danny_way_id, 'DC Shoes Team Photo 1998', 'DC Shoes team photo with Danny prominently featured', 'image', 'jpg', 1998, NULL, false, ARRAY['dc_shoes', 'team', 'portrait']);

    -- Images - Mega Ramp Era (2000-2010)
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'First Mega Ramp Construction', 'Photo of Danny with the first mega ramp structure', 'image', 'jpg', 2000, mega_ramp_dev_event_id, true, ARRAY['mega_ramp', 'construction', 'innovation']),
    (danny_way_id, 'Danny Way Mega Ramp Air', 'Action shot of Danny getting massive air on mega ramp', 'image', 'jpg', 2002, NULL, false, ARRAY['mega_ramp', 'big_air', 'action']),
    (danny_way_id, 'X Games 2003 World Record', 'Photo of Danny setting 23.5-foot world record at X Games', 'image', 'jpg', 2003, x_games_2003_event_id, true, ARRAY['x_games', 'world_record', 'height']),
    (danny_way_id, 'Danny Way X Games Gold Medal', 'Photo of Danny with X Games gold medal', 'image', 'jpg', 2003, x_games_2003_event_id, false, ARRAY['x_games', 'gold_medal', 'achievement']),
    (danny_way_id, 'Mega Ramp 360 Trick', 'Action shot of Danny performing 360 over 75-foot gap', 'image', 'jpg', 2005, NULL, false, ARRAY['mega_ramp', '360', 'distance_record']),
    (danny_way_id, 'Danny Way Mega Ramp Progression', 'Series of photos showing mega ramp trick progression', 'image', 'jpg', 2004, NULL, false, ARRAY['mega_ramp', 'progression', 'innovation']);

    -- Images - Great Wall of China (2005)
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Great Wall Jump Setup', 'Photo of mega ramp setup at Great Wall of China', 'image', 'jpg', 2005, great_wall_event_id, false, ARRAY['great_wall', 'setup', 'mega_ramp']),
    (danny_way_id, 'Danny Way Great Wall Jump', 'Historic photo of Danny jumping the Great Wall of China', 'image', 'jpg', 2005, great_wall_event_id, true, ARRAY['great_wall', 'jump', 'historic']),
    (danny_way_id, 'Great Wall Jump Celebration', 'Photo of Danny celebrating successful Great Wall jump', 'image', 'jpg', 2005, great_wall_event_id, false, ARRAY['great_wall', 'celebration', 'achievement']),
    (danny_way_id, 'Great Wall Jump Crowd', 'Photo of crowd watching the Great Wall jump', 'image', 'jpg', 2005, great_wall_event_id, false, ARRAY['great_wall', 'crowd', 'spectators']),
    (danny_way_id, 'Danny Way with Chinese Officials', 'Photo of Danny with Chinese officials after the jump', 'image', 'jpg', 2005, great_wall_event_id, false, ARRAY['great_wall', 'officials', 'diplomatic']);

    -- Images - Later Career (2010-Present)
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Thrasher Skater of the Year 2004', 'Photo of Danny receiving first Skater of the Year award', 'image', 'jpg', 2004, NULL, true, ARRAY['thrasher', 'skater_of_year', 'award']),
    (danny_way_id, 'Thrasher Skater of the Year 2005', 'Photo of Danny receiving second Skater of the Year award', 'image', 'jpg', 2005, NULL, true, ARRAY['thrasher', 'skater_of_year', 'award']),
    (danny_way_id, 'Danny Way Hall of Fame Induction', 'Photo of Danny being inducted into Skateboarding Hall of Fame', 'image', 'jpg', 2015, NULL, true, ARRAY['hall_of_fame', 'induction', 'lifetime_achievement']),
    (danny_way_id, 'Danny Way Recent Mega Ramp', 'Recent photo of Danny on mega ramp', 'image', 'jpg', 2020, NULL, false, ARRAY['recent', 'mega_ramp', 'still_skating']),
    (danny_way_id, 'Danny Way Business Meeting', 'Photo of Danny in business meeting for DC Shoes', 'image', 'jpg', 2018, NULL, false, ARRAY['business', 'dc_shoes', 'executive']);

    -- Videos - Early Career
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Danny Way First Competition Footage', 'Rare footage of Danny''s first competition victory at age 11', 'video', 'mp4', 1985, NULL, true, ARRAY['early_career', 'competition', 'first_victory']),
    (danny_way_id, 'Danny Way Street Skating 1988', 'Compilation of Danny''s street skating before turning pro', 'video', 'mp4', 1988, NULL, false, ARRAY['street_skating', 'pre_pro', 'compilation']),
    (danny_way_id, 'Danny Way Pro Debut Interview', 'Interview with Danny about turning professional', 'video', 'mp4', 1989, NULL, false, ARRAY['interview', 'pro_debut', 'personal']);

    -- Videos - Plan B Era
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Plan B Questionable Full Video', 'Complete Questionable video featuring Danny''s part', 'video', 'mp4', 1992, plan_b_questionable_event_id, true, ARRAY['questionable', 'full_video', 'plan_b']),
    (danny_way_id, 'Danny Way Questionable Part Only', 'Danny''s individual part from Questionable video', 'video', 'mp4', 1992, plan_b_questionable_event_id, false, ARRAY['questionable', 'individual_part', 'danny_way']),
    (danny_way_id, 'Plan B Virtual Reality Full Video', 'Complete Virtual Reality video featuring Danny''s legendary part', 'video', 'mp4', 1993, plan_b_vr_event_id, true, ARRAY['virtual_reality', 'full_video', 'plan_b']),
    (danny_way_id, 'Danny Way VR Part Only', 'Danny''s individual part from Virtual Reality video', 'video', 'mp4', 1993, plan_b_vr_event_id, false, ARRAY['virtual_reality', 'individual_part', 'danny_way']),
    (danny_way_id, 'Plan B Behind the Scenes', 'Behind the scenes footage from Plan B video production', 'video', 'mp4', 1993, NULL, false, ARRAY['behind_scenes', 'plan_b', 'production']);

    -- Videos - DC Shoes Era
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'DC Shoes Founding Story', 'Documentary about the founding of DC Shoes', 'video', 'mp4', 1994, dc_foundation_event_id, true, ARRAY['dc_shoes', 'founding', 'documentary']),
    (danny_way_id, 'Danny Way Neck Injury Recovery', 'Documentary about Danny''s recovery from neck injury', 'video', 'mp4', 1995, neck_injury_event_id, false, ARRAY['injury', 'recovery', 'documentary']),
    (danny_way_id, 'DC Video Danny Way Part', 'Danny''s part from early DC Shoes team video', 'video', 'mp4', 1998, NULL, false, ARRAY['dc_shoes', 'team_video', 'individual_part']);

    -- Videos - Mega Ramp Era
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Mega Ramp Development Documentary', 'Documentary about the development of the mega ramp', 'video', 'mp4', 2000, mega_ramp_dev_event_id, true, ARRAY['mega_ramp', 'development', 'documentary']),
    (danny_way_id, 'X Games 2003 World Record Attempt', 'Complete footage of Danny''s world record height attempt', 'video', 'mp4', 2003, x_games_2003_event_id, true, ARRAY['x_games', 'world_record', 'competition']),
    (danny_way_id, 'Danny Way Mega Ramp Compilation', 'Compilation of Danny''s best mega ramp moments', 'video', 'mp4', 2004, NULL, false, ARRAY['mega_ramp', 'compilation', 'best_moments']),
    (danny_way_id, 'X Games Big Air 2004-2007', 'Compilation of Danny''s X Games Big Air victories', 'video', 'mp4', 2007, NULL, false, ARRAY['x_games', 'big_air', 'victories']);

    -- Videos - Great Wall of China
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Great Wall Jump Full Documentary', 'Complete documentary of the Great Wall of China jump', 'video', 'mp4', 2005, great_wall_event_id, true, ARRAY['great_wall', 'jump', 'documentary']),
    (danny_way_id, 'Great Wall Jump Raw Footage', 'Raw footage of the actual jump without commentary', 'video', 'mp4', 2005, great_wall_event_id, false, ARRAY['great_wall', 'jump', 'raw_footage']),
    (danny_way_id, 'Great Wall Jump Preparation', 'Behind the scenes footage of jump preparation', 'video', 'mp4', 2005, great_wall_event_id, false, ARRAY['great_wall', 'preparation', 'behind_scenes']),
    (danny_way_id, 'Great Wall Jump Celebration', 'Footage of celebration after successful jump', 'video', 'mp4', 2005, great_wall_event_id, false, ARRAY['great_wall', 'celebration', 'success']);

    -- Videos - Later Career
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Danny Way Career Retrospective', 'Retrospective video covering Danny''s entire career', 'video', 'mp4', 2010, NULL, true, ARRAY['retrospective', 'career', 'documentary']),
    (danny_way_id, 'Thrasher Skater of the Year Interview', 'Interview with Danny about winning Skater of the Year', 'video', 'mp4', 2005, NULL, false, ARRAY['thrasher', 'skater_of_year', 'interview']),
    (danny_way_id, 'Danny Way Hall of Fame Speech', 'Danny''s speech at Skateboarding Hall of Fame induction', 'video', 'mp4', 2015, NULL, false, ARRAY['hall_of_fame', 'speech', 'induction']),
    (danny_way_id, 'Danny Way Recent Interview', 'Recent interview about his legacy and current projects', 'video', 'mp4', 2020, NULL, false, ARRAY['recent', 'interview', 'legacy']);

    -- Documents and Articles
    INSERT INTO media_assets (skater_id, title, description, media_type, file_format, year, event_id, is_primary, tags) VALUES
    (danny_way_id, 'Thrasher Magazine Cover 2004', 'Thrasher Magazine cover featuring Danny as Skater of the Year', 'document', 'pdf', 2004, NULL, true, ARRAY['thrasher', 'magazine_cover', 'skater_of_year']),
    (danny_way_id, 'Thrasher Magazine Cover 2005', 'Thrasher Magazine cover featuring Danny as Skater of the Year', 'document', 'pdf', 2005, NULL, true, ARRAY['thrasher', 'magazine_cover', 'skater_of_year']),
    (danny_way_id, 'Transworld Skateboarding Interview', 'In-depth interview with Danny in Transworld Skateboarding', 'document', 'pdf', 2003, NULL, false, ARRAY['transworld', 'interview', 'magazine']),
    (danny_way_id, 'ESPN Magazine Great Wall Feature', 'ESPN Magazine feature on the Great Wall jump', 'document', 'pdf', 2005, great_wall_event_id, false, ARRAY['espn', 'great_wall', 'magazine']),
    (danny_way_id, 'DC Shoes Company History', 'Document about DC Shoes company history and Danny''s role', 'document', 'pdf', 2010, dc_foundation_event_id, false, ARRAY['dc_shoes', 'company_history', 'business']),
    (danny_way_id, 'Danny Way Biography Draft', 'Early draft of Danny''s official biography', 'document', 'pdf', 2020, NULL, false, ARRAY['biography', 'draft', 'personal']);

END $$;