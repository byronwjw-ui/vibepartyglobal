// 现场 Tier List · 题库
import type { ModeTag } from '@/types';

export interface TierTopic {
  id: string;
  title: string;
  items: string[];
  modeTags: ModeTag[];
  level: 'soft' | 'funny' | 'spicy';
}

export const TIER_TOPICS: TierTopic[] = [
  { id: 'milktea',  title: '奶茶品牌', items: ['嗜喘','CoCo','一点点','蜂蜜雪城','乐乐茶','泸酥弄','鄙上阿娆','茶百道','七分甜','麦豆肉骨茶'], modeTags: ['friends','icebreaker','sober'], level: 'soft' },
  { id: 'food',     title: '夜宵选手', items: ['烧烤','麻辣烫','火锅','小龙虾','凉皮','烤鱼','豆汁油条','营养快餐','油泼面','手抓饼'], modeTags: ['friends','funny','sober'], level: 'soft' },
  { id: 'apps',     title: '手机高频应用', items: ['微信','抽音','小红书','微博','淘宝','美团','快手','B站','知乎','豆瓣','高德'], modeTags: ['friends','funny','icebreaker'], level: 'soft' },
  { id: 'date',     title: '约会信号强度', items: ['主动联系','记得你口味','在你面前紧张','出门帮你占位','为你开过眼中的灯','商量未来计划','偷偷看你朋友圈','主动提同出门'], modeTags: ['spicy','funny'], level: 'spicy' },
  { id: 'boss',     title: '老板类型', items: ['画饼侠','微管理狂','甚么都不管','一起加班狂','拍肩代言人','机械严肃','哥们伩老板','东躲西藏'], modeTags: ['funny','friends'], level: 'funny' },
  { id: 'colleague',title: '同事场景', items: ['午餐代点','下班接话','拼奶茶','群里躺水','帮忙推班','跟你护短','抢着报销','记住你生日'], modeTags: ['icebreaker','funny','friends'], level: 'soft' },
  { id: 'songs',    title: 'KTV 必点', items: ['香水有毒','勇气','告白气球','千里之外','双节棍','青花瓷','夜曲','最伟大的作品','听妈妈的话','朗朗上口','起风了','Mojito'], modeTags: ['friends','funny','drinking','sober'], level: 'soft' },
  { id: 'travel',   title: '国内旅行目的地', items: ['云南','西藏','新疆','成都','上海','厦门','杭州','青岛','珠海','重庆','马尔代夫式三亚'], modeTags: ['friends','icebreaker'], level: 'soft' },
  { id: 'weekend',  title: '周末方式', items: ['在家躺平','露营','看展','密室剧本杀','去山里','咖啡馆打卡','朋友局','独自看电影','加班','家事日'], modeTags: ['friends','icebreaker','sober'], level: 'soft' },
  { id: 'breakfast',title: '早餐选手', items: ['包子','烧酥','状元香锅牙','豆浆油条','手抓饼','沉默不吃','便利店三明治','热干面','椒盐饼干'], modeTags: ['friends','sober','icebreaker'], level: 'soft' },
];
