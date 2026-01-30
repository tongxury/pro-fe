const toneConfig = {
    '0': {
        name: '抖音 IP 小姐姐',
        description: '机械女声，适用于通用场景',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV001_streaming_v2.mp3'
    },
    '1': {
        name: '抖音 IP 小哥哥',
        description: '机械男声，适用于通用场景',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV002_streaming_v2.mp3'
    },
    '2': {
        name: '成熟女声',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV009_DPE_streaming_v2.mp3'
    },
    '3': {
        name: '青年女声',
        description: '女声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV007_streaming_v2.mp3'
    },
    '4': {
        name: '稳重大叔',
        description: '男声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV006_streaming_v2.mp3'
    },
    '5': {
        name: '青年男声',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV008_DPE_streaming_v2.mp3'
    },
    '6': {
        name: '新闻女声',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV011_streaming_v2.mp3'
    },
    '7': {
        name: '可爱少女',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV005_streaming_v2.mp3'
    },
    '8': {
        name: '新闻男声',
        description: '男声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV012_streaming_v2.mp3'
    },
    '9': {
        name: '活力青年',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV056_streaming_v2.mp3'
    },
    '10': {
        name: '中英男声',
        description: '男声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV033_ParaTaco_v2.mp3'
    },
    '11': {
        name: '东北老铁',
        description: '男声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV021_streaming_v2.mp3'
    },
    '12': {
        name: '西安掌柜',
        description: '女声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV210_streaming_v2.mp3'
    },
    '13': {
        name: '港剧男神',
        description: '男声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV026_streaming_v2.mp3'
    },
    '14': {
        name: '甜美台妹',
        description: '女声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV025_streaming_v2.mp3'
    },
    '15': {
        name: '相声演员',
        description: '男声，推荐，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV212_streaming_v2.mp3'
    },
    '16': {
        name: '重庆小伙',
        description: '男声，推荐，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV019_streaming_v2.mp3'
    },
    '17': {
        name: '二次元萝莉',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV064_streaming_v2.mp3'
    },
    '18': {
        name: '海绵宝宝',
        description: '男声，推荐',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV063_streaming_v2.mp3'
    },
    '19': {
        name: '萌娃童声',
        description: '男声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV051_streaming_v2.mp3'
    },
    '20': {
        name: '说书大叔',
        description: '男声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV110_streaming_v2.mp3'
    },
    '21': {
        name: '阳光青年',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV123_streaming_v2.mp3'
    },
    '22': {
        name: '憨厚青年',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV120_streaming_v2.mp3'
    },
    '23': {
        name: '散漫赘婿',
        description: '男声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV119_streaming_v2.mp3'
    },
    '24': {
        name: '霸气青叔',
        description: '男声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV107_streaming_v2.mp3'
    },
    '25': {
        name: '质朴青年',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV100_streaming_v2.mp3'
    },
    '26': {
        name: '儒雅青年',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV102_streaming_v2.mp3'
    },
    '27': {
        name: '开朗青年',
        description: '男声，青年',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV004_streaming_v2.mp3'
    },
    '28': {
        name: '温和少御',
        description: '女声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV114_streaming_v2.mp3'
    },
    '29': {
        name: '平缓少御',
        description: '女声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV113_streaming_v2.mp3'
    },
    '30': {
        name: '甜美女声',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV405_streaming_v2.mp3'
    },
    '32': {
        name: '活泼幼教',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV057_ParaTaco_streaming_v2.mp3'
    },
    '33': {
        name: '活泼女声',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV005_ParaTaco_streaming_v2.mp3'
    },
    '34': {
        name: '亲切女声',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV007_ParaTaco_streaming_v2.mp3'
    },
    '35': {
        name: '知性女声',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV009_DPE_ParaTaco_streaming_v2.mp3'
    },
    '36': {
        name: '知性男声',
        description: '男声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV008_DPE_ParaTaco_streaming_v2.mp3'
    },
    '37': {
        name: '灿灿',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV700_streaming_v2.mp3'
    },
    '38': {
        name: '阳光男声',
        description: '男声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV419_streaming_v2.mp3'
    },
    '39': {
        name: '天才童声',
        description: '男声，虚拟人，推荐',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV061_v2.mp3'
    },
    '40': {
        name: '超自然 - 梓梓',
        description: '女声，虚拟人',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV406_streaming_v2.mp3'
    },
    '45': {
        name: '动漫小新',
        description: '男声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV050_streaming_v2.mp3'
    },
    '46': {
        name: '台普男声',
        description: '男声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV227_streaming_v2.mp3'
    },
    '47': {
        name: '广西表哥',
        description: '男声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV213_streaming_v2.mp3'
    },
    '48': {
        name: '温柔小哥',
        description: '男声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV033_streaming_v2.mp3'
    },
    '49': {
        name: '影视解说小帅',
        description: '男声，推荐，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV411_streaming_v2.mp3'
    },
    '50': {
        name: '活力解说男',
        description: '男声，推荐，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV410_streaming_v2.mp3'
    },
    '51': {
        name: '译制片男声',
        description: '男声，推荐，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV408_streaming_v2.mp3'
    },
    '52': {
        name: '擎苍',
        description: '男声，推荐，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV701_streaming_v2.mp3'
    },
    '53': {
        name: '智慧老者',
        description: '男声，推荐，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV158_streaming_v2.mp3'
    },
    '54': {
        name: '东北丫头',
        description: '女声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV020_streaming_v2.mp3'
    },
    '55': {
        name: '长沙靓女',
        description: '女声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV216_streaming_v2.mp3'
    },
    '56': {
        name: '沪上阿姐',
        description: '女声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV217_streaming_v2.mp3'
    },
    '57': {
        name: '促销女声',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV402_streaming_v2.mp3'
    },
    '58': {
        name: '湖南妹坨',
        description: '女声，方言',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV226_streaming_v2.mp3'
    },
    '59': {
        name: '天才少女',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV421_streaming_v2.mp3'
    },
    '60': {
        name: '鸡汤女声',
        description: '女声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV403_streaming_v2.mp3'
    },
    '61': {
        name: '影视解说小美',
        description: '女声，小说',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV412_streaming_v2.mp3'
    },
    '62': {
        name: '直播一姐',
        description: '女声',
        url: 'https://lf-iccloud-muse.volcmusecdn.com/obj/labcv-tob/muse/new_tts_BV418_streaming_v2.mp3'
    }
}

export default toneConfig;