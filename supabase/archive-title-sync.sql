-- Sync the built-in archive display names with pages/monsters.html.
-- Run in the Supabase SQL Editor. Stable source_file_id values are retained.

update public.archive_entries
set name = case source_file_id
  when 'ARCHIVE_QUARRY' then 'QUARRY'
  when 'ARCHIVE_ORGS' then 'ORGS'
  when 'QUARRY_01_VAMPIRES.DAT' then 'VAMPIRES.DAT'
  when 'QUARRY_02_WEREWOLVES.DAT' then 'WEREWOLVES.DAT'
  when 'QUARRY_03_SORCERERS.DAT' then 'SORCERERS.DAT'
  when 'QUARRY_04_GHOSTS.DAT' then 'GHOSTS.DAT'
  when 'QUARRY_05_FAIR_FOLK_OTHERS.DAT' then 'FAIR_FOLK.DAT'
  when 'ORG_01_SAD_FBI.DAT' then 'SAD_FBI.DAT'
  when 'ORG_02_IAO.DAT' then 'IAO.DAT'
  when 'ORG_03_ST_LEOPOLD.DAT' then 'ST_LEOPOLD.DAT'
  when 'ORG_04_ARCANUM.DAT' then 'ARCANUM.DAT'
  when 'ORG_05_MONSTER_X.DAT' then 'MONSTER_X.DAT'
  when 'ORG_06_BOPE_RJ.DAT' then 'BOPE_RJ.DAT'
  when 'ORG_07_SPECIAL_REHAB.DAT' then 'SPECIAL_REHAB.DAT'
  when 'ORG_08_OTHER_ORGS.DAT' then 'OTHERS.DAT'
  else name
end
where source_file_id in (
  'ARCHIVE_QUARRY', 'ARCHIVE_ORGS',
  'QUARRY_01_VAMPIRES.DAT', 'QUARRY_02_WEREWOLVES.DAT',
  'QUARRY_03_SORCERERS.DAT', 'QUARRY_04_GHOSTS.DAT',
  'QUARRY_05_FAIR_FOLK_OTHERS.DAT',
  'ORG_01_SAD_FBI.DAT', 'ORG_02_IAO.DAT', 'ORG_03_ST_LEOPOLD.DAT',
  'ORG_04_ARCANUM.DAT', 'ORG_05_MONSTER_X.DAT', 'ORG_06_BOPE_RJ.DAT',
  'ORG_07_SPECIAL_REHAB.DAT', 'ORG_08_OTHER_ORGS.DAT'
)
and is_system = true;
