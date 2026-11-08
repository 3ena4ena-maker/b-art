import React, { useState, useMemo, useEffect } from 'react';
import {
  ARTISTS,
  GOODS_MANUALS,
  LOCAL_MAKERS,
  INITIAL_COLLAB_POSTS,
  GALLERIES,
  Artist,
  Artwork,
  ArtistCollabStatus,
  GoodsManual,
  GallerySpace,
  CollabPost,
  NaverCareerItem,
} from './data/mockData';
import { ArrowUpRight, Plus, X, Search, Lock, Check, Clock, Trash2, Upload, ShieldCheck } from 'lucide-react';

type ActiveSection =
  | 'overview'
  | 'artists'
  | 'souvenirs'
  | 'galleries'
  | 'collab'
  | 'artist-apply'
  | 'admin';
type GallerySpecFilter = 'all' | 'rental' | 'sales' | 'artshop' | 'zero_commission';
type GalleryAudienceMode = 'all' | 'public' | 'artist';
type ArtistCollabFilter = 'all' | 'souvenir_partner' | 'open_collab' | 'collectible';

export interface ArtistApplication {
  id: string;
  status: 'pending' | 'approved';
  submittedAt: string;
  approvedAt?: string;
  name: string;
  nameEn: string;
  discipline: string;
  district: string;
  jobTitle: string;
  affiliation: string;
  instagram: string;
  instagramUrl: string;
  portfolioUrl: string;
  collectionsAndMedia: string;
  education: string;
  detailedIntro: string;
  careerText: string;
  contact: string;
  works: Array<{
    title: string;
    year: string;
    mediumDetail: string;
    imageUrl: string;
  }>;
}

const APPLICATIONS_STORAGE_KEY = 'parang_artist_applications_v1';
const ADMIN_SESSION_KEY = 'parang_admin_authed_v1';

