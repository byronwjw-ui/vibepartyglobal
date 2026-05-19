import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 900: '#0B0614', 800: '#12001F', 700: '#071426' },
        neon: { pink: '#FF2DAA', purple: '#8B5CF6', cyan: '#22D3EE', orange: '#FB923C', lime: '#A3E635' },
      },
      fontFamily: { sans: ['system-ui','-apple-system','BlinkMacSystemFont','"PingFang SC"','"Microsoft YaHei"','sans-serif'] },
      boxShadow: {
        neon: '0 0 24px rgba(255,45,170,0.45), 0 0 60px rgba(139,92,246,0.35)',
        glass: '0 8px 32px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        'party-grad': 'linear-gradient(135deg, #12001F 0%, #0B0614 45%, #071426 100%)',
        'neon-grad': 'linear-gradient(135deg, #FF2DAA 0%, #8B5CF6 50%, #22D3EE 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': { '0%,100%': { opacity: '0.8', filter: 'blur(40px)' }, '50%': { opacity: '1', filter: 'blur(60px)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
      },
    },
  },
  plugins: [],
};
export default config;
