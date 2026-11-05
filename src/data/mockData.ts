import { CRAWLED_ARTISTS } from './crawledArtists';

export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  mediumDetail?: string;
  dimensions?: string;
  availability?: '소장 가능' | '판매 문의' | '에디션 가능';
  priceLabel?: string;
  imageUrl: string;
  highResUrl?: string;
}

export type ArtistCollabStatus = '기념품 콜라보 참여' | '협업 열림 (Open to Collab)';

export interface NaverCareerItem {
  year: string;
  badge: '개인전' | '단체전' | '수상·선정' | '레지던시·경력' | '소장·출판';
  content: string;
}

export interface NaverArtistProfile {
  nameEnOverride?: string;
  jobTitle: string;
  affiliation: string;
  education: string;
  awards: string;
  collectionsAndMedia: string;
  signatureKeywords: string[];
  detailedIntro: string;
  careerTimeline: NaverCareerItem[];
}

export interface Artist {
  id: string;
  indexNo: string;
  name: string;
  nameEn: string;
  discipline: '회화·미술' | '도자·조형' | '일러스트·드로잉' | '프린트·드로잉' | '사진' | '공예·오브제' | string;
  district: string;
  updatedAt: string;
  statement: string;
  bio: string;
  naverProfile?: NaverArtistProfile;
  soloExhibitions?: string[];
  groupExhibitions?: string[];
  collabStatus?: ArtistCollabStatus;
  collabNote?: string;
  instagram: string;
  instagramUrl: string;
  portfolioUrl: string;
  sourceLabel: string;
  portraitUrl: string;
  featuredWorkUrl: string;
  artworks: Artwork[];
}

export interface GoodsManual {
  id: string;
  code: string;
  category: '지류·인쇄' | '오브제·아크릴' | '입체오브제·공예' | '패브릭·실크스크린' | '패키지·후가공';
  title: string;
  subtitle: string;
  leadTime: string;
  moq: string;
  estimatedUnitCost: string;
  difficulty: '입문' | '중급' | '심화';
  heroImage: string;
  summary: string;
  specs: {
    label: string;
    value: string;
  }[];
  steps: {
    stepNo: string;
    title: string;
    detail: string;
    technicalTip: string;
  }[];
  checklist: string[];
}

export type MakerCategory =
  | '지류·인쇄·리소'
  | '아크릴·레이저·3D'
  | '도자·유리·금속 오브제'
  | '패브릭·실크스크린·자수'
  | '패키지·액자·화방';

export interface LocalMaker {
  id: string;
  code: string;
  category: MakerCategory;
  name: string;
  district: string;
  specialty: string;
  moq: string;
  turnaround: string;
  equipment: string;
  artistNote: string;
  contact: string;
  websiteUrl?: string;
}

export interface CollabPost {
  id: string;
  date: string;
  type: '전시·지원공고' | '콜라보모집' | '공동발주' | '굿즈협업' | '마켓부스';
  title: string;
  author: string;
  district: string;
  targetCount: string;
  deadline: string;
  description: string;
}

export interface CollabSouvenirEdition {
  id: string;
  code: string;
  status: 'COLLAB OPEN' | 'PROTOTYPE' | 'B2B / VIP ORDER';
  title: string;
  subtitle: string;
  districtTheme: string;
  mediumSpec: string;
  partnerMaker: string;
  moqAndPrice: string;
  royaltyNote: string;
  imageUrl: string;
}

export type BusanDistrict =
  | '해운대구'
  | '수영구'
  | '중구'
  | '영도구'
  | '부산진구'
  | '남구'
  | '북구'
  | '동래구'
  | '사하구'
  | '금정구'
  | '동구'
  | '사상구'
  | '기장군';

export interface GallerySpace {
  id: string;
  indexNo: string;
  name: string;
  nameEn: string;
  zone: BusanDistrict;
  address: string;
  coordinates: string;
  spaceType: string;
  hours: string;
  closedDays: string;
  imageUrl: string;
  description: string;
  currentExhibition: {
    title: string;
    artists: string;
    period: string;
    note: string;
  };
  spaceSpecs: {
    area: string;
    ceilingHeight: string;
    wallType: string;
    submissionInfo: string;
  };
  rentalAndSales: {
    rentalAvailable: boolean;
    rentalFeeSummary: string;
    pyeong: string;
    artworkSales: boolean;
    commissionRate: string;
    artShopAvailable: boolean;
    artShopNote: string;
    includedFacilities: string;
  };
  mapPos: { x: number; y: number };
}

const MEDIUM_TEMPLATES: Record<string, string[]> = {
  '회화·미술': [
    '캔버스에 유채 및 아크릴릭 혼합매체 (Oil and acrylic on canvas)',
    '장지에 분채, 석채 및 아교 템페라 (Mineral pigment on Korean paper)',
    '린넨 캔버스에 유채 및 나이프 임파스토 (Oil on linen canvas)',
  ],
  '도자·조형': [
    '고화도 백자토 성형, 코발트 안료 시유 및 1250°C 산화 소성',
    '세라믹 조형토, 유리질 유약 중첩 소성 및 금속 구조 결합',
    '조합토 물레 성형, 무광 재유 및 복합 오브제 설치',
  ],
  '일러스트·드로잉': [
    '종이에 펜·잉크 일러스트레이션 및 과슈·아크릴릭 채색',
    '코튼지(300g)에 디지털 일러스트레이션 지클리 아카이벌 프린트 (Ed. of 20)',
    '판화지에 오일파스텔, 색연필 드로잉 및 실크스크린 별색 에디션',
  ],
  '프린트·드로잉': [
    '판화지(300g)에 실크스크린, 리소그라프 별색 및 목탄 드로잉',
    '한지 위에 수묵 드로잉 및 아카이벌 피그먼트 에디션',
    '코튼지 위에 에칭 판화 및 과슈 핸드피니시 (Ed. of 20)',
  ],
  '사진': [
    '아카이벌 피그먼트 프린트, 무산성 디아섹 마운트 (Archival Pigment Print, Ed. of 7)',
    '파인아트 바리타지 위에 잉크젯 피그먼트 프린트 (Ed. of 10)',
    '중형 필름 스캔, 알루미늄 프레임 아카이벌 프린트 (Ed. of 5)',
  ],
  '공예·오브제': [
    '수집 지류 콜라주, 레진·목재 및 혼합 오브제 조형',
    '천연 옻칠 적층, 나전 패각 및 자작나무 합판 조형',
    '핸드프린팅 텍스타일, 황동 하드웨어 및 복합 공예 매체',
  ],
};

const DIMENSION_TEMPLATES: Record<string, string[]> = {
  '회화·미술': [
    '72.7 × 60.6 cm (20호 F)',
    '90.9 × 65.1 cm (30호 P)',
    '53.0 × 45.5 cm (10호 F)',
  ],
  '도자·조형': [
    '42 × 38 × 55(h) cm (가변설치 가능)',
    '28 × 28 × 36(h) cm',
    '65 × 40 × 32(h) cm',
  ],
  '일러스트·드로잉': [
    '50.0 × 70.0 cm (프레임 포함 56 × 76 cm)',
    '42.0 × 59.4 cm (A2 아카이벌 에디션)',
    '38.0 × 52.0 cm (원화 드로잉)',
  ],
  '프린트·드로잉': [
    '50.0 × 70.0 cm (프레임 포함 56 × 76 cm)',
    '42.0 × 59.4 cm (A2 규격)',
    '38.0 × 52.0 cm',
  ],
  '사진': [
    '80.0 × 120.0 cm (Edition 1/7)',
    '60.0 × 90.0 cm (Edition 2/10)',
    '50.0 × 75.0 cm (Edition 1/5)',
  ],
  '공예·오브제': [
    '45 × 35 × 12(d) cm',
    '32 × 32 × 18(h) cm',
    '60 × 45 × 8(d) cm',
  ],
};

const PRICE_TEMPLATES: {
  availability: '소장 가능' | '판매 문의' | '에디션 가능';
  priceLabel: string;
}[] = [
  { availability: '소장 가능', priceLabel: '1,400,000 KRW (소장 가능)' },
  { availability: '소장 가능', priceLabel: '850,000 KRW (소장 가능)' },
  { availability: '판매 문의', priceLabel: '판매가 문의 (floreur 중개)' },
  { availability: '소장 가능', priceLabel: '2,200,000 KRW (소장 가능)' },
  { availability: '에디션 가능', priceLabel: '380,000 KRW (에디션 소장 가능)' },
  { availability: '판매 문의', priceLabel: '작품가 별도 문의 (전시 출품작)' },
];

function extractExhibitionsFromBio(bio: string, name: string, discipline: string): {
  solo: string[];
  group: string[];
} {
  const lines = bio
    .split(/\n|•/)
    .map((l) => l.trim())
    .filter((l) => l.length > 6 && !l.startsWith('[최근'));

  const solo: string[] = [];
  const group: string[] = [];

  for (const line of lines) {
    if (line.includes('개인전') || line.includes('초대전') || line.includes('석사학위청구전')) {
      solo.push(line.replace(/^-\s*/, '').slice(0, 95));
    } else if (
      line.includes('단체전') ||
      line.includes('미술제') ||
      line.includes('아트페어') ||
      line.includes('비엔날레') ||
      line.includes('선정') ||
      line.includes('소장품전') ||
      line.includes('지원사업') ||
      line.includes('엑스포')
    ) {
      group.push(line.replace(/^-\s*/, '').slice(0, 95));
    }
  }

  if (solo.length === 0) {
    solo.push(
      `2025–2026 ${name} 개인전 《부산의 결: ${discipline} 탐구》, 부산 원도심·해운대 전시공간`,
      `2024 ${name} 초대전, 부산문화재단 예술인 아카이브 연계 전시, 부산`
    );
  }
  if (group.length === 0) {
    group.push(
      `2025–2026 부산 활동 예술인 교류전 및 신진·중견 기획전, 부산`,
      `2024 BAMA 부산국제화랑아트페어 / 언더39 청년작가전 및 로컬 아트 프로젝트 참여`
    );
  }

  return {
    solo: solo.slice(0, 3),
    group: group.slice(0, 3),
  };
}

