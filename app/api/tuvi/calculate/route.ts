import { NextRequest, NextResponse } from 'next/server';

// Dữ liệu Thiên Can (Heavenly Stems)
const HEAVENLY_STEMS = [
  { name: 'Giáp', nameVi: 'Giáp', element: 'Mộc' },
  { name: 'Ất', nameVi: 'Ất', element: 'Mộc' },
  { name: 'Bính', nameVi: 'Bính', element: 'Hỏa' },
  { name: 'Đinh', nameVi: 'Đinh', element: 'Hỏa' },
  { name: 'Mậu', nameVi: 'Mậu', element: 'Thổ' },
  { name: 'Kỷ', nameVi: 'Kỷ', element: 'Thổ' },
  { name: 'Canh', nameVi: 'Canh', element: 'Kim' },
  { name: 'Tân', nameVi: 'Tân', element: 'Kim' },
  { name: 'Nhâm', nameVi: 'Nhâm', element: 'Thủy' },
  { name: 'Quý', nameVi: 'Quý', element: 'Thủy' }
];

// Dữ liệu Địa Chi (Earthly Branches)
const EARTHLY_BRANCHES = [
  { name: 'Tý', nameVi: 'Tý (Chuột)', element: 'Thủy' },
  { name: 'Sửu', nameVi: 'Sửu (Trâu)', element: 'Thổ' },
  { name: 'Dần', nameVi: 'Dần (Hổ)', element: 'Mộc' },
  { name: 'Mão', nameVi: 'Mão (Mèo)', element: 'Mộc' },
  { name: 'Thìn', nameVi: 'Thìn (Rồng)', element: 'Thổ' },
  { name: 'Tỵ', nameVi: 'Tỵ (Rắn)', element: 'Hỏa' },
  { name: 'Ngọ', nameVi: 'Ngọ (Ngựa)', element: 'Hỏa' },
  { name: 'Mùi', nameVi: 'Mùi (Dê)', element: 'Thổ' },
  { name: 'Thân', nameVi: 'Thân (Khỉ)', element: 'Kim' },
  { name: 'Dậu', nameVi: 'Dậu (Gà)', element: 'Kim' },
  { name: 'Tuất', nameVi: 'Tuất (Chó)', element: 'Thổ' },
  { name: 'Hợi', nameVi: 'Hợi (Lợn)', element: 'Thủy' }
];

// Hàm tính Thiên Can theo năm
function getYearStem(year: number) {
  const index = (year - 4) % 10;
  return HEAVENLY_STEMS[index >= 0 ? index : index + 10];
}

// Hàm tính Địa Chi theo năm
function getYearBranch(year: number) {
  const index = (year - 4) % 12;
  return EARTHLY_BRANCHES[index >= 0 ? index : index + 12];
}

// Hàm tính Thiên Can theo tháng (dựa trên năm)
function getMonthStem(year: number, month: number) {
  const yearStemIndex = (year - 4) % 10;
  const monthStemIndex = (yearStemIndex * 2 + month - 1) % 10;
  return HEAVENLY_STEMS[monthStemIndex >= 0 ? monthStemIndex : monthStemIndex + 10];
}

// Hàm tính Địa Chi theo tháng
function getMonthBranch(month: number) {
  const monthBranchIndex = (month + 1) % 12;
  return EARTHLY_BRANCHES[monthBranchIndex];
}

// Hàm tính Thiên Can theo ngày
function getDayStem(date: Date) {
  const baseDate = new Date(1900, 0, 1); // 1/1/1900 là Canh Tý
  const diffTime = Math.abs(date.getTime() - baseDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayStemIndex = (diffDays + 6) % 10; // 1/1/1900 là Canh (index 6)
  return HEAVENLY_STEMS[dayStemIndex];
}

// Hàm tính Địa Chi theo ngày
function getDayBranch(date: Date) {
  const baseDate = new Date(1900, 0, 1);
  const diffTime = Math.abs(date.getTime() - baseDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayBranchIndex = (diffDays + 0) % 12; // 1/1/1900 là Tý (index 0)
  return EARTHLY_BRANCHES[dayBranchIndex];
}

// Hàm tính Thiên Can theo giờ
function getHourStem(dayStemIndex: number, hour: number) {
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
  return HEAVENLY_STEMS[hourStemIndex];
}

// Hàm tính Địa Chi theo giờ
function getHourBranch(hour: number) {
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  return EARTHLY_BRANCHES[hourBranchIndex];
}

// Hàm tính cân bằng ngũ hành
function calculateFiveElementsBalance(
  heavenlyStems: any[],
  earthlyBranches: any[]
) {
  const elements = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };

  // Đếm từ Thiên Can
  heavenlyStems.forEach(stem => {
    elements[stem.element as keyof typeof elements] += 20;
  });

  // Đếm từ Địa Chi
  earthlyBranches.forEach(branch => {
    elements[branch.element as keyof typeof elements] += 20;
  });

  // Tính phần trăm
  const total = Object.values(elements).reduce((a, b) => a + b, 0);
  return {
    Kim: Math.round((elements.Kim / total) * 100),
    Mộc: Math.round((elements.Mộc / total) * 100),
    Thủy: Math.round((elements.Thủy / total) * 100),
    Hỏa: Math.round((elements.Hỏa / total) * 100),
    Thổ: Math.round((elements.Thổ / total) * 100)
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthDate, birthTime } = body;

    if (!birthDate || !birthTime) {
      return NextResponse.json(
        { error: 'Thiếu thông tin ngày giờ sinh' },
        { status: 400 }
      );
    }

    // Parse ngày giờ sinh
    const date = new Date(birthDate);
    const [hours, minutes] = birthTime.split(':').map(Number);
    date.setHours(hours, minutes);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    // Tính Bát Tự
    const yearStem = getYearStem(year);
    const yearBranch = getYearBranch(year);
    const monthStem = getMonthStem(year, month);
    const monthBranch = getMonthBranch(month);
    const dayStem = getDayStem(date);
    const dayBranch = getDayBranch(date);
    const hourStem = getHourStem(HEAVENLY_STEMS.findIndex(s => s.name === dayStem.name), hours);
    const hourBranch = getHourBranch(hours);

    const heavenlyStems = [yearStem, monthStem, dayStem, hourStem];
    const earthlyBranches = [yearBranch, monthBranch, dayBranch, hourBranch];

    // Tính cân bằng ngũ hành
    const fiveElementsBalance = calculateFiveElementsBalance(heavenlyStems, earthlyBranches);

    // Day Master là Thiên Can của ngày
    const dayMaster = `${dayStem.name} ${dayBranch.name}`;

    const result = {
      heavenlyStems,
      earthlyBranches,
      fiveElementsBalance,
      dayMaster
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Lỗi tính toán Bazi:', error);
    return NextResponse.json(
      { error: 'Lỗi khi tính toán Bát Tự' },
      { status: 500 }
    );
  }
}
