import React, { useState, useMemo } from 'react';
import {
  ARTISTS,
  GOODS_MANUALS,
  LOCAL_MAKERS,
  COLLAB_SOUVENIRS,
  INITIAL_COLLAB_POSTS,
  GALLERIES,
  Artist,
  GoodsManual,
  GallerySpace,
  CollabPost,
} from './data/mockData';
import { ArrowUpRight, Plus, X, Search } from 'lucide-react';

type ActiveSection = 'overview' | 'artists' | 'galleries' | 'collab';
type GallerySpecFilter = 'all' | 'rental' | 'sales' | 'artshop' | 'zero_commission';

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

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');

  // Artist filters
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('전체');
  const [artistQuery, setArtistQuery] = useState<string>('');
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null);

  // Goods Manual & Estimator state
  const [selectedManualId, setSelectedManualId] = useState<string>(GOODS_MANUALS[0].id);
  const [makerCategoryFilter, setMakerCategoryFilter] = useState<string>('전체');
  const [makerQuery, setMakerQuery] = useState<string>('');
  const [calcCategory, setCalcCategory] = useState<'riso' | 'acrylic' | 'fabric' | 'package'>('riso');
  const [calcQty, setCalcQty] = useState<number>(50);
  const [calcFinish, setCalcFinish] = useState<boolean>(true);

  // Gallery filters & selection
  const [selectedZone, setSelectedZone] = useState<string>('전체');
  const [gallerySpecFilter, setGallerySpecFilter] = useState<GallerySpecFilter>('all');
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
  const disciplines = ['전체', '회화·미술', '도자·조형', '프린트·드로잉', '사진', '공예·오브제'];
  const filteredArtists = useMemo(() => {
    return ARTISTS.filter((artist) => {
      const matchDiscipline =
        selectedDiscipline === '전체' || artist.discipline === selectedDiscipline;
      const q = artistQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        artist.name.toLowerCase().includes(q) ||
        artist.nameEn.toLowerCase().includes(q) ||
        artist.district.toLowerCase().includes(q) ||
        artist.bio.toLowerCase().includes(q);
      return matchDiscipline && matchQuery;
    });
  }, [selectedDiscipline, artistQuery]);

  const displayedArtists = filteredArtists;

  // Selected Goods Manual
  const currentManual: GoodsManual = useMemo(() => {
    return GOODS_MANUALS.find((m) => m.id === selectedManualId) || GOODS_MANUALS[0];
  }, [selectedManualId]);

  // Small-Batch Estimator calculation
  const estimation = useMemo(() => {
    const baseConfig = {
      riso: {
        name: '리소그라프 별색 엽서북 (10매입)',
        baseUnit: 5800,
        finishAdd: 900,
        finishName: '코발트 청박 띠지 마감',
        partner: '스튜디오 소소나 / 케이제이프린트',
      },
      acrylic: {
        name: '20T 고투명 캐스팅 아크릴 문진 (80×80mm)',
        baseUnit: 12500,
        finishAdd: 1500,
        finishName: '4면 경면 폴리싱 + 부분 백판',
        partner: '위드메이킹 / 서면레이저공방',
      },
      fabric: {
        name: '워싱 광목 20수 패브릭 포스터 (50×70cm)',
        baseUnit: 9800,
        finishAdd: 1200,
        finishName: '사방 해리 봉제 + 직조 라벨',
        partner: '수엘비(SuLB) / 커스텀오버',
      },
      package: {
        name: '무목형 디지털 커팅 오브제 패키지 & 슬리브',
        baseUnit: 1650,
        finishAdd: 450,
        finishName: '비오톱 160g 슬리브 + 청박',
        partner: '더상자 부산공장 / (주)현진패키지',
      },
    }[calcCategory];

    const discountFactor = calcQty >= 200 ? 0.76 : calcQty >= 100 ? 0.85 : calcQty >= 50 ? 0.94 : 1.0;
    const unitPrice =
      Math.round(((baseConfig.baseUnit + (calcFinish ? baseConfig.finishAdd : 0)) * discountFactor) / 10) * 10;
    const total = unitPrice * calcQty;

    return {
      ...baseConfig,
      unitPrice,
      total,
    };
  }, [calcCategory, calcQty, calcFinish]);

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
        <div>{ARTISTS.length} BUSAN ARTISTS ARCHIVED</div>
      </div>

      {/* Sticky Editorial Masthead */}
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
            className={`nav-item ${activeSection === 'artists' ? 'active' : ''}`}
            onClick={() => setActiveSection('artists')}
          >
            <span className="nav-item-label">부산 작가 · 작품</span>
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
          <button className="saved-trigger" onClick={() => setIsArchiveOpen(true)}>
            <span>ARCHIVE</span>
            <span className="saved-count">{savedIds.length}</span>
          </button>
          <button className="submit-trigger" onClick={() => setIsWriteModalOpen(true)}>
            <Plus size={14} />
            <span>공고 등록</span>
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
          SECTION 01: ARTISTS & ARTWORKS (3 REPRESENTATIVE WORKS PER ARTIST)
         ===================================================================== */}
      {activeSection === 'artists' && (
        <section>
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>부산 활동 작가 · 대표작품 아카이브</h2>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="filter-strip">
            <div className="filter-tabs">
              {disciplines.map((disc) => {
                const count =
                  disc === '전체'
                    ? ARTISTS.length
                    : ARTISTS.filter((a) => a.discipline === disc).length;
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
                placeholder="작가명, 장르, 이력 검색"
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

          {/* Artist Editorial Grid — Each card shows 3 Representative Artworks as Images */}
          <div className="artist-editorial-grid">
            {displayedArtists.map((artist) => {
              const isSaved = savedIds.includes(artist.id);
              const w0 = artist.artworks[0]?.imageUrl || artist.featuredWorkUrl;
              const w1 = artist.artworks[1]?.imageUrl || w0;
              const w2 = artist.artworks[2]?.imageUrl || w0;

              return (
                <article
                  key={artist.id}
                  className="artist-column"
                  onClick={() => setActiveArtist(artist)}
                >
                  <div className="artist-col-header">
                    <span>{artist.indexNo}</span>
                    <span className="artist-status-tag">{artist.discipline}</span>
                  </div>

                  {/* 3 Representative Artworks Image Triptych */}
                  <div className="artist-works-triptych">
                    <div className="triptych-main">
                      <img src={w0} alt={artist.name} loading="lazy" />
                    </div>
                    <div className="triptych-sub-col">
                      <div className="triptych-sub-item">
                        <img src={w1} alt={artist.name} loading="lazy" />
                      </div>
                      <div className="triptych-sub-item">
                        <img src={w2} alt={artist.name} loading="lazy" />
                      </div>
                    </div>
                  </div>

                  <div className="artist-body">
                    <div className="artist-title-row">
                      <h3 className="artist-name">{artist.name}</h3>
                      <span className="artist-name-en">{artist.nameEn}</span>
                    </div>

                    <p className="artist-statement">{artist.statement}</p>
                  </div>

                  <div className="artist-col-footer">
                    <span>{artist.instagram}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={(e) => toggleSave(artist.id, e)}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          textDecoration: 'underline',
                        }}
                      >
                        {isSaved ? 'SAVED' : '+ ARCHIVE'}
                      </button>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 03: COLLAB SOUVENIR SHOWCASE (1단) + LOCAL PRODUCTION MANUAL & MAKERS (2단)
         ===================================================================== */}
      {activeSection === 'collab' && (
        <section>
          {/* 01. OPEN CALLS & COLLABORATION BOARD */}
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>부산 미술 공고 · 작가 협업 라운지</h2>
            </div>
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

          {/* 1단: [콜라보 기념품 쇼케이스/샵] (floreur × 부산 활동 작가 콜라보 에디션) */}
          <div className="section-bar" style={{ borderTop: '1px solid var(--line-strong)' }}>
            <div className="section-bar-title">
              <h2>콜라보 기념품 쇼케이스 · 에디션 샵</h2>
            </div>
            <a
              href="mailto:floreur88@gmail.com?subject=[PARANG] 부산 관광기념품 콜라보 · B2B 제작 문의"
              className="section-bar-action"
            >
              <span>콜라보 · 납품 제안</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="souvenir-showcase-grid">
            {COLLAB_SOUVENIRS.map((item) => (
              <article key={item.id} className="souvenir-card">
                <div className="souvenir-card-top">
                  <span className="souvenir-code">{item.code}</span>
                  <span
                    className={`souvenir-status-badge ${
                      item.status === 'COLLAB OPEN' ? 'is-open' : ''
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="souvenir-thumb">
                  <img src={item.imageUrl} alt={item.title} loading="lazy" />
                  <span className="souvenir-district-chip">{item.districtTheme}</span>
                </div>
                <div className="souvenir-body">
                  <h3 className="souvenir-title">{item.title}</h3>
                  <p className="souvenir-subtitle">{item.subtitle}</p>
                  <div className="souvenir-spec-list">
                    <div className="souvenir-spec-row">
                      <span>제작 사양</span>
                      <strong>{item.mediumSpec}</strong>
                    </div>
                    <div className="souvenir-spec-row">
                      <span>부산 공정처</span>
                      <strong>{item.partnerMaker}</strong>
                    </div>
                    <div className="souvenir-spec-row">
                      <span>단가 · 규모</span>
                      <strong>{item.moqAndPrice}</strong>
                    </div>
                    <div className="souvenir-spec-row">
                      <span>수익 배분</span>
                      <strong>{item.royaltyNote}</strong>
                    </div>
                  </div>
                </div>
                <div className="souvenir-footer">
                  <a
                    href={`mailto:floreur88@gmail.com?subject=${encodeURIComponent(
                      `[PARANG 기념품 콜라보/발주 문의] ${item.title}`
                    )}`}
                    className="souvenir-inquiry-btn"
                  >
                    <span>작가 콜라보 참여 · B2B 발주 문의</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* 2단: [로컬 제작 매뉴얼 · 공정처] */}
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>로컬 제작 매뉴얼 · 부산 공정처 디렉토리</h2>
            </div>
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
                      <div className="goods-rail-moq">
                        MOQ {manual.moq} · {manual.leadTime}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Small-Batch Cost Estimator */}
              <div className="cost-estimator-box">
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    marginBottom: '16px',
                  }}
                >
                  소량 제작 단가 계산기
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    {(
                      [
                        ['riso', '별색 엽서북'],
                        ['acrylic', '20T 아크릴 문진'],
                        ['fabric', '광목 패브릭포스터'],
                        ['package', '무목형 패키지'],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setCalcCategory(key)}
                        style={{
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 500,
                          border: '1px solid var(--line-strong)',
                          background: calcCategory === key ? 'var(--marine)' : 'var(--bg)',
                          color: calcCategory === key ? '#ffffff' : 'var(--ink)',
                          textAlign: 'left',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {[30, 50, 100, 200].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setCalcQty(qty)}
                        style={{
                          padding: '7px 0',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          border: '1px solid var(--line-strong)',
                          background: calcQty === qty ? 'var(--ink)' : 'var(--bg)',
                          color: calcQty === qty ? '#ffffff' : 'var(--ink)',
                        }}
                      >
                        {qty}EA
                      </button>
                    ))}
                  </div>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={calcFinish}
                      onChange={(e) => setCalcFinish(e.target.checked)}
                    />
                    <span>{estimation.finishName}</span>
                  </label>

                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid var(--line-strong)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ color: 'var(--ink-muted)' }}>UNIT</span>
                      <span style={{ fontWeight: 600 }}>
                        {estimation.unitPrice.toLocaleString()} KRW
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                      }}
                    >
                      <span style={{ color: 'var(--ink-muted)' }}>TOTAL</span>
                      <span style={{ color: 'var(--marine)', fontWeight: 700 }}>
                        {estimation.total.toLocaleString()} KRW
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--ink-muted)',
                        marginTop: '2px',
                      }}
                    >
                      {estimation.partner}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Detail Stage */}
            <div className="goods-detail-stage">
              <div className="goods-stage-header">
                <div className="goods-stage-title-box">
                  <div>
                    <div className="goods-stage-code">
                      {currentManual.code} // {currentManual.category}
                    </div>
                    <h3 className="goods-stage-title" style={{ marginTop: '10px' }}>
                      {currentManual.title}
                    </h3>
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

                <div className="goods-stage-photo">
                  <img src={currentManual.heroImage} alt={currentManual.title} />
                </div>
              </div>

              <div className="goods-spec-bar">
                <div className="goods-spec-cell">
                  <div className="goods-spec-label">MOQ</div>
                  <div className="goods-spec-val">{currentManual.moq}</div>
                </div>
                <div className="goods-spec-cell">
                  <div className="goods-spec-label">UNIT COST</div>
                  <div className="goods-spec-val">{currentManual.estimatedUnitCost}</div>
                </div>
                <div className="goods-spec-cell">
                  <div className="goods-spec-label">LEAD TIME</div>
                  <div className="goods-spec-val">{currentManual.leadTime}</div>
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
              <strong>부산 로컬 인쇄소 · 소량 오브제 공정처 디렉토리</strong>
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
                  <th style={{ width: '120px' }}>CODE / 분류</th>
                  <th style={{ width: '240px' }}>업체명 / 부산 소재지 · 연락처</th>
                  <th style={{ width: '280px' }}>주요 공정 · 보유 장비</th>
                  <th style={{ width: '165px' }}>최소수량(MOQ) / 납기</th>
                  <th>제작 가이드 & 웹사이트</th>
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
                    <td className="maker-cell-moq">
                      <div className="maker-moq-val">
                        <span className="mobile-only-label">MOQ</span> {maker.moq}
                      </div>
                      <div className="maker-turnaround-val">
                        <span className="mobile-only-label">납기</span> {maker.turnaround}
                      </div>
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
          SECTION 02: BUSAN GALLERIES & EXHIBITION SPACES (WITH RENTAL/SALES SPECS)
         ===================================================================== */}
      {activeSection === 'galleries' && (
        <section>
          <div className="section-bar">
            <div className="section-bar-title">
              <h2>부산 갤러리 · 대관 · 작품판매 인덱스</h2>
            </div>
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

          {/* 2단 실무 필터: 대관 가능 여부 · 작품 판매 · 아트샵 입점 · 수수료 조건 */}
          <div className="gallery-spec-filter-bar">
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
                        <div className="gallery-mini-tags">
                          <span
                            className={`gallery-mini-tag ${
                              rs.rentalAvailable ? 'is-rental' : 'is-curated'
                            }`}
                          >
                            {rs.rentalAvailable ? '대관가능' : '기획·공모'}
                          </span>
                          <span className="gallery-mini-tag is-pyeong">{rs.pyeong.split('(')[0].trim()}</span>
                          {rs.artworkSales && (
                            <span className="gallery-mini-tag is-sales">작품판매</span>
                          )}
                          {rs.artShopAvailable && (
                            <span className="gallery-mini-tag is-shop">아트샵</span>
                          )}
                        </div>
                        <ArrowUpRight size={14} className="gallery-arrow-icon" />
                      </div>
                    </div>
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
          DRAWER 1: ARTIST PROFILE & 3 REPRESENTATIVE WORKS (IMAGES ONLY)
         ===================================================================== */}
      {activeArtist && (
        <div className="drawer-backdrop" onClick={() => setActiveArtist(null)}>
          <div className="editorial-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top-bar">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--marine)' }}>
                {activeArtist.indexNo}
              </div>
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

            <div className="drawer-body-section" style={{ borderBottom: '1px solid var(--line)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                }}
              >
                {activeArtist.discipline}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '8px',
                }}
              >
                <h2 className="drawer-artist-title">
                  {activeArtist.name}{' '}
                  <span className="drawer-artist-title-en">
                    {activeArtist.nameEn}
                  </span>
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {activeArtist.instagramUrl && (
                    <a
                      href={activeArtist.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '8px 14px',
                        border: '1px solid var(--line-strong)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        background: 'var(--bg-pure)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>{activeArtist.instagram}</span>
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  <a
                    href={activeArtist.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '8px 14px',
                      border: '1px solid var(--line-strong)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      background: 'var(--ink)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>PORTFOLIO</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'var(--ink)',
                  marginTop: '20px',
                  whiteSpace: 'pre-line',
                }}
              >
                {activeArtist.bio}
              </p>

              <div style={{ marginTop: '18px' }}>
                <a
                  href={`mailto:floreur88@gmail.com?subject=${encodeURIComponent(
                    `[PARANG 작가 섭외/콜라보 문의] ${activeArtist.name} 작가`
                  )}`}
                  className="drawer-agency-cta"
                >
                  <span>이 작가에게 전시 · 관광기념품 콜라보 의뢰하기 (floreur 에이전시 연결)</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* 3 Representative Artworks — Images Only */}
            <div className="drawer-body-section">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--marine)',
                  letterSpacing: '0.06em',
                  marginBottom: '16px',
                }}
              >
                REPRESENTATIVE WORKS (03)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeArtist.artworks.slice(0, 3).map((work) => (
                  <div
                    key={work.id}
                    style={{
                      border: '1px solid var(--line-strong)',
                      background: 'var(--bg-pure)',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={work.imageUrl}
                      alt={activeArtist.name}
                      style={{ width: '100%', maxHeight: '460px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
                          setActiveSection('collab');
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
    </div>
  );
}
export default App;
