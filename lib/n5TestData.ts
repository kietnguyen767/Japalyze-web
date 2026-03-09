// lib/n5TestData.ts

export interface TestItem {
    kana: string;
    romaji: string;
    meaning: string;
}
import { Question } from '@/app/tests/page';

export const WEEK3_TEST: Question[] = [
    {
        id: 'w3_q1', type: 'grammar',
        content: 'Tôi là người Việt Nam.',
        options: ['わたし は べとなむじん です。', 'わたし は べとなむじん じゃありません。', 'わたし は べとなむじん ですか。', 'わたし の べとなむじん です。'],
        correctAnswer: 0
    },
    {
        id: 'w3_q2', type: 'vocab',
        content: 'Số 3 (trong đếm vật)?',
        options: ['ひとつ', 'ふたつ', 'みっつ', 'よっつ'],
        correctAnswer: 2
    },
    {
        id: 'w3_q3', type: 'grammar',
        content: 'あの 人 は 先生 ______。 (Người kia không phải là giáo viên)',
        options: ['です', 'じゃありません', 'ですか', 'の'],
        correctAnswer: 1
    },
    {
        id: 'w3_q4', type: 'vocab',
        content: 'Mẹ (của mình) gọi là gì?',
        options: ['おとうさん', 'おかあさん', 'はは', 'ちち'],
        correctAnswer: 2
    },
    {
        id: 'w3_q5', type: 'grammar',
        content: '______ は わたしの ほんです。(Đây là quyển sách của tôi)',
        options: ['これ', 'この', 'ここ', 'こちら'],
        correctAnswer: 0
    }
];

export const WEEK4_TEST: Question[] = [
    {
        id: 'w4_q1', type: 'grammar',
        content: '______ の けいたいでんわ です。(Cái điện thoại này)',
        options: ['これ', 'この', 'ここ', 'こちら'],
        correctAnswer: 1
    },
    {
        id: 'w4_q2', type: 'vocab',
        content: '"Của tôi" trong tiếng Nhật là gì?',
        options: ['わたしの', 'あなた', 'かれ', 'わたしたち'],
        correctAnswer: 0
    },
    {
        id: 'w4_q3', type: 'vocab',
        content: '"Pasokon" là gì?',
        options: ['Điện thoại', 'Máy ảnh', 'Máy tính', 'Đồng hồ'],
        correctAnswer: 2
    },
    {
        id: 'w4_q4', type: 'vocab',
        content: '"Bánh mỳ" tiếng Nhật là gì?',
        options: ['ごはん', 'さかな', 'たまご', 'パン'],
        correctAnswer: 3
    }
];

export const WEEK5_TEST: Question[] = [
    {
        id: 'w5_q1', type: 'grammar',
        content: 'トイレ は ______ です。(Nhà vệ sinh ở đằng kia - lịch sự)',
        options: ['あそこ', 'あれ', 'あちら', 'あの'],
        correctAnswer: 2
    },
    {
        id: 'w5_q2', type: 'vocab',
        content: 'Bệnh viện là gì?',
        options: ['がっこう', 'びょういん', 'ぎんこう', 'だいがく'],
        correctAnswer: 1
    },
    {
        id: 'w5_q3', type: 'vocab',
        content: 'Bên trên là gì?',
        options: ['うえ', 'した', 'まえ', 'うしろ'],
        correctAnswer: 0
    },
    {
        id: 'w5_q4', type: 'grammar',
        content: '______ じん ですか。 (Bạn là người nước nào?)',
        options: ['どこ', 'どの', 'どこの', 'どちら'],
        correctAnswer: 2
    }
];

export const WEEK6_TEST: Question[] = [
    {
        id: 'w6_q1', type: 'grammar',
        content: '今 10時 ______。(Bây giờ là 10h15p)',
        options: ['15分', '15分です', '15時です', '15月です'],
        correctAnswer: 1
    },
    {
        id: 'w6_q2', type: 'vocab',
        content: 'Hôm qua là gì?',
        options: ['きょう', 'あした', 'きのう', 'さき'],
        correctAnswer: 2
    },
    {
        id: 'w6_q3', type: 'grammar',
        content: 'Trường học bắt đầu từ 8h (chọn trợ từ)',
        options: ['から', 'まで', 'に', 'と'],
        correctAnswer: 0
    },
    {
        id: 'w6_q4', type: 'vocab',
        content: 'Mùa đông là gì?',
        options: ['はる', 'なつ', 'あき', 'ふゆ'],
        correctAnswer: 3
    }
];

