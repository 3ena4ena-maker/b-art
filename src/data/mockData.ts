export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
  goodsAdaptable: boolean;
  editionNote?: string;
}

export interface Artist {
  id: string;
  indexNo: string;
  name: string;
  nameEn: string;
  discipline: '회화' | '도자·오브제' | '프린트·일러스트' | '사진' | '공예·유리' | '텍스타일';
  district: string;
  coordinates: string;
  statement: string;
  bio: string;
  collabStatus: '협업 오픈' | '소량 주문 가능' | '전시 준비 중';
  goodsSpecialties: string[];
  instagram: string;
  email: string;
  portraitUrl: string;
  featuredWorkUrl: string;
  artworks: Artwork[];
}

export interface GoodsManual {
  id: string;
  code: string;
  category: '지류·인쇄' | '오브제·아크릴' | '패브릭·실크스크린' | '패키지·후가공';
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

export interface LocalMaker {
  id: string;
  code: string;
  name: string;
  district: string;
  specialty: string;
  moq: string;
  turnaround: string;
  equipment: string;
  artistNote: string;
  contact: string;
}

export interface CollabPost {
  id: string;
  date: string;
  type: '공동발주' | '굿즈협업' | '마켓부스';
  title: string;
  author: string;
  district: string;
  targetCount: string;
  deadline: string;
  description: string;
}

export interface GallerySpace {
  id: string;
  indexNo: string;
  name: string;
  nameEn: string;
  zone: '원도심·영도' | '전포·서면' | '광안·수영' | '해운대·달맞이' | '기장·일광';
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
  mapPos: { x: number; y: number };
}

export const ARTISTS: Artist[] = [
  {
    id: 'yoon-haejo',
    indexNo: 'ART—01',
    name: '윤해조',
    nameEn: 'YOON HAE-JO',
    discipline: '회화',
    district: '영도구 봉래동',
    coordinates: '35.0928° N, 129.0412° E',
    statement: '영도 물양장의 수면 위에 맺히는 기름막과 조류의 마찰을 유화와 모래 안료로 기록합니다.',
    bio: '부산 영도 봉래동 구 선박수리소 건물을 개조한 작업실에서 활동한다. 시간에 따라 변하는 부산항의 수색(水色)을 채집하여 거친 린넨 위에 겹쳐 바르는 작업을 이어오고 있으며, 원화의 마티에르가 살아있는 아카이벌 프린트와 패브릭 에디션을 병행 제작한다.',
    collabStatus: '협업 오픈',
    goodsSpecialties: ['실크스크린 패브릭 포스터', '아카이벌 피그먼트 에디션', '양장 아트북'],
    instagram: '@haejo.yoon.studio',
    email: 'haejo@parang-index.kr',
    portraitUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80',
    featuredWorkUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80',
    artworks: [
      {
        id: 'w-101',
        title: '조류의 기록 #14 (Tidal Record #14)',
        year: '2026',
        medium: '린넨에 유채, 영도 해안 규사',
        dimensions: '116.8 × 91.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80',
        goodsAdaptable: true,
        editionNote: '하네뮬레 포토랙 308g 50부 한정 프린트 및 엽서북 제작 가능'
      },
      {
        id: 'w-102',
        title: '방파제 오후 5시 20분',
        year: '2025',
        medium: '캔버스에 유채, 콜드왁스',
        dimensions: '72.7 × 60.6 cm',
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '광목 20수 패브릭 포스터 에디션 전환 가능'
      },
      {
        id: 'w-103',
        title: '청색 염분 (Cobalt Salinity)',
        year: '2026',
        medium: '종이에 과슈, 안료',
        dimensions: '42.0 × 29.7 cm',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '리소그라프 2도 별색 포스터 제작 완료'
      }
    ]
  },
  {
    id: 'park-seonwoo',
    indexNo: 'ART—02',
    name: '박선우',
    nameEn: 'PARK SEON-WOO',
    discipline: '도자·오브제',
    district: '수영구 망미동',
    coordinates: '35.1742° N, 129.1088° E',
    statement: '파도가 깎아낸 몽돌의 곡률과 해수면의 윤슬을 백자와 청자 유약의 경계로 번안합니다.',
    bio: '망미동 골목의 소규모 가마 스튜디오에서 물레 성형과 슬립 캐스팅 작업을 병행한다. 일상의 책상 위에서 부산의 바다를 촉각적으로 경험할 수 있는 도자 문진, 인센스 홀더, 소형 주병 등 실용과 조형 사이의 오브제를 주로 선보인다.',
    collabStatus: '소량 주문 가능',
    goodsSpecialties: ['슬립캐스팅 도자 문진', '윤슬 인센스 홀더', '세라믹 타일'],
    instagram: '@seonwoo.ceramic',
    email: 'seonwoo@parang-index.kr',
    portraitUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
    featuredWorkUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
    artworks: [
      {
        id: 'w-201',
        title: '백자 윤슬 화병 (Yoonseul Vessel 08)',
        year: '2026',
        medium: '백자토, 코발트 결정유, 1250°C 환원소성',
        dimensions: 'Ø 14.5 × H 24.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
        goodsAdaptable: false,
        editionNote: '단품 원화 오브제'
      },
      {
        id: 'w-202',
        title: '파도 단면 인센스 홀더 & 문진',
        year: '2026',
        medium: '석기질 점토, 무광 해청유',
        dimensions: '8.5 × 5.2 × 3.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '석고 몰드 기반 30~100개 단위 전시 굿즈 제작 가능'
      },
      {
        id: 'w-203',
        title: '몽돌 문진 시리즈 (Pebble Weight)',
        year: '2025',
        medium: '흑유 및 분청 슬립캐스팅',
        dimensions: '7.0 × 5.5 × 4.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '소량 패키지 에디션 제작 가능'
      }
    ]
  },
  {
    id: 'kim-doha',
    indexNo: 'ART—03',
    name: '김도하',
    nameEn: 'KIM DO-HA',
    discipline: '프린트·일러스트',
    district: '부산진구 전포동',
    coordinates: '35.1558° N, 129.0641° E',
    statement: '부산의 공구상가, 부두 크레인, 해안 열차의 기하학적 구조를 콩기름 리소 잉크로 분판합니다.',
    bio: '전포동에서 프린트 스튜디오 겸 그래픽 작업실을 운영한다. 부산의 산업 풍경과 바다의 대비를 강렬한 별색 판화 기법으로 재해석하며, 지역 서점·갤러리와 협업해 지류 굿즈와 독립출판물을 꾸준히 발행하고 있다.',
    collabStatus: '협업 오픈',
    goodsSpecialties: ['리소그라프 3도 포스터', '아코디언 엽서북', '그래픽 마스킹테이프'],
    instagram: '@doha.press.busan',
    email: 'doha@parang-index.kr',
    portraitUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
    featuredWorkUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    artworks: [
      {
        id: 'w-301',
        title: '부산항 제5부두 크레인 (Pier 5 Cranes)',
        year: '2026',
        medium: '문켄 폴라 러프 240g에 리소그라프 3도 인쇄',
        dimensions: '29.7 × 42.0 cm (A3)',
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        goodsAdaptable: true,
        editionNote: 'Marine Blue + Fluorescent Orange + Black 별색 에디션 상시 발주 가능'
      },
      {
        id: 'w-302',
        title: '영도대교 오후 2시 도개 도면',
        year: '2025',
        medium: '실크스크린 2도, 코튼지',
        dimensions: '50.0 × 70.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '접지 포스터 및 엽서 세트 제작 가능'
      }
    ]
  },
  {
    id: 'jung-seoyoon',
    indexNo: 'ART—04',
    name: '정서윤',
    nameEn: 'JUNG SEO-YOON',
    discipline: '사진',
    district: '중구 중앙동',
    coordinates: '35.1039° N, 129.0347° E',
    statement: '해무가 자욱한 새벽의 다대포와 기장 해안의 수평선을 중형 필름의 고요한 계조로 담아냅니다.',
    bio: '중앙동 구 도심의 암실 기반 사진 작업실에서 흑백 실버 젤라틴 프린트와 컬러 피그먼트 프린트를 제작한다. 사진이 벽면에만 머물지 않고 손에 쥐어지는 물성을 갖도록 아크릴 블록 오브제와 엽서 바인딩 작업을 실험한다.',
    collabStatus: '협업 오픈',
    goodsSpecialties: ['20T 투명 아크릴 사진 문진', '노출 사철 제본 사진집', '포스트카드 팩'],
    instagram: '@seoyoon.archive',
    email: 'seoyoon@parang-index.kr',
    portraitUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    featuredWorkUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80',
    artworks: [
      {
        id: 'w-401',
        title: '해무가 걷히는 오랑대 05:40',
        year: '2026',
        medium: '아카이벌 피그먼트 프린트',
        dimensions: '80.0 × 100.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80',
        goodsAdaptable: true,
        editionNote: '아크릴 블록 마운팅 문진 및 A2 포스터 굿즈화 가능'
      },
      {
        id: 'w-402',
        title: '다대포 간조의 모래 주름',
        year: '2025',
        medium: '젤라틴 실버 프린트',
        dimensions: '50.0 × 60.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '무광 은박 후가공 엽서 에디션 제작 가능'
      }
    ]
  },
  {
    id: 'lee-taekyung',
    indexNo: 'ART—05',
    name: '이태경',
    nameEn: 'LEE TAE-KYUNG',
    discipline: '공예·유리',
    district: '해운대구 달맞이길',
    coordinates: '35.1589° N, 129.1764° E',
    statement: '바닷물의 굴절률과 선박의 황동 부품에서 영감을 얻어 빛을 머금는 유리·금속 기물을 만듭니다.',
    bio: '달맞이길 인근 공방에서 램프워킹과 가마 슬럼핑 기법으로 유리를 다루며 황동 세공을 결합한다. 해운대와 광안리의 빛을 책상 위로 옮겨놓는 코발트 유리 문진과 선박 태그 모티프의 황동 키링 시리즈로 주목받고 있다.',
    collabStatus: '소량 주문 가능',
    goodsSpecialties: ['코발트 유리 문진', '각인 황동 키링', '유리 인센스 트레이'],
    instagram: '@taekyung.glassworks',
    email: 'taekyung@parang-index.kr',
    portraitUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
    featuredWorkUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    artworks: [
      {
        id: 'w-501',
        title: '해수면 굴절 유리 오브제 #09',
        year: '2026',
        medium: '블로잉 글라스, 코발트 산화물, 황동 핀',
        dimensions: 'Ø 9.0 × H 7.5 cm',
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
        goodsAdaptable: true,
        editionNote: '전시 기념 한정판 문진 20개 단위 주문 제작 가능'
      },
      {
        id: 'w-502',
        title: '선박 황동 태그 & 코발트 드롭',
        year: '2026',
        medium: '황동 절삭 각인, 램프워킹 유리',
        dimensions: '3.2 × 7.8 cm',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '황동 키링 에디션 30개 단위 제작 가능'
      }
    ]
  },
  {
    id: 'choi-yul',
    indexNo: 'ART—06',
    name: '최율',
    nameEn: 'CHOI YUL',
    discipline: '텍스타일',
    district: '금정구 장전동',
    coordinates: '35.2314° N, 129.0862° E',
    statement: '쪽염(Indigo)의 농담과 수평적 위사 교차를 통해 부산 바다의 수심 변화를 직조합니다.',
    bio: '장전동 직조 스튜디오에서 수직기와 천연 인디고 염색을 기반으로 패브릭 작업을 전개한다. 회화적 태피스트리부터 실용적인 코스터, 북커버, 와인 보틀백까지 부산의 푸른 색채를 일상의 직물로 확장한다.',
    collabStatus: '협업 오픈',
    goodsSpecialties: ['천연 쪽염 패브릭 코스터', '직조 북커버 & 파우치', '자카드 직조 타월'],
    instagram: '@yul.weave.busan',
    email: 'yul@parang-index.kr',
    portraitUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
    featuredWorkUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    artworks: [
      {
        id: 'w-601',
        title: '수심 40미터의 경사 (Warp of 40m Depth)',
        year: '2026',
        medium: '린넨, 코튼 원사, 천연 쪽염 수직조',
        dimensions: '65.0 × 120.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
        goodsAdaptable: true,
        editionNote: '동일 염색 기법의 북커버 및 티코스터 세트 제작 가능'
      },
      {
        id: 'w-602',
        title: '해안선 위사 교차 #04',
        year: '2025',
        medium: '면사 및 린넨 수직조',
        dimensions: '45.0 × 65.0 cm',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
        goodsAdaptable: true,
        editionNote: '패브릭 코스터 및 북슬리브 제작 가능'
      }
    ]
  }
];

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
    summary: '회화나 사진 작업을 가장 낮은 초기 비용으로 밀도 높은 아트 굿즈로 전환하는 방식입니다. 특히 부산 바다를 상징하는 Marine Blue, Cornflower, Teal 계열 리소 콩기름 잉크와 비코팅 러프글로스지를 조합하면 원화와는 또 다른 판화적 소장 가치를 만듭니다.',
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
    summary: '포스터나 엽서보다 객단가가 높고 전시 공간에서 작품과 함께 진열하기 좋은 고부가가치 굿즈입니다. 두께 15mm~20mm의 고투명 캐스팅 아크릴 배면에 컬러와 화이트(백판) 레이어를 부분 차등 인쇄하면 수면 아래를 들여다보는 듯한 깊이감이 완성됩니다.',
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
    subtitle: '돌돌 말아 여행자의 가방에 넣을 수 있는 부산 아트 포스터: 디지털 텍스타일 프린팅(DTP)과 수작업 실크스크린 비교',
    leadTime: '영업일 기준 7–12일',
    moq: '30장',
    estimatedUnitCost: '50×70cm 기준 장당 7,500원 – 11,000원',
    difficulty: '중급',
    heroImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    summary: '타 지역 방문객이 많은 부산 갤러리·소품샵 특성상 부피가 작고 구김에 강한 패브릭 포스터는 가장 판매 전환율이 높은 품목입니다. 다채로운 회화 원화는 반응성 DTP 날염으로, 그래픽·드로잉 작업은 수성 실크스크린으로 접근하는 것이 정석입니다.',
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
    summary: '초기 제작 수량이 50개 미만일 때 전용 칼선 단상자를 제작하면 목형비와 기본 인쇄비로 인해 배보다 배꼽이 커집니다. 기성 무코팅 지류 상자에 작가 고유의 스펙 시트 라벨(띠지)과 코발트 청박 스탬핑을 결합해 갤러리 에디션 수준의 패키지를 완성합니다.',
    specs: [
      { label: '베이스 패키지', value: '무표백 크라프트 합지 박스 또는 반투명 트레이싱지(110g) 봉투' },
      { label: '슬리브(띠지) 지류', value: '두성종이 비오톱 160g(네이비/그레이) 또는 해조류 재생지 시로 알가 160g' },
      { label: '포인트 후가공', value: '유광 코발트 청박(Blue Foil) 또는 무광 백박(White Foil) 동판 스탬핑' },
      { label: '필수 표기 사항', value: '작가명, 작품 원본 캡션, 제작년도, 소재 및 취급 주의사항, 부산 스튜디오 좌표' }
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
        detail: '가로 50mm × 세로 25mm 이내의 작가 시그니처 동판 1개(제작비 약 2~3만 원)를 파두면 엽서 봉투, 박스 상단, 보증서 카드에 모두 공용으로 청박을 찍을 수 있습니다.',
        technicalTip: '요철이 깊은 코튼지에는 박 압력을 강하게 주어 디보싱(음각) 효과를 동시에 내면 별도 형압 비용 없이도 깊은 입체감이 살아납니다.'
      }
    ],
    checklist: [
      '완성 굿즈 실측 사이즈 대비 내경 +4mm 이상 여유 확보',
      '박(Foil) 데이터 내 0.2mm 이하 세선 및 자간 뭉침 확인',
      '완충재(종이 크라프트 충전재 또는 글라신지) 수급 완료'
    ]
  }
];

