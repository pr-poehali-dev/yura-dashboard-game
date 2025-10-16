import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Player {
  id: number;
  name: string;
  level: number;
  rating: number;
  avatar: string;
}

interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  completed: boolean;
}

interface ShopItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  type: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('profile');
  const [coins, setCoins] = useState(1250);
  
  const currentPlayer: Player = {
    id: 1,
    name: 'Игрок',
    level: 12,
    rating: 3470,
    avatar: 'ИГ'
  };

  const [experience, setExperience] = useState(750);
  const experienceToNextLevel = 1000;

  const leaderboard: Player[] = [
    { id: 1, name: 'ProGamer', level: 25, rating: 5200, avatar: 'PG' },
    { id: 2, name: 'Ninja', level: 23, rating: 4850, avatar: 'NJ' },
    { id: 3, name: 'Мастер', level: 21, rating: 4320, avatar: 'МА' },
    { id: 4, name: currentPlayer.name, level: currentPlayer.level, rating: currentPlayer.rating, avatar: currentPlayer.avatar },
    { id: 5, name: 'Rookie', level: 10, rating: 2890, avatar: 'RK' },
  ];

  const quests: Quest[] = [
    { id: 1, title: 'Первая победа', description: 'Выиграй свой первый матч', reward: 100, progress: 1, total: 1, completed: true },
    { id: 2, title: 'Серия побед', description: 'Выиграй 5 матчей подряд', reward: 250, progress: 3, total: 5, completed: false },
    { id: 3, title: 'Коллекционер', description: 'Собери 10 предметов', reward: 300, progress: 6, total: 10, completed: false },
    { id: 4, title: 'Мастер уровня', description: 'Достигни 15 уровня', reward: 500, progress: 12, total: 15, completed: false },
  ];

  const shopItems: ShopItem[] = [
    { id: 1, name: 'Энергия', price: 50, icon: '⚡', type: 'consumable' },
    { id: 2, name: 'Щит', price: 150, icon: '🛡️', type: 'equipment' },
    { id: 3, name: 'Меч', price: 200, icon: '⚔️', type: 'equipment' },
    { id: 4, name: 'Зелье', price: 75, icon: '🧪', type: 'consumable' },
    { id: 5, name: 'Сундук', price: 300, icon: '📦', type: 'special' },
    { id: 6, name: 'Кристалл', price: 500, icon: '💎', type: 'special' },
  ];

  const buyItem = (item: ShopItem) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
                <AvatarFallback className="bg-primary-foreground/10 text-2xl font-bold">
                  {currentPlayer.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{currentPlayer.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
                    Уровень {currentPlayer.level}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Icon name="Star" size={16} className="fill-yellow-300 text-yellow-300" />
                    <span>{currentPlayer.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-lg">
                <span className="text-2xl">🪙</span>
                <span className="text-xl font-bold">{coins}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Опыт</span>
              <span>{experience} / {experienceToNextLevel}</span>
            </div>
            <Progress value={(experience / experienceToNextLevel) * 100} className="h-3 bg-primary-foreground/20" />
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-card">
            <TabsTrigger value="profile" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Trophy" size={20} />
              <span className="text-xs">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger value="levels" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Target" size={20} />
              <span className="text-xs">Уровни</span>
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ShoppingBag" size={20} />
              <span className="text-xs">Магазин</span>
            </TabsTrigger>
            <TabsTrigger value="quests" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ScrollText" size={20} />
              <span className="text-xs">Квесты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="User" size={24} className="text-primary" />
                Статистика игрока
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🎮</div>
                  <div className="text-2xl font-bold">{currentPlayer.level}</div>
                  <div className="text-sm text-muted-foreground">Уровень</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold">{currentPlayer.rating}</div>
                  <div className="text-sm text-muted-foreground">Рейтинг</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Побед</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🪙</div>
                  <div className="text-2xl font-bold">{coins}</div>
                  <div className="text-sm text-muted-foreground">Монет</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon name="Award" size={20} className="text-primary" />
                Достижения
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {['🥇', '🥈', '🥉', '🎯', '🔥', '💪'].map((emoji, i) => (
                  <div key={i} className="bg-muted rounded-lg p-3 text-center hover:bg-muted/70 transition-colors cursor-pointer">
                    <div className="text-3xl">{emoji}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rating" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Trophy" size={24} className="text-primary" />
                Таблица лидеров
              </h2>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      player.id === currentPlayer.id
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-muted hover:bg-muted/70'
                    }`}
                  >
                    <div className="text-xl font-bold text-muted-foreground w-8 text-center">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/20 font-bold">
                        {player.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">Уровень {player.level}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-lg">{player.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="levels" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" size={24} className="text-primary" />
                Прогресс уровней
              </h2>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => {
                  const level = currentPlayer.level - 2 + i;
                  const isCurrent = level === currentPlayer.level;
                  const isPassed = level < currentPlayer.level;
                  
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCurrent
                          ? 'bg-primary/10 border-primary'
                          : isPassed
                          ? 'bg-muted border-transparent opacity-60'
                          : 'bg-card border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            {level}
                          </div>
                          <div>
                            <div className="font-bold">Уровень {level}</div>
                            <div className="text-sm text-muted-foreground">
                              {isPassed ? 'Пройден' : isCurrent ? 'Текущий уровень' : 'Заблокирован'}
                            </div>
                          </div>
                        </div>
                        {isPassed && <Icon name="Check" size={24} className="text-green-500" />}
                        {!isPassed && !isCurrent && <Icon name="Lock" size={24} className="text-muted-foreground" />}
                      </div>
                      {isCurrent && (
                        <div className="mt-3">
                          <Progress value={(experience / experienceToNextLevel) * 100} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1 text-right">
                            {experience} / {experienceToNextLevel} XP
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="ShoppingBag" size={24} className="text-primary" />
                Магазин
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {shopItems.map((item) => (
                  <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <div className="text-5xl mb-3">{item.icon}</div>
                      <h3 className="font-bold mb-1">{item.name}</h3>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {item.type === 'consumable' ? 'Расходник' : item.type === 'equipment' ? 'Снаряжение' : 'Особое'}
                      </Badge>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-xl">🪙</span>
                        <span className="font-bold text-lg">{item.price}</span>
                      </div>
                      <Button
                        onClick={() => buyItem(item)}
                        disabled={coins < item.price}
                        className="w-full"
                        size="sm"
                      >
                        {coins >= item.price ? 'Купить' : 'Недостаточно'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="quests" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="ScrollText" size={24} className="text-primary" />
                Активные квесты
              </h2>
              <div className="space-y-3">
                {quests.map((quest) => (
                  <Card
                    key={quest.id}
                    className={`p-4 ${quest.completed ? 'bg-green-50 border-green-200' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold">{quest.title}</h3>
                          {quest.completed && (
                            <Badge className="bg-green-500">
                              <Icon name="Check" size={14} className="mr-1" />
                              Выполнен
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{quest.description}</p>
                      </div>
                      <div className="flex items-center gap-1 ml-4 bg-yellow-100 px-3 py-1 rounded-lg">
                        <span>🪙</span>
                        <span className="font-bold text-sm">{quest.reward}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium">{quest.progress} / {quest.total}</span>
                      </div>
                      <Progress value={(quest.progress / quest.total) * 100} className="h-2" />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}