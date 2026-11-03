import fs from 'fs';

const totatogaRaw = JSON.parse(
  fs.readFileSync(
    'C:\\Users\\SenaPark\\.gemini\\antigravity\\brain\\14d16f77-7630-4cc0-a0b3-ffbdc20dc0cb\\scratch\\totatoga_artists.json',
    'utf-8'
  )
);

const bscfRaw = JSON.parse(
  fs.readFileSync(
    'C:\\Users\\SenaPark\\.gemini\\antigravity\\brain\\14d16f77-7630-4cc0-a0b3-ffbdc20dc0cb\\scratch\\crawled_artists.json',
    'utf-8'
  )
);

// Visual/Craft/Design/Photo slugs from Totatoga 6th Cohort (2025-2026 active in Busan Jung-gu)
const TOTATOGA_META = {
  '/kunyekim': {
    name: '김근예',
    nameEn: 'KUNYE KIM',
    discipline: '프린트·드로잉',
    district: '중구 중앙동 (또따또가)',
    instagram: '@kunyekim',
    instagramUrl: 'https://www.instagram.com/kunyekim/',
    website: 'https://totatoga.com/kunyekim',
    workTitles: ['일렁임의 찰나 I', '춤의 대화', '밤의 유영 (NAKED)'],
  },
  '/dokikim': {
    name: '김덕희',
    nameEn: 'DOKI KIM',
    discipline: '도자·조형',
    district: '중구 원도심 (또따또가)',
    instagram: 'dokikim.com',
    instagramUrl: 'http://www.dokikim.com/',
    website: 'http://www.dokikim.com/',
    workTitles: ['열과 중력의 자리 I', '비가시적 파동 II', '물질의 임계점 III'],
  },
  '/zeongminkim': {
    name: '김정민',
    nameEn: 'ZEONGMIN KIM',
    discipline: '사진',
    district: '중구 원도심 (또따또가)',
    instagram: '@zeongmin.kim',
    instagramUrl: 'https://www.instagram.com/zeongmin.kim/',
    website: 'http://zeongminkim.com/',
    workTitles: ['감각의 시퀀스 01', '감각의 시퀀스 02', '감각의 시퀀스 03'],
  },
  '/taewookim': {
    name: '김태우',
    nameEn: 'TAEWOO KIM',
    discipline: '프린트·드로잉',
    district: '중구 원도심 (또따또가)',
    instagram: '@hwadam_drawing',
    instagramUrl: 'https://www.instagram.com/hwadam_drawing/',
    website: 'https://totatoga.com/taewookim',
    workTitles: ['느린 선의 기록 01', '느린 선의 기록 02', '저녁의 드로잉 03'],
  },
  '/hyerimkim': {
    name: '김혜림',
    nameEn: 'HYERIM KIM',
    discipline: '회화·미술',
    district: '중구 원도심 (또따또가)',
    instagram: '@art_hyerim',
    instagramUrl: 'https://www.instagram.com/art_hyerim/',
    website: 'https://totatoga.com/hyerimkim',
    workTitles: ['시선의 온도 I', '응시와 발견 II', '내면의 결 III'],
  },
  '/Jiyunbae': {
    name: '배지윤',
    nameEn: 'JIYUN BAE',
    discipline: '도자·조형',
    district: '중구 원도심 (또따또가)',
    instagram: '@ddobagi_baeji',
    instagramUrl: 'https://www.instagram.com/ddobagi_baeji/',
    website: 'https://totatoga.com/Jiyunbae',
    workTitles: ['사건의 단면 I', '서사적 입체 II', '연결의 형태 III'],
  },
  '/seongahsim': {
    name: '심성아',
    nameEn: 'SEONGAH SIM',
    discipline: '공예·오브제',
    district: '중구 원도심 (또따또가)',
    instagram: '@sim.seong_a',
    instagramUrl: 'https://www.instagram.com/sim.seong_a/',
    website: 'https://totatoga.com/seongahsim',
    workTitles: ['수집된 종이 콜라주 I', '일상의 조각 오브제 II', '흔적의 재구성 III'],
  },
  '/sayoonyang': {
    name: '양사윤',
    nameEn: 'SAYOON YANG',
    discipline: '프린트·드로잉',
    district: '중구 원도심 (또따또가)',
    instagram: '@say_sayoon',
    instagramUrl: 'https://www.instagram.com/say_sayoon',
    website: 'https://goodlifearchive.kr/',
    workTitles: ['도구와 과정 아카이브 I', '아날로그 워크숍 키트 II', '기록의 물성 III'],
  },
  '/soyounglim': {
    name: '임소영',
    nameEn: 'SOYOUNG LIM',
    discipline: '사진',
    district: '중구 원도심 (또따또가)',
    instagram: '@chungnokpa',
    instagramUrl: 'https://www.instagram.com/chungnokpa/',
    website: 'https://totatoga.com/soyounglim',
    workTitles: ['원도심의 채집 01', '원도심의 채집 02', '원도심의 채집 03'],
  },
  '/sujeonglee': {
    name: '이수정',
    nameEn: 'SUJEONG LEE',
    discipline: '회화·미술',
    district: '중구 원도심 (또따또가)',
    instagram: '@leesujung_project',
    instagramUrl: 'https://www.instagram.com/leesujung_project',
    website: 'https://blog.naver.com/leesujung_project',
    workTitles: ['도시섬과 포구 I', '해양 예술 프로젝트 II', '포구의 기록 III'],
  },
  '/jiyounglee': {
    name: '이지영',
    nameEn: 'JIYOUNG LEE',
    discipline: '프린트·드로잉',
    district: '중구 원도심 (스튜디오 숲)',
    instagram: '@forestbooks_studio',
    instagramUrl: 'https://www.instagram.com/forestbooks_studio',
    website: 'https://inaforest.org',
    workTitles: ['스튜디오 숲 에디션 I', '타이포그래피 지류 작업 II', '아트북 바인딩 III'],
  },
  '/haeunjoe': {
    name: '조하은',
    nameEn: 'HAEUN JOE',
    discipline: '회화·미술',
    district: '중구 원도심 (또따또가)',
    instagram: '@cecilia_jhe',
    instagramUrl: 'https://www.instagram.com/cecilia_jhe',
    website: 'https://totatoga.com/haeunjoe',
    workTitles: ['찰나의 고요 I', '놓쳐버린 풍경 II', '정지의 순간 오브제 III'],
  },
  '/minkyungchoi': {
    name: '최민경',
    nameEn: 'MINKYUNG CHOI',
    discipline: '공예·오브제',
    district: '중구 원도심 (또따또가)',
    instagram: '@goodmorningrecipe',
    instagramUrl: 'https://www.instagram.com/goodmorningrecipe/',
    website: 'https://totatoga.com/minkyungchoi',
    workTitles: ['결정체 오브제 I', '투명한 경계 II', '설탕과 한천의 조형 III'],
  },
};