export const LOCAL_MAKERS: LocalMaker[] = [
  {
    id: 'maker-01',
    code: 'PRS—01',
    name: '중앙동 제일별색인쇄소',
    district: '중구 중앙동 인쇄골목',
    specialty: '별색 옵셋 인쇄 · 박(청박/먹박) · 형압 후가공',
    moq: '엽서·카드류 100매 / 포스터 50매',
    turnaround: '3–5일',
    equipment: '하이델베르그 2도 옵셋기, 수동 박 인쇄기',
    artistNote: '기성 CMYK로 안 나오는 깊은 바다색 팬톤(Pantone) 별색 조색을 기장님과 직접 눈으로 보며 맞출 수 있는 곳입니다.',
    contact: '중구 충장대로5번길 (방문 감리 가능)'
  },
  {
    id: 'maker-02',
    code: 'PRS—02',
    name: '전포 리소 & 프레스 랩',
    district: '부산진구 전포동',
    specialty: '리소그라프 2~4도 인쇄 · 중철/사철 소량 독립출판 제본',
    moq: '30매',
    turnaround: '4–6일',
    equipment: 'RISO MZ1070 (14개 드럼 보유: Marine Blue, Teal, Coral, Gold 등)',
    artistNote: '분판이 처음인 회화·사진 작가도 원본 PSD를 가져가면 스팟 채널 분판 상담을 함께 진행해 줍니다.',
    contact: '부산진구 전포대로209번길 (예약제 운영)'
  },
  {
    id: 'maker-03',
    code: 'OBJ—03',
    name: '영도 정밀 아크릴 & 레이저 공작소',
    district: '영도구 대평동 (깡깡이마을 인근)',
    specialty: '고투명 아크릴 블록 커팅 · 다이아몬드 경면 가공 · 황동 각인',
    moq: '10개',
    turnaround: '5–7일',
    equipment: '평판 UV 프린터(White/Varnish 지원), CNC 루터, 경면 가공기',
    artistNote: '15T·20T 두꺼운 아크릴 문진 측면 광택 마감 퀄리티가 뛰어나며 소량 다품종 샘플링에 우호적입니다.',
    contact: '영도구 대평북로 (도면 메일 접수 후 방문)'
  },
  {
    id: 'maker-04',
    code: 'TEX—04',
    name: '수영 로우패브릭 스크린 스튜디오',
    district: '수영구 망미동',
    specialty: '패브릭 포스터 실크스크린 · 에코백/파우치 소량 봉제',
    moq: '20장',
    turnaround: '7–10일',
    equipment: '대형 평판 실크스크린 다이(최대 70×100cm), 열풍 건조기, 공업용 본봉틀',
    artistNote: '원단 수급부터 인쇄, 사방 해리 봉제와 라벨 부착까지 한 곳에서 일괄 진행할 수 있어 공정이 단순해집니다.',
    contact: '수영구 과정로 (샘플 원단북 상시 비치)'
  },
  {
    id: 'maker-05',
    code: 'PKG—05',
    name: '사상 동남지류 & 패키지 공방',
    district: '사상구 학장동',
    specialty: '소량 지류 패키지 · 맞춤 슬리브(띠지) · 종이 완충재',
    moq: '50세트',
    turnaround: '4–7일',
    equipment: '디지털 평판 커팅기(무목형 칼선 가공), 자동 접착기',
    artistNote: '목형비 없이 디지털 플로터 커팅으로 도자기나 유리 오브제용 맞춤 지류 박스를 50개 단위로 제작해 줍니다.',
    contact: '사상구 학감대로 (규격 상담 후 샘플 1개 선제작 가능)'
  }
];