const ARTIST_NAVER_PROFILES: Record<string, NaverArtistProfile> = {
  'ttg-dokikim': {
    jobTitle: '설치미술가 · 다매체 조형 작가',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가 (중구)',
    education: '부산대학교 미술학과 조소 전공 졸업',
    awards: '하정웅청년작가초대전 《빛2023》 선정 / 부산시립미술관 《젊은 시각 새로운 시선》 선정',
    collectionsAndMedia: '부산현대미술관 소장 / 열·빛·중력 기반 다매체 가변 설치',
    signatureKeywords: [],
    detailedIntro:
      '비물질적 요소인 빛, 열, 중력 등을 매체로 존재의 근원과 세계의 작동 원리를 탐구합니다. 물질이 열에 의해 녹아내리거나 빛과 중력의 개입으로 변화하는 임계의 순간을 포착하여, 전시장 전체를 관람자가 감각적으로 경험할 수 있는 사유의 장으로 전환시킵니다.',
    careerTimeline: [
      { year: '2025', badge: '단체전', content: '《열 개의 눈》 부산현대미술관, 부산 / 《의존하는, 의존하지 않는》 아마도예술공간, 서울' },
      { year: '2024', badge: '개인전', content: '《사과와 달 (Apple and Moon)》, 갤러리바톤 / 《목소리를 삼키고 달을 만나다》 영주맨션, 부산' },
      { year: '2023', badge: '수상·선정', content: '부산시립미술관 《젊은 시각 새로운 시선》 및 광주시립미술관 《하정웅청년작가초대전》 선정' },
      { year: '2023', badge: '단체전', content: '《2023 바다미술제: 깜박이는 해안, 상상하는 바다》, 일광해수욕장, 부산' },
      { year: '2021', badge: '소장·출판', content: '부산현대미술관 소장품전 《감각의 문법》 및 홍티아트센터 개인전 《유령의 죽음》, 부산' },
    ],
  },
  'ttg-seongahsim': {
    jobTitle: '콜라주·오브제 작가 · 문화예술교육 기획자',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가 · 보임과 숨김 제작소 대표',
    education: '고신대학교 서양화 학사 · 동 상담대학원 상담심리학 수료',
    awards: '부산문화재단 문화로공간창업지원 선정 / 초량 예술정원 공공미술 선정',
    collectionsAndMedia: '수집 지류 콜라주 오브제, 실크스크린, 아트 퍼즐·보드게임',
    signatureKeywords: [],
    detailedIntro:
      '버려진 종이와 일상의 사소한 재료를 수집해 콜라주와 입체 오브제로 재탄생시킵니다. 회화에 상담심리학적 시선을 결합하여 자기 자신을 돌보고 삶을 의미 있게 살아가는 이야기를 건네며, 관객이 직접 만지고 참여할 수 있는 친근한 예술 매개물을 만듭니다.',
    careerTimeline: [
      { year: '2025', badge: '개인전', content: '《사회의 풍경과 초상》, 갤러리 수정, 부산 동구' },
      { year: '2025', badge: '레지던시·경력', content: '부산 원도심 창작공간 〈또따또가〉 6기 입주작가' },
      { year: '2022', badge: '개인전', content: '어린이날 100주년 기념 미술체험전 《나랑 친구할래?》, 민주공원, 부산' },
      { year: '2021', badge: '단체전', content: '《Under 39 부산 청년작가 아트페어》, 신세계백화점 센텀시티점, 부산' },
      { year: '2020', badge: '소장·출판', content: '시민의제 보드게임 〈아젠다메이커스〉 개발 및 초량 예술정원 프로젝트 참여, 부산' },
    ],
  },
  'ttg-sayoonyang': {
    jobTitle: '인터랙션 디자이너 · 오브제 크리에이터',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가',
    education: '시각·인터랙션 디자인 및 참여형 놀이 도구 연구',
    awards: '덴마크 Next Library 프로젝트 선정 / 독일 루프트한자 기내용 토이 협업',
    collectionsAndMedia: '아날로그 놀이 오브제, 팝업 아트북, 인터랙티브 설치',
    signatureKeywords: [],
    detailedIntro:
      '‘놀이와 배움’, ‘도구와 과정’, ‘경험과 기록’을 축으로 아날로그 조형물과 디지털 인터랙티브 매체를 넘나드는 작업을 전개합니다. 작은 장난감과 팝업북부터 관객 참여형 설치까지, 사람들이 스스로의 관점을 담아 결과물을 만들어낼 수 있는 도구와 과정을 설계합니다.',
    careerTimeline: [
      { year: '2025', badge: '단체전', content: '《Next Library 2025: Books, Glue and Saw》 인터랙티브 세션, 오르후스(덴마크)' },
      { year: '2025', badge: '레지던시·경력', content: '부산 원도심 창작공간 또따또가 6기 입주 / 독일 루프트한자 기내용 토이 협업' },
      { year: '2023', badge: '소장·출판', content: '도서문화재단 씨앗 컨퍼런스 《책, 풀, 톱》 및 아카이브 《좋은 삶 질문집》 디렉팅' },
      { year: '2021', badge: '소장·출판', content: '하자센터×서울연필 《소재모아 놀이키트》 아이덴티티 및 키트 개발' },
    ],
  },
  'ttg-haeunjoe': {
    jobTitle: '서양화가 · 회화 및 오브제 아티스트',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가',
    education: '이화여자대학교 일반대학원 서양화 전공 석사 졸업',
    awards: '2025 부산근현대역사관 〈부산 커넥티드〉 신진작가 공모 당선',
    collectionsAndMedia: '캔버스에 유채·아크릴릭 및 소형 입체 오브제',
    signatureKeywords: [],
    detailedIntro:
      '끊임없는 자극과 속도에 피로해진 현대인들에게 일상에서 놓쳐버린 찰나의 고요함과 사소한 풍경의 온기를 건네는 회화 작가입니다. 밤과 언덕, 식탁과 창가처럼 고즈넉한 시공간을 서정적인 색채와 정제된 붓질로 화면에 담아냅니다.',
    careerTimeline: [
      { year: '2026', badge: '단체전', content: '《바닷물로 밥을 짓는 법》, 스페이스 닻, 부산 수영구' },
      { year: '2025', badge: '개인전', content: '《밤과 언덕의 밀담》, 전시공간 영영, 부산' },
      { year: '2025', badge: '수상·선정', content: '《부산 커넥티드》 공모 당선전, 부산근현대역사관 금고갤러리' },
      { year: '2024', badge: '단체전', content: '《Under 39 청년작가 아트페어》, 신세계백화점 센텀시티점, 부산' },
    ],
  },
  'ttg-kunyekim': {
    jobTitle: '일러스트레이터 · 회화 및 아트북 작가',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가 (전 감만창의문화촌 입주작가)',
    education: '시각예술·일러스트레이션 및 독립출판 아트북 창작',
    awards: '2025 부산문화재단 국제 레지던시 파견작가 선정 / 청년 예술작품 구독사업 선정',
    collectionsAndMedia: '캔버스·종이에 혼합채색, 독립 그림책, 애니메이션 아트디렉팅',
    signatureKeywords: [],
    detailedIntro:
      '깊은 밤 펼쳐지는 신비한 꿈과 달콤 쌉싸름한 상상들을 여행하듯 채집하여, 낯선 설렘과 내면의 대화를 회화·일러스트레이션과 그림책으로 풀어냅니다. 부산 원도심과 해운대·영도를 무대로 개인전과 아트북 프로젝트를 활발히 이어가고 있습니다.',
    careerTimeline: [
      { year: '2026', badge: '개인전', content: '《청년 예술작품 구독》 개인전, 캠퍼스 디, 부산' },
      { year: '2025', badge: '개인전', content: '《NAKED》 해운대문화회관 기획전시, 부산 / 《일렁임의 찰나》 또따또가 쇼케이스' },
      { year: '2025', badge: '레지던시·경력', content: '부산문화재단 국제 레지던시 파견(일본 하마마쯔) 및 또따또가 6기 입주작가' },
      { year: '2024', badge: '개인전', content: '《마음의 모양》 무인화랑 부산 / 국회부산도서관×부산문화재단 구독전' },
      { year: '2023', badge: '레지던시·경력', content: '부산문화재단 감만창의문화촌 입주작가 (2021–2023) 및 영도 스크랩 개인전' },
    ],
  },
  'ttg-hyerimkim': {
    jobTitle: '서양화가 · 유채 클로즈업 회화 작가',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가',
    education: '부산대학교 미술학과 서양화전공 학사 및 동 일반대학원 석사과정',
    awards: 'KT&G 상상마당 부산 《ARTISTART》 선정 / 부산미술대학 우수졸업작품 초대전 선정',
    collectionsAndMedia: '캔버스에 유채 블렌딩 〈Lithops · 다육식물 군집〉 연작',
    signatureKeywords: [],
    detailedIntro:
      '소량의 물만으로도 오랜 시간을 견뎌내는 선인장과 다육식물 리돕스(Lithops)의 강인한 생명력을 클로즈업 구도와 섬세한 유화 블렌딩으로 화폭에 담아냅니다. 대상을 확대해 깊이 들여다보는 과정을 통해 인간과 닮은 군집의 온기와 미묘한 색의 변주를 시각화합니다.',
    careerTimeline: [
      { year: '2025', badge: '레지던시·경력', content: '부산 원도심 창작공간 〈또따또가〉 6기 입주작가 선정 (2025–2026)' },
      { year: '2023', badge: '단체전', content: '《새로운 출발선에 서다》 부산대 아트센터 / 《ARTISTART》 KT&G 상상마당 부산' },
      { year: '2023', badge: '단체전', content: '《나래展: 빛나는 물결》 갤러리마롱 / 《ASYAAF 아시아프》 출품' },
      { year: '2022', badge: '단체전', content: '《BFAA 아트페어 New Wave 특별전》 벡스코, 부산 / 정준호갤러리 초대전, 부산' },
    ],
  },
  'ttg-minkyungchoi': {
    jobTitle: '조형 예술가 · 식(食)미술 & 결정체 오브제 작가',
    affiliation: '부산 원도심 창작공간 또따또가 6기 입주작가 (굿모닝레시피 디렉터)',
    education: '현대조형 및 식재료 물성·결정체 오브제 연구',
    awards: '2024 부산항 제1부두 《공진화 발효》 선정 / 2023 부산현대미술관 프로젝트 커미션',
    collectionsAndMedia: '물·한천·설탕 결정체(코하쿠토·양갱) 및 전통 발효 조형 오브제',
    signatureKeywords: [],
    detailedIntro:
      '물, 한천, 설탕으로 빚어낸 반투명한 결정체와 전통 발효 물성을 매개로 음식과 비(非)음식, 조형 오브제 사이의 인식적 경계를 탐구합니다. 시간과 온·습도에 따라 결정화되고 변화하는 물질의 형성 과정을 통해 관객의 공감각적 경험을 확장합니다.',
    careerTimeline: [
      { year: '2025', badge: '레지던시·경력', content: '부산 원도심 창작공간 〈또따또가〉 6기 입주작가 선정 (2025–2026)' },
      { year: '2024', badge: '단체전', content: '《기대어 깃든: 공진화 발효 CO-EVOLUTION》, 부산항 제1부두, 부산 중구' },
      { year: '2024', badge: '개인전', content: '《6 pieces: 보석세공사의 광물수집》 및 부산 카페 헬멧 2인전 《Neco z Alenky》' },
      { year: '2023', badge: '소장·출판', content: '부산현대미술관 《정윤주 개인전: 수학자의 사물》 및 전남도립미술관 커미션 협업' },
    ],
  },
  'bscf-5058': {
    jobTitle: '현대미술작가 · 장소특정적 리서치 & 다매체 작가',
    affiliation: '부산 남구 스튜디오 · 전 또따또가 및 예술지구 P 입주작가',
    education: '부산대학교 대학원 미술학과 졸업',
    awards: '독일 함부르크 Claussen-Simon · 일본 히로시마 아트센터 · 또따또가 · 예술지구P 입주작가',
    collectionsAndMedia: '장소 리서치 기반 회화, 사운드·오브제 설치 〈Concerto〉 연작',
    signatureKeywords: [],
    detailedIntro:
      '특정한 기억과 장소에 축적된 시간의 흔적, 일상 공간의 미시적 틈새와 유무형의 가치를 시각화합니다. 장소특정적 리서치를 바탕으로 개인의 경험과 부산 도시 공간의 역사성이 교차하는 서사를 재구성합니다.',
    careerTimeline: [
      { year: '2026', badge: '개인전', content: '장소특정적 리서치 프로젝트 개인전, 김해·부산' },
      { year: '2025', badge: '개인전', content: '《콘체르토 (Concerto)》 개인전, 예술지구 P, 부산 금정구' },
      { year: '2023', badge: '개인전', content: '《P11과 P12 사이, 385일》, 스페이스 위버멘쉬, 부산' },
      { year: '2021', badge: '개인전', content: '《인공생활공인》, 디오티미술관, 부산 / 2020 예술지구 P 입주작가' },
      { year: '2019', badge: '레지던시·경력', content: '독일 함부르크(2019), 부산 또따또가(2016–18), 히로시마 아트센터(2015) 입주' },
    ],
  },
  'neolook-20251205k': {
    jobTitle: '한국화가 · 패브릭 & 디지털 드로잉 작가',
    affiliation: '부산 중구 동광길 42 스튜디오 · 금정구 창작활동',
    education: '한국화 및 복합매체 회화 전공',
    awards: '부산문화재단 청년예술가 지원 선정 / 예술지구 P 개인전 (2025)',
    collectionsAndMedia: '한지에 채색, 광목천 박음질, 디지털 드로잉',
    signatureKeywords: [],
    detailedIntro:
      '부산 중구 원도심 작업실을 거점으로 한지 위에 채색된 먹과 호분의 흔적, 광목천 박음질을 결합하여 삶의 순간들 속에서 스쳐 지나가는 감정의 미세한 움직임을 포착합니다. 구원과 파괴, 치유와 감염이라는 사랑의 양가성이 신체에 남기는 징후들을 독창적인 회화 언어로 풀어냅니다.',
    careerTimeline: [
      { year: '2025', badge: '개인전', content: '《사랑이라는 질병 (Love and Illness)》, 예술지구 P, 부산 금정구' },
      { year: '2024', badge: '개인전', content: '부산문화재단 후원 개인전 및 영남권 청년 회화 기획전 참여' },
      { year: '2023', badge: '개인전', content: '《황인지 개인전》 (네오룩 아카이브 선정 발표), 부산' },
    ],
  },
  'neolook-20250808e': {
    jobTitle: '서양화가 · 광목천 아크릴 회화 작가',
    affiliation: '부산 해운대구·기장 스튜디오',
    education: '영산대학교 학사 및 동아대학교 대학원 미술학과 석사 졸업',
    awards: '갤러리 우 초대 개인전 (2025) / 부산시립미술관 《젊은 시각 새로운 시선》 선정',
    collectionsAndMedia: '광목천에 아크릴채색 〈To stand on this land〉 연작',
    signatureKeywords: [],
    detailedIntro:
      '광목천의 따뜻한 표면 위에 아크릴 채색을 쌓아 올리며 타인과의 관계 연습, 고독과 자립의 감정을 인물과 동물 모티프로 담아냅니다. 타인의 기대가 아닌 자신의 언어로 온전히 땅 위에 서고자 하는 내면의 성장을 서정적으로 그려냅니다.',
    careerTimeline: [
      { year: '2025', badge: '개인전', content: '《이 땅에 서기 위하여 (To stand on this land)》, 갤러리 우, 부산 해운대구' },
      { year: '2024', badge: '단체전', content: '〈The Girl〉 및 〈Relationship Practice〉 연작 발표, 부산' },
      { year: '2022', badge: '개인전', content: '《한충석 개인전》 및 부산시립미술관·클레이아크김해미술관 기획전 출품' },
    ],
  },
  'neolook-20250425c': {
    jobTitle: '한지 조형화가 · 입체 회화 아티스트',
    affiliation: '부산 중구·금정구 스튜디오 (이건희 스튜디오)',
    education: '회화 및 수제한지 조형미술 전공',
    awards: '부산중구문화원 복병산 작은미술관 초대전 (2025) / 금샘미술관 개인전 (2023)',
    collectionsAndMedia: '닥나무 수제한지 성형에 아크릴채색·바느질 〈가시적 촉각〉 연작',
    signatureKeywords: [],
    detailedIntro:
      '닥나무 펄프를 손으로 조물거리며 성형한 수제한지 위에 아크릴 채색과 바느질을 결합해, 시각을 넘어 피부로 만져지는 듯한 ‘가시적 촉각’의 입체 회화를 구축합니다. 부산 중구 복병산 작은미술관과 금정문화회관 금샘미술관 등에서 활발히 개인전을 선보이고 있습니다.',
    careerTimeline: [
      { year: '2025', badge: '개인전', content: '《가시적 촉각 (Visual Tactility)》, 부산중구문화원 복병산 작은미술관, 부산 중구' },
      { year: '2024', badge: '단체전', content: '〈생명이 꼼지락 거리는 시간〉 및 〈Daimon〉 수제한지 대작 발표' },
      { year: '2023', badge: '개인전', content: '《이건희 개인전》, 금정문화회관 금샘미술관, 부산 금정구' },
    ],
  },
  'neolook-20241204i': {
    jobTitle: '현대 한국화가 · 수묵 콜라주 작가',
    affiliation: '부산 수영구 수영로 663 스튜디오',
    education: '부산대학교 예술대학 미술학과 한국화 전공 학사 및 동 대학원 석사 졸업',
    awards: '금정문화회관 금샘미술관 개인전 선정 (2024)',
    collectionsAndMedia: '한지와 천에 수묵, 담채, 호분, 박음질 콜라주',
    signatureKeywords: [],
    detailedIntro:
      '부산을 배경으로 성장하며 목격한 도시 풍경의 변화와 기억의 파편을 한지·천 콜라주와 수묵 박음질 기법으로 재구성합니다. 먹의 번짐과 바느질 선이 교차하는 중층적 화면을 통해 낮과 밤, 과거와 현재가 만나는 부산의 시공간을 구현합니다.',
    careerTimeline: [
      { year: '2024', badge: '개인전', content: '《밤산책 (Walking on a night)》, 금정문화회관 금샘미술관, 부산 금정구' },
      { year: '2022', badge: '개인전', content: '《배지민 개인전》 (네오룩 아카이브 선정), 부산' },
      { year: '2021', badge: '단체전', content: '부산 현대 한국화 청년작가 기획전 다수 출품' },
    ],
  },
  'neolook-20241210c': {
    jobTitle: '회화 작가 · 로컬 풍경 아티스트',
    affiliation: '부산 부산진구 스튜디오',
    education: '회화 전공 (부산진구 출생 및 활동)',
    awards: '부산진구문화재단 · 동천문화홀 기획 초대전 선정 (2024)',
    collectionsAndMedia: '캔버스에 아크릴채색 〈부산진구화(釜山鎭區畵)〉 연작',
    signatureKeywords: [],
    detailedIntro:
      '부전도서관, 서면 철길마을 굴다리슈퍼, 개금 벚꽃문화길 등 자신이 태어나 자란 부산의 골목 풍경을 따뜻한 색감과 여백의 미학으로 기록합니다. 화면 속 여백을 통해 관람자가 각자의 추억과 사색을 채워 넣을 수 있는 회화를 지향합니다.',
    careerTimeline: [
      { year: '2024', badge: '개인전', content: '《부산진구를 그리다 釜山鎭區畵》, 동천문화홀, 부산 부산진구' },
      { year: '2023', badge: '단체전', content: '부산 로컬 문화예술 프로젝트 및 청년 회화 교류전 참여' },
    ],
  },
  'neolook-20240228e': {
    jobTitle: '복합매체 · 회화 · 설치 아티스트',
    affiliation: '부산 금정구 스튜디오',
    education: '신라대학교 학사 및 부산대학교 대학원 미술학과 석사 졸업 (2024)',
    awards: '금정문화회관 금샘미술관 개인전 선정 (2024)',
    collectionsAndMedia: '캔버스에 아크릴과슈, 포장지로 감싼 회화, 가변 오브제 설치',
    signatureKeywords: [],
    detailedIntro:
      '디지털 스크린 중심의 비사물(Non-thing) 시대에 물리적 사물로서의 회화가 지닌 위상을 유쾌하게 질문합니다. 포장지로 감싼 캔버스 연작과 곶감걸이에 매단 이미지 파편들을 통해 이미지 소비 방식과 사물의 물성을 실험합니다.',
    careerTimeline: [
      { year: '2024', badge: '개인전', content: '《사물. 놀이》, 금정문화회관 금샘미술관, 부산 금정구' },
      { year: '2023', badge: '단체전', content: '〈동시대 이미지 마주하기〉 및 〈데이터 제의〉 미디어·회화 발표, 부산' },
      { year: '2021', badge: '개인전', content: '《김태성 개인전》 (네오룩 아카이브 선정), 부산' },
    ],
  },
  'neolook-20231211f': {
    jobTitle: '입체 · 키네틱 오브제 설치작가',
    affiliation: '부산 금정구 스튜디오',
    education: '조소 및 입체설치 전공',
    awards: '부산문화재단 『부산문화예술지원사업』 선정 (2023)',
    collectionsAndMedia: '무동력 벤틸레이터, PVC 파이프, 스틸 그레이팅, 타포린 가변설치',
    signatureKeywords: [],
    detailedIntro:
      '눈에 보이지 않지만 사물을 움직이는 ‘바람’의 성질을 내 뜻대로 조절할 수 없는 ‘타인’의 존재에 대입하여 조형적으로 탐구합니다. 무동력 벤틸레이터와 PVC 배관 등 도시의 산업 구조물을 리드미컬한 입체 설치로 전환합니다.',
    careerTimeline: [
      { year: '2023', badge: '개인전', content: '《바람연구소 (Wind Lab)》, 디오티미술관, 부산 금정구 (부산문화재단 지원)' },
      { year: '2022', badge: '단체전', content: '부산 청년 입체·설치 아티스트 기획전 다수 참여' },
    ],
  },
  'neolook-20231028e': {
    jobTitle: '디지털 페인팅 · 회화 아티스트',
    affiliation: '부산 금정구 예술지구 P 제10기 입주작가',
    education: '회화 및 시각예술 전공',
    awards: '부산문화재단 후원 예술지구 P 레지던시 10기 선정 (2023)',
    collectionsAndMedia: '아이패드 디지털 페인팅, 아카이벌 피그먼트 프린트, 캔버스 회화',
    signatureKeywords: [],
    detailedIntro:
      '도시를 거니는 산책자(Flâneur)의 시선으로 부산의 낯선 풍경과 실내 공간을 관찰·채집한 뒤, 기억에 남은 파편들을 콜라주하듯 재조립하여 백일몽 같은 디지털 페인팅 화면을 구축합니다.',
    careerTimeline: [
      { year: '2023', badge: '개인전', content: '《PAD (a Pedestrian has A Daydream)》, 예술지구 P, 부산 금정구' },
      { year: '2023', badge: '레지던시·경력', content: '부산 예술지구 P 제10기 입주작가 결과보고전 출품, 부산' },
      { year: '2022', badge: '개인전', content: '《이주연 개인전》 (네오룩 아카이브 선정), 부산' },
    ],
  },
  'neolook-20230927a': {
    jobTitle: '목조각 · 키네틱 사운드 조각가',
    affiliation: '부산 해운대구 스튜디오',
    education: '동의대학교 예술대학 미술학과 조소 전공 학사 및 동 대학원 석사 졸업',
    awards: '부산프랑스문화원 ART SPACE 초대전 선정 (2023) / 부산문화재단 지원 선정',
    collectionsAndMedia: '느티나무·은행나무 목조, 망치머리쇠, 저속모터 키네틱 사운드 오브제',
    signatureKeywords: [],
    detailedIntro:
      '목수의 노동이 배어 있는 망치 머릿쇠와 나무를 결합해 도구를 의인화하고 인간과 사물의 물화(物化)를 해학적으로 조각합니다. 정적인 목조각에 인체감지센서와 모터를 결합해 자연의 소리와 도구의 울림이 공명하는 공간을 연출합니다.',
    careerTimeline: [
      { year: '2023', badge: '개인전', content: '《우연한 조우 (An Encounter)》, 부산프랑스문화원 ART SPACE, 부산 해운대구' },
      { year: '2020', badge: '개인전', content: '《박주현 조각전》 (네오룩 아카이브 선정), 부산' },
    ],
  },
  'neolook-20230118b': {
    jobTitle: '서양화가 · 현대 정물회화 작가',
    affiliation: '부산 동구 스튜디오',
    education: '동아대학교 예술대학 회화과 서양화 전공 졸업',
    awards: '아스티갤러리 부산 개인전 선정 (2023)',
    collectionsAndMedia: '캔버스에 유채 〈Still life〉 현대 책가도·정물 연작',
    signatureKeywords: [],
    detailedIntro:
      '도자기·골동품과 현대의 오브제, 모란·산호 등 기복적 상징물을 단정한 구획 안에 정교한 유화로 배치합니다. 옛 사물이 품은 시간성과 오늘날의 일상적 소망을 한 화면에 현재화하며 세속적인 삶의 아름다움을 담담히 예찬합니다.',
    careerTimeline: [
      { year: '2023', badge: '개인전', content: '《세속화 예찬 (Glorification of secularization)》, 아스티갤러리 부산, 동구' },
      { year: '2021', badge: '개인전', content: '《최재혁 개인전》 (네오룩 아카이브 선정) 및 부산 아트페어 다수 출품' },
    ],
  },
  'neolook-20221006h': {
    jobTitle: '복합매체 콜라주 · 팝 스컬프처 작가',
    affiliation: '부산 금정구 스튜디오',
    education: '현대미술 회화·입체조형 전공',
    awards: '부산광역시 · 부산문화재단 후원 예술지구 P 개인전 선정',
    collectionsAndMedia: '나무패널 및 상자에 잡지·전단지 혼합재료 콜라주 〈고해스택〉 연작',
    signatureKeywords: [],
    detailedIntro:
      '현대 소비사회의 잡지, 만화책, 전단지, 패키지 박스를 수집하고 해체하여 덕지덕지 직조한 혼합매체 콜라주와 입체 조각으로 인간의 솔직한 물질적 욕망을 유쾌하게 풍자합니다.',
    careerTimeline: [
      { year: '2022', badge: '개인전', content: '《ㅈㅅ I\'m so sorry (고해스택)》, 예술지구 P, 부산 금정구 (부산문화재단 후원)' },
      { year: '2018', badge: '개인전', content: '《강덕현 개인전》 (네오룩 아카이브 선정), 부산' },
    ],
  },
  'neolook-20220324d': {
    jobTitle: '서양화가 · 도시 풍경 회화 작가',
    affiliation: '부산 금정구 스튜디오 (부산 동구 매축지마을 리서치)',
    education: '서양화 전공',
    awards: '디오티미술관 개인전 선정 (2022)',
    collectionsAndMedia: '캔버스에 유채 〈Blind〉 및 부산 매축지마을 도시 재개발 풍경 연작',
    signatureKeywords: [],
    detailedIntro:
      '부산 동구 매축지마을과 아파트 재개발 공사 현장의 가림막(Blind)이 일상의 풍경을 가로지르는 도시의 단면을 유채 회화로 기록합니다. 거대한 개발의 가림막 앞을 묵묵히 걸어가는 작은 사람들의 모습을 통해 도시 속 삶의 실존을 응시합니다.',
    careerTimeline: [
      { year: '2022', badge: '개인전', content: '《BLIND》, 디오티미술관, 부산 금정구' },
      { year: '2019', badge: '개인전', content: '《김민정 개인전》 (네오룩 아카이브 선정), 부산' },
    ],
  },
};

function cleanArtworkTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  const t = rawTitle.trim();
  const nonTitles = [
    '2026년도 우수예술사업',
    '진재 김철황 작품전',
    '무제',
    'Untitled',
  ];
  if (nonTitles.includes(t)) return '';

  return t
    .replace(/\.\s*\d+[×x]\d+cm.*$/i, '')
    .replace(/\s+\d+[×x]\d+cm.*$/i, '')
    .replace(/,\s*$/, '')
    .trim();
}

export const ARTISTS: Artist[] = CRAWLED_ARTISTS.map((raw, idx) => {
  const isSouvenirPartner = idx % 2 === 0;
  const collabStatus: ArtistCollabStatus = isSouvenirPartner
    ? '기념품 콜라보 참여'
    : '협업 열림 (Open to Collab)';
  const collabNote = isSouvenirPartner
    ? 'floreur × 부산 관광기념품 콜라보 에디션 참여 작가'
    : '전시 기획 · 브랜드 아트콜라보 · 굿즈 개발 열림';

  const mediums = MEDIUM_TEMPLATES[raw.discipline] || MEDIUM_TEMPLATES['회화·미술'];
  const dims = DIMENSION_TEMPLATES[raw.discipline] || DIMENSION_TEMPLATES['회화·미술'];
  const ex = extractExhibitionsFromBio(raw.bio, raw.name, raw.discipline);
  const naverProfile = ARTIST_NAVER_PROFILES[raw.id] || (raw as any).naverProfile;

  const seenTitles = new Set<string>();
  const enrichedArtworks: Artwork[] = raw.artworks.map((w, wIdx) => {
    const priceInfo = PRICE_TEMPLATES[(idx + wIdx) % PRICE_TEMPLATES.length];
    const cleaned = cleanArtworkTitle(w.title);
    let finalTitle = cleaned;
    if (cleaned && seenTitles.has(cleaned)) {
      finalTitle = '';
    } else if (cleaned) {
      seenTitles.add(cleaned);
    }

    return {
      ...w,
      title: finalTitle,
      mediumDetail: mediums[wIdx % mediums.length],
      dimensions: dims[wIdx % dims.length],
      availability: priceInfo.availability,
      priceLabel: priceInfo.priceLabel,
    };
  });

  return {
    ...raw,
    nameEn: naverProfile?.nameEnOverride || raw.nameEn,
     statement: naverProfile ? naverProfile.detailedIntro.slice(0, 88) + '...' : raw.statement,
    naverProfile,
    collabStatus,
    collabNote,
    soloExhibitions: ex.solo,
    groupExhibitions: ex.group,
    artworks: enrichedArtworks,
  };
});

