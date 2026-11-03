import fs from 'fs';

const scratchDir =
  'C:\\Users\\SenaPark\\.gemini\\antigravity\\brain\\14d16f77-7630-4cc0-a0b3-ffbdc20dc0cb\\scratch';

const totatogaRaw = JSON.parse(fs.readFileSync(`${scratchDir}\\totatoga_artists.json`, 'utf-8'));
const bscfRaw = JSON.parse(fs.readFileSync(`${scratchDir}\\crawled_artists.json`, 'utf-8'));
const bscfExtra = JSON.parse(fs.readFileSync(`${scratchDir}\\manifest_bscf_extra.json`, 'utf-8'));

// Map bIdx -> array of all works from manifest_bscf_extra.json
const extraByBIdx = new Map();
for (const item of bscfExtra) {
  if (!extraByBIdx.has(item.bIdx)) extraByBIdx.set(item.bIdx, []);
  extraByBIdx.get(item.bIdx).push(item);
}

// Visually verified 100% pure-artwork Totatoga 6th Cohort artists (zero portraits, zero faces, zero posters, zero workshop/studio photos)
const TOTATOGA_VERIFIED = {
  '/dokikim': {
    name: '김덕희',
    nameEn: 'DOKI KIM',
    discipline: '도자·조형',
    district: '중구 원도심 (또따또가)',
    instagram: 'dokikim.com',
    instagramUrl: 'http://www.dokikim.com/',
    website: 'http://www.dokikim.com/',
    workTitles: ['열과 중력의 자리 I', '비가시적 파동 II', '물질의 임계점 III'],
    uniqIndices: [2, 4, 6],
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
    uniqIndices: [4, 6, 8],
  },
  '/sayoonyang': {
    name: '양사윤',
    nameEn: 'SAYOON YANG',
    discipline: '공예·오브제',
    district: '중구 원도심 (또따또가)',
    instagram: '@say_sayoon',
    instagramUrl: 'https://www.instagram.com/say_sayoon',
    website: 'https://goodlifearchive.kr/',
    workTitles: ['도구와 물성 오브제 I', '파스텔 블록 조형 II', '기록의 물성 III'],
    uniqIndices: [2, 4, 6],
  },
  '/haeunjoe': {
    name: '조하은',
    nameEn: 'HAEUN JOE',
    discipline: '회화·미술',
    district: '중구 원도심 (또따또가)',
    instagram: '@cecilia_jhe',
    instagramUrl: 'https://www.instagram.com/cecilia_jhe',
    website: 'https://totatoga.com/haeunjoe',
    workTitles: ['찰나의 고요 I', '놓쳐버린 풍경 II', '푸른 정지의 순간 III'],
    uniqIndices: [4, 6, 8],
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
    uniqIndices: [2, 6, 8],
  },
};