export const WEEK7_TEST: Question[] = [
    {
        id: 'w7_q1', type: 'grammar',
        content: 'Đi đến Nhật Bản (trợ từ)?',
        options: ['を', 'に / へ', 'で', 'と'],
        correctAnswer: 1
    },
    {
        id: 'w7_q2', type: 'vocab',
        content: '"Ăn cơm" là gì?',
        options: ['ごはん を のみます', 'ごはん を たべます', 'ごはん を かいます', 'ごはん を よみます'],
        correctAnswer: 1
    },
    {
        id: 'w7_q3', type: 'grammar',
        content: 'Đi bằng tàu điện (trợ từ)?',
        options: ['に', 'で', 'を', 'と'],
        correctAnswer: 1
    },
    {
        id: 'w7_q4', type: 'vocab',
        content: '"Tháng 4" đọc là gì?',
        options: ['よんがつ', 'しがつ', 'なながつ', 'ひがつ'],
        correctAnswer: 1
    }
];

export const WEEK8_TEST: Question[] = [
    {
        id: 'w8_q1', type: 'grammar',
        content: '"Bạn đã ăn cơm chưa?"',
        options: ['ごはん を たべましたか', 'ごはん を たべますか', 'ごはん を たべませんでしたか', 'ごはん を たべたいですか'],
        correctAnswer: 0
    },
    {
        id: 'w8_q2', type: 'vocab',
        content: '"Đắt / Cao" là gì?',
        options: ['やすい', 'たかい', 'ふるい', 'あたらしい'],
        correctAnswer: 1
    },
    {
        id: 'w8_q3', type: 'grammar',
        content: 'Ăn cơm cùng với bạn bè (trợ từ)?',
        options: ['に', 'を', 'と', 'で'],
        correctAnswer: 2
    },
    {
        id: 'w8_q4', type: 'vocab',
        content: '"Ngon" là gì?',
        options: ['たのしい', 'おもしろい', 'おいしい', 'いそがしい'],
        correctAnswer: 2
    }
];

export const WEEK9_TEST: Question[] = [
    {
        id: 'w9_q1', type: 'grammar',
        content: '______ ほしい ですか。 (Bạn muốn cái gì?)',
        options: ['なんの', 'どこ', 'いつ', 'なに が'],
        correctAnswer: 3
    },
    {
        id: 'w9_q2', type: 'vocab',
        content: '"Dạy (tiếng Nhật)" là gì?',
        options: ['ならいます', 'おしえます', 'かします', 'かります'],
        correctAnswer: 1
    },
    {
        id: 'w9_q3', type: 'grammar',
        content: 'Tôi muốn ăn sushi.',
        options: ['すし を たべました', 'すし が たべたい です', 'すし を たべません', 'すし が たべた です'],
        correctAnswer: 1
    },
    {
        id: 'w9_q4', type: 'vocab',
        content: '"Rất" là gì?',
        options: ['すこし', 'たくさん', 'とても', 'いつも'],
        correctAnswer: 2
    }
];

export const WEEK10_TEST: Question[] = [
    {
        id: 'w10_q1', type: 'grammar',
        content: 'Hãy đưa cho tôi quyển sách kia.',
        options: ['その ほん を ください', 'その ほん が ください', 'その ほん です ください', 'その ほん に ください'],
        correctAnswer: 0
    },
    {
        id: 'w10_q2', type: 'vocab',
        content: '"Đi bộ" là gì?',
        options: ['あそびます', 'あるきます', 'はしります', 'およぎます'],
        correctAnswer: 1
    },
    {
        id: 'w10_q3', type: 'grammar',
        content: 'Có hoa ở trong vườn.',
        options: ['にわ に はな が あります', 'にわ に はな が います', 'にわ を はな が あります', 'にわ で はな が あります'],
        correctAnswer: 0
    },
    {
        id: 'w10_q4', type: 'vocab',
        content: '"Cố gắng hết sức" là gì?',
        options: ['いっしょうけんめい', 'おめでとう', 'すみません', 'しつれいします'],
        correctAnswer: 0
    }
];