export const GOODS_MANUALS: GoodsManual[] = [
  {
    id: 'manual-01',
    code: 'SPEC—01',
    category: '지류·인쇄',
    title: '원화·사진의 리소그라프(Risograph) 및 별색 엽서북 제작 공정',
    subtitle: 'CMYK 옵셋 인쇄로 구현되지 않는 부산 해풍의 질감과 코발트 별색을 종이 위에 올리는 방법',
    leadTime: '영업일 기준 5–7일',
    moq: '50부 (단품 포스터는 30장)',
    estimatedUnitCost: '엽서 10종 묶음 기준 권당 4,800원 – 6,200원',
    difficulty: '입문',
    heroImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    summary: '회화나 사진 작업을 가장 낮은 초기 비용으로 밀도 높은 아트 굿즈로 전환하는 방식입니다.',
    specs: [
      { label: '추천 본문 지류', value: '문켄 폴라 러프 240g / 랑데뷰 내추럴 240g / 아코팩 250g' },
      { label: '해상도 및 색상 모드', value: '300–400 dpi / 각 별색 채널별 Grayscale(K 100%) 분판 PDF' },
      { label: '재단 및 도련 여백', value: '사방 3mm 여백 필수 (테두리 프레임 디자인 시 5mm 이상 권장)' },
      { label: '추천 제본 방식', value: '떡제본(상철 패드 제본) 후 노출 등제본 또는 금속 아일렛 바인딩' }
    ],
    steps: [
      {
        stepNo: '01',
        title: '잉크 채널 분판 (Color Separation)',
        detail: '원본 이미지를 그대로 인쇄하지 않고, 주조색 2~3개 채널(예: Marine Blue + Aqua + Black)로 명도를 분리해 각각의 흑백(Grayscale) 레이어로 저장합니다.',
        technicalTip: '잉크가 겹치는 오버프린트(Overprint) 영역은 채도가 깊어지므로 어두운 암부 표현에 적극 활용하되, 잉크 묻어남 방지를 위해 총 잉크 농도 합이 160%를 넘지 않도록 커브를 조절하세요.'
      },
      {
        stepNo: '02',
        title: '용지 결(Grain) 및 평량 선택',
        detail: '리소 잉크는 건조가 느린 수성 에멀전 콩기름 잉크이므로 코팅지(아트지, 스노우지)에서는 마르지 않습니다. 반드시 섬유질이 살아있는 비코팅 종이를 선택해야 합니다.',
        technicalTip: '엽서북 제본 시 종이 결이 제본 방향과 평행(종목)해야 책장이 들뜨지 않고 자연스럽게 넘어갑니다.'
      },
      {
        stepNo: '03',
        title: '가제본 감리 및 후가공 마감',
        detail: '본 인쇄 전 1~2장 핀 맞춤(Registration) 테스트를 거쳐 각 판의 어긋남 범위를 확인하고, 충분한 자연 건조(24시간 이상) 후 재단에 들어갑니다.',
        technicalTip: '재단 시 압력에 의해 롤러 자국이 남을 수 있으므로 인쇄소 요청 시 사잇지(간지) 삽입 여부를 반드시 체크하세요.'
      }
    ],
    checklist: [
      '폰트 윤곽선 만들기(Create Outlines) 완료 여부',
      '사방 3mm 도련(Bleed) 영역까지 배경 이미지 확장 여부',
      '별색 분판 파일 내 K100% 외 불필요한 CMY 채널 제거 여부',
      '재단선 안쪽 4mm 이내 주요 텍스트 배치 지양'
    ]
  },
  {
    id: 'manual-02',
    code: 'SPEC—02',
    category: '오브제·아크릴',
    title: '투명 아크릴 블록(15T·20T) 아트 문진 및 바다 단면 오브제 제작',
    subtitle: '사진과 평면 페인팅에 깊이감과 굴절률을 더해 입체 오브제로 확장하는 UV 레이어 인쇄 공정',
    leadTime: '영업일 기준 7–10일',
    moq: '20개 (디자인 교차 가능)',
    estimatedUnitCost: '80×80×20mm 기준 개당 9,500원 – 13,000원',
    difficulty: '중급',
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    summary: '두께 15mm~20mm의 고투명 캐스팅 아크릴 배면에 컬러와 화이트(백판) 레이어를 부분 차등 인쇄하면 수면 아래를 들여다보는 듯한 깊이감이 완성됩니다.',
    specs: [
      { label: '권장 소재 규격', value: '국산 정품 캐스팅 투명 아크릴 15T 또는 20T (재생 압출 아크릴 비권장)' },
      { label: '인쇄 레이어 구조', value: '배면 역상 인쇄: [아크릴 배면] → [Color 층] → [부분 White 층] → [클리어 코팅]' },
      { label: '측면 마감 공정', value: '다이아몬드 경면 폴리싱(광택 가공) 필수 지정' },
      { label: '파일 포맷', value: 'Adobe Illustrator (AI) 내 Print 레이어 + White_Spot 레이어 + Cut_Line 레이어 분리' }
    ],
    steps: [
      {
        stepNo: '01',
        title: '투과 영역과 불투명 영역(백판) 설계',
        detail: '바다나 하늘처럼 빛이 투과되어야 하는 영역은 White 레이어를 비워두거나 농도를 30%로 낮추고, 피사체나 타이포그래피 영역만 White 100%를 받쳐 입체감을 극대화합니다.',
        technicalTip: '화이트 레이어를 컬러 영역보다 0.15mm 안쪽으로 축소(Choke) 설정해야 정면에서 보았을 때 흰색 테두리가 비져나오지 않습니다.'
      },
      {
        stepNo: '02',
        title: '측면 경면 가공 및 모서리 면취',
        detail: '레이저 커팅만 거친 아크릴은 측면에 미세한 줄무늬가 남습니다. 문진 오브제로 판매하려면 CNC 커팅 후 다이아몬드 날로 측면을 깎아내는 경면 가공을 요청하세요.',
        technicalTip: '손에 쥐는 문진 특성상 직각 모서리가 날카로울 수 있으므로 0.5R~1R 미세 라운딩(면취) 옵션을 추가하면 완성도가 크게 올라갑니다.'
      },
      {
        stepNo: '03',
        title: '보호 필름 제거 및 지문 방지 패키징',
        detail: '출고 시 부착된 보호 필름을 제거한 뒤 극세사 천으로 정전기를 닦고, 반투명 글라신지(유산지)로 1차 감싼 후 지류 박스에 수납합니다.',
        technicalTip: '바닥면에 1mm 두께의 극초박형 투명 실리콘 범폰 4개를 동봉하거나 부착하면 데스크 스크래치와 인쇄면 손상을 동시에 방지할 수 있습니다.'
      }
    ],
    checklist: [
      '배면 인쇄용 좌우 반전(Mirror) 데이터 여부 인쇄소와 사전 확인',
      'White 별색 채널이 Spot Color로 정확히 지정되었는지 점검',
      '화이트 인쇄 영역 0.15mm 축소(내경 옵셋) 적용 완료',
      '캐스팅 아크릴 두께 오차(±0.8mm)를 고려한 패키지 내경 설계'
    ]
  },
  {
    id: 'manual-03',
    code: 'SPEC—03',
    category: '패브릭·실크스크린',
    title: '광목·린넨 패브릭 포스터 및 수성 안료 실크스크린 제작 가이드',
    subtitle: '디지털 텍스타일 프린팅(DTP)과 수작업 실크스크린 비교',
    leadTime: '영업일 기준 7–12일',
    moq: '30장',
    estimatedUnitCost: '50×70cm 기준 장당 7,500원 – 11,000원',
    difficulty: '중급',
    heroImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    summary: '다채로운 회화 원화는 반응성 DTP 날염으로, 그래픽·드로잉 작업은 수성 실크스크린으로 접근하는 것이 정석입니다.',
    specs: [
      { label: '추천 원단', value: '워싱 광목 20수(차분한 미색) / 코튼·린넨 혼방 15수(내추럴 슬럽 조직감)' },
      { label: '인쇄 방식 구분', value: '회화·사진: 반응성 염료 DTP / 1~3도 그래픽: 수성 침투 안료 실크스크린' },
      { label: '외곽 봉제 마감', value: '사방 5mm 말아박기(해리 마감) 또는 양변 식서(Selvedge) 살리기 + 상하단 인터로크' },
      { label: '디스플레이 부자재', value: '무광 흑니켈 핀 집게 2입 동봉 또는 상단 원목 포스터 행거 결합' }
    ],
    steps: [
      {
        stepNo: '01',
        title: '원단 정련 및 수축률 테스트',
        detail: '생지 광목은 인쇄 및 열처리 과정에서 3~5% 수축합니다. 반드시 워싱(바이오 가공) 처리된 원단을 선택해 재단 후 뒤틀림을 예방합니다.',
        technicalTip: '배경 전체를 어두운 네이비나 블루로 채우는 디자인은 안료 프린팅 시 원단이 뻣뻣해지므로 반응성 염료(Reactive Dye) 공정을 지원하는 업체를 선택하세요.'
      },
      {
        stepNo: '02',
        title: '봉제 시접을 고려한 판형 세팅',
        detail: '완성 규격이 500×700mm라면 사방 말아박기 시접으로 각 변당 15mm씩 총 530×730mm로 원단을 재단해야 합니다.',
        technicalTip: '작가 서명과 에디션 넘버링을 직조 라벨(케어라벨 형태)로 소량 제작해 우측 하단 봉제선에 함께 물려 박음질하면 기성품과 확실히 차별화됩니다.'
      }
    ],
    checklist: [
      '사방 봉제 시접(각 15mm) 포함 데이터 여부 확인',
      '원단 바탕색(생지 미색 vs 백색 표백지)에 따른 색감 변화 감리',
      '열정착 후 세탁 견뢰도 및 마찰 이염 테스트 완료'
    ]
  },
  {
    id: 'manual-04',
    code: 'SPEC—04',
    category: '패키지·후가공',
    title: '소량 오브제·굿즈를 위한 무목형 패키징 & 로컬 브랜딩 마감법',
    subtitle: '목형비 부담 없이 30~50개 소량 굿즈의 소장 가치를 끌어올리는 지류 봉투·타공 라벨·청박 후가공',
    leadTime: '영업일 기준 4–6일',
    moq: '50세트',
    estimatedUnitCost: '패키지 단품 기준 개당 600원 – 1,800원',
    difficulty: '입문',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    summary: '기성 무코팅 지류 상자에 작가 고유의 스펙 시트 라벨(띠지)과 코발트 청박 스탬핑을 결합해 갤러리 에디션 수준의 패키지를 완성합니다.',
    specs: [
      { label: '베이스 패키지', value: '무표백 크라프트 합지 박스 또는 반투명 트레이싱지(110g) 봉투' },
      { label: '슬리브(띠지) 지류', value: '두성종이 비오톱 160g(네이비/그레이) 또는 해조류 재생지 시로 알가 160g' },
      { label: '포인트 후가공', value: '유광 코발트 청박(Blue Foil) 또는 무광 백박(White Foil) 동판 스탬핑' },
      { label: '필수 표기 사항', value: '작가명, 작품 원본 캡션, 제작년도, 소재 및 취급 주의사항' }
    ],
    steps: [
      {
        stepNo: '01',
        title: '아카이브 스펙 라벨(Spec Sheet Label) 디자인',
        detail: '단순 로고 대신 미술관 수장고 태그처럼 작품 번호(Index No.), 원화 재료, 에디션 번호를 고정폭(Monospace) 서체로 기입한 ㄱ자 꺾임 라벨을 설계합니다.',
        technicalTip: '점착 스티커 용지 대신 비점착 평량 120g 종이를 띠지(Belly Band) 형태로 감싸고 후면을 작은 원형 실링 스티커로 고정하면 개봉 경험이 훨씬 고급스러워집니다.'
      },
      {
        stepNo: '02',
        title: '동판 1개로 다품종에 공용 박(Foil) 찍기',
        detail: '가로 50mm × 세로 25mm 이내의 작가 시그니처 동판 1개를 파두면 엽서 봉투, 박스 상단, 보증서 카드에 모두 공용으로 청박을 찍을 수 있습니다.',
        technicalTip: '요철이 깊은 코튼지에는 박 압력을 강하게 주어 디보싱(음각) 효과를 동시에 내면 별도 형압 비용 없이도 깊은 입체감이 살아납니다.'
      }
    ],
    checklist: [
      '완성 굿즈 실측 사이즈 대비 내경 +4mm 이상 여유 확보',
      '박(Foil) 데이터 내 0.2mm 이하 세선 및 자간 뭉침 확인',
      '완충재(종이 크라프트 충전재 또는 글라신지) 수급 완료'
    ]
  },
  {
    id: 'manual-05',
    code: 'SPEC—05',
    category: '입체오브제·공예',
    title: 'SLA 3D 프린팅 원형 & 슬립캐스팅 도자·유리 소량 오브제 제작 공정',
    subtitle: '평면 스케치나 3D 모델링 데이터를 인센스 홀더·문진·아트토이 등 10~30개 소량 입체 에디션으로 전환하는 방법',
    leadTime: '영업일 기준 10–14일',
    moq: '10개 – 30개 (공방 협의 가능)',
    estimatedUnitCost: '개당 12,000원 – 28,000원 (원형·석고틀 비용 별도)',
    difficulty: '심화',
    heroImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    summary: '부산 내 3D 프린팅 전문소(사상구·금정구)에서 고정밀 레진 원형을 출력한 뒤, 수영구·사하구 도자·유리 공방과 협업해 석고틀 슬립캐스팅 또는 스테인드글라스·금속 세공으로 소량 에디션 오브제를 완성합니다.',
    specs: [
      { label: '원형 출력 방식', value: 'SLA / DLP 광경화성 레진 3D 프린팅 (적층 두께 0.05mm 이하 권장)' },
      { label: '소성 수축률 설계', value: '백자토·색소지 기준 재벌 소성 후 약 12~15% 수축 감안하여 원형 확대 모델링' },
      { label: '도자·유리 마감', value: '투명유/매트유 시유(1250℃ 소성) 또는 동테이프 납땜 스테인드글라스 세공' },
      { label: '납품 파일 규격', value: '3D 모델링 데이터 (STL / OBJ / STEP) 또는 정면·측면·평면 치수 도면' }
    ],
    steps: [
      {
        stepNo: '01',
        title: '언더컷(Undercut) 제거 및 수축률 반영 원형 출력',
        detail: '석고틀에서 기물이 파손 없이 빠져나올 수 있도록 역구배(Undercut)를 없애고 빼기 구배(Draft Angle 3° 이상)를 준 3D 데이터를 SLA 프린터로 출력 후 서페이서·사포질로 표면을 매끈하게 마감합니다.',
        technicalTip: '도자기 오브제는 가마 소성 후 크기가 12~15% 줄어듭니다. 완성 목표 규격이 80mm라면 3D 원형은 약 92~94mm로 키워서 출력해야 합니다.'
      },
      {
        stepNo: '02',
        title: '석고 가압틀 제작 및 색소지 슬립캐스팅',
        detail: '마감된 3D 원형으로 2~3분할 석고 몰드를 제작한 뒤, 액상 흙물(슬립)이나 안료를 섞은 색소지를 부어 균일한 두께의 기물을 복제합니다.',
        technicalTip: '단순한 형태나 10개 미만의 극소량 에디션은 석고틀 제작비를 아끼기 위해 도예 공방의 핸드빌딩(수성형)이나 컬러 레진 캐스팅으로 대체하는 것이 경제적입니다.'
      },
      {
        stepNo: '03',
        title: '바닥면 샌딩 및 작가 각인(Backstamp) 마감',
        detail: '초벌(800℃) 후 바닥면에 내화 안료나 철유로 작가 시그니처·에디션 번호를 기입하고 재벌(1250℃) 소성을 거쳐 바닥 거친 면을 다이아몬드 패드로 연마합니다.',
        technicalTip: '황동이나 실버 파츠를 결합할 경우 소성 후 에폭시 2액형 접착제나 나사산 결합 구조를 미리 설계해 전포동 금속공방과 후가공을 연계하세요.'
      }
    ],
    checklist: [
      '도자 소성 수축률(12~15%)이 반영된 원형 치수인지 확인',
      '석고 몰드 탈형을 위한 빼기 구배 및 분할선(Parting Line) 위치 점검',
      '바닥면 테이블 스크래치 방지용 코르크 또는 스웨이드 패드 부착 여부',
      '파손 방지용 지류 크라프트 완충 포장 및 취급주의 스티커 준비'
    ]
  }
];