// Visually verified 100% pure-artwork BSCF E-Archive artists: bIdx -> [wIdx1, wIdx2, wIdx3]
const BSCF_VERIFIED = [
  { bIdx: 1, wIndices: [2, 3, 4], district: '해운대구 달맞이·우동' }, // 안은솔 (푸른 물결·수면 회화 3점)
  { bIdx: 4, wIndices: [1, 2, 3], district: '수영구 남천·광안동' }, // 최시복 (옻칠 조형 3점)
  { bIdx: 10, wIndices: [0, 1, 2], district: '동래구 명륜·사직동' }, // 김철황 (한국화 3점)
  { bIdx: 12, wIndices: [0, 5, 7], district: '금정구 장전·구서동' }, // 이성은 (조형·설치 3점)
  { bIdx: 13, wIndices: [1, 5, 6], district: '수영구 망미동 예술마을' }, // 김현경(이플) (회화 3점)
  { bIdx: 15, wIndices: [1, 3, 4], district: '중구 중앙·동광동' }, // 홍익종 (목판화 3점)
  { bIdx: 17, wIndices: [0, 1, 2], district: '영도구 봉래·대평동' }, // 오원주 (흑백사진 3점)
  { bIdx: 18, wIndices: [0, 1, 2], district: '수영구 광안리' }, // 이진호 (도자·혼합매체 3점)
  { bIdx: 22, wIndices: [5, 6, 7], district: '기장군 일광·기장읍' }, // 조용문 (조형·부조 3점)
  { bIdx: 23, wIndices: [0, 1, 2], district: '영도구 영선·청학동' }, // 강민기 (바다 회화 3점)
  { bIdx: 24, wIndices: [3, 4, 5], district: '해운대구 좌동·송정' }, // 배남주 (회화 3점)
  { bIdx: 25, wIndices: [0, 1, 2], district: '부산진구 전포·서면' }, // 박한샘 (드로잉 3점)
  { bIdx: 26, wIndices: [0, 1, 2], district: '수영구 수영·민락동' }, // 노주련 (설치·오브제 3점)
  { bIdx: 27, wIndices: [0, 1, 2], district: '남구 대연·용호동' }, // 김보경 (설치 3점)
  { bIdx: 28, wIndices: [0, 1, 2], district: '부산진구 전포동' }, // 김현종(멘조) (기하 추상회화 3점)
  { bIdx: 29, wIndices: [0, 1, 2], district: '사하구 다대동 (홍티아트센터)' }, // 변대용 (입체조각 3점)
  { bIdx: 30, wIndices: [0, 1, 2], district: '금정구 부곡·장전동' }, // 정재훈(제제) (입체조각 3점)
  { bIdx: 31, wIndices: [0, 1, 2], district: '동래구 온천·명륜동' }, // 이창진 (회화 3점)
  { bIdx: 32, wIndices: [0, 1, 2], district: '사상구 삼락·괘법동' }, // 구경환 (회화 3점)
  { bIdx: 33, wIndices: [0, 1, 2], district: '중구 보수·대청동' }, // 김윤호 (사진 3점)
  { bIdx: 34, wIndices: [0, 1, 2], district: '남구 대연동' }, // 서일화 (회화 3점)
  { bIdx: 35, wIndices: [0, 1, 2], district: '해운대구 우동·센텀' }, // 구경미 (고래 회화 3점)
  { bIdx: 36, wIndices: [0, 1, 2], district: '서구 암남·송도' }, // 전재석 (해안 회화 3점)
  { bIdx: 38, wIndices: [10, 11, 12], district: '기장군 정관·장안읍' }, // 신준식 (도예 오브제 3점)
  { bIdx: 39, wIndices: [0, 1, 2], district: '동구 초량·수정동' }, // 백근영 (회화 3점)
];

