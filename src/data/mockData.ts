import { CRAWLED_ARTISTS } from './crawledArtists';

export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  imageUrl: string;
  highResUrl?: string;
}

export interface Artist {
  id: string;
  indexNo: string;
  name: string;
  nameEn: string;
  discipline: '회화·미술' | '도자·조형' | '프린트·드로잉' | '사진' | '공예·오브제' | string;
  district: string;
  updatedAt: string;
  statement: string;
  bio: string;
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

export const ARTISTS: Artist[] = CRAWLED_ARTISTS;

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
        detail: '가로 50mm × 세로 25mm 이내의 작가 시그니처 동판 1개(제작비 약 2~3만 원)를 파두면 엽서 봉투, 박스 상단, 보증서 카드에 모두 공용으로 청박을 찍을 수 있습니다.',
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

export const INITIAL_COLLAB_POSTS: CollabPost[] = [
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
    name: '아카이브 피어 4 (Archive Pier 4)',
    nameEn: 'ARCHIVE PIER 4',
    zone: '원도심·영도',
    address: '부산 영도구 해양로 45, 구 선박부품창고 2F',
    coordinates: '35.0914° N, 129.0438° E',
    spaceType: '대안전시공간 · 아트북 라운지',
    hours: '11:00 – 19:00',
    closedDays: '매주 월·화 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: '1970년대 선박 부품 창고의 노출 콘크리트 기둥과 바다를 향한 수평 창을 그대로 살린 영도의 대표적인 현대미술 플랫폼입니다.',
    currentExhibition: {
      title: '《수평선 아래의 물질들: 부산 청년 조형전》',
      artists: '김덕희, 배지윤, 심성아 외',
      period: '2026.10.18 – 2026.12.06',
      note: '전시 연계 아티스트 에디션 굿즈 현장 판매 중'
    },
    spaceSpecs: {
      area: '142㎡ (약 43평)',
      ceilingHeight: '4.2m (노출 보 기준)',
      wallType: '합판 위 백색 수성도장 가벽 + 동측 통창 바다 조망',
      submissionInfo: '상·하반기 정기 대관 및 기획전 포트폴리오 상시 접수'
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
    description: '전포동 공구길의 철물점 건물 3층에 자리한 판화·사진·지류 예술 특화 갤러리입니다.',
    currentExhibition: {
      title: '《PAPER & PORT: 항구의 종이 물성》',
      artists: '김근예, 양사윤, 이지영',
      period: '2026.10.25 – 2026.11.29',
      note: '매주 토요일 오후 3시 작가 도슨트 및 별색 인쇄 토크 진행'
    },
    spaceSpecs: {
      area: '86㎡ (약 26평)',
      ceilingHeight: '3.1m',
      wallType: '무몰딩 석고보드 백색 도장 + 레일 스팟 조명 24구',
      submissionInfo: '일러스트·판화·사진 분야 신진 작가 개인전 대관 우대'
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
    description: '광안리 해변과 망미동 예술마을을 잇는 공예·조형 중심의 갤러리입니다.',
    currentExhibition: {
      title: '《TACTILE TIDE: 손끝에 닿는 파도》',
      artists: '최시복, 이진호, 최민경',
      period: '2026.11.01 – 2026.12.15',
      note: '공예 오브제 에디션 현장 프리오더 가능'
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
    name: '솔트갤러리 해운대 (Salt Gallery)',
    nameEn: 'SALT GALLERY',
    zone: '해운대·달맞이',
    address: '부산 해운대구 달맞이길 117번가길 42',
    coordinates: '35.1594° N, 129.1782° E',
    spaceType: '현대미술 화랑 · 컬렉터스 룸',
    hours: '11:00 – 18:00',
    closedDays: '매주 월요일 휴관',
    imageUrl: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    description: '달맞이 고개의 소나무 숲과 남해 수평선이 동시에 내려다보이는 건축적 갤러리입니다.',
    currentExhibition: {
      title: '《Différance: 차연의 풍경》',
      artists: '안은솔 개인전',
      period: '2026.10.10 – 2026.11.22',
      note: '부산문화재단 우수예술지원 선정 전시'
    },
    spaceSpecs: {
      area: '198㎡ (약 60평, 2개 층 복층 구조)',
      ceilingHeight: '최고 5.4m 보이드',
      wallType: '미술관급 무반사 도장 가벽 및 자연 채광 루버 시스템',
      submissionInfo: '연 1회 부산 신진 작가 크리틱 및 전시 지원 공모'
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
    description: '일광 해변 바로 앞 구 염전 창고 터에 세워진 오픈 스튜디오형 갤러리입니다.',
    currentExhibition: {
      title: '《해풍과 시선: 부산 사진·회화 아카이브전》',
      artists: '임소영, 김유준, 조하은',
      period: '2026.10.20 – 2026.12.20',
      note: '주말 오픈 스튜디오 운영'
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