export const LOCAL_MAKERS: LocalMaker[] = [
  // 1. 지류·인쇄·리소 (Print, Risograph, Fine Art Giclée)
  {
    id: 'maker-01',
    code: 'PRS—01',
    category: '지류·인쇄·리소',
    name: '케이제이프린트 (국제인쇄·애드)',
    district: '중구 동광길 86-1 (동광동 인쇄골목)',
    specialty: '전시 도록 · 독립출판 책제본 · 소량 포스터/엽서/리플렛 인쇄',
    moq: '책자 10부 / 엽서·포스터 소량 가능',
    turnaround: '2–5일',
    equipment: '고해상도 디지털 인쇄기, 옵셋 인쇄기, 무선·중철 제본 설비',
    artistNote: '중앙동·동광동 인쇄골목 중심에 위치해 용지 샘플을 직접 만져보고 소량 전시 도록과 엽서, 리플렛을 합리적인 단가로 맞춤 제작할 수 있는 인쇄소입니다.',
    contact: '051-469-5204',
    websiteUrl: 'http://kjprint.kr'
  },
  {
    id: 'maker-02',
    code: 'PRS—02',
    category: '지류·인쇄·리소',
    name: '스튜디오 소소나 (Studio Sosona)',
    district: '중구 중앙동 (원도심 창작지구)',
    specialty: '리소그라프(Risograph) 별색 아트프린트 · 친환경 콩기름 인쇄 · 독립출판',
    moq: '포스터·엽서 30매 내외 (협의)',
    turnaround: '4–7일',
    equipment: 'RISO 디지털 공판 인쇄기, 다색 별색 드럼, 비코팅 수입지 라인업',
    artistNote: '부산 중앙동을 거점으로 활동하는 리소그래피 전문 디자인 스튜디오로, 일반 CMYK 인쇄로 구현할 수 없는 형광·코발트 별색 레이어드 포스터와 아트북 작업을 진행합니다.',
    contact: '인스타그램 @studio_sosona DM 문의',
    websiteUrl: 'https://www.instagram.com/studio_sosona/'
  },
  {
    id: 'maker-03',
    code: 'PRS—03',
    category: '지류·인쇄·리소',
    name: '(주)까치원색',
    district: '중구 대청로135번길 7-1 (동광동4가)',
    specialty: '원색 오프셋 인쇄 · 미술관/갤러리 전시 도록 · 별색 조색 인쇄',
    moq: '도록 100부 / 엽서·아트카드 200매',
    turnaround: '4–7일',
    equipment: '대형 다색 오프셋 인쇄기, 정밀 컬러 교정 시스템',
    artistNote: '동광동 인쇄골목의 베테랑 원색 인쇄 전문 업체로, 회화·사진 작품집처럼 색감 재현력과 현장 감리가 중요한 정규 도록 및 아트 포스터 발주에 적합합니다.',
    contact: '051-464-0514'
  },
  {
    id: 'maker-04',
    code: 'PRS—04',
    category: '지류·인쇄·리소',
    name: '무지개종합인쇄',
    district: '부산진구 부전로 13, 1층 (서면·부전동)',
    specialty: '소량 디지털 출력 · 독립출판 무선/중철/스프링 제본 · 엽서/포스터',
    moq: '1부부터 소량 출력 가능',
    turnaround: '당일–3일',
    equipment: '컬러 디지털 프레스, 무선 제본기, 재단기, 코팅기',
    artistNote: '서면·전포동 작업실 밀집 구역과 가까워 전시 직전 소량 캡션 보드, 포트폴리오 북, 가제본 더미북, 엽서 샘플을 빠르게 출력·제본하기 좋습니다.',
    contact: '서면 부전로 매장 방문 및 웹 접수',
    websiteUrl: 'http://print7.kr'
  },
  {
    id: 'maker-05',
    code: 'PRS—05',
    category: '지류·인쇄·리소',
    name: '부산인쇄타운',
    district: '사상구 낙동대로1420번길 41 (삼락동)',
    specialty: '엽서 · 스티커 · 카탈로그 · 지류 굿즈 대량/소량 원스톱 인쇄',
    moq: '품목별 소량 디지털 ~ 대량 합판 지원',
    turnaround: '3–5일',
    equipment: '대형 오프셋 인쇄 라인, 디지털 윤전기, 박·형압·도무송 후가공 라인',
    artistNote: '사상구 인쇄단지의 대형 종합 인쇄 플랫폼으로, 스티커·엽서·책자·리플렛 등 다양한 지류 굿즈를 규격별로 한 번에 발주할 때 단가 경쟁력이 뛰어납니다.',
    contact: '051-304-5411',
    websiteUrl: 'http://www.busanpress.co.kr'
  },
  {
    id: 'maker-06',
    code: 'PRS—06',
    category: '지류·인쇄·리소',
    name: '하래포토 파인아트 스튜디오',
    district: '부산 파인아트 피그먼트 프린트 랩',
    specialty: '아카이벌 피그먼트 프린트(지클레) · 파인아트지 인화 · 수제 원목 액자',
    moq: '1매 (에디션 프린트 단품 제작 가능)',
    turnaround: '3–7일',
    equipment: '광폭 피그먼트 잉크젯 프린터, 하네뮬레·아르쉐 코튼지, 호두나무 원목 프레임 공방',
    artistNote: '공장형 대량 인쇄의 색 왜곡 없이 작가가 직접 최상급 파인아트지에 피그먼트 인화를 진행하며, 북미산 월넛 등 수제 원목 액자 마감까지 원스톱으로 지원합니다.',
    contact: '공식 웹사이트 온라인 상담 및 주문',
    websiteUrl: 'http://haraefoto.com'
  },

  // 2. 아크릴·레이저·3D (Acrylic, UV Print, Laser Cutting, 3D Printing)
  {
    id: 'maker-07',
    code: 'OBJ—07',
    category: '아크릴·레이저·3D',
    name: '위드메이킹 (Withmaking)',
    district: '남구 황령대로319번길 64, 1층 (대연동)',
    specialty: '투명·오로라·자개 아크릴 키링 · 아크릴 문진/코롯토 · 스탠드 UV 인쇄',
    moq: '1개 ~ 10개 소량 주문제작 가능',
    turnaround: '3–6일',
    equipment: '고해상도 평판 UV 프린터(White/컬러 적층), 정밀 레이저 커팅기, 도무송 설비',
    artistNote: '부산 남구에 위치한 아크릴 굿즈 전문 제작소로, 일러스트·회화 작가들의 소량 아크릴 키링, 두꺼운 아크릴 문진(코롯토), 스마트톡, 스티커 제작 시스템이 체계화되어 있습니다.',
    contact: '남구 황령빌딩 1층 / 온라인 스토어 접수',
    websiteUrl: 'https://withmaking.co.kr'
  },
  {
    id: 'maker-08',
    code: 'OBJ—08',
    category: '아크릴·레이저·3D',
    name: '서면레이저공방 (서면레이저공방작업실)',
    district: '부산진구 가야대로557번길 34, 2층 (서면)',
    specialty: '아크릴 · MDF · 원목 · 가죽 정밀 레이저 커팅 및 선/면 각인 가공',
    moq: '1개 (시제품·단품 커팅 의뢰 가능)',
    turnaround: '1–4일',
    equipment: '대형 CO2 레이저 커팅기, 정밀 마킹기, 아크릴·목재 가공 설비',
    artistNote: '일러스트레이터(AI) 칼선 도면을 가져가면 아크릴 오브제, 목재 스탠드, 전시용 입체 문자, 스텐실 판 등을 1개 단위 소량으로도 빠르게 레이저 가공해 주는 도심 공방입니다.',
    contact: '웹사이트 견적 게시판 및 방문 상담',
    websiteUrl: 'https://laser0bang.com'
  },
  {
    id: 'maker-09',
    code: 'OBJ—09',
    category: '아크릴·레이저·3D',
    name: '사인아트팩토리 (사인메이커 · 아크릴메이커)',
    district: '사상구 가야대로 365 (주례동)',
    specialty: '투명·컬러 아크릴 판재 정밀 재단 · 아크릴 박스/쇼케이스 · 전시 사인물',
    moq: '1개 ~ 소량 맞춤 제작',
    turnaround: '3–6일',
    equipment: 'CNC 라우터, 아크릴 절곡기, 레이저 가공기, 경면 가공 설비',
    artistNote: '입체 조형물을 보호하는 투명 아크릴 관박스, 전시장 동선 사인물, 컬러 아크릴 조합 오브제 등 규격 맞춤 아크릴 성형·재단에 특화된 업체입니다.',
    contact: '사상구 주례동 작업실 / 온라인 접수',
    websiteUrl: 'https://interlgy.cafe24.com'
  },
  {
    id: 'maker-10',
    code: 'OBJ—10',
    category: '아크릴·레이저·3D',
    name: '쓰리디아츠 (3D ARTS)',
    district: '사상구 사상로 35, 3층 (괘법동)',
    specialty: 'SLA·FDM 고정밀 3D 프린팅 · 아트토이/조형물 시제품 · 소량 복제 양산',
    moq: '1개 (원형 출력 및 소량 복제 가능)',
    turnaround: '4–8일',
    equipment: '산업용 대면적 SLA 레진 3D 프린터, FDM 프린터, 후가공 샌딩·도색 부스',
    artistNote: '3D 모델링 데이터를 기반으로 도자·레진 굿즈용 마스터 원형(Master Mold)을 정밀 출력하거나, 입체 전시 조형물과 아트토이를 소량 제작할 때 활용하기 좋습니다.',
    contact: '070-4763-9939',
    websiteUrl: 'http://3darts.co.kr'
  },
  {
    id: 'maker-11',
    code: 'OBJ—11',
    category: '아크릴·레이저·3D',
    name: '부산대학교 V-Space (메이커스페이스 전문랩)',
    district: '금정구 부산대학로63번길 2 (장전동)',
    specialty: 'Polyjet·SLA 3D 프린팅 · 대면적 레이저 가공 · CNC 라우터 · 3D 스캐닝',
    moq: '1개 (장비 예약 및 시제품 제작 지원)',
    turnaround: '예약 일정에 따름',
    equipment: 'Stratasys Polyjet 컬러 3D 프린터, 대형 SLA/FDM, 레이저 커터, CNC, 3D 스캐너',
    artistNote: '부산 대표 메이커스페이스 전문랩으로, 사전 장비 교육을 이수한 작가나 창작자가 고가의 산업용 3D 프린터와 레이저·목공 CNC 장비를 최소 비용으로 활용할 수 있습니다.',
    contact: '온라인 장비 예약 시스템 운영',
    websiteUrl: 'https://vspace.pusan.ac.kr'
  },
  {
    id: 'maker-12',
    code: 'OBJ—12',
    category: '아크릴·레이저·3D',
    name: '유라시아플랫폼 메이커스테이션',
    district: '동구 중앙대로 210 (초량동 부산역 광장)',
    specialty: '3D 프린터 · 레이저 조각기 · 소형 디지털 공예 장비 지원',
    moq: '1개 (샘플링 및 소량 제작)',
    turnaround: '1–3일',
    equipment: '3D 프린터, 레이저 커터/각인기, UV 소형 프린터, 디지털 공예 기기',
    artistNote: '부산역 바로 앞 유라시아플랫폼 내에 위치해 원도심(중앙동·영도) 작가들이 접근하기 매우 편리하며, 소규모 오브제 샘플링과 레이저 각인 테스트에 적합합니다.',
    contact: '부산도시재생지원센터 메이커스테이션'
  },

  // 3. 도자·유리·금속 오브제 (Ceramic, Stained Glass, Metal Craft Studios)
  {
    id: 'maker-13',
    code: 'CER—13',
    category: '도자·유리·금속 오브제',
    name: '믹스쳐 세라믹 (Mixture Ceramic)',
    district: '수영구 수영로 532 (광안리)',
    specialty: '색소지(컬러 흙) 세라믹 오브제 · 인센스 홀더 · 문진 · 도자 굿즈 협업',
    moq: '10개 ~ 30개 (소량 커스텀 오더 협의)',
    turnaround: '10–14일',
    equipment: '전기가마, 색소지 조색 라인, 슬립캐스팅 및 핸드빌딩 설비',
    artistNote: '다채로운 색이 있는 흙을 조합해 독창적인 물성의 세라믹 오브제를 제작하는 광안리 공방으로, 작가 콜라보 인센스 홀더나 도자 문진 등 감각적인 소량 굿즈 제작에 강점이 있습니다.',
    contact: '수영구 광안리 공방 / SNS DM 문의'
  },
  {
    id: 'maker-14',
    code: 'CER—14',
    category: '도자·유리·금속 오브제',
    name: '수공원도예공방 (그린온더브라운)',
    district: '수영구 과정로30번길 6, 1층 (망미동)',
    specialty: '도자기 주문제작(소량/대량 OEM 컨설팅) · 컬러 토분 · 리빙 세라믹 오브제',
    moq: '10개 ~ 50개 (디자인 시안별 협의)',
    turnaround: '10–15일',
    equipment: '대형 도자 소성 가마, 물레 성형기, 유약 실험 설비',
    artistNote: '망미동 예술마을 인근의 규모 있는 도예 공방으로, 작가의 스케치나 도면을 바탕으로 도자기 소량 주문제작(OEM) 및 유약·형태 컨설팅을 공식 지원합니다.',
    contact: '수영구 과정로30번길 6 방문 및 상담'
  },
  {
    id: 'maker-15',
    code: 'GLS—15',
    category: '도자·유리·금속 오브제',
    name: '청월호야 유리공예 스튜디오',
    district: '사하구 낙동남로1373번길 27, 1층 (하단동)',
    specialty: '스테인드글라스 오브제 · 유리 트레이 · 썬캐쳐 · 아트 거울 개별 주문제작',
    moq: '1개 ~ 20개 (수작업 소량 에디션)',
    turnaround: '7–14일',
    equipment: '수입 색유리 커팅·연마기, 동테이프 솔더링(납땜) 설비, 유리 가공 공구',
    artistNote: '빛과 색유리의 굴절을 활용한 스테인드글라스 전문 공방으로, 작가의 드로잉이나 조형 모티프를 반영한 유리 트레이·썬캐쳐·거울 오브제를 소량 맞춤 제작할 수 있습니다.',
    contact: '사하구 하단동 스튜디오 사전 상담'
  },
  {
    id: 'maker-16',
    code: 'MTL—16',
    category: '도자·유리·금속 오브제',
    name: '프랑꼬아트랩 (부산서면점)',
    district: '부산진구 전포대로199번길 27, KH마이우스 303호 (전포동)',
    specialty: '황동·실버 금속 공예 · 커스텀 주얼리/키링 오브제 · 금속 공유공방',
    moq: '5개 ~ 30개 (또는 공유공방 직접 제작)',
    turnaround: '5–10일',
    equipment: '금속 세공 작업대, 폴리싱 모터, 땜 토치, 레이저 각인 및 주얼리 부자재',
    artistNote: '전포역 바로 앞에 위치한 커스텀 금속·주얼리 전문 스튜디오로, 황동(Brass)이나 은 소재의 북마크, 키링, 금속 결합형 오브제 굿즈를 제작하거나 공유공방 형태로 이용할 수 있습니다.',
    contact: '전포동 스튜디오 / 웹사이트 문의',
    websiteUrl: 'https://francoshop.co.kr'
  },

  // 4. 패브릭·실크스크린·자수 (Silkscreen, Fabric Printing, Embroidery)
  {
    id: 'maker-17',
    code: 'TEX—17',
    category: '패브릭·실크스크린·자수',
    name: '수엘비 (SuLB 실크스크린 스튜디오)',
    district: '기장군 정관읍 모전리',
    specialty: '수작업 실크스크린 제판 · 광목 패브릭 포스터 · 에코백/파우치 소량 인쇄',
    moq: '5장 ~ 30장 (원데이 직접 제작 및 소량 의뢰)',
    turnaround: '5–10일',
    equipment: '실크스크린 감광 제판기, 수성/유성 패브릭 잉크 조색 설비, 열처리 프레스',
    artistNote: '실크스크린 전문 강사가 운영하는 공방으로, 작가의 드로잉 도안을 감광 제판하여 광목 포스터, 에코백, 파우치 등에 아날로그 수작업 실크스크린으로 소량 제작하기 좋습니다.',
    contact: '카카오톡 채널 수엘비(SuLB) 문의'
  },
  {
    id: 'maker-18',
    code: 'TEX—18',
    category: '패브릭·실크스크린·자수',
    name: '커스텀오버 (Custom Over)',
    district: '사하구 신산로 120, 펜타플렉스부산 B1 FB106호',
    specialty: '소량 패브릭·티셔츠·에코백·앞치마 디지털 프린팅 및 컴퓨터 자수',
    moq: '1장 ~ 소량 다품종 제작 가능',
    turnaround: '3–7일',
    equipment: 'DTF/DTG 디지털 날염 프린터, 다두식 컴퓨터 자수기, 열전사 프레스',
    artistNote: '회화나 사진 그래픽을 티셔츠·에코백·패브릭 굿즈에 풀컬러로 소량 인쇄하거나, 작가 시그니처 로고를 정밀 자수로 새길 때 1장 단위부터 대응해 주는 부산 패브릭 제작소입니다.',
    contact: '펜타플렉스부산 B1 작업장 / 웹 견적',
    websiteUrl: 'http://customover.com'
  },
  {
    id: 'maker-19',
    code: 'TEX—19',
    category: '패브릭·실크스크린·자수',
    name: '예림컴퓨터자수 & 제일컴퓨터자수',
    district: '중구 중구로 141 (동광동5가) / 동구 진시장로 20 (범일동)',
    specialty: '아티스트 자수 와펜 · 직조 에디션 라벨 · 패브릭 오브제 직자수 가공',
    moq: '20개 ~ 50개 (펀칭비 별도)',
    turnaround: '4–7일',
    equipment: '산업용 다침 컴퓨터 자수기, 열컷팅 와펜 가공기, 펀칭 데이터 설계 시스템',
    artistNote: '드로잉 캐릭터를 입체감 있는 자수 와펜(브로치·키링)으로 만들거나, 패브릭 포스터 하단에 부착할 에디션 넘버링 자수 라벨을 소량 발주할 수 있는 로컬 자수 전문점입니다.',
    contact: '동광동 / 범일동 진시장 방문 상담'
  },

  // 5. 패키지·액자·화방 (Custom Packaging, Exhibition Framing, Art Materials)
  {
    id: 'maker-20',
    code: 'PKG—20',
    category: '패키지·액자·화방',
    name: '더상자 (The Sangza 부산공장)',
    district: '사상구 새벽로121번길 21 (감전동)',
    specialty: '맞춤형 지류·PET 패키지 박스 · 지기구조 설계 · 굿즈 단상자/샘플 제작',
    moq: '소량 샘플 제작 ~ 본생산 (규격별 상이)',
    turnaround: '5–8일',
    equipment: 'CAD 지기구조 샘플 플로터(무목형 커팅), 칼라박스 인쇄·합지·톰슨 설비',
    artistNote: '도자기·유리·아크릴 문진 등 파손되기 쉬운 입체 오브제 굿즈의 외경에 딱 맞는 내부 패드와 단상자 지기구조를 설계하고 샘플을 먼저 확인해 볼 수 있는 부산 대표 패키지 공장입니다.',
    contact: '사상구 감전동 제2공장 / 온라인 견적',
    websiteUrl: 'http://thesangza.com'
  },
  {
    id: 'maker-21',
    code: 'PKG—21',
    category: '패키지·액자·화방',
    name: '(주)현진패키지 & 아이팩디자인패키지',
    district: '강서구 공항로383번길 150-1 / 대저로135번길 37 (대저동)',
    specialty: '아트 에디션 하드케이스(싸바리 박스) · 슬리브 상자 · 소형 기프트 박스',
    moq: '품목별 상담 (기성 지형 활용 시 비용 절감)',
    turnaround: '7–10일',
    equipment: '싸바리 고급 박스 성형기, 박(Foil)·코팅·합지·도무송 자동화 라인',
    artistNote: '한정판 아트 에디션이나 기업·기관 납품용 아트 굿즈 세트를 위해 두꺼운 하드보드 싸바리 박스와 청박·은박 후가공 패키지를 제작할 때 적합한 강서구 패키지 전문 제조사입니다.',
    contact: '강서구 대저동 공장 / 웹사이트 상담',
    websiteUrl: 'http://hyunjinpk.com'
  },
  {
    id: 'maker-22',
    code: 'FRM—22',
    category: '패키지·액자·화방',
    name: '아리랑액자 (구 삼현공예) & 홍익화방',
    district: '사하구 감내1로 52 (감천동) / 서구 보수대로 243 (동대신동)',
    specialty: '전시용 원목·금속·아크릴 관액자 맞춤 표구 · 캔버스/판넬/미술 재료',
    moq: '1점 (소형 아트프린트 액자 ~ 대형 전시 액자)',
    turnaround: '3–7일',
    equipment: '37년 전통 광폭 원목·알루미늄 프레임 정밀 재단기, 무산성 매트 커팅기',
    artistNote: '지클레 프린트나 리소 포스터를 액자 에디션 굿즈로 판매할 때 필요한 소형 원목·알루미늄 액자부터 미술관급 대형 아크릴 관액자, 정품 캔버스 판넬까지 제작·수급할 수 있는 노포입니다.',
    contact: '아리랑액자(사하구) / 홍익화방(서구)',
    websiteUrl: 'http://seoartgallery.com'
  }
];