function parseCareerTimelineFromText(careerText: string): NaverCareerItem[] {
  const lines = careerText
    .split('\n')
    .map((l) => l.replace(/^[-·•*]+\s*/, '').trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [{ year: '2026', badge: '개인전', content: '부산 지역 기반 개인전 및 기획전 활동' }];
  }

  return lines.map((line) => {
    const yearMatch = line.match(/\b(19\d{2}|20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : '최근';
    const contentClean = line.replace(/^\b(19\d{2}|20\d{2})\b[\s·.:,-]*/, '').trim() || line;

    let badge: NaverCareerItem['badge'] = '단체전';
    if (line.includes('개인전') || line.includes('초대전') || line.includes('독주')) {
      badge = '개인전';
    } else if (line.includes('수상') || line.includes('선정') || line.includes('입선') || line.includes('특선')) {
      badge = '수상·선정';
    } else if (line.includes('레지던시') || line.includes('입주') || line.includes('강사') || line.includes('대표')) {
      badge = '레지던시·경력';
    } else if (line.includes('소장') || line.includes('출판') || line.includes('프로젝트')) {
      badge = '소장·출판';
    }

    return {
      year,
      badge,
      content: contentClean,
    };
  });
}

function normalizeInstagramInput(rawInsta: string): { handle: string; url: string } {
  const trimmed = rawInsta.trim();
  if (!trimmed || trimmed === '@') {
    return { handle: '', url: '' };
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const m = trimmed.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
    if (m && m[1]) {
      return { handle: `@${m[1]}`, url: `https://www.instagram.com/${m[1]}/` };
    }
    return { handle: trimmed, url: trimmed };
  }
  const cleanHandle = trimmed.replace(/^@+/, '');
  return {
    handle: `@${cleanHandle}`,
    url: `https://www.instagram.com/${cleanHandle}/`,
  };
}

function buildArtistFromApplication(app: ArtistApplication, idxOffset: number): Artist {
  const validWorks = app.works.filter((w) => w.imageUrl && w.imageUrl.trim().length > 0);
  const fallbackImg =
    validWorks[0]?.imageUrl ||
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80';

  const paddedWorks = [0, 1, 2].map((i) => {
    const src = validWorks[i] || validWorks[0] || {
      title: '',
      year: '2026',
      mediumDetail: app.collectionsAndMedia || app.discipline,
      imageUrl: fallbackImg,
    };
    return {
      id: `${app.id}-w-${i + 1}`,
      title: src.title || '',
      year: src.year || '2026',
      medium: app.discipline,
      mediumDetail: src.mediumDetail || app.collectionsAndMedia || app.discipline,
      dimensions: '가변 규격',
      availability: '소장 가능' as const,
      priceLabel: '판매가 문의 (floreur 중개)',
      imageUrl: src.imageUrl || fallbackImg,
      highResUrl: src.imageUrl || fallbackImg,
    };
  });

  const timeline = parseCareerTimelineFromText(app.careerText);
  const insta = normalizeInstagramInput(app.instagram);
  const cleanPortfolio = app.portfolioUrl.trim()
    ? app.portfolioUrl.trim().startsWith('http')
      ? app.portfolioUrl.trim()
      : `https://${app.portfolioUrl.trim()}`
    : '';

  const displayInsta =
    insta.handle ||
    (cleanPortfolio
      ? cleanPortfolio.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
      : '@busan_artist');
  const primaryUrl = insta.url || cleanPortfolio || 'https://www.instagram.com/';

  return {
    id: `approved-${app.id}`,
    indexNo: `ARTIST ${51 + idxOffset}`,
    name: app.name,
    nameEn: app.nameEn || app.name.toUpperCase(),
    discipline: app.discipline,
    district: app.district || '부산',
    updatedAt: (app.approvedAt || app.submittedAt).slice(0, 10),
    statement: app.detailedIntro.slice(0, 90) + (app.detailedIntro.length > 90 ? '...' : ''),
    bio: `${app.detailedIntro}\n\n[최근 주요 활동 이력]\n${app.careerText}`,
    naverProfile: {
      jobTitle: app.jobTitle || `${app.discipline} 작가`,
      affiliation: app.affiliation || `부산 ${app.district} 작업실`,
      education: app.education || '미술·조형 전공',
      awards: '부산 활동 예술작가 아카이브 등재',
      collectionsAndMedia: app.collectionsAndMedia || app.discipline,
      signatureKeywords: [],
      detailedIntro: app.detailedIntro,
      careerTimeline: timeline,
    },
    soloExhibitions: timeline.filter((t) => t.badge === '개인전').map((t) => `${t.year} ${t.content}`),
    groupExhibitions: timeline.filter((t) => t.badge !== '개인전').map((t) => `${t.year} ${t.content}`),
    collabStatus: '협업 열림 (Open to Collab)',
    collabNote: '전시 기획 · 브랜드 아트콜라보 · 굿즈 개발 열림',
    instagram: displayInsta,
    instagramUrl: primaryUrl,
    portfolioUrl: cleanPortfolio || primaryUrl,
    sourceLabel: '작가 직접 신청 · 관리자 승인 등재',
    portraitUrl: paddedWorks[0].imageUrl,
    featuredWorkUrl: paddedWorks[0].imageUrl,
    artworks: paddedWorks,
  };
}

// 15-row dot-matrix bitmaps for Busan's 10,452 active artists (Korea Artist Welfare Foundation / Busan Cultural Foundation)
const BUSAN_ARTIST_DIGIT_MATRIX: Array<{
  char: string;
  cols: number;
  rows: string[];
  avatars: Array<{ row: number; col: number; artistIdx: number; ringColor: string }>;
}> = [
  {
    char: '1',
    cols: 9,
    rows: [
      '000111000',
      '001111000',
      '011111000',
      '111111000',
      '000111000',
      '000111000',
      '000111000',
      '000111000',
      '000111000',
      '000111000',
      '011111110',
      '011111110',
      '011111110',
      '000000000',
      '000000000',
    ],
    avatars: [
      { row: 2, col: 4, artistIdx: 0, ringColor: '#1E3A8A' },
      { row: 7, col: 4, artistIdx: 1, ringColor: '#854D0E' },
      { row: 11, col: 6, artistIdx: 2, ringColor: '#0F766E' },
    ],
  },
  {
    char: '0',
    cols: 11,
    rows: [
      '00111111100',
      '01111111110',
      '11110001111',
      '11100000111',
      '11100000111',
      '11100000111',
      '11100000111',
      '11100000111',
      '11100000111',
      '11100000111',
      '11110001111',
      '01111111110',
      '00111111100',
      '00000000000',
      '00000000000',
    ],
    avatars: [
      { row: 2, col: 2, artistIdx: 3, ringColor: '#0369A1' },
      { row: 6, col: 9, artistIdx: 4, ringColor: '#9D174D' },
      { row: 10, col: 8, artistIdx: 5, ringColor: '#14532D' },
    ],
  },
  {
    char: ',',
    cols: 4,
    rows: [
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '0000',
      '1111',
      '1111',
      '0111',
      '0110',
      '1100',
    ],
    avatars: [],
  },
  {
    char: '4',
    cols: 11,
    rows: [
      '00000011110',
      '00000111110',
      '00001111110',
      '00011101110',
      '00111001110',
      '01110001110',
      '11100001110',
      '11111111111',
      '11111111111',
      '11111111111',
      '00000001110',
      '00000001110',
      '00000001110',
      '00000000000',
      '00000000000',
    ],
    avatars: [
      { row: 2, col: 5, artistIdx: 6, ringColor: '#86198F' },
      { row: 8, col: 2, artistIdx: 7, ringColor: '#713F12' },
      { row: 11, col: 8, artistIdx: 8, ringColor: '#115E59' },
    ],
  },
  {
    char: '5',
    cols: 11,
    rows: [
      '11111111110',
      '11111111110',
      '11100000000',
      '11100000000',
      '11111111100',
      '11111111110',
      '00000000111',
      '00000000111',
      '00000000111',
      '11100000111',
      '11110001111',
      '01111111110',
      '00111111100',
      '00000000000',
      '00000000000',
    ],
    avatars: [
      { row: 1, col: 7, artistIdx: 9, ringColor: '#92400E' },
      { row: 5, col: 2, artistIdx: 10, ringColor: '#1E293B' },
      { row: 8, col: 9, artistIdx: 11, ringColor: '#1D4ED8' },
    ],
  },
  {
    char: '2',
    cols: 11,
    rows: [
      '00111111100',
      '01111111110',
      '11110001111',
      '11100000111',
      '00000001111',
      '00000011110',
      '00001111000',
      '00011110000',
      '00111100000',
      '01111000000',
      '11111111111',
      '11111111111',
      '11111111111',
      '00000000000',
      '00000000000',
    ],
    avatars: [
      { row: 1, col: 7, artistIdx: 12, ringColor: '#78350F' },
      { row: 2, col: 7, artistIdx: 13, ringColor: '#065F46' },
      { row: 10, col: 2, artistIdx: 14, ringColor: '#0F766E' },
      { row: 11, col: 5, artistIdx: 15, ringColor: '#713F12' },
    ],
  },
];

const MATRIX_GLYPHS = ['+', '×', '•', '○', '✳', '▫'];

function parseArtistIntroAndCareer(artist: Artist): {
  intro: string;
  careerItems: string[];
} {
  const parts = artist.bio.split(/\[최근 주요 (?:활동 )?이력\]/);
  const rawIntro = (parts[0] || artist.statement || '').trim();
  const rawCareer = (parts[1] || '').trim();

  let careerItems: string[] = [];
  if (rawCareer) {
    careerItems = rawCareer
      .split(/\n|•|(?=\b20[12]\d\b)/)
      .map((s) => s.replace(/^[-·•\s]+/, '').trim())
      .filter((s) => s.length > 4);
  }

  if (careerItems.length === 0) {
    careerItems = [
      ...(artist.soloExhibitions || []),
      ...(artist.groupExhibitions || []),
    ];
  }

  return {
    intro: rawIntro || artist.statement,
    careerItems: careerItems.slice(0, 8),
  };
}

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  // Applications stored in localStorage (pending / approved)
  const [applications, setApplications] = useState<ArtistApplication[]>(() => {
    try {
      const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage read error
    }
    return [];
  });

  // Artist list (combines approved applications + 50 verified Busan artists)
  const [artistList, setArtistList] = useState<Artist[]>(() => {
    try {
      const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      if (raw) {
        const parsed: ArtistApplication[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const approvedArtists = parsed
            .filter((a) => a.status === 'approved')
            .map((a, idx) => buildArtistFromApplication(a, idx));
          return [...approvedArtists, ...ARTISTS];
        }
      }
    } catch {
      // ignore
    }
    return ARTISTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
    } catch {
      // ignore storage write error
    }
    const approvedArtists = applications
      .filter((a) => a.status === 'approved')
      .map((a, idx) => buildArtistFromApplication(a, idx));
    setArtistList([...approvedArtists, ...ARTISTS]);
  }, [applications]);

  // Dedicated Artist Application Form State ('artist-apply' page)
  const [applyForm, setApplyForm] = useState<{
    name: string;
    nameEn: string;
    discipline: string;
    district: string;
    jobTitle: string;
    affiliation: string;
    instagram: string;
    portfolioUrl: string;
    collectionsAndMedia: string;
    education: string;
    detailedIntro: string;
    careerText: string;
    contact: string;
    works: Array<{
      title: string;
      year: string;
      mediumDetail: string;
      imageUrl: string;
    }>;
  }>({
    name: '',
    nameEn: '',
    discipline: '회화·미술',
    district: '',
    jobTitle: '',
    affiliation: '',
    instagram: '@',
    portfolioUrl: '',
    collectionsAndMedia: '',
    education: '',
    detailedIntro: '',
    careerText: '',
    contact: '',
    works: [
      { title: '', year: '2026', mediumDetail: '', imageUrl: '' },
      { title: '', year: '2026', mediumDetail: '', imageUrl: '' },
      { title: '', year: '2025', mediumDetail: '', imageUrl: '' },
    ],
  });
  const [applySubmittedSuccess, setApplySubmittedSuccess] = useState<ArtistApplication | null>(null);

  // Admin Page State ('admin' page)
  const [isAdminAuthed, setIsAdminAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [adminAuthError, setAdminAuthError] = useState<string>('');
  const [adminFilterTab, setAdminFilterTab] = useState<'pending' | 'approved' | 'all'>('pending');

  const pendingApplicationsCount = useMemo(
    () => applications.filter((a) => a.status === 'pending').length,
    [applications]
  );
  const approvedApplicationsCount = useMemo(
    () => applications.filter((a) => a.status === 'approved').length,
    [applications]
  );

  const openArtistApplyPage = () => {
    setApplySubmittedSuccess(null);
    setActiveSection('artist-apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyWorkImageUpload = (idx: number, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = typeof ev.target?.result === 'string' ? ev.target.result : '';
      if (!dataUrl) return;
      // Resize image via canvas to keep localStorage fast & lightweight
      const img = new Image();
      img.onload = () => {
        const maxDim = 1000;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.84);
          setApplyForm((prev) => {
            const nextWorks = [...prev.works];
            nextWorks[idx] = { ...nextWorks[idx], imageUrl: compressed };
            return { ...prev, works: nextWorks };
          });
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitApplicationPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim()) return;

    const now = new Date();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const timestamp = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(
      now.getHours()
    )}:${pad(now.getMinutes())}`;

    const instaNorm = normalizeInstagramInput(applyForm.instagram);
    const createdApp: ArtistApplication = {
      id: `app-${Date.now()}`,
      status: 'pending',
      submittedAt: timestamp,
      name: applyForm.name.trim(),
      nameEn: applyForm.nameEn.trim() || applyForm.name.trim().toUpperCase(),
      discipline: applyForm.discipline,
      district: applyForm.district.trim() || '부산',
      jobTitle: applyForm.jobTitle.trim() || `${applyForm.discipline} 작가`,
      affiliation: applyForm.affiliation.trim() || `부산 ${applyForm.district.trim() || '지역'} 스튜디오`,
      instagram: instaNorm.handle || applyForm.instagram.trim(),
      instagramUrl: instaNorm.url,
      portfolioUrl: applyForm.portfolioUrl.trim(),
      collectionsAndMedia: applyForm.collectionsAndMedia.trim(),
      education: applyForm.education.trim(),
      detailedIntro: applyForm.detailedIntro.trim(),
      careerText: applyForm.careerText.trim(),
      contact: applyForm.contact.trim(),
      works: applyForm.works.map((w) => ({
        title: w.title.trim(),
        year: w.year.trim() || '2026',
        mediumDetail: w.mediumDetail.trim() || applyForm.collectionsAndMedia.trim(),
        imageUrl: w.imageUrl.trim(),
      })),
    };

    setApplications((prev) => [createdApp, ...prev]);
    setApplySubmittedSuccess(createdApp);
    setApplyForm({
      name: '',
      nameEn: '',
      discipline: '회화·미술',
      district: '',
      jobTitle: '',
      affiliation: '',
      instagram: '@',
      portfolioUrl: '',
      collectionsAndMedia: '',
      education: '',
      detailedIntro: '',
      careerText: '',
      contact: '',
      works: [
        { title: '', year: '2026', mediumDetail: '', imageUrl: '' },
        { title: '', year: '2026', mediumDetail: '', imageUrl: '' },
        { title: '', year: '2025', mediumDetail: '', imageUrl: '' },
      ],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pw = adminPasswordInput.trim();
    if (pw === 'floreur88' || pw === '0000' || pw === 'admin1234') {
      setIsAdminAuthed(true);
      setAdminAuthError('');
      setAdminPasswordInput('');
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch {
        // ignore
      }
    } else {
      setAdminAuthError('관리자 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthed(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
  };

  const handleApproveApplication = (appId: string) => {
    const now = new Date();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const approvedAt = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(
      now.getHours()
    )}:${pad(now.getMinutes())}`;

    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'approved', approvedAt } : a))
    );
  };

  const handleRevertApplicationToPending = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'pending', approvedAt: undefined } : a))
    );
  };

  const handleDeleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
  };

  const handleAdminUpdateAppWorkUrl = (appId: string, workIdx: number, newUrl: string) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id !== appId) return a;
        const nextWorks = [...a.works];
        nextWorks[workIdx] = { ...nextWorks[workIdx], imageUrl: newUrl };
        return { ...a, works: nextWorks };
      })
    );
  };

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('전체');
  const [artistCollabFilter, setArtistCollabFilter] = useState<ArtistCollabFilter>('all');
  const [artistQuery, setArtistQuery] = useState<string>('');
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);
  const [artistSubmitNotice, setArtistSubmitNotice] = useState<string>('');

  const [artistForm, setArtistForm] = useState<{
    mode: 'new' | 'update';
    targetArtistId: string;
    name: string;
    nameEn: string;
    discipline: string;
    district: string;
    collabStatus: ArtistCollabStatus;
    collabNote: string;
    statement: string;
    soloText: string;
    groupText: string;
    instagram: string;
    portfolioUrl: string;
    works: Array<{
      title: string;
      year: string;
      mediumDetail: string;
      dimensions: string;
      availability: '소장 가능' | '판매 문의' | '에디션 가능';
      priceLabel: string;
      imageUrl: string;
    }>;
  }>({
    mode: 'new',
    targetArtistId: '',
    name: '',
    nameEn: '',
    discipline: '회화·미술',
    district: '중구 원도심 (또따또가)',
    collabStatus: '기념품 콜라보 참여',
    collabNote: 'floreur × 부산 관광기념품 콜라보 에디션 및 아트굿즈 제작 희망',
    statement: '',
    soloText: '',
    groupText: '',
    instagram: '@',
    portfolioUrl: '',
    works: [
      {
        title: '',
        year: '2026',
        mediumDetail: '캔버스에 유채 및 혼합매체',
        dimensions: '72.7 × 60.6 cm (20호 F)',
        availability: '소장 가능',
        priceLabel: '1,200,000 KRW (소장 가능)',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: '',
        year: '2026',
        mediumDetail: '캔버스에 유채 및 혼합매체',
        dimensions: '53.0 × 45.5 cm (10호 F)',
        availability: '소장 가능',
        priceLabel: '850,000 KRW (소장 가능)',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1000&q=80',
      },
      {
        title: '',
        year: '2025',
        mediumDetail: '아카이벌 피그먼트 에디션',
        dimensions: '50.0 × 70.0 cm',
        availability: '판매 문의',
        priceLabel: '판매가 문의 (floreur 중개)',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      },
    ],
  });

  // Goods Manual & Local Makers filter state
  const [selectedManualId, setSelectedManualId] = useState<string>(GOODS_MANUALS[0].id);
  const [makerCategoryFilter, setMakerCategoryFilter] = useState<string>('전체');
  const [makerQuery, setMakerQuery] = useState<string>('');

  // Gallery filters, selection & audience mode ([대중용] 전시·관람 안내 vs [작가용] 대관·판매·입점 스펙)
  const [selectedZone, setSelectedZone] = useState<string>('전체');
  const [gallerySpecFilter, setGallerySpecFilter] = useState<GallerySpecFilter>('all');
  const [galleryAudienceMode, setGalleryAudienceMode] = useState<GalleryAudienceMode>('all');
  const [activeGallery, setActiveGallery] = useState<GallerySpace | null>(null);

  // Saved / Archived items
  const [savedIds, setSavedIds] = useState<string[]>([ARTISTS[0]?.id || '', 'manual-01', 'gal-01']);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);

  // Collab posts & Modal
  const [collabPosts, setCollabPosts] = useState<CollabPost[]>(INITIAL_COLLAB_POSTS);
  const [collabFilter, setCollabFilter] = useState<string>('전체');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<{
    type: CollabPost['type'];
    title: string;
    author: string;
    district: string;
    targetCount: string;
    deadline: string;
    description: string;
  }>({
    type: '공동발주',
    title: '',
    author: '',
    district: '중구 중앙동',
    targetCount: '',
    deadline: '',
    description: '',
  });

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Flatten verified pure artworks for the 3-row PageFlows-style flowing wall (zero portraits, zero posters, zero making-of shots)
  const flowingArtworks = useMemo(() => {
    const row1 = ARTISTS.map((artist) => ({
      workId: artist.artworks[0].id,
      title: artist.artworks[0].title,
      imageUrl: artist.artworks[0].imageUrl,
      artist,
    }));

    const shifted2 = [...ARTISTS.slice(8), ...ARTISTS.slice(0, 8)];
    const row2 = shifted2.map((artist) => ({
      workId: artist.artworks[1].id,
      title: artist.artworks[1].title,
      imageUrl: artist.artworks[1].imageUrl,
      artist,
    }));

    const shifted3 = [...ARTISTS.slice(16), ...ARTISTS.slice(0, 16)];
    const row3 = shifted3.map((artist) => ({
      workId: artist.artworks[2].id,
      title: artist.artworks[2].title,
      imageUrl: artist.artworks[2].imageUrl,
      artist,
    }));

    return { row1, row2, row3 };
  }, []);

  // Filtered Artists
  const disciplines = ['전체', '회화·미술', '도자·조형', '공예·오브제', '일러스트·드로잉', '사진'];
  const filteredArtists = useMemo(() => {
    return artistList.filter((artist) => {
      const matchDiscipline =
        selectedDiscipline === '전체' || artist.discipline === selectedDiscipline;
      const matchCollab =
        artistCollabFilter === 'all' ||
        (artistCollabFilter === 'souvenir_partner' &&
          artist.collabStatus === '기념품 콜라보 참여') ||
        (artistCollabFilter === 'open_collab' &&
          artist.collabStatus === '협업 열림 (Open to Collab)') ||
        (artistCollabFilter === 'collectible' &&
          artist.artworks.some((w) => w.availability === '소장 가능'));
      const q = artistQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        artist.name.toLowerCase().includes(q) ||
        artist.nameEn.toLowerCase().includes(q) ||
        artist.district.toLowerCase().includes(q) ||
        artist.bio.toLowerCase().includes(q);
      return matchDiscipline && matchCollab && matchQuery;
    });
  }, [artistList, selectedDiscipline, artistCollabFilter, artistQuery]);

  const displayedArtists = filteredArtists;

  const openNewArtistModal = () => {
    setArtistForm({
      mode: 'new',
      targetArtistId: '',
      name: '',
      nameEn: '',
      discipline: '회화·미술',
      district: '중구 원도심 (또따또가)',
      collabStatus: '기념품 콜라보 참여',
      collabNote: 'floreur × 부산 관광기념품 콜라보 에디션 및 아트굿즈 제작 희망',
      statement: '',
      soloText: '',
      groupText: '',
      instagram: '@',
      portfolioUrl: '',
      works: [
        {
          title: '',
          year: '2026',
          mediumDetail: '캔버스에 유채 및 혼합매체',
          dimensions: '72.7 × 60.6 cm (20호 F)',
          availability: '소장 가능',
          priceLabel: '1,200,000 KRW (소장 가능)',
          imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
        },
        {
          title: '',
          year: '2026',
          mediumDetail: '캔버스에 유채 및 혼합매체',
          dimensions: '53.0 × 45.5 cm (10호 F)',
          availability: '소장 가능',
          priceLabel: '850,000 KRW (소장 가능)',
          imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1000&q=80',
        },
        {
          title: '',
          year: '2025',
          mediumDetail: '아카이벌 피그먼트 에디션',
          dimensions: '50.0 × 70.0 cm',
          availability: '판매 문의',
          priceLabel: '판매가 문의 (floreur 중개)',
          imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
        },
      ],
    });
    setIsArtistModalOpen(true);
  };

  const openEditArtistModal = (artist: Artist) => {
    setArtistForm({
      mode: 'update',
      targetArtistId: artist.id,
      name: artist.name,
      nameEn: artist.nameEn,
      discipline: artist.discipline,
      district: artist.district,
      collabStatus: artist.collabStatus || '기념품 콜라보 참여',
      collabNote: artist.collabNote || 'floreur × 부산 관광기념품 콜라보 에디션 참여 작가',
      statement: artist.statement,
      soloText: (artist.soloExhibitions || []).join('\n'),
      groupText: (artist.groupExhibitions || []).join('\n'),
      instagram: artist.instagram,
      portfolioUrl: artist.portfolioUrl,
      works: artist.artworks.map((w) => ({
        title: w.title,
        year: w.year,
        mediumDetail: w.mediumDetail || w.medium,
        dimensions: w.dimensions || '72.7 × 60.6 cm (20호 F)',
        availability: w.availability || '소장 가능',
        priceLabel: w.priceLabel || '판매가 문의 (floreur 중개)',
        imageUrl: w.imageUrl,
      })),
    });
    setIsArtistModalOpen(true);
  };

  const handleAddWorkSlot = () => {
    if (artistForm.works.length >= 5) return;
    setArtistForm((prev) => ({
      ...prev,
      works: [
        ...prev.works,
        {
          title: '',
          year: '2026',
          mediumDetail: prev.discipline,
          dimensions: '53.0 × 45.5 cm (10호 F)',
          availability: '소장 가능',
          priceLabel: '판매가 문의 (floreur 중개)',
          imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
        },
      ],
    }));
  };

  const handleRemoveWorkSlot = (idx: number) => {
    if (artistForm.works.length <= 3) return;
    setArtistForm((prev) => ({
      ...prev,
      works: prev.works.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmitArtistForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistForm.name.trim()) return;

    const soloList = artistForm.soloText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const groupList = artistForm.groupText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const builtWorks: Artwork[] = artistForm.works.map((w, i) => ({
      id: `custom-w-${Date.now()}-${i}`,
      title: w.title.trim() || `${artistForm.name} 대표작 0${i + 1}`,
      year: w.year.trim() || '2026',
      medium: artistForm.discipline,
      mediumDetail: w.mediumDetail.trim() || artistForm.discipline,
      dimensions: w.dimensions.trim() || '규격 별도 표기',
      availability: w.availability,
      priceLabel: w.priceLabel.trim() || '판매가 문의',
      imageUrl:
        w.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      highResUrl:
        w.imageUrl.trim() ||
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    }));

    if (artistForm.mode === 'update' && artistForm.targetArtistId) {
      setArtistList((prev) =>
        prev.map((a) => {
          if (a.id !== artistForm.targetArtistId) return a;
          const updated: Artist = {
            ...a,
            name: artistForm.name.trim(),
            nameEn: artistForm.nameEn.trim() || a.nameEn,
            discipline: artistForm.discipline,
            district: artistForm.district.trim(),
            collabStatus: artistForm.collabStatus,
            collabNote: artistForm.collabNote.trim(),
            statement: artistForm.statement.trim() || a.statement,
            bio: artistForm.statement.trim() || a.bio,
            soloExhibitions: soloList.length > 0 ? soloList : a.soloExhibitions,
            groupExhibitions: groupList.length > 0 ? groupList : a.groupExhibitions,
            instagram: artistForm.instagram.trim() || a.instagram,
            portfolioUrl: artistForm.portfolioUrl.trim() || a.portfolioUrl,
            featuredWorkUrl: builtWorks[0]?.imageUrl || a.featuredWorkUrl,
            artworks: builtWorks,
          };
          if (activeArtist?.id === a.id) {
            setActiveArtist(updated);
          }
          return updated;
        })
      );
      setArtistSubmitNotice(
        `${artistForm.name} 작가 프로필·대표작 수정 신청이 접수되어 아카이브에 반영되었습니다. (floreur 검수 완료)`
      );
    } else {
      const nextNo = artistList.length + 1;
      const newArtist: Artist = {
        id: `custom-artist-${Date.now()}`,
        indexNo: `ARTIST ${nextNo < 10 ? `0${nextNo}` : nextNo} · 검수중`,
        name: artistForm.name.trim(),
        nameEn: artistForm.nameEn.trim().toUpperCase() || 'BUSAN ARTIST',
        discipline: artistForm.discipline,
        district: artistForm.district.trim() || '부산',
        updatedAt: '2026.11.04',
        statement:
          artistForm.statement.trim() ||
          `${artistForm.district}를 거점으로 활동하며 ${artistForm.discipline} 작업을 이어가고 있는 부산 예술인입니다.`,
        bio:
          artistForm.statement.trim() ||
          `${artistForm.district}를 거점으로 활동하며 ${artistForm.discipline} 작업을 이어가고 있는 부산 예술인입니다.`,
        soloExhibitions:
          soloList.length > 0
            ? soloList
            : [`2026 ${artistForm.name} 개인전, 부산`],
        groupExhibitions:
          groupList.length > 0
            ? groupList
            : [`2025–2026 부산 신진·중견 예술인 기획전, 부산`],
        collabStatus: artistForm.collabStatus,
        collabNote: artistForm.collabNote.trim(),
        instagram: artistForm.instagram.trim() || '@busan_artist',
        instagramUrl: artistForm.portfolioUrl.trim() || 'https://www.instagram.com/',
        portfolioUrl: artistForm.portfolioUrl.trim() || 'https://www.instagram.com/',
        sourceLabel: '작가 직접 제보 · floreur 검수 등재 (2026)',
        portraitUrl: builtWorks[0].imageUrl,
        featuredWorkUrl: builtWorks[0].imageUrl,
        artworks: builtWorks,
      };
      setArtistList((prev) => [newArtist, ...prev]);
      setArtistSubmitNotice(
        `${newArtist.name} 작가님의 프로필과 대표작 ${builtWorks.length}점이 접수되어 아카이브 상단에 등재되었습니다.`
      );
    }

    setIsArtistModalOpen(false);
  };

  // Selected Goods Manual
  const currentManual: GoodsManual = useMemo(() => {
    return GOODS_MANUALS.find((m) => m.id === selectedManualId) || GOODS_MANUALS[0];
  }, [selectedManualId]);

  // Filtered Galleries by Busan District (구·군) & District Signature Colors
  const zones = [
    '전체',
    '해운대구',
    '수영구',
    '중구',
    '영도구',
    '부산진구',
    '남구',
    '북구',
    '동래구',
    '사하구',
    '금정구',
    '동구',
    '사상구',
    '기장군',
  ];

  const districtColorMap: Record<
    string,
    { color: string; bg: string; border: string; mapColor: string }
  > = {
    해운대구: { color: '#0052FF', bg: '#E6EFFF', border: '#99BAFF', mapColor: '#60A5FA' },
    수영구: { color: '#007A87', bg: '#E0F7FA', border: '#80DEEA', mapColor: '#22D3EE' },
    중구: { color: '#D92D20', bg: '#FEE4E2', border: '#FDA29B', mapColor: '#F87171' },
    영도구: { color: '#4F46E5', bg: '#EEF2FF', border: '#A5B4FC', mapColor: '#818CF8' },
    부산진구: { color: '#B45309', bg: '#FEF3C7', border: '#FCD34D', mapColor: '#FBBF24' },
    남구: { color: '#047857', bg: '#D1FAE5', border: '#6EE7B7', mapColor: '#34D399' },
    북구: { color: '#7C3AED', bg: '#F3E8FF', border: '#C4B5FD', mapColor: '#C084FC' },
    동래구: { color: '#C2410C', bg: '#FFEDD5', border: '#FDBA74', mapColor: '#FB923C' },
    사하구: { color: '#0369A1', bg: '#E0F2FE', border: '#7DD3FC', mapColor: '#38BDF8' },
    금정구: { color: '#15803D', bg: '#DCFCE7', border: '#86EFAC', mapColor: '#4ADE80' },
    동구: { color: '#BE185D', bg: '#FCE7F3', border: '#F9A8D4', mapColor: '#F472B6' },
    사상구: { color: '#334155', bg: '#E2E8F0', border: '#94A3B8', mapColor: '#CBD5E1' },
    기장군: { color: '#0F766E', bg: '#CCFBF1', border: '#5EEAD4', mapColor: '#2DD4BF' },
  };

  const getDistrictStyle = (zone: string) =>
    districtColorMap[zone] || {
      color: '#0052FF',
      bg: '#E6EFFF',
      border: '#99BAFF',
      mapColor: '#60A5FA',
    };
  const filteredGalleries = useMemo(() => {
    return GALLERIES.filter((g) => {
      const matchZone = selectedZone === '전체' || g.zone === selectedZone;
      const matchSpec =
        gallerySpecFilter === 'all' ||
        (gallerySpecFilter === 'rental' && g.rentalAndSales.rentalAvailable) ||
        (gallerySpecFilter === 'sales' && g.rentalAndSales.artworkSales) ||
        (gallerySpecFilter === 'artshop' && g.rentalAndSales.artShopAvailable) ||
        (gallerySpecFilter === 'zero_commission' &&
          (g.rentalAndSales.commissionRate.includes('없음') ||
            g.rentalAndSales.commissionRate.includes('비영리') ||
            g.rentalAndSales.commissionRate.includes('공립')));
      return matchZone && matchSpec;
    });
  }, [selectedZone, gallerySpecFilter]);

  // Filtered Collab Posts
  const filteredCollabPosts = useMemo(() => {
    if (collabFilter === '전체') return collabPosts;
    return collabPosts.filter((p) => p.type === collabFilter);
  }, [collabPosts, collabFilter]);

  const handleAddCollabPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.author.trim()) return;
    const created: CollabPost = {
      id: `col-${Date.now()}`,
      date: '2026.11.03',
      type: newPost.type,
      title: newPost.title,
      author: newPost.author,
      district: newPost.district,
      targetCount: newPost.targetCount || '협의',
      deadline: newPost.deadline || '상시',
      description: newPost.description,
    };
    setCollabPosts([created, ...collabPosts]);
    setNewPost({
      type: '공동발주',
      title: '',
      author: '',
      district: '중구 중앙동',
      targetCount: '',
      deadline: '',
      description: '',
    });
    setIsWriteModalOpen(false);
  };

  return (
    <div className="magazine-shell">
      {/* Top Issue Strip */}
      <div className="issue-strip">
        <div>
          ISSUE NO. 04 · <span className="issue-strip-accent">35.1028° N, 129.0403° E (BUSAN)</span>
        </div>
        <div>{artistList.length} BUSAN ARTISTS ARCHIVED</div>
      </div>

      {/* Sticky Editorial Masthead — 5 Core Tabs */}
      <header className="masthead">
        <div className="brand-cell" onClick={() => setActiveSection('overview')}>
          <div className="brand-title">
            <span className="brand-en">PARANG</span>
            <span className="brand-kr">파랑 波浪</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <span className="nav-item-label">홈</span>
          </button>
          <button
            className={`nav-item ${
              activeSection === 'artists' || activeSection === 'artist-apply' ? 'active' : ''
            }`}
            onClick={() => setActiveSection('artists')}
          >
            <span className="nav-item-label">부산 작가 · 작품</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'souvenirs' ? 'active' : ''}`}
            onClick={() => setActiveSection('souvenirs')}
          >
            <span className="nav-item-label">부산 아트 기념품</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'galleries' ? 'active' : ''}`}
            onClick={() => setActiveSection('galleries')}
          >
            <span className="nav-item-label">부산 갤러리</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'collab' ? 'active' : ''}`}
            onClick={() => setActiveSection('collab')}
          >
            <span className="nav-item-label">공고 · 협업</span>
          </button>
        </nav>

        <div className="masthead-actions">
          <button className="artist-register-trigger" onClick={openArtistApplyPage}>
            <Plus size={13} />
            <span>작가 등록</span>
          </button>
          <button className="submit-trigger" onClick={() => setIsWriteModalOpen(true)}>
            <Plus size={13} />
            <span>공고 등록</span>
          </button>
          <button
            type="button"
            className={`admin-nav-trigger ${activeSection === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="작가 신청 등록 대기/완료 관리자 전용 페이지"
          >
            <Lock size={12} />
            <span>관리자</span>
            {pendingApplicationsCount > 0 && (
              <span className="admin-pending-badge">{pendingApplicationsCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* =====================================================================
          HERO + DOT-MATRIX BUSAN ARTIST COUNTER + 3-ROW ARTWORK FLOWS WALL
         ===================================================================== */}
      {activeSection === 'overview' && (
        <section className="hero-flow-section">
          <div className="hero-statement-showcase">
            <div className="hero-statement-copy">
              <h1 className="hero-dual-headline">
                <span className="hero-dual-muted">숫자는 기록일 뿐입니다.</span>
                <span className="hero-dual-strong">부산의 예술에는 이름이 있습니다.</span>
              </h1>
              <p className="hero-dual-sub">
                부산의 작업실과 인쇄골목, 해안의 전시장을 잇는{' '}
                <span className="cover-headline-serif">Blue Wave</span> 아카이브 —
                <br />
                지금 부산에서 활동 중인 예술인과 대표작품을 기록합니다.
              </p>
            </div>

            {/* Giant Dot-Matrix Number (10,452) with Interactive Artist Avatars */}
            <div className="dot-matrix-stage" aria-label="10,452 Busan Active Artists">
              <div className="dot-matrix-digits">
                {BUSAN_ARTIST_DIGIT_MATRIX.map((digit, dIdx) => (
                  <div
                    key={`${digit.char}-${dIdx}`}
                    className={`dot-matrix-char ${digit.char === ',' ? 'is-comma' : ''}`}
                    style={{
                      gridTemplateColumns: `repeat(${digit.cols}, var(--dot-cell-size))`,
                    }}
                  >
                    {digit.rows.map((rowStr, rIdx) =>
                      rowStr.split('').map((bit, cIdx) => {
                        if (bit === '0') {
                          return (
                            <span
                              key={`${rIdx}-${cIdx}`}
                              className="dot-cell is-empty"
                            />
                          );
                        }
                        const avatarMatch = digit.avatars.find(
                          (a) => a.row === rIdx && a.col === cIdx
                        );
                        if (avatarMatch) {
                          const artist =
                            ARTISTS[avatarMatch.artistIdx % ARTISTS.length];
                          return (
                            <button
                              key={`${rIdx}-${cIdx}`}
                              type="button"
                              className="dot-cell is-avatar"
                              style={{ borderColor: avatarMatch.ringColor }}
                              onClick={() => setActiveArtist(artist)}
                              title={`${artist.name} (${artist.discipline})`}
                            >
                              <img
                                src={artist.featuredWorkUrl}
                                alt={artist.name}
                                loading="lazy"
                              />
                              <span className="dot-avatar-tooltip">
                                {artist.name} · {artist.discipline}
                              </span>
                            </button>
                          );
                        }
                        const glyph =
                          MATRIX_GLYPHS[(dIdx * 17 + rIdx * 7 + cIdx * 3) % MATRIX_GLYPHS.length];
                        return (
                          <span key={`${rIdx}-${cIdx}`} className="dot-cell is-on">
                            {glyph}
                          </span>
                        );
                      })
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Row Flowing Artwork Streams (Page Flows style) */}
          <div className="artwork-flows-wall">
            {/* Row 1: Flows Left */}
            <div className="flow-marquee-row">
              <div className="flow-marquee-track flow-left">
                {[...flowingArtworks.row1, ...flowingArtworks.row1].map((item, idx) => (
                  <div
                    key={`r1-${item.workId}-${idx}`}
                    className="flow-artwork-item"
                    onClick={() => setActiveArtist(item.artist)}
                  >
                    <img src={item.imageUrl} alt={item.artist.name} loading="lazy" />
                    <span className="flow-artwork-overlay-artist">{item.artist.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Flows Right */}
            <div className="flow-marquee-row">
              <div className="flow-marquee-track flow-right">
                {[...flowingArtworks.row2, ...flowingArtworks.row2].map((item, idx) => (
                  <div
                    key={`r2-${item.workId}-${idx}`}
                    className="flow-artwork-item"
                    onClick={() => setActiveArtist(item.artist)}
                  >
                    <img src={item.imageUrl} alt={item.artist.name} loading="lazy" />
                    <span className="flow-artwork-overlay-artist">{item.artist.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Flows Left */}
            <div className="flow-marquee-row">
              <div className="flow-marquee-track flow-left-slow">
                {[...flowingArtworks.row3, ...flowingArtworks.row3].map((item, idx) => (
                  <div
                    key={`r3-${item.workId}-${idx}`}
                    className="flow-artwork-item"
                    onClick={() => setActiveArtist(item.artist)}
                  >
                    <img src={item.imageUrl} alt={item.artist.name} loading="lazy" />
                    <span className="flow-artwork-overlay-artist">{item.artist.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 01: ARTISTS & ARTWORKS (PASSEPARTOUT MINIMAL GALLERY GRID)
         ===================================================================== */}
      {activeSection === 'artists' && (
        <section className="passepartout-artists-section">
          {/* Brief Editorial Intro Banner + Registration Apply CTA */}
          <div className="artists-archive-intro-banner">
            <div className="artists-archive-intro-copy">
              <div className="artists-archive-intro-kicker">
                BUSAN ACTIVE ARTISTS · ONLINE PORTFOLIO ARCHIVE
              </div>
              <h2 className="artists-archive-intro-title">
                부산 지역 활동 예술작가 · 온라인 포트폴리오 아카이브
              </h2>
              <p className="artists-archive-intro-desc">
                현재 부산 지역을 기반으로 활발히 작업·전시 활동을 이어가며, 온라인 포트폴리오(공식 작업 인스타그램 또는 홈페이지)가 있는 예술작가들을 소개합니다. 온라인 포트폴리오를 보유한 부산 활동 작가님이라면 누구나 등록을 신청하실 수 있습니다.
              </p>
            </div>

            <div className="artists-archive-intro-actions">
              <button
                type="button"
                className="artists-apply-cta-btn"
                onClick={openArtistApplyPage}
              >
                <Plus size={15} />
                <span>부산 작가 등록 신청하기</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Minimal Filter & Search Strip */}
          <div className="filter-strip">
            <div className="filter-tabs">
              {disciplines.map((disc) => {
                const count =
                  disc === '전체'
                    ? artistList.length
                    : artistList.filter((a) => a.discipline === disc).length;
                return (
                  <button
                    key={disc}
                    className={`filter-tab ${selectedDiscipline === disc ? 'active' : ''}`}
                    onClick={() => setSelectedDiscipline(disc)}
                  >
                    <span>{disc}</span>
                    <span className="filter-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="search-cell">
              <Search size={14} color="var(--ink-muted)" />
              <input
                type="text"
                placeholder="작가명, 장르 검색"
                value={artistQuery}
                onChange={(e) => setArtistQuery(e.target.value)}
              />
              {artistQuery && (
                <button onClick={() => setArtistQuery('')}>
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {artistSubmitNotice && (
            <div className="submission-confirm-banner">
              <span>{artistSubmitNotice}</span>
              <button onClick={() => setArtistSubmitNotice('')}>
                <X size={14} />
              </button>
            </div>
          )}

          {/* Minimal Passepartout Gallery Grid (Left-Top: Name, Right-Top: Genre, Center: Generous Whitespace + Artwork) */}
          <div className="passepartout-grid">
            {displayedArtists.map((artist) => {
              const mainWork = artist.artworks[0];
              const w0 = mainWork?.imageUrl || artist.featuredWorkUrl;

              return (
                <article
                  key={artist.id}
                  className="passepartout-card"
                  onClick={() => setActiveArtist(artist)}
                >
                  <div className="passepartout-card-top">
                    <div className="passepartout-artist-name">
                      <strong>{artist.name}</strong>
                      <span>{artist.nameEn}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                      <div className="passepartout-artist-genre">{artist.discipline}</div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--marine)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {artist.instagram}
                      </span>
                    </div>
                  </div>

                  <div className="passepartout-frame">
                    <img src={w0} alt={artist.name} loading="lazy" />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 01-B: DEDICATED ARTIST REGISTRATION APPLICATION PAGE ('artist-apply')
         ===================================================================== */}
      {activeSection === 'artist-apply' && (
        <section className="artist-apply-page-section">
          <div className="section-bar">
            <div className="section-bar-title" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                className="apply-page-back-btn"
                onClick={() => setActiveSection('artists')}
              >
                ← 부산 작가 · 작품 목록으로
              </button>
              <h2>부산 활동 작가 아카이브 등록 신청</h2>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-muted)' }}>
              ONLINE PORTFOLIO ARTIST REGISTRATION
            </div>
          </div>

          <div className="artist-apply-container">
            {applySubmittedSuccess ? (
              <div className="apply-success-card">
                <div className="apply-success-badge">
                  <Check size={18} />
                  <span>신청 접수 완료 · 관리자 검수 대기중</span>
                </div>
                <h3>
                  {applySubmittedSuccess.name} 작가님의 아카이브 등록 신청이 정상적으로 접수되었습니다.
                </h3>
                <p>
                  제출하신 프로필과 온라인 포트폴리오 정보가 <strong>관리자 페이지(신청 등록 대기 목록)</strong>에 자동으로 전달되었습니다.
                  관리자가 온라인 포트폴리오 및 주요 이력을 확인한 뒤 <strong>등록 완료(승인)</strong> 처리하면 부산 작가·작품 페이지에 즉시 등재됩니다.
                </p>

                <div className="apply-success-summary">
                  <div>
                    <span>신청 작가명</span>
                    <strong>
                      {applySubmittedSuccess.name} ({applySubmittedSuccess.nameEn}) · {applySubmittedSuccess.discipline}
                    </strong>
                  </div>
                  <div>
                    <span>인스타그램 / 온라인 포트폴리오</span>
                    <strong>
                      {applySubmittedSuccess.instagram}{' '}
                      {applySubmittedSuccess.portfolioUrl ? `/ ${applySubmittedSuccess.portfolioUrl}` : ''}
                    </strong>
                  </div>
                  <div>
                    <span>주요 매체 / 학력</span>
                    <strong>
                      {applySubmittedSuccess.collectionsAndMedia} · {applySubmittedSuccess.education}
                    </strong>
                  </div>
                  <div>
                    <span>접수 일시</span>
                    <strong>{applySubmittedSuccess.submittedAt} (대기중)</strong>
                  </div>
                </div>

                <div className="apply-success-actions">
                  <button
                    type="button"
                    className="artists-apply-cta-btn"
                    onClick={() => setActiveSection('artists')}
                  >
                    <span>부산 작가 · 작품 페이지로 돌아가기</span>
                  </button>
                  <button
                    type="button"
                    className="apply-secondary-btn"
                    onClick={() => setApplySubmittedSuccess(null)}
                  >
                    <span>추가 신청서 작성하기</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplicationPage} className="artist-apply-form-card">
                <div className="artist-apply-form-header">
                  <h3>부산 지역 활동 예술작가 등록 신청서</h3>
                  <p>
                    현재 부산에서 활동 중이며 온라인으로 확인 가능한 작업 포트폴리오(인스타그램 작업 계정 또는 홈페이지)가 있는 작가님이라면 누구나 신청하실 수 있습니다. 아래 항목을 작성 후 <strong>[등록 신청하기]</strong> 버튼을 누르시면 관리자 확인 페이지로 자동 접수됩니다.
                  </p>
                </div>

                {/* 01. 기본 인적 사항 및 온라인 포트폴리오 */}
                <div className="form-section-title">01. 작가 기본 정보 및 온라인 포트폴리오</div>
                <div className="form-grid-2">
                  <div>
                    <label className="form-label">이름 (활동명 국문) *</label>
                    <input
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      placeholder="예: 김파랑"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">영문명 (English Name)</label>
                    <input
                      value={applyForm.nameEn}
                      onChange={(e) => setApplyForm({ ...applyForm, nameEn: e.target.value })}
                      placeholder="예: PARANG KIM"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">인스타그램 작업 계정 *</label>
                    <input
                      required
                      value={applyForm.instagram}
                      onChange={(e) => setApplyForm({ ...applyForm, instagram: e.target.value })}
                      placeholder="예: @artist_account 또는 인스타그램 주소"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">온라인 포트폴리오 (홈페이지 · 블로그 · 노션 URL)</label>
                    <input
                      value={applyForm.portfolioUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                      placeholder="예: https://artistportfolio.com (보유 시 입력)"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">활동 분야 (장르) *</label>
                    <select
                      value={applyForm.discipline}
                      onChange={(e) => setApplyForm({ ...applyForm, discipline: e.target.value })}
                      className="form-input"
                    >
                      <option value="회화·미술">회화·미술</option>
                      <option value="도자·조형">도자·조형</option>
                      <option value="공예·오브제">공예·오브제</option>
                      <option value="일러스트·드로잉">일러스트·드로잉</option>
                      <option value="사진">사진</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">부산 내 활동 거점 (구·군 및 작업실 동네) *</label>
                    <input
                      required
                      value={applyForm.district}
                      onChange={(e) => setApplyForm({ ...applyForm, district: e.target.value })}
                      placeholder="예: 수영구 광안동 / 중구 원도심 (또따또가)"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* 02. 주요 매체 · 학력 · 소속 */}
                <div className="form-section-title">02. 주요 매체 · 학력 · 소속 정보</div>
                <div className="form-grid-2">
                  <div>
                    <label className="form-label">주요 매체 · 작업 재료 *</label>
                    <input
                      required
                      value={applyForm.collectionsAndMedia}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, collectionsAndMedia: e.target.value })
                      }
                      placeholder="예: 캔버스에 유채 및 아크릴 혼합매체 / 백자토 물레 성형"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">학력 *</label>
                    <input
                      required
                      value={applyForm.education}
                      onChange={(e) => setApplyForm({ ...applyForm, education: e.target.value })}
                      placeholder="예: 부산대학교 미술학과 서양화전공 졸업"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label className="form-label">소속 · 작업실 및 한 줄 직함</label>
                    <input
                      value={applyForm.affiliation}
                      onChange={(e) => setApplyForm({ ...applyForm, affiliation: e.target.value })}
                      placeholder="예: 부산 수영구 스튜디오 · 현대회화 작가"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">연락처 또는 이메일 (관리자 확인·안내용) *</label>
                    <input
                      required
                      value={applyForm.contact}
                      onChange={(e) => setApplyForm({ ...applyForm, contact: e.target.value })}
                      placeholder="예: 010-0000-0000 또는 artist@email.com"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* 03. 작가 소개 및 최근 주요 이력 */}
                <div className="form-section-title">03. 작가 소개 및 최근 주요 이력</div>
                <div>
                  <label className="form-label">작가 소개 (작업 세계관 및 소개글) *</label>
                  <textarea
                    required
                    rows={3}
                    value={applyForm.detailedIntro}
                    onChange={(e) => setApplyForm({ ...applyForm, detailedIntro: e.target.value })}
                    placeholder="작가님의 작업 주제, 매체적 특징, 지향하는 예술적 시선을 2~4문장으로 소개해 주세요."
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">
                    최근 주요 이력 (개인전 · 단체전 · 레지던시 · 수상 이력 — 줄바꿈으로 구분) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={applyForm.careerText}
                    onChange={(e) => setApplyForm({ ...applyForm, careerText: e.target.value })}
                    placeholder={
                      '2026 개인전 《파도의 기록》, 갤러리 수정, 부산\n2025 단체전 《부산 청년미술제》, 부산문화회관, 부산\n2024 부산문화재단 청년예술가 창작지원 선정'
                    }
                    className="form-input"
                  />
                </div>

                {/* 04. 대표작품 이미지 3점 (선택: 파일 업로드 또는 이미지 URL) */}
                <div className="form-section-title">
                  04. 대표작품 이미지 등록 (최대 3점 · 파일 업로드 또는 이미지 URL)
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', marginTop: '-6px' }}>
                  작품 포스터나 인물 사진이 아닌 <strong>순수 작품 이미지</strong>를 등록해 주세요. 직접 이미지 파일을 업로드하거나 이미지 주소를 입력할 수 있습니다.
                </p>

                <div className="apply-works-grid-3">
                  {applyForm.works.map((w, idx) => (
                    <div key={idx} className="apply-work-slot-card">
                      <div className="apply-work-slot-top">
                        <strong>대표작품 0{idx + 1}</strong>
                        {w.imageUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...applyForm.works];
                              next[idx] = { ...next[idx], imageUrl: '' };
                              setApplyForm({ ...applyForm, works: next });
                            }}
                            style={{ fontSize: '11px', color: '#D92D20', fontFamily: 'var(--font-mono)' }}
                          >
                            이미지 비우기
                          </button>
                        )}
                      </div>

                      {w.imageUrl ? (
                        <div className="apply-work-preview-box">
                          <img src={w.imageUrl} alt={`대표작 0${idx + 1}`} />
                        </div>
                      ) : (
                        <label className="apply-work-upload-dropzone">
                          <Upload size={16} />
                          <span>작품 이미지 파일 선택</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleApplyWorkImageUpload(idx, e.target.files?.[0])}
                          />
                        </label>
                      )}

                      <input
                        value={w.title}
                        onChange={(e) => {
                          const next = [...applyForm.works];
                          next[idx] = { ...next[idx], title: e.target.value };
                          setApplyForm({ ...applyForm, works: next });
                        }}
                        placeholder="작품명 (선택)"
                        className="form-input"
                        style={{ fontSize: '12.5px', padding: '7px 10px' }}
                      />

                      <input
                        value={w.imageUrl.startsWith('data:') ? '' : w.imageUrl}
                        onChange={(e) => {
                          const next = [...applyForm.works];
                          next[idx] = { ...next[idx], imageUrl: e.target.value };
                          setApplyForm({ ...applyForm, works: next });
                        }}
                        placeholder="또는 이미지 URL 붙여넣기 (https://...)"
                        className="form-input"
                        style={{ fontSize: '12px', padding: '7px 10px' }}
                      />
                    </div>
                  ))}
                </div>

                <div className="artist-form-submit-row" style={{ marginTop: '12px' }}>
                  <button type="submit" className="artist-submit-primary-btn">
                    <span>부산 작가 아카이브 등록 신청하기 (관리자 자동 접수) →</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 01-C: ADMIN ONLY PAGE — 신청 등록 대기 / 등록 완료 관리 ('admin')
         ===================================================================== */}
      {activeSection === 'admin' && (
        <section className="admin-dashboard-section">
          <div className="section-bar">
            <div className="section-bar-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="var(--marine)" />
              <h2>부산 작가 등록 신청 관리자 페이지 (대기 / 완료 관리)</h2>
            </div>
            {isAdminAuthed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  className="apply-page-back-btn"
                  onClick={() => setActiveSection('artists')}
                >
                  부산 작가 · 작품 페이지 보기 ↗
                </button>
                <button type="button" className="admin-logout-btn" onClick={handleAdminLogout}>
                  관리자 잠금 (로그아웃)
                </button>
              </div>
            )}
          </div>

          {!isAdminAuthed ? (
            <div className="admin-login-gate-wrap">
              <form onSubmit={handleAdminLogin} className="admin-login-card">
                <div className="admin-login-icon">
                  <Lock size={22} color="var(--marine)" />
                </div>
                <h3>관리자 전용 페이지 인증</h3>
                <p>
                  부산 작가 아카이브 신청 등록 대기 및 완료 내역은 관리자(floreur)만 열람·승인할 수 있습니다. 관리자 비밀번호를 입력해 주세요.
                </p>
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="관리자 비밀번호 입력"
                  className="form-input"
                  style={{ textAlign: 'center', fontSize: '15px', letterSpacing: '0.08em' }}
                />
                {adminAuthError && <div className="admin-auth-error">{adminAuthError}</div>}
                <button type="submit" className="artist-submit-primary-btn" style={{ width: '100%' }}>
                  <span>관리자 페이지 입장하기 →</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="admin-dashboard-body">
              {/* Summary KPI Strip */}
              <div className="admin-kpi-grid">
                <div
                  className={`admin-kpi-card ${adminFilterTab === 'pending' ? 'is-focused' : ''}`}
                  onClick={() => setAdminFilterTab('pending')}
                >
                  <span className="admin-kpi-label">신청 등록 대기 (PENDING)</span>
                  <strong className="admin-kpi-num is-pending">{pendingApplicationsCount}건</strong>
                  <span className="admin-kpi-sub">포트폴리오 확인 및 승인 대기 중</span>
                </div>
                <div
                  className={`admin-kpi-card ${adminFilterTab === 'approved' ? 'is-focused' : ''}`}
                  onClick={() => setAdminFilterTab('approved')}
                >
                  <span className="admin-kpi-label">신청 등록 완료 (APPROVED)</span>
                  <strong className="admin-kpi-num is-approved">{approvedApplicationsCount}건</strong>
                  <span className="admin-kpi-sub">승인 완료 · 작가 페이지에 자동 반영됨</span>
                </div>
                <div
                  className={`admin-kpi-card ${adminFilterTab === 'all' ? 'is-focused' : ''}`}
                  onClick={() => setAdminFilterTab('all')}
                >
                  <span className="admin-kpi-label">전체 누적 신청 / 현재 총 등재 작가</span>
                  <strong className="admin-kpi-num">
                    총 {applications.length}건 신청 · {artistList.length}명 노출중
                  </strong>
                  <span className="admin-kpi-sub">기본 검증 작가 50명 + 신규 승인 {approvedApplicationsCount}명</span>
                </div>
              </div>

              {/* Filter Tabs: 신청 등록 대기 / 신청 등록 완료 / 전체 */}
              <div className="filter-strip" style={{ borderTop: '1px solid var(--line-strong)' }}>
                <div className="filter-tabs">
                  <button
                    type="button"
                    className={`filter-tab ${adminFilterTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setAdminFilterTab('pending')}
                  >
                    <Clock size={13} />
                    <span>신청 등록 대기</span>
                    <span className="filter-tab-count">{pendingApplicationsCount}</span>
                  </button>
                  <button
                    type="button"
                    className={`filter-tab ${adminFilterTab === 'approved' ? 'active' : ''}`}
                    onClick={() => setAdminFilterTab('approved')}
                  >
                    <Check size={13} />
                    <span>신청 등록 완료</span>
                    <span className="filter-tab-count">{approvedApplicationsCount}</span>
                  </button>
                  <button
                    type="button"
                    className={`filter-tab ${adminFilterTab === 'all' ? 'active' : ''}`}
                    onClick={() => setAdminFilterTab('all')}
                  >
                    <span>전체 신청 내역</span>
                    <span className="filter-tab-count">{applications.length}</span>
                  </button>
                </div>
              </div>

              {/* Applications List */}
              <div className="admin-applications-list">
                {applications.filter((app) =>
                  adminFilterTab === 'all' ? true : app.status === adminFilterTab
                ).length === 0 ? (
                  <div className="admin-empty-state">
                    <p>
                      {adminFilterTab === 'pending'
                        ? '현재 승인 대기 중인 신규 작가 등록 신청이 없습니다.'
                        : adminFilterTab === 'approved'
                        ? '아직 승인 완료된 신규 신청 내역이 없습니다.'
                        : '접수된 작가 등록 신청 내역이 없습니다.'}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button
                        type="button"
                        className="apply-secondary-btn"
                        onClick={openArtistApplyPage}
                      >
                        + 작가 등록 신청 페이지 열기
                      </button>
                      <button
                        type="button"
                        className="artists-apply-cta-btn"
                        onClick={() => {
                          const demoApp: ArtistApplication = {
                            id: `demo-app-${Date.now()}`,
                            status: 'pending',
                            submittedAt: '2026.11.05 15:00',
                            name: '윤해랑 (예시 신청서)',
                            nameEn: 'HAERANG YOON',
                            discipline: '회화·미술',
                            district: '수영구 광안동',
                            jobTitle: '현대회화 작가',
                            affiliation: '부산 수영구 광안동 스튜디오',
                            instagram: '@cecilia_jhe',
                            instagramUrl: 'https://www.instagram.com/cecilia_jhe/',
                            portfolioUrl: 'https://www.bscf.or.kr',
                            collectionsAndMedia: '린넨 캔버스에 유채, 아크릴릭 및 모래 혼합매체',
                            education: '부산대학교 미술학과 서양화전공 학사 졸업',
                            detailedIntro:
                              '부산 광안리와 영도 해안의 윤슬, 파도의 마모 흔적을 두터운 유채 임파스토 기법으로 기록합니다. 바다와 맞닿은 도시의 일상을 캔버스 위에 축적하는 회화 작업을 이어가고 있습니다.',
                            careerText:
                              '2026 개인전 《푸른 잔상》, 갤러리 수정, 부산\n2025 단체전 《부산 청년미술제》, 부산문화회관, 부산\n2024 부산문화재단 청년예술가 창작지원 선정',
                            contact: '010-8234-5678 / haerang@example.com',
                            works: [
                              {
                                title: '파도의 결 I',
                                year: '2026',
                                mediumDetail: '린넨 캔버스에 유채',
                                imageUrl:
                                  'https://www.bscf.or.kr/upload/Portpolio/file1_20250922031308338_0.jpg',
                              },
                              {
                                title: '윤슬의 기록',
                                year: '2026',
                                mediumDetail: '린넨 캔버스에 유채',
                                imageUrl:
                                  'https://www.bscf.or.kr/upload/Portpolio/file2_20250922031308346_0.jpg',
                              },
                              {
                                title: '푸른 수평선',
                                year: '2025',
                                mediumDetail: '린넨 캔버스에 유채',
                                imageUrl:
                                  'https://www.bscf.or.kr/upload/Portpolio/file3_20250922031308354_0.jpg',
                              },
                            ],
                          };
                          setApplications((prev) => [demoApp, ...prev]);
                          setAdminFilterTab('pending');
                        }}
                      >
                        <span>신청서 접수 화면 미리보기 (예시 1건 불러오기)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  applications
                    .filter((app) =>
                      adminFilterTab === 'all' ? true : app.status === adminFilterTab
                    )
                    .map((app) => {
                      const instaInfo = normalizeInstagramInput(app.instagram);
                      const cleanPortfolio = app.portfolioUrl.trim()
                        ? app.portfolioUrl.trim().startsWith('http')
                          ? app.portfolioUrl.trim()
                          : `https://${app.portfolioUrl.trim()}`
                        : '';

                      return (
                        <article key={app.id} className="admin-app-card">
                          <div className="admin-app-card-header">
                            <div className="admin-app-title-group">
                              <span
                                className={`admin-status-chip ${
                                  app.status === 'approved' ? 'is-approved' : 'is-pending'
                                }`}
                              >
                                {app.status === 'approved' ? '✓ 등록 완료 (아카이브 노출중)' : '● 등록 대기중'}
                              </span>
                              <span className="artist-minimal-genre">{app.discipline}</span>
                              <span className="artist-minimal-district-chip">부산 {app.district}</span>
                              <h3 className="admin-app-artist-name">
                                {app.name} <span>{app.nameEn}</span>
                              </h3>
                            </div>

                            <div className="admin-app-header-actions">
                              {app.status === 'pending' ? (
                                <button
                                  type="button"
                                  className="admin-approve-btn"
                                  onClick={() => handleApproveApplication(app.id)}
                                >
                                  <Check size={14} />
                                  <span>승인 · 작가 페이지에 등록 완료 처리</span>
                                </button>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="admin-preview-btn"
                                    onClick={() => {
                                      const matched = artistList.find(
                                        (a) => a.id === `approved-${app.id}`
                                      );
                                      if (matched) setActiveArtist(matched);
                                    }}
                                  >
                                    <span>작가 상세 화면 미리보기 ↗</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-revert-btn"
                                    onClick={() => handleRevertApplicationToPending(app.id)}
                                  >
                                    <span>등록 대기로 되돌리기</span>
                                  </button>
                                </>
                              )}
                              <button
                                type="button"
                                className="admin-delete-btn"
                                onClick={() => handleDeleteApplication(app.id)}
                                title="신청 내역 삭제"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Spec Grid: 인스타그램 / 온라인 포트폴리오 / 주요 매체 / 학력 / 연락처 */}
                          <div className="artist-naver-spec-box" style={{ marginTop: '14px' }}>
                            <div className="artist-naver-spec-item">
                              <span className="artist-naver-spec-key">인스타그램 계정</span>
                              <span className="artist-naver-spec-val">
                                {instaInfo.url ? (
                                  <a
                                    href={instaInfo.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      color: 'var(--marine)',
                                      fontWeight: 700,
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {instaInfo.handle} ↗
                                  </a>
                                ) : (
                                  app.instagram || '-'
                                )}
                              </span>
                            </div>
                            <div className="artist-naver-spec-item">
                              <span className="artist-naver-spec-key">온라인 포트폴리오</span>
                              <span className="artist-naver-spec-val">
                                {cleanPortfolio ? (
                                  <a
                                    href={cleanPortfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      color: 'var(--marine)',
                                      fontWeight: 700,
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {cleanPortfolio} ↗
                                  </a>
                                ) : (
                                  <span style={{ color: 'var(--ink-muted)' }}>인스타그램 단일 운영</span>
                                )}
                              </span>
                            </div>
                            <div className="artist-naver-spec-item">
                              <span className="artist-naver-spec-key">주요 매체</span>
                              <span className="artist-naver-spec-val">{app.collectionsAndMedia}</span>
                            </div>
                            <div className="artist-naver-spec-item">
                              <span className="artist-naver-spec-key">학력</span>
                              <span className="artist-naver-spec-val">{app.education}</span>
                            </div>
                            <div className="artist-naver-spec-item" style={{ borderBottom: 'none' }}>
                              <span className="artist-naver-spec-key">소속 · 연락처</span>
                              <span className="artist-naver-spec-val">
                                {app.affiliation} · <strong>{app.contact}</strong>
                              </span>
                            </div>
                            <div
                              className="artist-naver-spec-item"
                              style={{ borderRight: 'none', borderBottom: 'none' }}
                            >
                              <span className="artist-naver-spec-key">신청 / 승인 일시</span>
                              <span className="artist-naver-spec-val">
                                신청: {app.submittedAt}
                                {app.approvedAt ? ` / 승인: ${app.approvedAt}` : ''}
                              </span>
                            </div>
                          </div>

                          {/* Intro & Career */}
                          <div className="artist-minimal-bio-grid" style={{ marginTop: '16px' }}>
                            <div className="artist-minimal-col">
                              <div className="artist-minimal-label">작가 소개</div>
                              <p className="artist-minimal-intro">{app.detailedIntro}</p>
                            </div>
                            <div className="artist-minimal-col">
                              <div className="artist-minimal-label">최근 주요 이력</div>
                              <ul className="artist-minimal-career-list">
                                {app.careerText
                                  .split('\n')
                                  .map((l) => l.trim())
                                  .filter(Boolean)
                                  .map((line, i) => (
                                    <li key={i}>{line}</li>
                                  ))}
                              </ul>
                            </div>
                          </div>

                          {/* Works Preview & Quick Image URL Edit for Admin */}
                          <div className="admin-app-works-row">
                            {app.works.map((w, wIdx) => (
                              <div key={wIdx} className="admin-app-work-item">
                                <div className="admin-app-work-label">
                                  대표작 0{wIdx + 1} {w.title ? `— ${w.title}` : ''}
                                </div>
                                {w.imageUrl ? (
                                  <div className="admin-app-work-thumb">
                                    <img src={w.imageUrl} alt={w.title || app.name} />
                                  </div>
                                ) : (
                                  <div className="admin-app-work-empty">이미지 미첨부</div>
                                )}
                                <input
                                  value={w.imageUrl.startsWith('data:') ? '(업로드된 이미지 파일)' : w.imageUrl}
                                  readOnly={w.imageUrl.startsWith('data:')}
                                  onChange={(e) =>
                                    handleAdminUpdateAppWorkUrl(app.id, wIdx, e.target.value)
                                  }
                                  placeholder="관리자: 작품 이미지 URL 입력/수정"
                                  className="form-input"
                                  style={{ fontSize: '11.5px', padding: '5px 8px', marginTop: '6px' }}
                                />
                              </div>
                            ))}
                          </div>
                        </article>
                      );
                    })
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          SECTION 02: BUSAN ART SOUVENIRS (실무 제작 공정 매뉴얼 + 부산 실존 로컬 공정처 22곳 디렉토리)
         ===================================================================== */}
      {activeSection === 'souvenirs' && (
        <section>
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>부산 아트 기념품 · 로컬 제작 랩</h2>
            </div>
            <a
              href="mailto:floreur88@gmail.com?subject=[PARANG] 부산 관광기념품 콜라보 · B2B 제작 문의"
              className="section-bar-action"
            >
              <span>콜라보 · 납품 제안</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="goods-editorial-layout">
            <div className="goods-index-rail">
              <div className="goods-manual-list">
                {GOODS_MANUALS.map((manual) => {
                  const active = manual.id === currentManual.id;
                  return (
                    <div
                      key={manual.id}
                      className={`goods-rail-item ${active ? 'active' : ''}`}
                      onClick={() => setSelectedManualId(manual.id)}
                    >
                      <div className="goods-rail-meta">
                        <span>
                          {manual.code} · {manual.category}
                        </span>
                        <span>{manual.difficulty}</span>
                      </div>
                      <div className="goods-rail-title">{manual.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Detail Stage */}
            <div className="goods-detail-stage">
              <div className="goods-stage-header" style={{ gridTemplateColumns: '1fr' }}>
                <div className="goods-stage-title-box">
                  <div>
                    <div className="goods-stage-code">
                      {currentManual.code} // {currentManual.category}
                    </div>
                    <h3 className="goods-stage-title" style={{ marginTop: '10px' }}>
                      {currentManual.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--ink-muted)',
                        marginTop: '8px',
                        lineHeight: 1.6,
                      }}
                    >
                      {currentManual.summary}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleSave(currentManual.id)}
                      style={{
                        padding: '9px 16px',
                        border: '1px solid var(--line-strong)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        background: savedIds.includes(currentManual.id)
                          ? 'var(--marine)'
                          : 'transparent',
                        color: savedIds.includes(currentManual.id) ? '#ffffff' : 'var(--ink)',
                      }}
                    >
                      {savedIds.includes(currentManual.id) ? 'SAVED' : '+ SAVE SPEC'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="goods-content-columns">
                <div className="goods-steps-col">
                  {currentManual.steps.map((step) => (
                    <div key={step.stepNo} className="goods-step-row">
                      <div className="goods-step-num">{step.stepNo}</div>
                      <div>
                        <div className="goods-step-title">{step.title}</div>
                        <p className="goods-step-desc">{step.detail}</p>
                        <div className="goods-step-note">{step.technicalTip}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="goods-sidebar-col">
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--marine)',
                        letterSpacing: '0.06em',
                        marginBottom: '10px',
                      }}
                    >
                      세부 사양
                    </div>
                    <div className="spec-table-list">
                      {currentManual.specs.map((s) => (
                        <div key={s.label} className="spec-table-row">
                          <span className="spec-table-key">{s.label}</span>
                          <span className="spec-table-value">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--marine)',
                        letterSpacing: '0.06em',
                        marginBottom: '10px',
                      }}
                    >
                      인쇄·발주 체크리스트
                    </div>
                    <div
                      style={{
                        borderTop: '1px solid var(--line-strong)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {currentManual.checklist.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '10px 0',
                            borderBottom: '1px solid var(--line)',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: 'var(--marine)',
                            }}
                          >
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BUSAN LOCAL MAKERS & PRESS DIRECTORY TABLE */}
          <div className="makers-directory-toolbar">
            <div className="makers-toolbar-header">
              <strong>부산 로컬 인쇄소 · 소량 오브제 공정처 디렉토리 (22곳)</strong>
            </div>

            <div className="makers-toolbar-controls">
              <div className="makers-cat-scroll">
                {[
                  '전체',
                  '지류·인쇄·리소',
                  '아크릴·레이저·3D',
                  '도자·유리·금속 오브제',
                  '패브릭·실크스크린·자수',
                  '패키지·액자·화방',
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMakerCategoryFilter(cat)}
                    className={`makers-cat-btn ${makerCategoryFilter === cat ? 'active' : ''}`}
                  >
                    {cat === '전체' ? `전체 (${LOCAL_MAKERS.length})` : cat}
                  </button>
                ))}
              </div>

              <div className="makers-search-box">
                <Search size={13} />
                <input
                  type="text"
                  placeholder="업체명·동네·공정 검색..."
                  value={makerQuery}
                  onChange={(e) => setMakerQuery(e.target.value)}
                />
                {makerQuery && (
                  <button onClick={() => setMakerQuery('')}>
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="makers-table-wrap">
            <table className="editorial-table makers-table">
              <thead>
                <tr>
                  <th style={{ width: '130px' }}>CODE / 분류</th>
                  <th style={{ width: '260px' }}>업체명 / 부산 소재지 · 연락처</th>
                  <th style={{ width: '320px' }}>주요 공정 · 보유 장비</th>
                  <th>업체 특징 & 공식 웹사이트</th>
                </tr>
              </thead>
              <tbody>
                {LOCAL_MAKERS.filter((m) => {
                  const matchCat =
                    makerCategoryFilter === '전체' || m.category === makerCategoryFilter;
                  const q = makerQuery.trim().toLowerCase();
                  const matchQ =
                    !q ||
                    m.name.toLowerCase().includes(q) ||
                    m.district.toLowerCase().includes(q) ||
                    m.specialty.toLowerCase().includes(q) ||
                    m.equipment.toLowerCase().includes(q) ||
                    m.artistNote.toLowerCase().includes(q);
                  return matchCat && matchQ;
                }).map((maker) => (
                  <tr key={maker.id}>
                    <td className="maker-cell-code">
                      <div className="maker-code-badge">{maker.code}</div>
                      <div className="maker-category-tag">{maker.category}</div>
                    </td>
                    <td className="maker-cell-info">
                      <div className="maker-name">{maker.name}</div>
                      <div className="maker-district">{maker.district}</div>
                      <div className="maker-contact">{maker.contact}</div>
                    </td>
                    <td className="maker-cell-spec">
                      <div className="maker-specialty">{maker.specialty}</div>
                      <div className="maker-equipment">{maker.equipment}</div>
                    </td>
                    <td className="maker-cell-note">
                      <div className="maker-note-text">{maker.artistNote}</div>
                      {maker.websiteUrl && (
                        <div className="maker-site-wrap">
                          <a
                            href={maker.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="maker-site-link"
                          >
                            <span>OFFICIAL SITE</span>
                            <ArrowUpRight size={12} />
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 05: OPEN CALLS & COLLABORATION LOUNGE ([공고] + [협업])
         ===================================================================== */}
      {activeSection === 'collab' && (
        <section>
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>부산 미술 공고 · 작가 협업 라운지</h2>
            </div>
            <button
              type="button"
              className="section-bar-cta-primary"
              onClick={() => setIsWriteModalOpen(true)}
            >
              <Plus size={14} />
              <span>신규 공고 · 콜라보 · 공동발주 모집 등록</span>
            </button>
          </div>

          <div className="filter-strip">
            <div className="filter-tabs">
              {['전체', '전시·지원공고', '콜라보모집', '공동발주', '굿즈협업', '마켓부스'].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`filter-tab ${collabFilter === tab ? 'active' : ''}`}
                    onClick={() => setCollabFilter(tab)}
                  >
                    <span>{tab}</span>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="makers-table-wrap">
            <table className="editorial-table dispatch-table">
              <thead>
                <tr>
                  <th style={{ width: '125px' }}>구분</th>
                  <th>공고 · 협업 내용</th>
                  <th style={{ width: '200px' }}>주최 · 작성자</th>
                  <th style={{ width: '185px' }}>모집 대상 / 마감</th>
                </tr>
              </thead>
              <tbody>
                {filteredCollabPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="dispatch-cell-type">
                      <span
                        style={{
                          display: 'inline-block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          padding: '2px 7px',
                          background:
                            post.type === '콜라보모집' || post.type === '공동발주'
                              ? 'var(--marine)'
                              : post.type === '전시·지원공고'
                              ? '#047857'
                              : 'var(--ink)',
                          color: '#ffffff',
                        }}
                      >
                        {post.type}
                      </span>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-muted)',
                          marginTop: '6px',
                        }}
                      >
                        {post.date}
                      </div>
                    </td>
                    <td className="dispatch-cell-body">
                      <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>
                        {post.title}
                      </div>
                      <div
                        style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.55 }}
                      >
                        {post.description}
                      </div>
                    </td>
                    <td className="dispatch-cell-author">
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{post.author}</div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--ink-muted)',
                          marginTop: '4px',
                        }}
                      >
                        {post.district}
                      </div>
                    </td>
                    <td
                      className="dispatch-cell-meta"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                    >
                      <div>{post.targetCount}</div>
                      <div style={{ color: 'var(--marine)', marginTop: '4px', fontWeight: 600 }}>
                        {post.deadline}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 04: BUSAN GALLERIES & EXHIBITION SPACES ([대중용] 전시·관람 안내 + [작가용] 대관·판매 스펙)
         ===================================================================== */}
      {activeSection === 'galleries' && (
        <section>
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>부산 갤러리 · 대관 · 작품판매 인덱스</h2>
            </div>
          </div>

          {/* Audience Mode Switcher: [대중용] 전시·관람 vs [작가용] 대관·판매·입점 스펙 */}
          <div className="audience-mode-switcher">
            <button
              type="button"
              className={`audience-mode-btn ${galleryAudienceMode === 'all' ? 'active' : ''}`}
              onClick={() => setGalleryAudienceMode('all')}
            >
              <span className="mode-badge is-neutral">ALL</span>
              <span>통합 보기 (현재 전시 + 대관·판매 스펙)</span>
            </button>
            <button
              type="button"
              className={`audience-mode-btn ${galleryAudienceMode === 'public' ? 'active' : ''}`}
              onClick={() => setGalleryAudienceMode('public')}
            >
              <span className="mode-badge is-public">대중 · 관람객용</span>
              <span>현재 진행 전시 · 관람 시간 · 휴관일 · 위치 안내</span>
            </button>
            <button
              type="button"
              className={`audience-mode-btn ${galleryAudienceMode === 'artist' ? 'active' : ''}`}
              onClick={() => setGalleryAudienceMode('artist')}
            >
              <span className="mode-badge is-artist">부산 작가 · 기획자용</span>
              <span>대관 가능 여부 · 1주 대관료/평수 · 작품 판매 수수료율 · 아트샵 입점 조건</span>
            </button>
          </div>

          {/* 1단 필터: 13개 구·군 컬러 필터 */}
          <div className="filter-strip">
            <div className="filter-tabs gallery-zone-tabs">
              {zones.map((z) => {
                const isSelected = selectedZone === z;
                const dColor = z !== '전체' ? getDistrictStyle(z) : null;
                return (
                  <button
                    key={z}
                    className={`filter-tab ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedZone(z)}
                    style={
                      isSelected && dColor
                        ? { background: dColor.color, color: '#ffffff' }
                        : undefined
                    }
                  >
                    {dColor && (
                      <span
                        className="zone-color-dot"
                        style={{
                          background: isSelected ? '#ffffff' : dColor.color,
                        }}
                      />
                    )}
                    <span>{z}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2단 실무 필터 ([작가용] 및 통합 보기에서 활성화): 대관 가능 여부 · 작품 판매 · 아트샵 입점 · 수수료 조건 */}
          {galleryAudienceMode !== 'public' && (
            <div className="gallery-spec-filter-bar">
              <span className="audience-role-tag is-artist">작가용 실무 필터</span>
              <div className="spec-filter-pills">
                {(
                  [
                    ['all', `전체 공간 (${GALLERIES.length})`],
                    [
                      'rental',
                      `대관 가능 (${GALLERIES.filter((g) => g.rentalAndSales.rentalAvailable).length})`,
                    ],
                    [
                      'sales',
                      `작품 판매 가능 (${GALLERIES.filter((g) => g.rentalAndSales.artworkSales).length})`,
                    ],
                    [
                      'artshop',
                      `아트샵 · 굿즈 입점 가능 (${
                        GALLERIES.filter((g) => g.rentalAndSales.artShopAvailable).length
                      })`,
                    ],
                    [
                      'zero_commission',
                      `수수료 0% · 비영리/공립 (${
                        GALLERIES.filter(
                          (g) =>
                            g.rentalAndSales.commissionRate.includes('없음') ||
                            g.rentalAndSales.commissionRate.includes('비영리') ||
                            g.rentalAndSales.commissionRate.includes('공립')
                        ).length
                      })`,
                    ],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={`spec-filter-pill ${gallerySpecFilter === key ? 'active' : ''}`}
                    onClick={() => setGallerySpecFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="gallery-explorer-layout">
            <div className="coast-map-panel">
              <div>
                <div className="map-panel-header">
                  <h3 className="map-panel-title">부산 갤러리 좌표</h3>
                </div>

                <div className="map-svg-container">
                  <svg
                    viewBox="0 0 100 100"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  >
                    <path
                      d="M 5 82 L 18 76 L 26 84 L 34 75 L 40 65 L 54 62 L 62 52 L 75 48 L 84 35 L 92 14 L 100 10 L 100 0 L 0 0 L 0 82 Z"
                      fill="rgba(0, 82, 255, 0.16)"
                      stroke="#3B82F6"
                      strokeWidth="0.6"
                    />
                    <polyline
                      points="28,78 42,46 60,55 78,44 88,22"
                      fill="none"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1.5"
                    />

                    {GALLERIES.map((gal) => {
                      const isMatched = filteredGalleries.some((fg) => fg.id === gal.id);
                      const isSelected = activeGallery?.id === gal.id;
                      const dStyle = getDistrictStyle(gal.zone);
                      return (
                        <g
                          key={gal.id}
                          style={{ cursor: 'pointer', opacity: isMatched ? 1 : 0.22 }}
                          onClick={() => setActiveGallery(gal)}
                        >
                          {isSelected && (
                            <circle
                              cx={gal.mapPos.x}
                              cy={gal.mapPos.y}
                              r="5.5"
                              fill="none"
                              stroke={dStyle.mapColor}
                              strokeWidth="0.7"
                            />
                          )}
                          <circle
                            cx={gal.mapPos.x}
                            cy={gal.mapPos.y}
                            r={isSelected ? '2.8' : '2.2'}
                            fill={dStyle.mapColor}
                            stroke="#0D1624"
                            strokeWidth="0.5"
                          />
                          <text
                            x={gal.mapPos.x + 3.2}
                            y={gal.mapPos.y + 1}
                            fill={dStyle.mapColor}
                            fontSize="3.2"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {gal.indexNo}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            <div className="gallery-list-panel">
              {filteredGalleries.map((gal) => {
                const dStyle = getDistrictStyle(gal.zone);
                const rs = gal.rentalAndSales;
                return (
                  <article
                    key={gal.id}
                    className={`gallery-row-item ${
                      activeGallery?.id === gal.id ? 'selected' : ''
                    }`}
                    onClick={() => setActiveGallery(gal)}
                  >
                    <div className="gallery-row-compact">
                      <div className="gallery-row-main">
                        <span
                          className="gallery-zone-badge"
                          style={{
                            color: dStyle.color,
                            background: dStyle.bg,
                            borderColor: dStyle.border,
                          }}
                        >
                          {gal.zone}
                        </span>
                        <h3 className="gallery-row-title">{gal.name}</h3>
                      </div>

                      <div className="gallery-row-right">
                        {galleryAudienceMode !== 'public' && (
                          <div className="gallery-mini-tags">
                            <span
                              className={`gallery-mini-tag ${
                                rs.rentalAvailable ? 'is-rental' : 'is-curated'
                              }`}
                            >
                              {rs.rentalAvailable ? '대관가능' : '기획·공모'}
                            </span>
                            <span className="gallery-mini-tag is-pyeong">
                              {rs.pyeong.split('(')[0].trim()}
                            </span>
                            {rs.artworkSales && (
                              <span className="gallery-mini-tag is-sales">작품판매</span>
                            )}
                            {rs.artShopAvailable && (
                              <span className="gallery-mini-tag is-shop">아트샵</span>
                            )}
                          </div>
                        )}
                        <ArrowUpRight size={14} className="gallery-arrow-icon" />
                      </div>
                    </div>

                    {/* [대중용] 현재 전시 · 관람시간 요약 줄 */}
                    {(galleryAudienceMode === 'public' || galleryAudienceMode === 'all') && (
                      <div className="gallery-row-sub-public">
                        <span className="row-mode-chip is-public">관람 안내</span>
                        <strong>{gal.currentExhibition.title}</strong>
                        <span>· {gal.currentExhibition.period}</span>
                        <span>· {gal.hours} ({gal.closedDays})</span>
                      </div>
                    )}

                    {/* [작가용] 대관료 · 수수료 · 입점 요약 줄 */}
                    {galleryAudienceMode === 'artist' && (
                      <div className="gallery-row-sub-artist">
                        <span className="row-mode-chip is-artist">대관·판매 스펙</span>
                        <strong>{rs.rentalFeeSummary}</strong>
                        <span>· {rs.commissionRate}</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          EDITORIAL FOOTER
         ===================================================================== */}
      <footer className="editorial-footer">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                letterSpacing: '-0.02em',
              }}
            >
              PARANG
            </span>
            <span style={{ fontSize: '13px', color: '#66A3FF', fontWeight: 600 }}>
              파랑 波浪
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            © 2026 PARANG BUSAN ART & OBJECT INDEX
          </div>
        </div>

        <div
          className="footer-col"
          style={{ alignItems: 'flex-end', justifyContent: 'center', gap: '6px' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            OPERATED BY <span style={{ color: '#66A3FF', fontWeight: 600 }}>floreur</span>
          </div>
          <a
            href="mailto:floreur88@gmail.com"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff' }}
          >
            floreur88@gmail.com
          </a>
        </div>
      </footer>

      {/* =====================================================================
          DRAWER 1: MINIMAL ARTIST DETAIL PAGE VIEW (네이버 프로필형 요약 · 작가소개 · 최근 주요이력 · 포트폴리오/콜라보 버튼 · 작품 3점)
         ===================================================================== */}
      {activeArtist && (() => {
        const np = activeArtist.naverProfile;
        const { intro, careerItems } = parseArtistIntroAndCareer(activeArtist);
        const detailedIntro = np?.detailedIntro || intro;

        return (
          <div className="drawer-backdrop" onClick={() => setActiveArtist(null)}>
            <div
              className="editorial-drawer artist-minimal-page-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-top-bar">
                <button
                  type="button"
                  onClick={() => setActiveArtist(null)}
                  className="artist-back-btn"
                >
                  <span>← 작가 목록으로 돌아가기</span>
                </button>
                <button
                  onClick={() => setActiveArtist(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                  }}
                >
                  <span>CLOSE</span>
                  <X size={16} />
                </button>
              </div>

              {/* Artist Profile Header: Minimal Identity + Non-Repetitive Bio & Timeline */}
              <div className="artist-minimal-header">
                <div className="artist-minimal-top-row">
                  <div>
                    <div className="artist-minimal-meta-badges">
                      <span className="artist-minimal-genre">{activeArtist.discipline}</span>
                      <span className="artist-minimal-district-chip">부산 {activeArtist.district}</span>
                    </div>
                    <h2 className="artist-minimal-name">
                      {activeArtist.name} <span>{activeArtist.nameEn}</span>
                    </h2>
                    {np?.jobTitle && (
                      <div className="artist-naver-job-title">{np.jobTitle}</div>
                    )}
                  </div>

                  <div className="artist-minimal-actions">
                    <a
                      href={`mailto:floreur88@gmail.com?subject=${encodeURIComponent(
                        `[PARANG 작가 콜라보 의뢰] ${activeArtist.name} 작가 협업 문의 (floreur 에이전시 연결)`
                      )}`}
                      className="artist-btn-collab"
                    >
                      <span>작가에게 콜라보 의뢰하기</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Compact Naver Profile Summary (소속/거점 · 학력 · 공식 작업 계정 · 주요 매체/소장) */}
                {np && (
                  <div className="artist-naver-spec-box">
                    <div className="artist-naver-spec-item">
                      <span className="artist-naver-spec-key">소속 · 거점</span>
                      <span className="artist-naver-spec-val">{np.affiliation}</span>
                    </div>
                    <div className="artist-naver-spec-item">
                      <span className="artist-naver-spec-key">학력</span>
                      <span className="artist-naver-spec-val">{np.education}</span>
                    </div>
                    <div className="artist-naver-spec-item" style={{ borderBottom: 'none' }}>
                      <span className="artist-naver-spec-key">공식 작업 계정</span>
                      <span className="artist-naver-spec-val">
                        <a
                          href={activeArtist.instagramUrl || activeArtist.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: 'var(--marine)',
                            fontWeight: 600,
                            textDecoration: 'underline',
                            textUnderlineOffset: '3px',
                            marginRight: '10px',
                          }}
                        >
                          {activeArtist.instagram} ↗
                        </a>
                        {activeArtist.portfolioUrl &&
                          activeArtist.portfolioUrl !== activeArtist.instagramUrl && (
                            <a
                              href={activeArtist.portfolioUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: 'var(--ink-muted)',
                                fontSize: '12px',
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                              }}
                            >
                              {activeArtist.portfolioUrl
                                .replace(/^https?:\/\/(www\.)?/, '')
                                .replace(/\/$/, '')}{' '}
                              ↗
                            </a>
                          )}
                      </span>
                    </div>
                    <div className="artist-naver-spec-item" style={{ borderRight: 'none', borderBottom: 'none' }}>
                      <span className="artist-naver-spec-key">주요 매체 · 소장</span>
                      <span className="artist-naver-spec-val">{np.collectionsAndMedia}</span>
                    </div>
                  </div>
                )}

                <div className="artist-minimal-bio-grid">
                  <div className="artist-minimal-col">
                    <div className="artist-minimal-label">작가 소개</div>
                    <p className="artist-minimal-intro">{detailedIntro}</p>
                  </div>

                  <div className="artist-minimal-col">
                    <div className="artist-minimal-label">최근 주요 이력</div>
                    {np?.careerTimeline && np.careerTimeline.length > 0 ? (
                      <ul className="artist-naver-timeline-list">
                        {np.careerTimeline.map((item, idx) => (
                          <li key={idx} className="artist-naver-timeline-row">
                            <span className="timeline-year">{item.year}</span>
                            <span className={`timeline-badge is-${item.badge.replace('·', '-')}`}>
                              {item.badge}
                            </span>
                            <span className="timeline-content">{item.content}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="artist-minimal-career-list">
                        {careerItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* 3 Representative Artworks in Passepartout Gallery Style (Only Title on Top, Blank if No Title) */}
              <div className="artist-minimal-works-section">
                <div className="artist-minimal-works-grid">
                  {activeArtist.artworks.slice(0, 3).map((work) => (
                    <div key={work.id} className="passepartout-card is-detail-work">
                      <div className="passepartout-card-top is-title-only">
                        {work.title ? (
                          <strong className="passepartout-work-only-title">{work.title}</strong>
                        ) : null}
                      </div>
                      <div className="passepartout-frame">
                        <img src={work.imageUrl} alt={work.title || activeArtist.name} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* =====================================================================
          DRAWER 2: GALLERY SPACE SPECS & RENTAL SHEET
         ===================================================================== */}
      {activeGallery && (
        <div className="drawer-backdrop" onClick={() => setActiveGallery(null)}>
          <div className="editorial-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top-bar">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--marine)' }}>
                {activeGallery.indexNo}
              </div>
              <button
                onClick={() => setActiveGallery(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            <div className="drawer-body-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    color: getDistrictStyle(activeGallery.zone).color,
                    background: getDistrictStyle(activeGallery.zone).bg,
                    border: `1px solid ${getDistrictStyle(activeGallery.zone).border}`,
                  }}
                >
                  {activeGallery.zone}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--ink-muted)',
                  }}
                >
                  {activeGallery.spaceType}
                </span>
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 700, marginTop: '6px' }}>
                {activeGallery.name}
              </h2>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--ink-muted)',
                  marginTop: '6px',
                }}
              >
                {activeGallery.address}
              </div>

              <p style={{ fontSize: '15px', lineHeight: 1.7, marginTop: '20px' }}>
                {activeGallery.description}
              </p>

              <div
                style={{
                  marginTop: '28px',
                  padding: '24px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg-pure)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--marine)',
                  }}
                >
                  ON VIEW — {activeGallery.currentExhibition.period}
                </div>
                <div style={{ fontSize: '19px', fontWeight: 700, marginTop: '6px' }}>
                  {activeGallery.currentExhibition.title}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                  {activeGallery.currentExhibition.artists}
                </div>
              </div>

              <div style={{ marginTop: '28px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--marine)',
                    marginBottom: '10px',
                  }}
                >
                  대관 · 판매 · 입점 스펙
                </div>
                <div className="spec-table-list">
                  <div className="spec-table-row">
                    <span className="spec-table-key">대관 가능 여부</span>
                    <span className="spec-table-value" style={{ fontWeight: 700 }}>
                      {activeGallery.rentalAndSales.rentalAvailable
                        ? '대관 가능 (정기/수시 대관 운영)'
                        : '기획 초대전 · 공모 전용'}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">대관료 (주간/평수)</span>
                    <span className="spec-table-value" style={{ color: 'var(--marine)', fontWeight: 600 }}>
                      {activeGallery.rentalAndSales.rentalFeeSummary} · {activeGallery.rentalAndSales.pyeong}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">작품 판매 · 수수료</span>
                    <span className="spec-table-value">
                      {activeGallery.rentalAndSales.commissionRate}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">아트샵 · 굿즈 입점</span>
                    <span className="spec-table-value">
                      {activeGallery.rentalAndSales.artShopNote}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">포함 장비 · 설비</span>
                    <span className="spec-table-value">
                      {activeGallery.rentalAndSales.includedFacilities}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">운영 시간</span>
                    <span className="spec-table-value">
                      {activeGallery.hours} ({activeGallery.closedDays})
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">층고 · 벽면 사양</span>
                    <span className="spec-table-value">
                      {activeGallery.spaceSpecs.ceilingHeight} / {activeGallery.spaceSpecs.wallType}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">대관 · 공모 안내</span>
                    <span className="spec-table-value">
                      {activeGallery.spaceSpecs.submissionInfo}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <a
                    href={`mailto:floreur88@gmail.com?subject=${encodeURIComponent(
                      `[PARANG 갤러리 대관/입점 문의] ${activeGallery.name}`
                    )}`}
                    className="drawer-agency-cta"
                  >
                    <span>이 갤러리 대관 일정 · 기획 단체전 · 아트샵 입점 문의하기 (floreur 연결)</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER 3: SAVED ARCHIVE FOLDER
         ===================================================================== */}
      {isArchiveOpen && (
        <div className="drawer-backdrop" onClick={() => setIsArchiveOpen(false)}>
          <div
            className="editorial-drawer"
            style={{ width: 'min(520px, 92vw)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-top-bar">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--marine)' }}>
                ARCHIVE ({savedIds.length})
              </div>
              <button
                onClick={() => setIsArchiveOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            <div className="drawer-body-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {savedIds.map((id) => {
                const artist = ARTISTS.find((a) => a.id === id);
                const manual = GOODS_MANUALS.find((m) => m.id === id);
                const gallery = GALLERIES.find((g) => g.id === id);

                if (artist) {
                  return (
                    <div
                      key={id}
                      style={{
                        padding: '16px',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg-pure)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setIsArchiveOpen(false);
                          setActiveArtist(artist);
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--marine)' }}>
                          {artist.indexNo}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '16px' }}>{artist.name}</div>
                      </div>
                      <button
                        onClick={() => toggleSave(id)}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-muted)' }}
                      >
                        REMOVE
                      </button>
                    </div>
                  );
                }

                if (manual) {
                  return (
                    <div
                      key={id}
                      style={{
                        padding: '16px',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg-pure)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setIsArchiveOpen(false);
                          setSelectedManualId(manual.id);
                          setActiveSection('souvenirs');
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--marine)' }}>
                          {manual.code}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>{manual.title}</div>
                      </div>
                      <button
                        onClick={() => toggleSave(id)}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-muted)' }}
                      >
                        REMOVE
                      </button>
                    </div>
                  );
                }

                if (gallery) {
                  return (
                    <div
                      key={id}
                      style={{
                        padding: '16px',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg-pure)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setIsArchiveOpen(false);
                          setActiveGallery(gallery);
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--marine)' }}>
                          {gallery.zone}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>{gallery.name}</div>
                      </div>
                      <button
                        onClick={() => toggleSave(id)}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-muted)' }}
                      >
                        REMOVE
                      </button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER 4: NEW COLLAB / JOINT ORDER DISPATCH FORM
         ===================================================================== */}
      {isWriteModalOpen && (
        <div className="drawer-backdrop" onClick={() => setIsWriteModalOpen(false)}>
          <div
            className="editorial-drawer"
            style={{ width: 'min(560px, 94vw)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-top-bar">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--marine)' }}>
                NEW DISPATCH
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={handleAddCollabPost}
              className="drawer-body-section"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(
                  ['전시·지원공고', '콜라보모집', '공동발주', '굿즈협업', '마켓부스'] as const
                ).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setNewPost({ ...newPost, type: t })}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid var(--line-strong)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      background: newPost.type === t ? 'var(--marine)' : 'transparent',
                      color: newPost.type === t ? '#ffffff' : 'var(--ink)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <input
                required
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="제목"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg-pure)',
                  fontSize: '14px',
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input
                  required
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  placeholder="작가명 (분야)"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg-pure)',
                    fontSize: '13px',
                  }}
                />
                <input
                  value={newPost.district}
                  onChange={(e) => setNewPost({ ...newPost, district: e.target.value })}
                  placeholder="지역"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg-pure)',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input
                  value={newPost.targetCount}
                  onChange={(e) => setNewPost({ ...newPost, targetCount: e.target.value })}
                  placeholder="모집 규모"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg-pure)',
                    fontSize: '13px',
                  }}
                />
                <input
                  value={newPost.deadline}
                  onChange={(e) => setNewPost({ ...newPost, deadline: e.target.value })}
                  placeholder="마감일"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg-pure)',
                    fontSize: '13px',
                  }}
                />
              </div>

              <textarea
                required
                rows={4}
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                placeholder="내용"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg-pure)',
                  fontSize: '13px',
                }}
              />

              <button
                type="submit"
                style={{
                  padding: '14px 24px',
                  background: 'var(--marine)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                PUBLISH →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER 5: BUSAN ARTIST DIRECT REGISTRATION & PROFILE UPDATE FORM (3~5 WORKS)
         ===================================================================== */}
      {isArtistModalOpen && (
        <div className="drawer-backdrop" onClick={() => setIsArtistModalOpen(false)}>
          <div
            className="editorial-drawer"
            style={{ width: 'min(760px, 95vw)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-top-bar">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--marine)' }}>
                {artistForm.mode === 'update'
                  ? 'ARTIST PROFILE & WORKS UPDATE'
                  : 'NEW BUSAN ARTIST ARCHIVE SUBMISSION'}
              </div>
              <button
                onClick={() => setIsArtistModalOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                }}
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={handleSubmitArtistForm}
              className="drawer-body-section artist-submit-form"
            >
              <div className="artist-form-intro">
                <h3>
                  {artistForm.mode === 'update'
                    ? '부산 작가 프로필 · 대표작품 정보 수정 신청'
                    : '부산 활동 작가 직접 등록 신청 (floreur 승인 후 등재)'}
                </h3>
                <p>
                  부산에서 활동 중인 작가님이 직접 기본 프로필, 전시 이력(개인전/단체전), 콜라보 여부, 대표작 3~5점의 상세 스펙을 제보·수정할 수 있습니다. 제출 즉시 아카이브에 반영되며 floreur 에이전시가 검수를 진행합니다.
                </p>
              </div>

              {/* Mode Toggle: 신규 등록 vs 기존 작가 수정 */}
              <div className="artist-form-mode-tabs">
                <button
                  type="button"
                  className={`form-mode-tab ${artistForm.mode === 'new' ? 'active' : ''}`}
                  onClick={() =>
                    setArtistForm((prev) => ({ ...prev, mode: 'new', targetArtistId: '' }))
                  }
                >
                  신규 부산 작가 등록 신청
                </button>
                <button
                  type="button"
                  className={`form-mode-tab ${artistForm.mode === 'update' ? 'active' : ''}`}
                  onClick={() => {
                    const target = activeArtist || artistList[0];
                    if (target) openEditArtistModal(target);
                  }}
                >
                  기존 등재 작가 정보 · 작품 수정 신청
                </button>
              </div>

              {artistForm.mode === 'update' && (
                <div className="form-field-block">
                  <label className="form-label">수정할 대상 작가 선택</label>
                  <select
                    value={artistForm.targetArtistId}
                    onChange={(e) => {
                      const found = artistList.find((a) => a.id === e.target.value);
                      if (found) openEditArtistModal(found);
                    }}
                    className="form-input"
                  >
                    {artistList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.indexNo} — {a.name} ({a.discipline} · {a.district})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 1. 기본 정보 */}
              <div className="form-section-title">01. 기본 프로필 정보</div>
              <div className="form-grid-2">
                <div>
                  <label className="form-label">활동명 (국문) *</label>
                  <input
                    required
                    value={artistForm.name}
                    onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })}
                    placeholder="예: 김파랑"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">영문명 (English Name) *</label>
                  <input
                    required
                    value={artistForm.nameEn}
                    onChange={(e) => setArtistForm({ ...artistForm, nameEn: e.target.value })}
                    placeholder="예: PARANG KIM"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">주 작업 거점 (부산 구·군 및 상세 지역) *</label>
                  <input
                    required
                    value={artistForm.district}
                    onChange={(e) => setArtistForm({ ...artistForm, district: e.target.value })}
                    placeholder="예: 수영구 광안동 / 중구 원도심 (또따또가)"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">주요 장르 *</label>
                  <select
                    value={artistForm.discipline}
                    onChange={(e) => setArtistForm({ ...artistForm, discipline: e.target.value })}
                    className="form-input"
                  >
                    <option value="회화·미술">회화·미술</option>
                    <option value="도자·조형">도자·조형</option>
                    <option value="공예·오브제">공예·오브제</option>
                    <option value="일러스트·드로잉">일러스트·드로잉</option>
                    <option value="사진">사진</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">인스타그램 계정</label>
                  <input
                    value={artistForm.instagram}
                    onChange={(e) => setArtistForm({ ...artistForm, instagram: e.target.value })}
                    placeholder="예: @parang_art"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">포트폴리오 · 웹사이트 링크</label>
                  <input
                    value={artistForm.portfolioUrl}
                    onChange={(e) => setArtistForm({ ...artistForm, portfolioUrl: e.target.value })}
                    placeholder="https://..."
                    className="form-input"
                  />
                </div>
              </div>

              {/* 2. 콜라보 배지 설정 */}
              <div className="form-section-title">02. 콜라보 배지 · 협업 상태 설정</div>
              <div className="form-grid-2">
                <button
                  type="button"
                  className={`collab-choice-btn ${
                    artistForm.collabStatus === '기념품 콜라보 참여' ? 'active is-souvenir' : ''
                  }`}
                  onClick={() =>
                    setArtistForm({
                      ...artistForm,
                      collabStatus: '기념품 콜라보 참여',
                      collabNote: 'floreur × 부산 관광기념품 콜라보 에디션 및 아트굿즈 제작 참여 희망',
                    })
                  }
                >
                  <strong>관광기념품 콜라보 참여 작가</strong>
                  <span>floreur와 함께 부산 관광기념품·아트 에디션 제작 및 수익 배분 참여</span>
                </button>
                <button
                  type="button"
                  className={`collab-choice-btn ${
                    artistForm.collabStatus === '협업 열림 (Open to Collab)' ? 'active is-open' : ''
                  }`}
                  onClick={() =>
                    setArtistForm({
                      ...artistForm,
                      collabStatus: '협업 열림 (Open to Collab)',
                      collabNote: '전시 기획 · 브랜드 콜라보 · 공공미술 프로젝트 제안 열림',
                    })
                  }
                >
                  <strong>협업 열림 (Open to Collab)</strong>
                  <span>전시 섭외 · 브랜드 협업 · 공간 커미션 작업 제안 상시 열림</span>
                </button>
              </div>

              {/* 3. 작가 노트 & 전시 이력 (개인전/단체전) */}
              <div className="form-section-title">03. 작가 노트 및 전시 이력 (개인전 / 단체전)</div>
              <div>
                <label className="form-label">작가 노트 (Artist Statement) *</label>
                <textarea
                  required
                  rows={3}
                  value={artistForm.statement}
                  onChange={(e) => setArtistForm({ ...artistForm, statement: e.target.value })}
                  placeholder="작업 세계관, 주요 매체, 탐구 주제를 작성해 주세요."
                  className="form-input"
                />
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">주요 개인전 이력 (줄바꿈으로 구분)</label>
                  <textarea
                    rows={3}
                    value={artistForm.soloText}
                    onChange={(e) => setArtistForm({ ...artistForm, soloText: e.target.value })}
                    placeholder={'2026 개인전 《파도의 결》, 미광화랑, 부산\n2024 초대전, 갤러리 수정, 부산'}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">주요 단체전 · 아트페어 이력 (줄바꿈으로 구분)</label>
                  <textarea
                    rows={3}
                    value={artistForm.groupText}
                    onChange={(e) => setArtistForm({ ...artistForm, groupText: e.target.value })}
                    placeholder={'2026 BAMA 부산국제화랑아트페어, 벡스코\n2025 부산현대미술관 기획전, 부산'}
                    className="form-input"
                  />
                </div>
              </div>

              {/* 4. 대표작품 3~5점 상세 스펙 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                }}
              >
                <div className="form-section-title" style={{ margin: 0 }}>
                  04. 대표작품 상세 스펙 ({artistForm.works.length}점 / 최소 3점 ~ 최대 5점)
                </div>
                {artistForm.works.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddWorkSlot}
                    className="add-work-slot-btn"
                  >
                    <Plus size={13} />
                    <span>대표작품 추가 ({artistForm.works.length}/5)</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {artistForm.works.map((w, idx) => (
                  <div key={idx} className="work-form-card">
                    <div className="work-form-card-header">
                      <strong>대표작품 0{idx + 1}</strong>
                      {artistForm.works.length > 3 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveWorkSlot(idx)}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--ink-muted)',
                          }}
                        >
                          삭제 ×
                        </button>
                      )}
                    </div>

                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">작품명 *</label>
                        <input
                          required
                          value={w.title}
                          onChange={(e) => {
                            const updated = [...artistForm.works];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setArtistForm({ ...artistForm, works: updated });
                          }}
                          placeholder="예: 푸른 조류의 기록 I"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">제작연도 *</label>
                        <input
                          required
                          value={w.year}
                          onChange={(e) => {
                            const updated = [...artistForm.works];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setArtistForm({ ...artistForm, works: updated });
                          }}
                          placeholder="예: 2026"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">재료 · 기법 *</label>
                        <input
                          required
                          value={w.mediumDetail}
                          onChange={(e) => {
                            const updated = [...artistForm.works];
                            updated[idx] = { ...updated[idx], mediumDetail: e.target.value };
                            setArtistForm({ ...artistForm, works: updated });
                          }}
                          placeholder="예: 캔버스에 유채 및 혼합매체"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">호수 · 규격 (cm) *</label>
                        <input
                          required
                          value={w.dimensions}
                          onChange={(e) => {
                            const updated = [...artistForm.works];
                            updated[idx] = { ...updated[idx], dimensions: e.target.value };
                            setArtistForm({ ...artistForm, works: updated });
                          }}
                          placeholder="예: 72.7 × 60.6 cm (20호 F)"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">소장 가능 여부</label>
                        <select
                          value={w.availability}
                          onChange={(e) => {
                            const updated = [...artistForm.works];
                            updated[idx] = {
                              ...updated[idx],
                              availability: e.target.value as
                                | '소장 가능'
                                | '판매 문의'
                                | '에디션 가능',
                            };
                            setArtistForm({ ...artistForm, works: updated });
                          }}
                          className="form-input"
                        >
                          <option value="소장 가능">소장 가능</option>
                          <option value="판매 문의">판매 문의</option>
                          <option value="에디션 가능">에디션 가능</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">판매가 또는 소장 문의 표기 *</label>
                        <input
                          required
                          value={w.priceLabel}
                          onChange={(e) => {
                            const updated = [...artistForm.works];
                            updated[idx] = { ...updated[idx], priceLabel: e.target.value };
                            setArtistForm({ ...artistForm, works: updated });
                          }}
                          placeholder="예: 1,500,000 KRW (소장 가능) / 판매가 문의"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">대표작품 이미지 URL *</label>
                      <input
                        required
                        value={w.imageUrl}
                        onChange={(e) => {
                          const updated = [...artistForm.works];
                          updated[idx] = { ...updated[idx], imageUrl: e.target.value };
                          setArtistForm({ ...artistForm, works: updated });
                        }}
                        placeholder="https://..."
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="artist-form-submit-row">
                <button type="submit" className="artist-submit-primary-btn">
                  <span>
                    {artistForm.mode === 'update'
                      ? '프로필 · 대표작 수정 사항 즉시 반영 및 검수 요청 →'
                      : '부산 작가 아카이브 등재 신청 (즉시 미리보기 반영) →'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
