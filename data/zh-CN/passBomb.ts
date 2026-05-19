// 传递炸弹：倒计时期间轮流回答同一类制问题。炸裂时拿手机的人接挑战。
import type { ModeTag } from '@/types';

export interface BombCategory { title: string; modeTags: ModeTag[]; level: 'soft'|'funny'|'spicy'; }

export const BOMB_CATEGORIES: BombCategory[] = [
  { title: '说出一种奶茶口味', level: 'soft',  modeTags: ['friends','icebreaker','sober','funny'] },
  { title: '说出一种火锅涵菜', level: 'soft',  modeTags: ['friends','funny','drinking'] },
  { title: '说出一部插曲经典的电影', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { title: '说出一个适合约会的地点', level: 'spicy', modeTags: ['spicy','friends'] },
  { title: '说出一个你上班必听的歌手', level: 'soft',  modeTags: ['friends','funny','icebreaker'] },
  { title: '说出一种每周都要点的外卖', level: 'funny', modeTags: ['friends','funny','sober'] },
  { title: '说出一个你偶尔赶在丝衉里发拼音误的事', level: 'funny', modeTags: ['funny','friends'] },
  { title: '说出一个你看起来有理性但其实不太正经的你的小习惯', level: 'funny', modeTags: ['friends','funny'] },
  { title: '说出一个现场人被叫起来会不好意思的词', level: 'spicy', modeTags: ['spicy','friends'] },
  { title: '说出一个点赞过反徿你的人可能发过的话', level: 'spicy', modeTags: ['spicy','funny'] },
  { title: '说出一个手机里你不想别人看到的 App', level: 'funny', modeTags: ['funny','friends'] },
  { title: '说出一个你出门必带的东西', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { title: '说出一个你不会跳但会哼的舞曲', level: 'funny', modeTags: ['funny','friends'] },
  { title: '说出一个你被误以为是你作品的东西', level: 'funny', modeTags: ['funny','friends'] },
  { title: '说出一个你心里偏咱但实际不常说的领域', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { title: '说出一个“朝蹄忌剧本”里会出现的台词', level: 'funny', modeTags: ['spicy','funny'] },
  { title: '说出一个你听完会面狼狽的朋友口头禅', level: 'funny', modeTags: ['friends','funny'] },
  { title: '说出一个热闹场合适合逃跳的薪口', level: 'funny', modeTags: ['funny','friends'] },
  { title: '说出一个你最不想朋友看到的习惯', level: 'funny', modeTags: ['funny','friends'] },
  { title: '说出一个你始终什么也记不住的东西', level: 'funny', modeTags: ['funny','friends','icebreaker'] },
  { title: '说出一部香水品牌', level: 'soft',  modeTags: ['friends','icebreaker'] },
  { title: '说出一个现场你玩得最熟的游戏', level: 'funny', modeTags: ['friends','funny'] },
  { title: '说出一个你现在还在追的电视剧', level: 'soft',  modeTags: ['friends','sober','icebreaker'] },
  { title: '说出一个你设置了但从未听到的闹钟', level: 'funny', modeTags: ['funny','friends'] },
];
