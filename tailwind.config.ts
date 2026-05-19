import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 涂鸦贴纸风：米黄底 + 大色块 + 黑描边
        paper: {
          50:  '#FFFBF0',   // 主背景
          100: '#FAF3DC',   // 卡片
          200: '#F0E6BD',   // 边界/分隔
          900: '#161312',   // 描边/正文字
        },
        sticker: {
          red:    '#FF5252',
          coral:  '#FF7A59',
          orange: '#FFB020',
          yellow: '#FFD93D',
          lime:   '#9BE36D',
          green:  '#26C281',
          teal:   '#22D3BB',
          cyan:   '#5DC8FF',
          blue:   '#4F86FF',
          purple: '#9B6BFF',
          pink:   '#FF6FB8',
          magenta:'#FF2D8F',
        },
        // 兼容旧调色（少量旧组件还在引用）— 全部映射到贴纸色
        ink:   { 900: '#161312', 800: '#1A1413', 700: '#2A2220' },
        neon:  { pink: '#FF2D8F', purple: '#9B6BFF', cyan: '#5DC8FF', orange: '#FFB020', lime: '#9BE36D' },
      },
      fontFamily: {
        sans: ['system-ui','-apple-system','BlinkMacSystemFont','"PingFang SC"','"Microsoft YaHei"','sans-serif'],
        marker: ['"Marker Felt"','"Comic Sans MS"','system-ui','sans-serif'],
      },
      boxShadow: {
        // 偏移阴影 = 贴纸/漫画风的灵魂
        sticker:   '4px 4px 0 0 #161312',
        'sticker-sm': '3px 3px 0 0 #161312',
        'sticker-lg': '6px 6px 0 0 #161312',
        pop:       '0 8px 0 0 #161312',
        // 旧组件兼容
        neon:      '4px 4px 0 0 #161312',
        glass:     '3px 3px 0 0 #161312',
      },
      backgroundImage: {
        'paper-grad':   'radial-gradient(circle at 20% 10%, #FFE9A8 0%, transparent 50%), radial-gradient(circle at 80% 90%, #FFC7E0 0%, transparent 50%), #FFFBF0',
        'neon-grad':    'linear-gradient(135deg, #FF2D8F 0%, #FFB020 50%, #5DC8FF 100%)',
        'party-grad':   'linear-gradient(135deg, #FFE9A8 0%, #FFC7E0 100%)',
        'doodle-dots':  'radial-gradient(#16131210 1px, transparent 1px)',
      },
      borderWidth: { '3': '3px' },
      animation: {
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 0.6s ease-in-out infinite',
        'pop-in': 'pop-in 0.35s cubic-bezier(.34,1.56,.64,1)',
      },
      keyframes: {
        'pulse-glow': { '0%,100%': { opacity: '0.9' }, '50%': { opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0) rotate(-2deg)' }, '50%': { transform: 'translateY(-8px) rotate(1deg)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-2deg)' }, '50%': { transform: 'rotate(2deg)' } },
        'pop-in': { '0%': { transform: 'scale(0.85) rotate(-3deg)', opacity: '0' }, '100%': { transform: 'scale(1) rotate(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
export default config;