export const WEEK11_TEST: Question[] = [
    {
        id: 'w11_q1', type: 'grammar',
        content: 'Thể từ điển của "いきます" là gì?',
        options: ['いかない', 'いく', 'いった', 'いきる'],
        correctAnswer: 1
    },
    {
        id: 'w11_q2', type: 'vocab',
        content: '"Sở thích" trong tiếng Nhật là gì?',
        options: ['しゅみ', 'ゆめ', 'しごと', 'あそび'],
        correctAnswer: 0
    },
    {
        id: 'w11_q3', type: 'grammar',
        content: 'Tôi đã từng đi Nhật Bản.',
        options: ['にほん へ いきます', 'にほん へ いきました', 'にほん へ いった こと が あります', 'にほん へ いく こと が できます'],
        correctAnswer: 2
    },
    {
        id: 'w11_q4', type: 'grammar',
        content: 'Lúc thì đọc sách, lúc thì xem phim.',
        options: ['ほん を よんで、えいが を みます', 'ほん を よんだり、えいが を みたり します', 'ほん を よむ こと と えいが を みる こと です', 'ほん を よみながら えいが を みます'],
        correctAnswer: 1
    },
    {
        id: 'w11_q5', type: 'vocab',
        content: '"Lái xe" là gì?',
        options: ['うんてんします', 'じゅうてんします', 'べんきょうします', 'よやくします'],
        correctAnswer: 0
    }
];

