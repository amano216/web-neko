// テンプレートデータ構造 - DRY原則に従い共通データを管理
const TEMPLATE_DATA = {
    // デフォルトのテキストデータ
    defaultContent: {
        hero: {
            brideName: 'Bride Name',
            groomName: 'Groom Name',
            date: '2024.00.00',
            message: '私たちは結婚しました'
        },
        greeting: {
            title: 'ご挨拶',
            paragraphs: [
                '皆様へ',
                '私たちは○○年○○月○○日に入籍いたしました。',
                'これまで温かく見守ってくださった皆様に、心より感謝申し上げます。',
                '未熟な二人ではございますが、力を合わせて温かい家庭を築いていきたいと思います。',
                '今後ともどうぞよろしくお願いいたします。'
            ]
        },
        profile: {
            title: 'プロフィール',
            bride: {
                name: '新婦の名前',
                details: {
                    '生年月日': '1990年1月1日',
                    '出身地': '東京都',
                    '趣味': '料理、読書',
                    '好きなもの': 'カフェ巡り、映画鑑賞'
                }
            },
            groom: {
                name: '新郎の名前',
                details: {
                    '生年月日': '1990年1月1日',
                    '出身地': '神奈川県',
                    '趣味': 'スポーツ、音楽',
                    '好きなもの': '旅行、アウトドア'
                }
            }
        },
        history: {
            title: 'ふたりのヒストリー',
            events: [
                {
                    date: '2020.04',
                    title: '出会い',
                    description: '共通の友人の紹介で初めて出会いました'
                },
                {
                    date: '2020.12',
                    title: 'お付き合い開始',
                    description: 'クリスマスの日に正式にお付き合いをスタート'
                },
                {
                    date: '2023.06',
                    title: 'プロポーズ',
                    description: '思い出の場所でプロポーズ'
                },
                {
                    date: '2024.00',
                    title: '入籍',
                    description: '新しい人生のスタート'
                }
            ]
        },
        qa: {
            title: '一問一答',
            items: [
                {
                    question: 'お互いの第一印象は？',
                    answers: {
                        bride: '優しそうで話しやすい人だなと思いました',
                        groom: '笑顔が素敵な人だなと思いました'
                    }
                },
                {
                    question: 'お互いの好きなところは？',
                    answers: {
                        bride: 'いつも前向きで、一緒にいると元気になれるところ',
                        groom: '思いやりがあって、家族を大切にするところ'
                    }
                },
                {
                    question: '将来の夢は？',
                    answers: {
                        bride: '温かい家庭を築いて、たくさん旅行に行きたい',
                        groom: '家族みんなが笑顔で過ごせる家庭を作りたい'
                    }
                }
            ]
        },
        gallery: {
            title: 'フォトギャラリー',
            imageCount: 6
        },
        thanks: {
            title: '感謝を込めて',
            messages: [
                {
                    to: '両親へ',
                    message: '今まで大切に育ててくれてありがとうございました。これからも親孝行していきます。'
                },
                {
                    to: '友人の皆様へ',
                    message: 'いつも支えてくれてありがとう。これからも末長くよろしくお願いします。'
                },
                {
                    to: 'お世話になった方々へ',
                    message: '温かく見守ってくださり、ありがとうございます。これからも変わらぬお付き合いをお願いします。'
                }
            ]
        },
        message: {
            title: 'メッセージ',
            paragraphs: [
                '最後までご覧いただき、ありがとうございました。',
                'これから二人で力を合わせて、幸せな家庭を築いていきます。',
                '今後ともどうぞよろしくお願いいたします。'
            ]
        }
    },
    
    // テンプレート情報
    templates: {
        'wa-modern': {
            name: '和モダン',
            description: '日本の伝統美を現代的にアレンジしたデザイン',
            primaryColor: '#B71C1C',
            secondaryColor: '#D4AF37'
        },
        'nordic-natural': {
            name: '北欧ナチュラル',
            description: 'ミニマルで温かみのあるデザイン',
            primaryColor: '#7B9E87',
            secondaryColor: '#E8D5B7'
        },
        'simple-modern': {
            name: 'シンプルモダン',
            description: '洗練されたミニマルデザイン',
            primaryColor: '#1a1a1a',
            secondaryColor: '#666666'
        },
        'casual-pop': {
            name: 'カジュアルポップ',
            description: '明るく親しみやすいデザイン',
            primaryColor: '#FF6B6B',
            secondaryColor: '#4ECDC4'
        },
        'classical-european': {
            name: 'クラシカルヨーロピアン',
            description: '格調高い欧風デザイン',
            primaryColor: '#4B2C20',
            secondaryColor: '#C9A961'
        },
        'classic-elegant': {
            name: 'クラシックエレガント',
            description: '上品で優雅なデザイン',
            primaryColor: '#2C3E50',
            secondaryColor: '#BDC3C7'
        },
        'botanical-natural': {
            name: 'ボタニカルナチュラル',
            description: '植物モチーフの自然派デザイン',
            primaryColor: '#2E7D32',
            secondaryColor: '#81C784'
        },
        'nordic-minimal': {
            name: 'ノルディックミニマル',
            description: '北欧的なシンプルデザイン',
            primaryColor: '#212121',
            secondaryColor: '#9E9E9E'
        },
        'monochrome-artbook': {
            name: 'モノクロ・アートブック風',
            description: 'アーティスティックなモノトーン',
            primaryColor: '#000000',
            secondaryColor: '#424242'
        },
        'romantic-girly': {
            name: 'ロマンティックガーリー',
            description: '可愛らしく女性的なデザイン',
            primaryColor: '#E91E63',
            secondaryColor: '#F8BBD0'
        }
    }
};

// データ取得用ヘルパー関数
function getTemplateData(templateId) {
    return {
        ...TEMPLATE_DATA.defaultContent,
        templateInfo: TEMPLATE_DATA.templates[templateId] || {}
    };
}

// エクスポート（モジュール化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TEMPLATE_DATA, getTemplateData };
}