function parseNameParts(rawName) {
  // e.g. "김혜인 金蕙忍 KIM HYEIN" or "김현경 (이플) Kim Hyunkyung (Eepeul)" or "이순자 / 李順子 / Lee soonja"
  const cleaned = rawName.replace(/\//g, ' ').replace(/\s+/g, ' ').trim();
  const krMatch = cleaned.match(/^[가-힣]+(?:\s*\([가-힣]+\))?/);
  const krName = krMatch ? krMatch[0].trim() : cleaned.split(' ')[0];
  const enMatch = cleaned.match(/[A-Za-z][A-Za-z\s.()-]{2,}/);
  const enName = enMatch ? enMatch[0].trim().toUpperCase() : '';
  return { krName, enName };
}

const finalArtists = [];
const seenNames = new Set();

// 1. Add Totatoga 2025-2026 active artists (with Instagram + Website + 3 works)
let seq = 1;
for (const item of totatogaRaw) {
  const meta = TOTATOGA_META[item.slug];
  if (!meta) continue;

  const introText = item.texts[0] || '';
  // Remove leading name/genre prefix from introText
  const statement = introText
    .replace(new RegExp(`^${meta.name}\\s*[^\\s]+\\s*`), '')
    .slice(0, 120)
    .trim() + (introText.length > 120 ? '...' : '');

  const cvText = item.texts[2] || introText;
  const workImgs = item.images.slice(1, 4); // 3 representative artwork images

  const artworks = workImgs.map((imgUrl, i) => ({
    id: `ttg-${seq}-w${i + 1}`,
    title: meta.workTitles[i] || `${meta.name} 대표작 0${i + 1}`,
    year: '2025–2026',
    medium: meta.discipline,
    imageUrl: imgUrl,
  }));

  finalArtists.push({
    id: `ttg-${item.slug.replace('/', '')}`,
    indexNo: `ART—${String(seq).padStart(2, '0')}`,
    name: meta.name,
    nameEn: meta.nameEn,
    discipline: meta.discipline,
    district: meta.district,
    updatedAt: '2026',
    statement: statement || introText,
    bio: `${introText}\n\n[최근 주요 이력]\n${cvText.slice(0, 600)}`,
    instagram: meta.instagram,
    instagramUrl: meta.instagramUrl,
    portfolioUrl: meta.website,
    sourceLabel: '원도심 창작공간 또따또가 6기',
    portraitUrl: item.images[0] || workImgs[0],
    featuredWorkUrl: workImgs[0],
    artworks,
  });

  seenNames.add(meta.name);
  seq++;
}

// 2. Add BSCF E-Archive 2025-2026 active Busan visual/craft/photo artists (with 3 representative works)
for (const item of bscfRaw) {
  const { krName, enName } = parseNameParts(item.name);
  if (seenNames.has(krName)) continue;
  seenNames.add(krName);

  const discipline =
    item.discipline === '공예' ? '공예·오브제' : item.discipline;

  const recentActStr = item.recentActivities
    .map((a) => `${a.year} ${a.title}`)
    .join(' / ');

  const shortStatement =
    item.bio.length > 110
      ? item.bio.slice(0, 110).trim() + '...'
      : item.bio;

  const artworks = item.artworks.slice(0, 3).map((w, idx) => ({
    id: w.id,
    title: w.title,
    year: item.updatedAt.slice(0, 4) || '2026',
    medium: discipline,
    imageUrl: w.imageUrl,
    highResUrl: w.highResUrl,
  }));

  finalArtists.push({
    id: item.id,
    indexNo: `ART—${String(seq).padStart(2, '0')}`,
    name: krName,
    nameEn: enName || item.indexNo,
    discipline,
    district: '부산 활동 (전자아카이브)',
    updatedAt: item.updatedAt,
    statement: shortStatement,
    bio: recentActStr
      ? `${item.bio}\n\n[최근 주요 전시·활동]\n${recentActStr}`
      : item.bio,
    instagram: item.websiteOrInsta || item.indexNo,
    instagramUrl: item.archiveUrl,
    portfolioUrl: item.archiveUrl,
    sourceLabel: `부산문화재단 아카이브 (${item.indexNo})`,
    portraitUrl: item.portraitUrl,
    featuredWorkUrl: artworks[0].imageUrl,
    artworks,
  });

  seq++;
}

console.log(`Total combined active Busan artists: ${finalArtists.length}`);

const tsContent = `// Auto-generated by scripts/build-artist-dataset.mjs
// Real crawled Busan visual, craft, object & photography artists (2025-2026 active)
import { Artist } from './mockData';

export const CRAWLED_ARTISTS: Artist[] = ${JSON.stringify(finalArtists, null, 2)};
`;

fs.writeFileSync(
  'c:\\Users\\SenaPark\\Downloads\\sena_project\\artist-meetup\\src\\data\\crawledArtists.ts',
  tsContent,
  'utf-8'
);
console.log('Wrote src/data/crawledArtists.ts successfully!');