export const WEEK1_TEST_DATA: TestItem[] = [
    { kana: 'ひと', romaji: 'hito', meaning: 'người' },
    { kana: 'いす', romaji: 'isu', meaning: 'cái ghế' },
    { kana: 'はる', romaji: 'haru', meaning: 'mùa xuân' },
    { kana: 'なつ', romaji: 'natsu', meaning: 'mùa hè' },
    { kana: 'あき', romaji: 'aki', meaning: 'mùa thu' },
    { kana: 'ふゆ', romaji: 'fuyu', meaning: 'mùa đông' },
    { kana: 'あし', romaji: 'ashi', meaning: 'chân' },
    { kana: 'め', romaji: 'me', meaning: 'mắt' },
    { kana: 'て', romaji: 'te', meaning: 'tay' },
    { kana: 'くち', romaji: 'kuchi', meaning: 'miệng' },
    { kana: 'かお', romaji: 'kao', meaning: 'khuôn mặt' },
    { kana: 'みみ', romaji: 'mimi', meaning: 'tai' },
    { kana: 'いえ', romaji: 'ie', meaning: 'ngôi nhà' },
    { kana: 'にわ', romaji: 'niwa', meaning: 'sân vườn' },
    { kana: 'かみ', romaji: 'kami', meaning: 'tóc / giấy' },
    { kana: 'あい', romaji: 'ai', meaning: 'tình yêu' },
    { kana: 'いう', romaji: 'iu', meaning: 'nói' },
    { kana: 'うえ', romaji: 'ue', meaning: 'bên trên' },
    { kana: 'あお', romaji: 'ao', meaning: 'màu xanh dương' },
    { kana: 'かき', romaji: 'kaki', meaning: 'quả hồng' },
    { kana: 'きく', romaji: 'kiku', meaning: 'nghe / hoa cúc' },
    { kana: 'いけ', romaji: 'ike', meaning: 'cái ao' },
    { kana: 'こえ', romaji: 'koe', meaning: 'giọng nói' },
    { kana: 'さけ', romaji: 'sake', meaning: 'rượu sake / cá hồi' },
    { kana: 'あせ', romaji: 'ase', meaning: 'mồ hôi' },
    { kana: 'うし', romaji: 'ushi', meaning: 'con bò' },
    { kana: 'すいか', romaji: 'suika', meaning: 'dưa hấu' },
    { kana: 'せかい', romaji: 'sekai', meaning: 'thế giới' },
    { kana: 'そこ', romaji: 'soko', meaning: 'chỗ đó' },
    { kana: 'いぬ', romaji: 'inu', meaning: 'con chó' },
    { kana: 'ねこ', romaji: 'neko', meaning: 'con mèo' },
    { kana: 'とり', romaji: 'tori', meaning: 'con chim' },
    { kana: 'くるま', romaji: 'kuruma', meaning: 'ô tô' },
    { kana: 'さくら', romaji: 'sakura', meaning: 'hoa anh đào' },
    { kana: 'はな', romaji: 'hana', meaning: 'bông hoa' },
    { kana: 'ほし', romaji: 'hoshi', meaning: 'ngôi sao' },
    { kana: 'つき', romaji: 'tsuki', meaning: 'mặt trăng' },
    { kana: 'ゆき', romaji: 'yuki', meaning: 'tuyết' },
    { kana: 'あめ', romaji: 'ame', meaning: 'mưa / kẹo' },
    { kana: 'やま', romaji: 'yama', meaning: 'ngọn núi' },
    { kana: 'かわ', romaji: 'kawa', meaning: 'con sông' },
    { kana: 'うみ', romaji: 'umi', meaning: 'biển' },
    { kana: 'そら', romaji: 'sora', meaning: 'bầu trời' },
    { kana: 'くも', romaji: 'kumo', meaning: 'đám mây / con nhện' },
    { kana: 'かぜ', romaji: 'kaze', meaning: 'cơn gió / cảm lạnh' },
    { kana: 'まど', romaji: 'mado', meaning: 'cửa sổ' },
    { kana: 'つくえ', romaji: 'tsukue', meaning: 'cái bàn' },
    { kana: 'ほん', romaji: 'hon', meaning: 'quyển sách' },
    { kana: 'かばん', romaji: 'kaban', meaning: 'cái cặp / túi xách' },
    { kana: 'みず', romaji: 'mizu', meaning: 'nước' },
    { kana: 'たべもの', romaji: 'tabemono', meaning: 'đồ ăn' },
    { kana: 'のみもの', romaji: 'nomimono', meaning: 'đồ uống' },
    { kana: 'くだもの', romaji: 'kudamono', meaning: 'trái cây' },
    { kana: 'さいふ', romaji: 'saifu', meaning: 'cái ví' },
    { kana: 'ぼうし', romaji: 'boushi', meaning: 'cái mũ' },
    { kana: 'くつ', romaji: 'kutsu', meaning: 'đôi giày' },
    { kana: 'めがね', romaji: 'megane', meaning: 'kính mắt' },
    { kana: 'かさ', romaji: 'kasa', meaning: 'cái ô / dù' },
    { kana: 'とけい', romaji: 'tokei', meaning: 'đồng hồ' },
    { kana: 'おんがく', romaji: 'ongaku', meaning: 'âm nhạc' },
    { kana: 'がくせい', romaji: 'gakusei', meaning: 'học sinh / sinh viên' },
    { kana: 'せんせい', romaji: 'sensei', meaning: 'giáo viên' },
    { kana: 'がっこう', romaji: 'gakkou', meaning: 'trường học' },
    { kana: 'かいしゃ', romaji: 'kaisha', meaning: 'công ty' },
    { kana: 'びょういん', romaji: 'byouin', meaning: 'bệnh viện' },
    { kana: 'ぎんこう', romaji: 'ginkou', meaning: 'ngân hàng' },
    { kana: 'ゆうびんきょく', romaji: 'yuubinkyoku', meaning: 'bưu điện' },
    { kana: 'としょかん', romaji: 'toshokan', meaning: 'thư viện' },
    { kana: 'えいがかん', romaji: 'eigakan', meaning: 'rạp chiếu phim' },
    { kana: 'びじゅつかん', romaji: 'bijutsukan', meaning: 'bảo tàng mỹ thuật' },
    { kana: 'しゃしん', romaji: 'shashin', meaning: 'bức ảnh' },
    { kana: 'おちゃ', romaji: 'ocha', meaning: 'trà' },
    { kana: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'sữa bò' },
    { kana: 'じてんしゃ', romaji: 'jitensha', meaning: 'xe đạp' },
    { kana: 'きょう', romaji: 'kyou', meaning: 'hôm nay' },
    { kana: 'あした', romaji: 'ashita', meaning: 'ngày mai' },
    { kana: 'あさって', romaji: 'asatte', meaning: 'ngày kia' },
    { kana: 'きのう', romaji: 'kinou', meaning: 'hôm qua' },
    { kana: 'おととい', romaji: 'ototoi', meaning: 'hôm kia' },
    { kana: 'けさ', romaji: 'kesa', meaning: 'sáng nay' },
    { kana: 'こんばん', romaji: 'konban', meaning: 'tối nay' },
    { kana: 'まいにち', romaji: 'mainichi', meaning: 'mỗi ngày' },
    { kana: 'まいあさ', romaji: 'maiasa', meaning: 'mỗi sáng' },
    { kana: 'まいばん', romaji: 'maiban', meaning: 'mỗi tối' },
    { kana: 'らいしゅう', romaji: 'raishuu', meaning: 'tuần sau' },
    { kana: 'せんしゅう', romaji: 'senshuu', meaning: 'tuần trước' },
    { kana: 'こんしゅう', romaji: 'konshuu', meaning: 'tuần này' },
    { kana: 'らいげつ', romaji: 'raigetsu', meaning: 'tháng sau' },
    { kana: 'せんげつ', romaji: 'sengetsu', meaning: 'tháng trước' },
    { kana: 'こんげつ', romaji: 'kongetsu', meaning: 'tháng này' },
    { kana: 'らいねん', romaji: 'rainen', meaning: 'năm sau' },
    { kana: 'きょねん', romaji: 'kyonen', meaning: 'năm ngoái' },
    { kana: 'ことし', romaji: 'kotoshi', meaning: 'năm nay' },
    { kana: 'たんじょうび', romaji: 'tanjoubi', meaning: 'sinh nhật' },
    { kana: 'ひこうき', romaji: 'hikouki', meaning: 'máy bay' },
    { kana: 'しんかんせん', romaji: 'shinkansen', meaning: 'tàu siêu tốc shinkansen' },
    { kana: 'おかあさん', romaji: 'okaasan', meaning: 'mẹ (người khác)' },
    { kana: 'おとうさん', romaji: 'otousan', meaning: 'bố (người khác)' },
    { kana: 'おにいさん', romaji: 'oniisan', meaning: 'anh trai (người khác)' },
    { kana: 'おねえさん', romaji: 'oneesan', meaning: 'chị gái (người khác)' },
];