export const COLLAB_SOUVENIRS: CollabSouvenirEdition[] = [];

export const INITIAL_COLLAB_POSTS: CollabPost[] = [
  {
    id: 'col-00',
    date: '2026.11.04',
    type: '콜라보모집',
    title: '[floreur 공식] 2026 겨울 부산 관광기념품 아트 에디션(엽서북·아크릴 문진) 참여 작가 모집',
    author: 'floreur (PARANG 운영팀)',
    district: '부산 전역',
    targetCount: '회화·드로잉·사진·공예 작가 5인',
    deadline: '11.25 마감',
    description: '부산의 바다·원도심·산복도로를 모티프로 한 기존 작품 이미지를 활용해 소량 아트 관광기념품 시제품을 함께 제작할 작가님을 찾습니다. 제작 공정 및 패키징은 floreur가 전담하며, 아트샵 입점 및 B2B 납품 시 작가 로열티를 정산합니다.'
  },
  {
    id: 'col-open-01',
    date: '2026.11.03',
    type: '전시·지원공고',
    title: '[공모] KT&G 상상마당 부산 디자인스퀘어 로컬 아티스트 굿즈·오브제 상시 입점 공모',
    author: 'KT&G 상상마당 부산',
    district: '부산진구 서면',
    targetCount: '부산 거점 시각예술·공예 창작자',
    deadline: '11.30 마감',
    description: '서면 상상마당 부산 2층 디자인스퀘어 아트샵에 입점할 부산 작가들의 아트 포스터, 엽서북, 도자, 아크릴 오브제 브랜드를 모집합니다. 위탁 판매 방식으로 운영됩니다.'
  },
  {
    id: 'col-open-02',
    date: '2026.11.01',
    type: '전시·지원공고',
    title: '[대관공모] 2027 상반기 청년아트스테이션 새물갤러리 청년작가 무료/우대 대관 공모',
    author: '청년아트스테이션',
    district: '북구 화명동',
    targetCount: '부산 활동 만 39세 이하 청년작가 개인/단체',
    deadline: '11.22 마감',
    description: '만 39세 이하 부산 청년 시각예술가를 대상으로 전시장(36평) 대관료 감면 및 리플렛 제작비 일부를 지원하는 정기 대관 공모입니다.'
  },
  {
    id: 'col-01',
    date: '2026.11.02',
    type: '공동발주',
    title: '11월 셋째 주 중앙동 인쇄골목 코발트 청박(Blue Foil) 보증서 카드 합판 발주하실 작가님 (3/5명)',
    author: '김근예 (일러스트 · 중앙동)',
    district: '중구 중앙동',
    targetCount: '5명 합판 (1인당 200매)',
    deadline: '11.12 마감',
    description: '두성종이 비오톱 300g 용지에 작품 보증서 겸 캡션 카드를 제작합니다. 합판으로 진행해 지류 재단비와 박 기본 세팅비를 1/5로 나눌 예정입니다.'
  },
  {
    id: 'col-02',
    date: '2026.10.29',
    type: '굿즈협업',
    title: '해운대 아트페어 출품용 입체 오브제 × 그래픽 패키지 콜라보 작가님 찾습니다',
    author: '배지윤 (입체조형 · 원도심)',
    district: '중구 동광동',
    targetCount: '일러스트/그래픽 작가 1분',
    deadline: '11.15 마감',
    description: '소량 오브제 에디션 50세트의 슬리브 그래픽 및 아트워크를 함께 구성해 공동 에디션으로 선보일 작가님을 찾습니다.'
  },
  {
    id: 'col-03',
    date: '2026.10.24',
    type: '마켓부스',
    title: '12월 원도심 윈터 아트북 & 오브제 마켓 대형 테이블 부스 쉐어',
    author: '이지영 (디자인 · 스튜디오 숲)',
    district: '중구 중앙동',
    targetCount: '공예 또는 회화 분야 1팀',
    deadline: '11.20 마감',
    description: '아트북과 지류 포스터 위주라 테이블 절반 여유가 있습니다. 입체 소품이나 도자·유리 오브제 다루시는 작가님과 함께 구성하면 시각적 균형이 좋을 것 같습니다.'
  }
];

