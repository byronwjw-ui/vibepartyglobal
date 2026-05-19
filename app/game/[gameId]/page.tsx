'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { getGame } from '@/data/games';
import { usePartyStore } from '@/store/usePartyStore';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import EmptyState from '@/components/EmptyState';

// 原有 16 个
import OracleBookGame from './games/OracleBookGame';
import TruthOrDareGame from './games/TruthOrDareGame';
import NeverHaveIEverGame from './games/NeverHaveIEverGame';
import WouldYouRatherGame from './games/WouldYouRatherGame';
import MostLikelyToGame from './games/MostLikelyToGame';
import HotSeatGame from './games/HotSeatGame';
import FiveSecondGame from './games/FiveSecondGame';
import NumberBombGame from './games/NumberBombGame';
import VibeCardsGame from './games/VibeCardsGame';
import HigherLowerGame from './games/HigherLowerGame';
import MineTrapGame from './games/MineTrapGame';
import CharadesGame from './games/CharadesGame';
import KingsCommandGame from './games/KingsCommandGame';
import UndercoverGame from './games/UndercoverGame';
import SecretLocationGame from './games/SecretLocationGame';
import MafiaLiteGame from './games/MafiaLiteGame';

// 新增 12 个
import ChainPoetGame from './games/ChainPoetGame';
import ThreeSentenceGame from './games/ThreeSentenceGame';
import TwoTruthsGame from './games/TwoTruthsGame';
import GuessDoodleGame from './games/GuessDoodleGame';
import PassBombGame from './games/PassBombGame';
import TabooWordGame from './games/TabooWordGame';
import RhythmClapGame from './games/RhythmClapGame';
import HeartRadarGame from './games/HeartRadarGame';
import SecretMailboxGame from './games/SecretMailboxGame';
import CheersChainGame from './games/CheersChainGame';
import PartyRpsGame from './games/PartyRpsGame';
import BlindVoteGame from './games/BlindVoteGame';

// 派对实验室 4 个
import VibeTypeGame from './games/VibeTypeGame';
import WhoIsAiGame from './games/WhoIsAiGame';
import SlideshowStoryGame from './games/SlideshowStoryGame';
import TierListGame from './games/TierListGame';

const REGISTRY: Record<string, React.ComponentType> = {
  'oracle-book': OracleBookGame,
  'truth-or-dare': TruthOrDareGame,
  'never-have-i-ever': NeverHaveIEverGame,
  'would-you-rather': WouldYouRatherGame,
  'most-likely-to': MostLikelyToGame,
  'hot-seat': HotSeatGame,
  'five-second': FiveSecondGame,
  'number-bomb': NumberBombGame,
  'vibe-cards': VibeCardsGame,
  'higher-lower': HigherLowerGame,
  'mine-trap': MineTrapGame,
  'charades': CharadesGame,
  'kings-command': KingsCommandGame,
  'undercover': UndercoverGame,
  'secret-location': SecretLocationGame,
  'mafia-lite': MafiaLiteGame,
  // 新增
  'chain-poet': ChainPoetGame,
  'three-sentence': ThreeSentenceGame,
  'two-truths': TwoTruthsGame,
  'guess-doodle': GuessDoodleGame,
  'pass-bomb': PassBombGame,
  'taboo-word': TabooWordGame,
  'rhythm-clap': RhythmClapGame,
  'heart-radar': HeartRadarGame,
  'secret-mailbox': SecretMailboxGame,
  'cheers-chain': CheersChainGame,
  'party-rps': PartyRpsGame,
  'blind-vote': BlindVoteGame,
  // 派对实验室
  'vibe-type': VibeTypeGame,
  'who-is-ai': WhoIsAiGame,
  'slideshow-story': SlideshowStoryGame,
  'tier-list': TierListGame,
};

export default function GamePage() {
  const params = useParams<{ gameId: string }>();
  const gameId = params?.gameId as string;
  const game = getGame(gameId);
  const players = usePartyStore((s) => s.players);
  const pushRecent = usePartyStore((s) => s.pushRecent);
  const hydrated = usePartyStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && game) pushRecent(game.id);
  }, [hydrated, game, pushRecent]);

  if (!game) {
    return (
      <AppShell>
        <PageHeader title="未找到该游戏" backHref="/lobby" />
        <main className="px-4"><EmptyState title="这个游戏暂不可玩" desc="请返回大厅选择其他游戏。" actionHref="/lobby" actionLabel="返回大厅" /></main>
      </AppShell>
    );
  }

  if (hydrated && players.length < game.minPlayers) {
    return (
      <AppShell>
        <PageHeader title={game.title} backHref="/lobby" />
        <main className="px-4">
          <EmptyState
            title={`这个游戏至少需要 ${game.minPlayers} 位玩家`}
            desc={`当前只有 ${players.length} 位，去添加一下吧～`}
            actionHref="/setup"
            actionLabel="去添加玩家"
          />
        </main>
      </AppShell>
    );
  }

  const Component = REGISTRY[game.id];
  if (!Component) {
    return (
      <AppShell>
        <PageHeader title={game.title} backHref="/lobby" />
        <main className="px-4"><EmptyState title="游戏正在热身中" desc="该游戏组件尚未接入。" actionHref="/lobby" actionLabel="返回大厅" /></main>
      </AppShell>
    );
  }

  return <Component />;
}