export const INITIAL_COLLAB_POSTS: CollabPost[] = [
  {
    id: 'col-01',
    date: '2026.11.02',
    type: '공동발주',
    title: '11월 셋째 주 중앙동 인쇄골목 코발트 청박(Blue Foil) 보증서 카드 합판 발주하실 작가님 (3/5명)',
    author: '윤해조 (회화 · 영도)',
    district: '중구 중앙동',
    targetCount: '5명 합판 (1인당 200매)',
    deadline: '11.12 마감',
    description: '두성종이 비오톱 300g 용지에 작품 보증서 겸 캡션 카드를 제작합니다. 합판으로 진행해 지류 재단비와 박 기본 세팅비를 1/5로 나눌 예정입니다.'
  },
  {
    id: 'col-02',
    date: '2026.10.29',
    type: '굿즈협업',
    title: '해운대 아트페어 출품용 세라믹 인센스 홀더 × 그래픽 패키지 콜라보 작가님 찾습니다',
    author: '박선우 (도자 · 망미동)',
    district: '수영구 망미동',
    targetCount: '일러스트/그래픽 작가 1분',
    deadline: '11.15 마감',
    description: '현재 소성 완료된 파도 단면 인센스 홀더 100세트의 슬리브 그래픽 및 동봉 성냥갑 아트워크를 함께 구성해 공동 에디션으로 선보일 작가님을 찾습니다.'
  },
  {
    id: 'col-03',
    date: '2026.10.24',
    type: '마켓부스',
    title: '12월 영도 물양장 윈터 오브제 마켓 대형 테이블 부스 쉐어 및 디스플레이 집기 공유',
    author: '이태경 (유리공예 · 달맞이)',
    district: '영도구 봉래동',
    targetCount: '지류 또는 패브릭 분야 1팀',
    deadline: '11.20 마감',
    description: '유리 문진 위주라 평면 벽면과 테이블 절반 여유가 있습니다. 지류 포스터나 엽서북 다루시는 작가님과 함께 구성하면 시각적 균형이 좋을 것 같습니다.'
  }
];