export const WEEK2_TEST_DATA: TestItem[] = [
    { kana: 'ドア', romaji: 'doa', meaning: 'cửa ra vào' },
    { kana: 'ペン', romaji: 'pen', meaning: 'bút mực' },
    { kana: 'パン', romaji: 'pan', meaning: 'bánh mì' },
    { kana: 'メモ', romaji: 'memo', meaning: 'ghi chú' },
    { kana: 'バス', romaji: 'basu', meaning: 'xe buýt' },
    { kana: 'ガス', romaji: 'gasu', meaning: 'khí ga' },
    { kana: 'コップ', romaji: 'koppu', meaning: 'cái cốc' },
    { kana: 'ベッド', romaji: 'beddo', meaning: 'cái giường' },
    { kana: 'ノート', romaji: 'nooto', meaning: 'vở' },
    { kana: 'ビル', romaji: 'biru', meaning: 'tòa nhà' },
    { kana: 'ベル', romaji: 'beru', meaning: 'cái chuông' },
    { kana: 'カメラ', romaji: 'kamera', meaning: 'máy ảnh' },
    { kana: 'テレビ', romaji: 'terebi', meaning: 'tivi' },
    { kana: 'ラジオ', romaji: 'rajio', meaning: 'đài radio' },
    { kana: 'トイレ', romaji: 'toire', meaning: 'nhà vệ sinh' },
    { kana: 'クラス', romaji: 'kurasu', meaning: 'lớp học' },
    { kana: 'テスト', romaji: 'tesuto', meaning: 'bài kiểm tra' },
    { kana: 'ホテル', romaji: 'hoteru', meaning: 'khách sạn' },
    { kana: 'ツアー', romaji: 'tsuaa', meaning: 'chuyến du lịch' },
    { kana: 'ビザ', romaji: 'biza', meaning: 'visa' },
    { kana: 'ゲーム', romaji: 'geemu', meaning: 'trò chơi' },
    { kana: 'アプリ', romaji: 'apuri', meaning: 'ứng dụng' },
    { kana: 'メール', romaji: 'meeru', meaning: 'email' },
    { kana: 'コピー', romaji: 'kopii', meaning: 'bản sao' },
    { kana: 'ページ', romaji: 'peeji', meaning: 'trang (sách)' },
    { kana: 'スープ', romaji: 'suupu', meaning: 'món súp' },
    { kana: 'サラダ', romaji: 'sarada', meaning: 'món xà lách (salad)' },
    { kana: 'ナイフ', romaji: 'naifu', meaning: 'con dao' },
    { kana: 'フォーク', romaji: 'fooku', meaning: 'cái dĩa' },
    { kana: 'スプーン', romaji: 'supuun', meaning: 'cái thìa' },
    { kana: 'シャツ', romaji: 'shatsu', meaning: 'áo sơ mi' },
    { kana: 'パンツ', romaji: 'pantsu', meaning: 'quần đùi / quần lót' },
    { kana: 'スカート', romaji: 'sukaato', meaning: 'chân váy' },
    { kana: 'ドレス', romaji: 'doresu', meaning: ' váy liền' },
    { kana: 'コート', romaji: 'kooto', meaning: 'áo khoác' },
    { kana: 'セーター', romaji: 'seetaa', meaning: 'áo len' },
    { kana: 'ネクタイ', romaji: 'nekutai', meaning: 'cà vạt' },
    { kana: 'バッグ', romaji: 'baggu', meaning: 'túi xách' },
    { kana: 'ガラス', romaji: 'garasu', meaning: 'kính (chất liệu)' },
    { kana: 'フィルム', romaji: 'firumu', meaning: 'cuộn phim' },
    { kana: 'スイッチ', romaji: 'suicchi', meaning: 'công tắc' },
    { kana: 'エアコン', romaji: 'eakon', meaning: 'máy điều hòa' },
    { kana: 'リモコン', romaji: 'rimokon', meaning: 'điều khiển từ xa' },
    { kana: 'プール', romaji: 'puuru', meaning: 'hồ bơi' },
    { kana: 'テニス', romaji: 'tenisu', meaning: 'quần vợt' },
    { kana: 'サッカー', romaji: 'sakkaa', meaning: 'bóng đá' },
    { kana: 'ゴルフ', romaji: 'gorufu', meaning: 'đánh gôn' },
    { kana: 'スキー', romaji: 'sukii', meaning: 'trượt tuyết' },
    { kana: 'スケート', romaji: 'sukeeto', meaning: 'trượt băng' },
    { kana: 'ギター', romaji: 'gitaa', meaning: 'đàn ghi ta' },
    { kana: 'ピアノ', romaji: 'piano', meaning: 'đàn piano' },
    { kana: 'ダンス', romaji: 'dansu', meaning: 'khiêu vũ' },
    { kana: 'ボール', romaji: 'booru', meaning: 'quả bóng' },
    { kana: 'ミルク', romaji: 'miruku', meaning: 'sữa' },
    { kana: 'ジュース', romaji: 'juusu', meaning: 'nước ép' },
    { kana: 'ビール', romaji: 'biiru', meaning: 'bia' },
    { kana: 'ワイン', romaji: 'wain', meaning: 'rượu vang' },
    { kana: 'チーズ', romaji: 'chiizu', meaning: 'phô mai' },
    { kana: 'ケーキ', romaji: 'keeki', meaning: 'bánh ngọt' },
    { kana: 'コーヒー', romaji: 'koohii', meaning: 'cà phê' },
    { kana: 'スーパー', romaji: 'suupaa', meaning: 'siêu thị' },
    { kana: 'デパート', romaji: 'depaato', meaning: 'trung tâm thương mại' },
    { kana: 'コンビニ', romaji: 'konbini', meaning: 'cửa hàng tiện lợi' },
    { kana: 'レストラン', romaji: 'resutoran', meaning: 'nhà hàng' },
    { kana: 'アパート', romaji: 'apaato', meaning: 'căn hộ' },
    { kana: 'マンション', romaji: 'manshon', meaning: 'chung cư cao cấp' },
    { kana: 'リビング', romaji: 'ribingu', meaning: 'phòng khách' },
    { kana: 'キッチン', romaji: 'kicchin', meaning: 'nhà bếp' },
    { kana: 'バルコニー', romaji: 'barukonii', meaning: 'ban công' },
    { kana: 'シャワー', romaji: 'shawaa', meaning: 'vòi hoa sen' },
    { kana: 'タクシー', romaji: 'takushii', meaning: 'xe taxi' },
    { kana: 'トラック', romaji: 'torakku', meaning: 'xe tải' },
    { kana: 'オートバイ', romaji: 'ootobai', meaning: 'xe máy' },
    { kana: 'エンジン', romaji: 'enjin', meaning: 'động cơ' },
    { kana: 'タイヤ', romaji: 'taiya', meaning: 'lốp xe' },
    { kana: 'ガソリン', romaji: 'gasorin', meaning: 'xăng' },
    { kana: 'パソコン', romaji: 'pasokon', meaning: 'máy tính cá nhân' },
    { kana: 'スマホ', romaji: 'sumaho', meaning: 'điện thoại thông minh' },
    { kana: 'ニュース', romaji: 'nyuusu', meaning: 'tin tức' },
    { kana: 'チケット', romaji: 'chiketto', meaning: 'vé' },
    { kana: 'センター', romaji: 'sentaa', meaning: 'trung tâm' },
    { kana: 'カレンダー', romaji: 'karendaa', meaning: 'tờ lịch' },
    { kana: 'ポスター', romaji: 'posutaa', meaning: 'áp phích' },
    { kana: 'メッセージ', romaji: 'messeeji', meaning: 'tin nhắn' },
    { kana: 'トラブル', romaji: 'toraburu', meaning: 'rắc rối' },
    { kana: 'チャンス', romaji: 'chansu', meaning: 'cơ hội' },
    { kana: 'アイデア', romaji: 'aidea', meaning: 'ý tưởng' },
    { kana: 'デザイン', romaji: 'dezain', meaning: 'thiết kế' },
    { kana: 'パスポート', romaji: 'pasupooto', meaning: 'hộ chiếu' },
    { kana: 'エレベーター', romaji: 'erebeetaa', meaning: 'thang máy' },
    { kana: 'エスカレーター', romaji: 'esukareetaa', meaning: 'thang cuốn' },
    { kana: 'プラスチック', romaji: 'purasuchikku', meaning: 'nhựa' },
    { kana: 'インターネット', romaji: 'intaanetto', meaning: 'mạng internet' },
    { kana: 'チョコレート', romaji: 'chokoreeto', meaning: 'sô cô la' },
    { kana: 'ハンバーガー', romaji: 'hanbaagaa', meaning: 'bánh bơ-gơ' },
    { kana: 'アイスクリーム', romaji: 'aisukuriimu', meaning: 'kem' },
    { kana: 'スーツケース', romaji: 'suutsukeesu', meaning: 'va li' },
    { kana: 'スポーツ', romaji: 'supootsu', meaning: 'thể thao' },
    { kana: 'アルバイト', romaji: 'arubaito', meaning: 'việc làm thêm' },
    { kana: 'ボランティア', romaji: 'borantia', meaning: 'tình nguyện viên' },
];

function getUniqueData(data: TestItem[]): TestItem[] {
    const map = new Map<string, TestItem>();
    data.forEach(item => {
        // Only add if kana is valid Japanese characters (Hiragana, Katakana, Kanji) and long vowel mark
        if (item.kana && /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u30FC]+$/.test(item.kana)) {
            map.set(item.kana, item);
        }
    });
    return Array.from(map.values());
}

export const UNIQUE_WEEK1_TEST_DATA = getUniqueData(WEEK1_TEST_DATA);
export const UNIQUE_WEEK2_TEST_DATA = getUniqueData(WEEK2_TEST_DATA);