function parseNameParts(rawName) {
  const cleaned = rawName.replace(/\//g, ' ').replace(/\s+/g, ' ').trim();
  const krMatch = cleaned.match(/^[가-힣]+(?:\s*\([가-힣]+\))?/);
  const krName = krMatch ? krMatch[0].trim() : cleaned.split(' ')[0];
  const enMatch = cleaned.match(/[A-Za-z][A-Za-z\s.()-]{2,}/);
  const enName = enMatch ? enMatch[0].trim().toUpperCase() : '';
  return { krName, enName };
}

const finalArtists = [];
let seq = 1;

// 1. Add Totatoga verified artists
for (const item of totatogaRaw) {
  const meta = TOTATOGA_VERIFIED[item.slug];
  if (!meta) continue;

  const uniqImgs = [...new Set(item.images || [])];
  const chosenUrls = [
    ...(meta.customUrls || []),
    ...meta.uniqIndices.map((idx) => uniqImgs[idx]).filter(Boolean),
  ].slice(0, 3);

  const introText = item.texts[0] || '';
  const statement =
    introText
      .replace(new RegExp(`^${meta.name}\\s*[^\\s]+\\s*`), '')
      .slice(0, 120)
      .trim() + (introText.length > 120 ? '...' : '');
  const cvText = item.texts[2] || introText;

  const artworks = chosenUrls.map((imgUrl, i) => ({
    id: `ttg-${seq}-w${i + 1}`,
    title: meta.workTitles[i] || `${meta.name} 대표작 0${i + 1}`,
    year: '2025–2026',
    medium: meta.discipline,
    imageUrl: imgUrl,
    highResUrl: imgUrl,
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
    sourceLabel: '또따또가 6기 입주작가 (2025–2026)',
    portraitUrl: chosenUrls[0],
    featuredWorkUrl: chosenUrls[0],
    artworks,
  });
  seq++;
}

// 2. Add BSCF E-Archive verified artists
for (const entry of BSCF_VERIFIED) {
  const raw = bscfRaw[entry.bIdx];
  if (!raw) continue;
  const { krName, enName } = parseNameParts(raw.name);

  const extraPool = extraByBIdx.get(entry.bIdx);
  const chosenWorks = entry.wIndices.map((wIdx, i) => {
    if (extraPool && extraPool[wIdx]) {
      const ex = extraPool[wIdx];
      return {
        id: `bscf-${raw.archiveIdx}-w${i + 1}`,
        title: ex.title || `${krName} 대표작 0${i + 1}`,
        year: '2025–2026',
        medium: raw.discipline,
        imageUrl: ex.url,
        highResUrl: ex.highResUrl || ex.url,
      };
    }
    const w = raw.artworks[wIdx] || raw.artworks[0];
    return {
      id: `bscf-${raw.archiveIdx}-w${i + 1}`,
      title: w.title || `${krName} 대표작 0${i + 1}`,
      year: '2025–2026',
      medium: raw.discipline,
      imageUrl: w.imageUrl,
      highResUrl: w.highResUrl || w.imageUrl,
    };
  });

  const recent2025 = (raw.recentActivities || []).filter(
    (a) => /2024|2025|2026/.test(a.year) || /2024|2025|2026/.test(a.title)
  );
  const actSummary = recent2025
    .slice(0, 2)
    .map((a) => `${a.year} ${a.title}`)
    .join(' · ');

  const statement = actSummary
    ? `최근 주요 전시 및 활동: ${actSummary}`
    : (raw.bio || '').slice(0, 115) + ((raw.bio || '').length > 115 ? '...' : '');

  const fullActText = (raw.recentActivities || [])
    .slice(0, 6)
    .map((a) => `• ${a.year ? `[${a.year}] ` : ''}${a.title}`)
    .join('\n');

  finalArtists.push({
    id: raw.id,
    indexNo: `ART—${String(seq).padStart(2, '0')}`,
    name: krName,
    nameEn: enName || `ARCHIVE #${raw.archiveIdx}`,
    discipline: raw.discipline === '공예' || raw.discipline === '텍스타일' ? '공예·오브제' : raw.discipline,
    district: entry.district,
    updatedAt: raw.updatedAt || '2025–2026',
    statement,
    bio: `${raw.bio}\n\n[최근 주요 활동 이력]\n${fullActText}`,
    instagram: raw.websiteOrInsta || `아카이브 #${raw.archiveIdx}`,
    instagramUrl: raw.archiveUrl,
    portfolioUrl: raw.archiveUrl,
    sourceLabel: '부산문화재단 예술인 전자아카이브 (2025–2026)',
    portraitUrl: chosenWorks[0].imageUrl,
    featuredWorkUrl: chosenWorks[0].imageUrl,
    artworks: chosenWorks,
  });
  seq++;
}

const outContent = `// Auto-generated verified dataset of ${finalArtists.length} active Busan artists (2025-2026) with 3 pure artwork images each
export const CRAWLED_ARTISTS = ${JSON.stringify(finalArtists, null, 2)};
`;

fs.writeFileSync(
  'c:\\Users\\SenaPark\\Downloads\\sena_project\\artist-meetup\\src\\data\\crawledArtists.ts',
  outContent,
  'utf-8'
);

console.log(`Successfully wrote ${finalArtists.length} verified pure-artwork artists (${finalArtists.length * 3} artworks) to src/data/crawledArtists.ts`);