export const GALLERIES: GallerySpace[] = [
  {
    id: 'gal-01',
    indexNo: 'SPC—01',
    name: '아카이브 피어 4 (Archive Pier 4)',
    nameEn: 'ARCHIVE PIER 4',
    zone: '원도심·영도',
    address: '부산 영도구 해양로 45, 구 선박부품창고 2F',
    coordinates: '35.0914° N, 129.0438° E',
    spaceType: '대안전시공간 · 아트북 라운지',
    hours: '11:00 – 19:00',
    closedDays: '매주 월·화 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: '1970년대 선박 부품 창고의 노출 콘크리트 기둥과 바다를 향한 수평 창을 그대로 살린 영도의 대표적인 현대미술 플랫폼입니다. 전시장 입구의 에디션 숍에서는 참여 작가들의 소량 굿즈와 독립출판물을 상시 위탁 소개합니다.',
    currentExhibition: {
      title: '《수평선 아래의 물질들: 부산 청년 조형 6인전》',
      artists: '윤해조, 박선우 외 4인',
      period: '2026.10.18 – 2026.12.06',
      note: '전시 연계 아티스트 에디션 굿즈 12종 현장 판매 중'
    },
    spaceSpecs: {
      area: '142㎡ (약 43평)',
      ceilingHeight: '4.2m (노출 보 기준)',
      wallType: '합판 위 백색 수성도장 가벽 + 동측 통창 바다 조망',
      submissionInfo: '상·하반기 정기 대관 및 기획전 포트폴리오 상시 접수 (아티스트 굿즈 팝업 병행 가능)'
    },
    mapPos: { x: 28, y: 78 }
  },
  {
    id: 'gal-02',
    indexNo: 'SPC—02',
    name: '모노타입 전포 (Monotype Jeonpo)',
    nameEn: 'MONOTYPE JEONPO',
    zone: '전포·서면',
    address: '부산 부산진구 전포대로209번길 18, 3F',
    coordinates: '35.1562° N, 129.0655° E',
    spaceType: '프린트 갤러리 · 에디션 쇼룸',
    hours: '12:00 – 20:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=1200&q=80',
    description: '전포동 공구길의 철물점 건물 3층에 자리한 판화·사진·지류 예술 특화 갤러리입니다. 무거운 원화 컬렉팅의 문턱을 낮추기 위해 모든 전시마다 작가와 협업한 50부 한정 리소/실크스크린 포스터와 오브제를 공동 제작해 출시합니다.',
    currentExhibition: {
      title: '《PAPER & PORT: 항구의 종이 물성》',
      artists: '김도하, 정서윤 2인전',
      period: '2026.10.25 – 2026.11.29',
      note: '매주 토요일 오후 3시 작가 도슨트 및 별색 인쇄 토크 진행'
    },
    spaceSpecs: {
      area: '86㎡ (약 26평)',
      ceilingHeight: '3.1m',
      wallType: '무몰딩 석고보드 백색 도장 + 레일 스팟 조명 24구',
      submissionInfo: '일러스트·판화·사진 분야 신진 작가 개인전 대관 우대 (굿즈 제작비 50% 공간 매칭 지원 프로그램 운영)'
    },
    mapPos: { x: 42, y: 46 }
  },
  {
    id: 'gal-03',
    indexNo: 'SPC—03',
    name: '스페이스 윤슬 광안 (Space Yoonseul)',
    nameEn: 'SPACE YOONSEUL',
    zone: '광안·수영',
    address: '부산 수영구 광안해변로 192, B1–1F',
    coordinates: '35.1531° N, 129.1186° E',
    spaceType: '복합문화공간 · 공예 오브제 갤러리',
    hours: '11:00 – 20:00',
    closedDays: '연중무휴 (전시 교체일 휴관)',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1200&q=80',
    description: '광안리 해변과 망미동 예술마을을 잇는 공예·조형 중심의 갤러리입니다. 자연광이 깊게 들어오는 1층 윈도우 갤러리에서는 도자·유리·텍스타일 작가의 소품 및 굿즈를 큐레이션하며, 지하 1층에서는 몰입형 개인전이 열립니다.',
    currentExhibition: {
      title: '《TACTILE TIDE: 손끝에 닿는 파도》',
      artists: '박선우, 이태경, 최율',
      period: '2026.11.01 – 2026.12.15',
      note: '도자 문진·유리 고블렛·쪽염 코스터 현장 프리오더 가능'
    },
    spaceSpecs: {
      area: '1층 65㎡ / 지하 1층 110㎡',
      ceilingHeight: '1층 3.6m / 지하 1층 3.8m',
      wallType: '미장 스투코 마감 및 모듈형 스테인리스 좌대 14조 보유',
      submissionInfo: '공예·디자인 오브제 작가 상시 입점 및 기획 쇼케이스 공모'
    },
    mapPos: { x: 60, y: 55 }
  },
  {
    id: 'gal-04',
    indexNo: 'SPC—04',
    name: '파빌리온 달맞이 (Pavilion Dalmaji)',
    nameEn: 'PAVILION DALMAJI',
    zone: '해운대·달맞이',
    address: '부산 해운대구 달맞이길 117번가길 42',
    coordinates: '35.1594° N, 129.1782° E',
    spaceType: '프라이빗 화랑 · 컬렉터스 룸',
    hours: '11:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    description: '달맞이 고개의 소나무 숲과 남해 수평선이 동시에 내려다보이는 건축적 갤러리입니다. 부산 기반 중견·신진 회화 작가의 원화 전시는 물론, 호텔 및 건축 공간과의 아트 콜라보레이션 에디션을 기획합니다.',
    currentExhibition: {
      title: '《COBALT HORIZON: 청색의 온도》',
      artists: '윤해조 개인전',
      period: '2026.10.10 – 2026.11.22',
      note: '전시 도록 및 한정판 실크스크린 에디션 잔여 수량 현장 문의'
    },
    spaceSpecs: {
      area: '198㎡ (약 60평, 2개 층 복층 구조)',
      ceilingHeight: '최고 5.4m 보이드',
      wallType: '미술관급 무반사 도장 가벽 및 자연 채광 루버 시스템',
      submissionInfo: '연 1회 부산 신진 작가 크리틱 및 전시 지원 공모 (매년 1월)'
    },
    mapPos: { x: 78, y: 44 }
  },
  {
    id: 'gal-05',
    indexNo: 'SPC—05',
    name: '솔트 하우스 일광 (Salt House Ilgwang)',
    nameEn: 'SALT HOUSE ILGWANG',
    zone: '기장·일광',
    address: '부산 기장군 일광읍 일광로 312',
    coordinates: '35.2618° N, 129.2335° E',
    spaceType: '레지던시 쇼룸 · 오션프론트 살롱',
    hours: '11:00 – 18:30',
    closedDays: '매주 화·수 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '일광 해변 바로 앞 구 염전 창고 터에 세워진 오픈 스튜디오형 갤러리입니다. 자연의 물성을 다루는 사진·섬유·도자 작가들이 단기 체류하며 기장의 바다에서 영감받은 굿즈와 신작을 발표합니다.',
    currentExhibition: {
      title: '《해풍과 직조: 일광 레지던시 결과보고전》',
      artists: '최율, 정서윤',
      period: '2026.10.20 – 2026.12.20',
      note: '주말 오픈 스튜디오 및 천연 쪽염 북커버 워크숍 운영'
    },
    spaceSpecs: {
      area: '125㎡ (본관 전시장 85㎡ + 중정 40㎡)',
      ceilingHeight: '4.5m 박공 지붕 노출 서까래',
      wallType: '회벽 마감 및 원목 가변 파티션',
      submissionInfo: '계절별 단기 창작 레지던시 및 팝업 쇼케이스 수시 협의'
    },
    mapPos: { x: 88, y: 22 }
  }
];
