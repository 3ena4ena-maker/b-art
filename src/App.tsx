import React, { useState, useMemo } from 'react';
import {
  ARTISTS,
  GOODS_MANUALS,
  LOCAL_MAKERS,
  INITIAL_COLLAB_POSTS,
  GALLERIES,
  Artist,
  GoodsManual,
  GallerySpace,
  CollabPost,
} from './data/mockData';
import { ArrowUpRight, Plus, X, Search } from 'lucide-react';

type ActiveSection = 'overview' | 'artists' | 'goods' | 'galleries';

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
  const [activeGallery, setActiveGallery] = useState<GallerySpace | null>(null);

  // Saved / Archived items
  const [savedIds, setSavedIds] = useState<string[]>([ARTISTS[0]?.id || '', 'manual-01', 'gal-01']);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);

  // Collab posts & Modal
  const [collabPosts, setCollabPosts] = useState<CollabPost[]>(INITIAL_COLLAB_POSTS);
  const [collabFilter, setCollabFilter] = useState<string>('전체');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [newPost, setNewPost] = useState({
    type: '공동발주' as '공동발주' | '굿즈협업' | '마켓부스',
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

  const displayedArtists = useMemo(() => {
    if (activeSection === 'overview' && selectedDiscipline === '전체' && !artistQuery) {
      return filteredArtists.slice(0, 12);
    }
    return filteredArtists;
  }, [activeSection, filteredArtists, selectedDiscipline, artistQuery]);

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

  // Filtered Galleries by Busan District (구·군)
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
  const filteredGalleries = useMemo(() => {
    if (selectedZone === '전체') return GALLERIES;
    return GALLERIES.filter((g) => g.zone === selectedZone);
  }, [selectedZone]);

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
            <span className="nav-item-num">00 / EDITION</span>
            <span className="nav-item-label">통합 매거진 뷰</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'artists' ? 'active' : ''}`}
            onClick={() => setActiveSection('artists')}
          >
            <span className="nav-item-num">01 / ARTISTS ({ARTISTS.length})</span>
            <span className="nav-item-label">부산 작가 · 작품</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'goods' ? 'active' : ''}`}
            onClick={() => setActiveSection('goods')}
          >
            <span className="nav-item-num">02 / GOODS LAB</span>
            <span className="nav-item-label">굿즈 제작 · 공정처</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'galleries' ? 'active' : ''}`}
            onClick={() => setActiveSection('galleries')}
          >
            <span className="nav-item-num">03 / GALLERIES</span>
            <span className="nav-item-label">부산 갤러리</span>
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
          HERO + PAGEFLOWS-STYLE FLOWING ARTWORKS WALL (Overview)
         ===================================================================== */}
      {activeSection === 'overview' && (
        <section className="hero-flow-section">
          <div className="hero-top-header">
            <div>
              <div className="cover-kicker">
                <span className="cover-kicker-line" />
                <span>BUSAN CONTEMPORARY ART & OBJECT INDEX</span>
              </div>
              <h1 className="cover-headline">
                부산의 작업실과 인쇄골목, 해안의 전시장을 잇는{' '}
                <span className="cover-headline-serif">Blue Wave</span> 아카이브.
              </h1>
            </div>

            <div className="hero-cta-group">
              <button className="hero-btn-primary" onClick={() => setActiveSection('artists')}>
                EXPLORE {ARTISTS.length} ARTISTS →
              </button>
              <button className="hero-btn-secondary" onClick={() => setActiveSection('goods')}>
                GOODS MANUAL
              </button>
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
      {(activeSection === 'overview' || activeSection === 'artists') && (
        <section>
          <div className="section-bar">
            <div className="section-bar-index">
              <span>01</span>
              <span>—</span>
              <span>ARTISTS</span>
            </div>
            <div className="section-bar-title">
              <h2>부산 활동 작가 · 대표작품 아카이브</h2>
              <span>{filteredArtists.length} Active Busan Artists</span>
            </div>
            {activeSection === 'overview' ? (
              <button className="section-bar-action" onClick={() => setActiveSection('artists')}>
                <span>전체 {ARTISTS.length}명 보기</span>
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <div className="section-bar-action" style={{ pointerEvents: 'none' }}>
                <span>{filteredArtists.length} ARTISTS</span>
              </div>
            )}
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

          {activeSection === 'overview' && filteredArtists.length > 12 && (
            <div
              style={{
                padding: '20px 28px',
                borderBottom: '1px solid var(--line-strong)',
                display: 'flex',
                justifyContent: 'center',
                background: 'var(--bg-pure)',
              }}
            >
              <button
                onClick={() => setActiveSection('artists')}
                style={{
                  padding: '12px 28px',
                  background: 'var(--ink)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                }}
              >
                VIEW ALL {filteredArtists.length} BUSAN ARTISTS →
              </button>
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          SECTION 02: GOODS PRODUCTION MANUAL & LOCAL MAKERS LAB
         ===================================================================== */}
      {(activeSection === 'overview' || activeSection === 'goods') && (
        <section>
          <div className="section-bar">
            <div className="section-bar-index">
              <span>02</span>
              <span>—</span>
              <span>GOODS LAB</span>
            </div>
            <div className="section-bar-title">
              <h2>부산 굿즈 제작 매뉴얼 & 로컬 공정처</h2>
              <span>Production Specs & Partners</span>
            </div>
            {activeSection === 'overview' ? (
              <button className="section-bar-action" onClick={() => setActiveSection('goods')}>
                <span>전체 보기</span>
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <div className="section-bar-action" style={{ pointerEvents: 'none' }}>
                <span>
                  0{GOODS_MANUALS.length} GUIDES · {LOCAL_MAKERS.length} PARTNERS
                </span>
              </div>
            )}
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--marine)',
                    letterSpacing: '0.06em',
                    marginBottom: '6px',
                  }}
                >
                  COST ESTIMATOR
                </div>
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
                      SPECIFICATIONS
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
                      PRE-PRESS CHECKLIST
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
              <span className="makers-vendor-count">
                {LOCAL_MAKERS.length} VERIFIED VENDORS IN BUSAN
              </span>
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
          SECTION 03: BUSAN GALLERIES & EXHIBITION SPACES
         ===================================================================== */}
      {(activeSection === 'overview' || activeSection === 'galleries') && (
        <section>
          <div className="section-bar">
            <div className="section-bar-index">
              <span>03</span>
              <span>—</span>
              <span>GALLERIES</span>
            </div>
            <div className="section-bar-title">
              <h2>부산 갤러리 · 전시공간</h2>
              <span>Spaces & Exhibitions</span>
            </div>
            {activeSection === 'overview' ? (
              <button className="section-bar-action" onClick={() => setActiveSection('galleries')}>
                <span>전체 보기</span>
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <div className="section-bar-action" style={{ pointerEvents: 'none' }}>
                <span>{GALLERIES.length} SPACES · 13 DISTRICTS</span>
              </div>
            )}
          </div>

          <div className="filter-strip">
            <div className="filter-tabs gallery-zone-tabs">
              {zones.map((z) => (
                <button
                  key={z}
                  className={`filter-tab ${selectedZone === z ? 'active' : ''}`}
                  onClick={() => setSelectedZone(z)}
                >
                  <span>{z}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-list-panel">
            {filteredGalleries.map((gal) => (
              <article
                key={gal.id}
                className={`gallery-row-item ${
                  activeGallery?.id === gal.id ? 'selected' : ''
                }`}
                onClick={() => setActiveGallery(gal)}
              >
                <div className="gallery-row-content">
                  <div>
                    <div className="gallery-row-meta">
                      <span className="gallery-zone-badge">
                        {gal.indexNo} · {gal.zone} · {gal.spaceType}
                      </span>
                      <span className="gallery-hours-text">{gal.hours}</span>
                    </div>

                    <h3 className="gallery-row-title">{gal.name}</h3>

                    <p className="gallery-row-desc">{gal.description}</p>
                  </div>

                  <div className="gallery-row-exhibition">
                    <div className="gallery-exhibition-info">
                      <div className="gallery-exhibition-kicker">
                        ON VIEW ({gal.currentExhibition.period})
                      </div>
                      <div className="gallery-exhibition-title">
                        {gal.currentExhibition.title} — {gal.currentExhibition.artists}
                      </div>
                    </div>

                    <ArrowUpRight size={14} className="gallery-arrow-icon" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 04: ARTIST COLLAB & JOINT PRODUCTION DISPATCH BOARD
         ===================================================================== */}
      {(activeSection === 'overview' || activeSection === 'goods') && (
        <section>
        <div className="section-bar">
          <div className="section-bar-index">
            <span>04</span>
            <span>—</span>
            <span>DISPATCH</span>
          </div>
          <div className="section-bar-title">
            <h2>공동발주 · 굿즈 협업 보드</h2>
            <span>Open Calls</span>
          </div>
          <button className="section-bar-action" onClick={() => setIsWriteModalOpen(true)}>
            <Plus size={14} />
            <span>공고 작성</span>
          </button>
        </div>

        <div className="filter-strip">
          <div className="filter-tabs">
            {['전체', '공동발주', '굿즈협업', '마켓부스'].map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${collabFilter === tab ? 'active' : ''}`}
                onClick={() => setCollabFilter(tab)}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="makers-table-wrap">
          <table className="editorial-table dispatch-table">
            <thead>
              <tr>
                <th style={{ width: '110px' }}>구분</th>
                <th>내용</th>
                <th style={{ width: '190px' }}>작가</th>
                <th style={{ width: '170px' }}>조건 / 마감</th>
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
                          post.type === '공동발주' ? 'var(--marine)' : 'var(--ink)',
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
                    <div style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.55 }}>
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
                  <td className="dispatch-cell-meta" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <div>{post.targetCount}</div>
                    <div style={{ color: 'var(--marine)', marginTop: '4px' }}>
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
            © 2026 PARANG BUSAN ART & OBJECT INDEX.
          </div>
        </div>

        <div className="footer-col" style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff' }}>
            dispatch@parang-busan.kr
          </div>
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
                {activeGallery.indexNo} // SPACE SPEC
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
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--marine)',
                }}
              >
                {activeGallery.zone} · {activeGallery.spaceType}
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
                  SPECIFICATIONS
                </div>
                <div className="spec-table-list">
                  <div className="spec-table-row">
                    <span className="spec-table-key">운영 시간</span>
                    <span className="spec-table-value">
                      {activeGallery.hours} ({activeGallery.closedDays})
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">면적</span>
                    <span className="spec-table-value">{activeGallery.spaceSpecs.area}</span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">층고</span>
                    <span className="spec-table-value">
                      {activeGallery.spaceSpecs.ceilingHeight}
                    </span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">벽면 · 조명</span>
                    <span className="spec-table-value">{activeGallery.spaceSpecs.wallType}</span>
                  </div>
                  <div className="spec-table-row">
                    <span className="spec-table-key">대관 · 공모</span>
                    <span className="spec-table-value">
                      {activeGallery.spaceSpecs.submissionInfo}
                    </span>
                  </div>
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
                          setActiveSection('goods');
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
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['공동발주', '굿즈협업', '마켓부스'] as const).map((t) => (
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