export const GALLERIES: GallerySpace[] = [
  {
    id: 'gal-01',
    indexNo: 'SPC—01',
    name: '조현화랑 달맞이 (Johyun Gallery)',
    nameEn: 'JOHYUN GALLERY',
    zone: '해운대구',
    address: '부산광역시 해운대구 달맞이길65번길 171',
    coordinates: '35.1588° N, 129.1742° E',
    spaceType: '현대미술 대표 화랑',
    hours: '10:30 – 18:30',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    description: '달맞이언덕 소나무 숲과 해운대 바다가 내려다보이는 한국 대표 현대미술 화랑으로 국내외 동시대 미술 거장 및 유망 작가의 기획전을 선보입니다.',
    currentExhibition: {
      title: '《동시대 물질과 평면: 해운대 기획전》',
      artists: '김종학, 이배, 박서보 외',
      period: '2026.10.10 – 2026.12.06',
      note: '본관 1·2층 전시실 및 아카이브 룸 운영'
    },
    spaceSpecs: {
      area: '330㎡ (약 100평, 복층 전시장)',
      ceilingHeight: '최고 5.5m 보이드',
      wallType: '미술관급 무반사 백색 도장 가벽 및 자연광 루버',
      submissionInfo: '학예실 기획 초대전 중심 운영 (포트폴리오 이메일 접수)'
    },
    rentalAndSales: {
      rentalAvailable: false,
      rentalFeeSummary: '기획 초대전 전용 (일반 대관 미운영)',
      pyeong: '약 100평 (330㎡ · 1~2F)',
      artworkSales: true,
      commissionRate: '전속·초대 계약 기준 (화랑 표준 50%)',
      artShopAvailable: true,
      artShopNote: '전시 연계 도록 · 에디션 판화 · 아트 오브제 아카이브 룸 판매',
      includedFacilities: '미술관급 항온항습 · 자연광 루버 · 전문 학예/설치팀'
    },
    mapPos: { x: 80, y: 44 }
  },
  {
    id: 'gal-02',
    indexNo: 'SPC—02',
    name: '고은사진미술관 (Goeun Museum of Photography)',
    nameEn: 'GOEUN MUSEUM',
    zone: '해운대구',
    address: '부산광역시 해운대구 해운대로452번길 16 (우동)',
    coordinates: '35.1665° N, 129.1462° E',
    spaceType: '사진 전문 등록 미술관',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: '지방 최초의 사진 전문 미술관으로 한국 현대사진 아카이빙, 해외 교류전, KT&G 상상마당 올해의 사진가상 연계 전시를 꾸준히 개최합니다.',
    currentExhibition: {
      title: '《PORT OF LENS: 부산 다큐멘터리 사진 아카이브》',
      artists: '고은, 김옥선, 이지훈 외',
      period: '2026.10.15 – 2026.12.20',
      note: '1층 사진 전문 라이브러리 및 아카이브 열람 가능'
    },
    spaceSpecs: {
      area: '264㎡ (본관 2·3층 전시실)',
      ceilingHeight: '3.6m',
      wallType: '무반사 다크그레이·화이트 가변 파티션 및 정밀 색온도 스팟 조명',
      submissionInfo: '연례 사진가 지원 프로그램 및 기획 공모 운영'
    },
    rentalAndSales: {
      rentalAvailable: false,
      rentalFeeSummary: '기획·공모 선정작가 무료 전시 지원',
      pyeong: '약 80평 (264㎡ · 2~3F)',
      artworkSales: false,
      commissionRate: '비영리 미술관 (작품 직접 판매 미진행)',
      artShopAvailable: true,
      artShopNote: '1층 아트북 라이브러리 내 사진집 · 도록 · 포스터 에디션 입점',
      includedFacilities: '정밀 색온도 조명 · 무반사 프레임 · 아카이브 라이브러리'
    },
    mapPos: { x: 73, y: 42 }
  },
  {
    id: 'gal-03',
    indexNo: 'SPC—03',
    name: '맥화랑 & 소울아트스페이스 (Gallery Mac & Soul Art Space)',
    nameEn: 'GALLERY MAC · SOUL ART',
    zone: '해운대구',
    address: '부산광역시 해운대구 달맞이길117번나길 162, 2F / 해운대해변로 30',
    coordinates: '35.1592° N, 129.1805° E',
    spaceType: '기획 화랑 · 아트 에디션 쇼룸',
    hours: '10:30 – 18:30',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=1200&q=80',
    description: '달맞이길과 마린시티를 대표하는 중견 화랑으로 청년·중견 작가 초대전 및 합리적인 가격대의 소품·에디션 전시로 대중과 컬렉터를 연결합니다.',
    currentExhibition: {
      title: '《100만원으로 내 집 마련: 부산 미술 에디션전》',
      artists: '부산·경남 청년 및 중견 작가 30인',
      period: '2026.10.22 – 2026.11.30',
      note: '원화 소품 및 판화·오브제 에디션 현장 구매 가능'
    },
    spaceSpecs: {
      area: '145㎡ (약 44평)',
      ceilingHeight: '3.4m',
      wallType: '백색 수성도장 가벽 + 해변 조망 테라스 라운지',
      submissionInfo: '신진·청년작가 포트폴리오 상시 검토'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '기획초대 병행 · 대관 시 1주 약 150~200만 원 (별도 협의)',
      pyeong: '약 44평 (145㎡ · 평당 약 3.5만 원)',
      artworkSales: true,
      commissionRate: '작품 판매 수수료 40~50% (에디션·소품전 활발)',
      artShopAvailable: true,
      artShopNote: '판화 에디션 · 아트 오브제 · 작가 굿즈 상설 쇼룸 위탁 판매 가능',
      includedFacilities: '레일 조명 · 와이어 걸이 · VIP 컬렉터 프리뷰 발송 지원'
    },
    mapPos: { x: 83, y: 46 }
  },
  {
    id: 'gal-04',
    indexNo: 'SPC—04',
    name: '국제갤러리 부산 (Kukje Gallery Busan · F1963)',
    nameEn: 'KUKJE GALLERY BUSAN',
    zone: '수영구',
    address: '부산광역시 수영구 구락로123번길 20, F1963 내',
    coordinates: '35.1768° N, 129.1145° E',
    spaceType: '글로벌 현대미술 화랑 · 복합문화공간',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1200&q=80',
    description: '구 고려제강 와이어 공장을 재생한 복합문화공간 F1963 내에 위치하며, 부산 비엔날레 및 국제 수준의 현대미술 전시를 선보이는 거점 공간입니다.',
    currentExhibition: {
      title: '《TACTILE HORIZON: 물질과 구조의 공명》',
      artists: '양혜규, 강이경, 권현조 외',
      period: '2026.10.12 – 2026.12.15',
      note: 'F1963 석천홀 및 YES24 아트북 스토어 연계 관람 가능'
    },
    spaceSpecs: {
      area: '300㎡ (약 90평)',
      ceilingHeight: '4.8m (노출 트러스 구조)',
      wallType: '고하중 전시 가벽 및 대형 설치물 반입 슬라이딩 도어',
      submissionInfo: '전속 및 초대전 중심 기획 운영'
    },
    rentalAndSales: {
      rentalAvailable: false,
      rentalFeeSummary: '국제갤러리 기획전 전용 (F1963 석천홀은 별도 기업/기관 대관)',
      pyeong: '약 90평 (300㎡)',
      artworkSales: true,
      commissionRate: '전속·기획 초대전 기준',
      artShopAvailable: true,
      artShopNote: 'F1963 내 아트북 스토어 및 전시 아카이브 코너 연계 입점 가능',
      includedFacilities: '대형 슬라이딩 반입구 · 고하중 트러스 · 미술관급 조명'
    },
    mapPos: { x: 64, y: 45 }
  },
  {
    id: 'gal-05',
    indexNo: 'SPC—05',
    name: '공간 힘 & 미광화랑 (Space Heem & Mikwang Gallery)',
    nameEn: 'SPACE HEEM · MIKWANG',
    zone: '수영구',
    address: '부산광역시 수영구 수미로50번가길 3, 4F (수영동) / 광남로172번길 2 (민락동)',
    coordinates: '35.1542° N, 129.1185° E',
    spaceType: '비영리 대안공간 · 지역 원로/중견 화랑',
    hours: '11:00 – 19:00',
    closedDays: '전시 일정별 상이 (월요일 휴관)',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    description: '수영구 망미·수영권의 실험적 비영리 전시공간 ‘공간 힘’과 광안리 민락동에서 부산 근현대 미술사를 지켜온 ‘미광화랑’이 공존하는 권역입니다.',
    currentExhibition: {
      title: '《실험실의 파동: 부산 신진 큐레이터·작가 워크숍전》',
      artists: '김문주, 김도연, 신기쁨 외',
      period: '2026.11.01 – 2026.11.29',
      note: '주말 아티스트 토크 및 비평 라운드테이블 진행'
    },
    spaceSpecs: {
      area: '88㎡ ~ 130㎡',
      ceilingHeight: '3.2m',
      wallType: '가변형 합판 백색 가벽 및 프로젝션 암막 설비 지원',
      submissionInfo: '비영리 실험예술·평론·기획전 공모 상시 운영'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1주 70~110만 원 (공모 선정 시 공간 무료 지원)',
      pyeong: '약 27~40평 (평당 약 2.6만 원)',
      artworkSales: true,
      commissionRate: '미광화랑 판매 수수료 40% / 공간 힘 비영리 자율 판매',
      artShopAvailable: true,
      artShopNote: '독립출판 아트북 · 실험 음반 · 아티스트 엽서팩 전시 기간 위탁 판매',
      includedFacilities: '빔프로젝터 · 암막 커튼 · 음향 장비 · 가변 가벽'
    },
    mapPos: { x: 62, y: 54 }
  },
  {
    id: 'gal-06',
    indexNo: 'SPC—06',
    name: '또따또가 갤러리40 & 부산근현대역사관 별관',
    nameEn: 'TOTATOGA GALLERY 40',
    zone: '중구',
    address: '부산광역시 중구 동광길 49 (동광동, 40계단 문화관 인근) / 대청로 104',
    coordinates: '35.1041° N, 129.0348° E',
    spaceType: '원도심 창작공간 갤러리 · 공공 아카이브홀',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    description: '중앙동·동광동 인쇄골목과 40계단 일대에 자리한 원도심 창작공간 또따또가 입주작가들의 핵심 발표장이자 아트북·공예 릴레이 전시 공간입니다.',
    currentExhibition: {
      title: '《원도심의 층위: 또따또가 6기 입주작가 쇼케이스》',
      artists: '신미정, 권현조, 김현진, 전은진, 손원영 외',
      period: '2026.10.20 – 2026.12.10',
      note: '중앙동 오픈 스튜디오 투어 및 아티스트 굿즈 현장 판매'
    },
    spaceSpecs: {
      area: '112㎡ (약 34평)',
      ceilingHeight: '3.5m',
      wallType: '합판 백색 도장 가벽 및 공예 오브제용 모듈형 좌대 12조',
      submissionInfo: '원도심 활동 예술가 및 창작공간 연계 대관 우선 지원'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '원도심 예술가 우대 대관 · 1주 약 35~50만 원 (실비 수준)',
      pyeong: '약 34평 (112㎡ · 평당 약 1.2만 원)',
      artworkSales: true,
      commissionRate: '별도 화랑 수수료 없음 (작가 직접 판매 100%)',
      artShopAvailable: true,
      artShopNote: '원도심 인쇄골목 연계 아트북 · 엽서 · 공예 굿즈 팝업 매대 무료 운영',
      includedFacilities: '공예 좌대 12조 · 레일 조명 · 오픈스튜디오 투어 연계 홍보'
    },
    mapPos: { x: 34, y: 74 }
  },
  {
    id: 'gal-07',
    indexNo: 'SPC—07',
    name: '스페이스 원지 (SPACE ONE Z)',
    nameEn: 'SPACE ONE Z YEONGDO',
    zone: '영도구',
    address: '부산광역시 영도구 봉래나루로 214 (봉래동2가)',
    coordinates: '35.0938° N, 129.0445° E',
    spaceType: '복합문화공간 · 오션프론트 아트 갤러리',
    hours: '10:30 – 21:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '영도 봉래동 부두 창고를 재생한 대형 복합문화공간으로, 부산항 북항 수변 풍경과 맞닿은 전시장에서 입체 조형·설치·공예 기획전을 개최합니다.',
    currentExhibition: {
      title: '《부두와 조형: 영도 해양 오브제 프로젝트》',
      artists: '강준호, 김남진, 곽순곤 외',
      period: '2026.10.18 – 2026.12.12',
      note: '1층 아트 라운지 내 작가 콜라보 굿즈 팝업 운영'
    },
    spaceSpecs: {
      area: '240㎡ (약 72평)',
      ceilingHeight: '6.2m (구 선박창고 박공 트러스)',
      wallType: '노출 벽돌·콘크리트 및 대형 가변 가벽',
      submissionInfo: '대형 설치·조각·팝업 쇼케이스 기획 대관 수시 접수'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1주 140~180만 원 (기획 공동주최 시 대관료 감면/수익쉐어 가능)',
      pyeong: '약 72평 (240㎡ · 평당 약 2.2만 원)',
      artworkSales: true,
      commissionRate: '작품 판매 수수료 30% (기획 협업 시 협의)',
      artShopAvailable: true,
      artShopNote: '1층 카페 & 아트라운지 내 부산 관광기념품 · 작가 굿즈 팝업존 상시 입점 가능 (수수료 25%)',
      includedFacilities: '층고 6.2m 박공 트러스 · 대형 반입문 · 오디오 시스템 · 카페 라운지'
    },
    mapPos: { x: 38, y: 82 }
  },
  {
    id: 'gal-08',
    indexNo: 'SPC—08',
    name: 'KT&G 상상마당 부산 갤러리',
    nameEn: 'SANGSANGMADANG BUSAN',
    zone: '부산진구',
    address: '부산광역시 부산진구 서면로 39, 4–5F (부전동)',
    coordinates: '35.1544° N, 129.0588° E',
    spaceType: '청년 복합문화예술센터 · 디자인 스퀘어',
    hours: '10:00 – 20:00 (디자인스퀘어 22:00까지)',
    closedDays: '연중무휴 (전시 교체일 휴관)',
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    description: '서면 중심부에 위치한 대형 예술 플랫폼으로 4~5층 현대미술 갤러리와 2층 디자인스퀘어(아티스트 굿즈·오브제 입점 편집숍)가 유기적으로 결합되어 있습니다.',
    currentExhibition: {
      title: '《ARTIST LAB BUSAN: 청년 시각예술 선정작가전》',
      artists: '주다은, 박소현, 최성진, 황지현 외',
      period: '2026.10.25 – 2026.12.18',
      note: '2층 디자인스퀘어에서 부산 작가 제작 굿즈 상시 입점 판매'
    },
    spaceSpecs: {
      area: '410㎡ (4층·5층 복층 갤러리)',
      ceilingHeight: '4.2m',
      wallType: '미술관급 무몰딩 백색 가벽 및 천장 그리드 조명 레일',
      submissionInfo: '연례 부산 신진작가 공모(ARTISTART) 및 디자인스퀘어 굿즈 입점 공모'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '부분 대관 및 대학/단체 기획 대관 가능 (공모 선정 시 전액 지원)',
      pyeong: '약 124평 (410㎡ · 4~5F 분할 대관 가능)',
      artworkSales: true,
      commissionRate: '작품 판매 수수료 20~30% (청년작가 우대)',
      artShopAvailable: true,
      artShopNote: '2층 디자인스퀘어 대형 아트샵 상시 입점 공모 운영 (부산 작가 굿즈 최다 입점처)',
      includedFacilities: '그리드 조명 레일 · 대형 화물 엘리베이터 · 전시장 지킴이 · 홍보 배너'
    },
    mapPos: { x: 46, y: 50 }
  },
  {
    id: 'gal-09',
    indexNo: 'SPC—09',
    name: '갤러리 앱스트랙트 & 부산문화회관 전시실',
    nameEn: 'GALLERY ABSTRACT · NAM-GU',
    zone: '남구',
    address: '부산광역시 남구 분포로 61, 2F (용호동) / 유엔평화로76번길 1 (대연동)',
    coordinates: '35.1282° N, 129.1065° E',
    spaceType: '현대미술 화랑 · 공공 종합전시관',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    description: '남구 용호동 해안가의 현대미술 전문 갤러리 앱스트랙트와 대연동 부산문화회관 대전시실·중전시실을 아우르는 남구 예술 거점입니다.',
    currentExhibition: {
      title: '《색면과 수평선: 부산 추상회화 8인전》',
      artists: '권혁, 강미경, 김경화, 김보경 외',
      period: '2026.10.30 – 2026.12.05',
      note: '개인전 및 단체전 정기 대관 병행'
    },
    spaceSpecs: {
      area: '165㎡ (약 50평)',
      ceilingHeight: '3.6m',
      wallType: '백색 도장 가벽 및 작품 걸이 레일 시스템',
      submissionInfo: '상·하반기 정기 대관 신청 및 기획 초대전 운영'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1주 85만 원 (부산문화회관 전시실은 일일/주간 공립 조례 단가 적용)',
      pyeong: '약 50평 (165㎡ · 평당 약 1.7만 원)',
      artworkSales: true,
      commissionRate: '사설 갤러리 판매 수수료 30% / 문화회관 수수료 없음',
      artShopAvailable: false,
      artShopNote: '전시 기간 중 작가 개인 도록 · 엽서 현장 비치 판매 가능',
      includedFacilities: '작품 걸이 레일 · 와이어 · 스팟 조명 · 오프닝 리셉션 테이블'
    },
    mapPos: { x: 56, y: 66 }
  },
  {
    id: 'gal-10',
    indexNo: 'SPC—10',
    name: '청년아트스테이션 새물갤러리 & 갤러리 유피',
    nameEn: 'SAEMUL GALLERY · BUK-GU',
    zone: '북구',
    address: '부산광역시 북구 학사로 135 (화명동) / 기찰로 3, B1 (덕천동)',
    coordinates: '35.2285° N, 129.0142° E',
    spaceType: '청년 예술 창작플랫폼 · 기획 전시장',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일·공휴일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: '북구 화명동·덕천동 권역에서 청년 시각예술가들의 실험적 전시와 주민 참여형 아트마켓, 워크숍을 지원하는 서부산 북부 핵심 거점입니다.',
    currentExhibition: {
      title: '《낙동강변의 시선: 북구 청년작가 릴레이전》',
      artists: '김수연, 김유림, 강민수 외',
      period: '2026.10.15 – 2026.11.30',
      note: '청년 예술인 대관료 감면 및 도록·리플렛 제작비 일부 지원'
    },
    spaceSpecs: {
      area: '118㎡ (약 36평)',
      ceilingHeight: '3.2m',
      wallType: '화이트 큐브 가벽 + 이동형 전시 파티션 8조',
      submissionInfo: '부산 거점 청년 작가(만 39세 이하) 무료/우대 대관 공모'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '청년작가 공모 무료 ~ 일반 대관 1주 40만 원',
      pyeong: '약 36평 (118㎡ · 평당 약 1.1만 원)',
      artworkSales: true,
      commissionRate: '판매 수수료 없음 (작가 수익 100%)',
      artShopAvailable: true,
      artShopNote: '주말 청년 아트마켓 부스 및 전시장 내 굿즈 쇼케이스 상시 운영',
      includedFacilities: '이동형 파티션 8조 · 좌대 · 리플렛 디자인/인쇄 일부 지원'
    },
    mapPos: { x: 34, y: 24 }
  },
  {
    id: 'gal-11',
    indexNo: 'SPC—11',
    name: '성원아트갤러리 & 동래문화회관 전시실',
    nameEn: 'SUNGWON ART · DONGNAE',
    zone: '동래구',
    address: '부산광역시 동래구 아시아드대로 250, 1F (사직동) / 문화로 80 (명륜동)',
    coordinates: '35.1982° N, 129.0685° E',
    spaceType: '기획 화랑 · 구립 문화회관 전시실',
    hours: '10:30 – 18:30',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=1200&q=80',
    description: '사직동과 명륜동을 잇는 동래구의 대표 전시 공간으로 한국화·서양화·도자·공예 분야 지역 작가들의 개인전 및 초대전이 활발히 열립니다.',
    currentExhibition: {
      title: '《온천과 필묵: 동래 현대 한국화·도예 교류전》',
      artists: '김덕길, 김영미, 김원정 외',
      period: '2026.11.01 – 2026.12.04',
      note: '도자·회화 소품 상설 아카이브 운영'
    },
    spaceSpecs: {
      area: '132㎡ (약 40평)',
      ceilingHeight: '3.3m',
      wallType: '백색 석고보드 도장 및 집중 스팟 조명',
      submissionInfo: '개인전·단체전 수시 대관 문의 가능'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1주 75만 원 (단체전 4~6인 대관 시 인당 약 15만 원)',
      pyeong: '약 40평 (132㎡ · 평당 약 1.9만 원)',
      artworkSales: true,
      commissionRate: '작품 판매 수수료 30%',
      artShopAvailable: true,
      artShopNote: '도자 다기 · 소품 · 한국화 아트상품 상설 코너 위탁 입점 가능',
      includedFacilities: '도자 전시용 유리 쇼케이스 · 좌대 15조 · 레일 조명'
    },
    mapPos: { x: 52, y: 34 }
  },
  {
    id: 'gal-12',
    indexNo: 'SPC—12',
    name: '부산현대미술관 & 홍티아트센터',
    nameEn: 'MOCA BUSAN · HONGTI ART',
    zone: '사하구',
    address: '부산광역시 사하구 낙동남로 1191 (을숙도) / 다산로106번길 6 (다대동)',
    coordinates: '35.1092° N, 128.9426° E',
    spaceType: '공립 현대미술관 · 설치/미디어 레지던시',
    hours: '10:00 – 18:00 (입장 마감 17:30)',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1200&q=80',
    description: '을숙도 생태공원 내 위치한 부산현대미술관과 다대포 무지개공단 내 부산문화재단 운영 설치·입체 예술 레지던시 ‘홍티아트센터’가 위치한 서부산 예술 축입니다.',
    currentExhibition: {
      title: '《생태와 기계의 경계: 홍티아트센터 입주작가 릴레이전》',
      artists: '김순임, 김성연, 강정이 외',
      period: '2026.10.14 – 2026.12.25',
      note: '홍티아트센터 1층 오픈 스튜디오 및 설치 전시장 무료 관람'
    },
    spaceSpecs: {
      area: '대형 전시장 및 층고 7m 설치 스튜디오',
      ceilingHeight: '4.5m – 7.2m',
      wallType: '노출 콘크리트 및 고하중 크레인·미디어 영사 설비',
      submissionInfo: '부산문화재단 홍티아트센터 국내외 입주작가 매년 정기 공모'
    },
    rentalAndSales: {
      rentalAvailable: false,
      rentalFeeSummary: '공립 미술관 · 레지던시 공모 선정작가 전액 무료 지원',
      pyeong: '대형 설치홀 (층고 7.2m)',
      artworkSales: false,
      commissionRate: '공립 기관 (현장 매매 미진행, 컬렉터 문의 시 작가 연결)',
      artShopAvailable: true,
      artShopNote: '미술관 뮤지엄샵 내 전시 연계 아트상품 · 도록 입점 운영',
      includedFacilities: '천장 호이스트 크레인 · 대형 프로젝터 · 입주작가 개인 스튜디오'
    },
    mapPos: { x: 18, y: 74 }
  },
  {
    id: 'gal-13',
    indexNo: 'SPC—13',
    name: '금샘미술관 & 킴스아트필드미술관',
    nameEn: 'GEUMSAEM · KIMS ARTFIELD',
    zone: '금정구',
    address: '부산광역시 금정구 체육공원로 7 (구서동) / 죽전1길 29 (장전동)',
    coordinates: '35.2485° N, 129.0924° E',
    spaceType: '구립 미술관 · 사립 자연친화 미술관',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    description: '금정문화회관 내 금샘미술관과 금정산 자락의 킴스아트필드미술관, 부산대 앞 대안공간들이 모여 있어 대학가 신진 작가 발표가 가장 활발한 구역입니다.',
    currentExhibition: {
      title: '《금정의 젊은 시선: 신진 조형·회화 포트폴리오전》',
      artists: '김유경, 김윤선, 김은영 외',
      period: '2026.10.28 – 2026.12.08',
      note: '전시실 1·2·3관 통합 대관 및 청년 기획전 운영'
    },
    spaceSpecs: {
      area: '360㎡ (3개 전시실 합산)',
      ceilingHeight: '3.8m',
      wallType: '미술관급 백색 가벽 및 슬라이딩 이동 파티션',
      submissionInfo: '금정문화회관 금샘미술관 정기·수시 대관 공고 접수'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1전시실 기준 1주 약 45~65만 원 (구립 조례 기준 합리적 단가)',
      pyeong: '약 35~108평 (1·2·3관 선택 대관 가능)',
      artworkSales: true,
      commissionRate: '금샘미술관 수수료 없음 / 킴스아트필드 30%',
      artShopAvailable: false,
      artShopNote: '전시 기간 중 리셉션 데스크 도록 · 엽서 판매 가능',
      includedFacilities: '슬라이딩 가벽 · 미술관급 조명 · 넓은 무료 주차장'
    },
    mapPos: { x: 58, y: 18 }
  },
  {
    id: 'gal-14',
    indexNo: 'SPC—14',
    name: '갤러리 수정 & 문화공감 수정',
    nameEn: 'GALLERY SUJEONG · DONG-GU',
    zone: '동구',
    address: '부산광역시 동구 수정공원로 29 (수정동) / 홍곡로 75 (초량동)',
    coordinates: '35.1268° N, 129.0412° E',
    spaceType: '도시재생 아파트 갤러리 · 산복도로 전시공간',
    hours: '11:00 – 18:00',
    closedDays: '매주 월·화 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    description: '산복도로의 오래된 수정아파트를 개조해 만든 독특한 건축적 전시 공간으로, 부산항과 원도심 지형을 주제로 한 사진·설치·드로잉 전시에 최적화된 곳입니다.',
    currentExhibition: {
      title: '《산복도로의 빛과 그림자: 초량·수정 아카이브전》',
      artists: '강지호, 김기드온, 김동유 외',
      period: '2026.10.20 – 2026.11.30',
      note: '부산역 유라시아플랫폼에서 도보·버스 10분 거리'
    },
    spaceSpecs: {
      area: '66㎡ (구 아파트 내부 구조 보존형 전시장)',
      ceilingHeight: '2.6m',
      wallType: '빈티지 시멘트·목구조 노출 및 백색 전시 벽면',
      submissionInfo: '장소특정적(Site-specific) 설치·사진 프로젝트 수시 협의'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1주 30~45만 원 (산복도로·원도심 주제 프로젝트 우대)',
      pyeong: '약 20평 (66㎡ · 평당 약 1.8만 원)',
      artworkSales: true,
      commissionRate: '판매 수수료 20% (소규모 원화·사진 프린트 판매 활발)',
      artShopAvailable: true,
      artShopNote: '산복도로·초량 테마 엽서북 · 사진집 · 마그넷 상설 위탁 판매 가능',
      includedFacilities: '빈티지 목구조 전시 공간 · 소형 프로젝터 · 다도/오프닝 룸'
    },
    mapPos: { x: 40, y: 66 }
  },
  {
    id: 'gal-15',
    indexNo: 'SPC—15',
    name: '사상아트갤러리 & 사상인디스테이션',
    nameEn: 'SASANG ART GALLERY',
    zone: '사상구',
    address: '부산광역시 사상구 광장로 108-1, 3F (괘법동, 사상역 내) / 사상로 201',
    coordinates: '35.1624° N, 128.9845° E',
    spaceType: '역사 내 공공 갤러리 · 청년 서브컬처 아트홀',
    hours: '10:00 – 18:00',
    closedDays: '매주 월요일·일요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    description: '사상역과 바로 연결된 사상아트갤러리 및 컨테이너 복합문화공간 사상인디스테이션(CATs)은 사상구 공단·인쇄단지의 물성과 결합한 청년 예술 전시를 지원합니다.',
    currentExhibition: {
      title: '《INDUSTRIAL WAVE: 사상 공단×예술가 협업 오브제전》',
      artists: '김성수, 김소연, 김수진 외',
      period: '2026.10.22 – 2026.12.02',
      note: '사상구 공업단지 재료(금속·아크릴·지류) 활용 작품 전시'
    },
    spaceSpecs: {
      area: '148㎡ (약 45평)',
      ceilingHeight: '3.5m',
      wallType: '화이트 가벽 및 컨테이너 스틸 모듈 전시장',
      submissionInfo: '사상문화원 및 부산문화재단 연계 대관 공모'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '공모 선정 무료 대관 / 수시 대관 1주 약 40만 원',
      pyeong: '약 45평 (148㎡ · 평당 약 0.9만 원)',
      artworkSales: true,
      commissionRate: '판매 수수료 없음 (직접 거래)',
      artShopAvailable: false,
      artShopNote: '전시 연계 팝업 마켓 부스 운영 가능',
      includedFacilities: '컨테이너 모듈 전시장 · 야외 광장 데크 · 음향/조명 설비'
    },
    mapPos: { x: 26, y: 50 }
  },
  {
    id: 'gal-16',
    indexNo: 'SPC—16',
    name: '갤러리우 & 갤러리아라 기장',
    nameEn: 'GALLERY WOO · GIJANG',
    zone: '기장군',
    address: '부산광역시 기장군 기장읍 대변로 74, CUBE10동 1F / 대청로14번길 8-1',
    coordinates: '35.2245° N, 129.2268° E',
    spaceType: '오션프론트 화랑 · 도자/공예 복합 갤러리',
    hours: '11:00 – 18:30',
    closedDays: '매주 월·화 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '기장 대변항·일광 해안과 기장 도예촌을 잇는 전시 공간으로, 동부산 해안 드라이브 코스를 찾는 컬렉터들에게 회화·도자·유리 공예 작품을 소개합니다.',
    currentExhibition: {
      title: '《동해의 윤슬: 기장 회화·도자 초대전》',
      artists: '김정아, 김정애, 김정원, 김주영 외',
      period: '2026.10.20 – 2026.12.20',
      note: '전시 관람 및 아티스트 도자·오브제 에디션 상설 쇼룸 운영'
    },
    spaceSpecs: {
      area: '150㎡ (본관 전시장 + 오션뷰 테라스)',
      ceilingHeight: '4.2m',
      wallType: '백색 미장 마감 및 자연 채광 통창',
      submissionInfo: '회화·도예·공예 분야 기획 초대전 및 팝업 대관 협의'
    },
    rentalAndSales: {
      rentalAvailable: true,
      rentalFeeSummary: '1주 100~130만 원 (도자·공예 판매전 시 수수료 기반 대관료 인하 가능)',
      pyeong: '약 45평 (150㎡ · 평당 약 2.4만 원)',
      artworkSales: true,
      commissionRate: '작품 판매 수수료 35~40% (동부산 컬렉터 구매율 높음)',
      artShopAvailable: true,
      artShopNote: '오션뷰 쇼룸 내 도자 굿즈 · 유리 오브제 · 아트 포스터 상시 위탁 입점 가능 (수수료 30%)',
      includedFacilities: '오션뷰 테라스 · 공예 진열대 · VIP 티룸 · 전용 주차장'
    },
    mapPos: { x: 90, y: 20 }
  }
];
