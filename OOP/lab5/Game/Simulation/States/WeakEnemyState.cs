using lab5.Game.Abstractions;
using lab5.Game.Simulation.States.Abstractions;
using lab5.Models;

namespace lab5.Game.Simulation.States
{
    public class WeakEnemyState : IState
    {
        private readonly IGameLogger _gameLogger;
        private readonly MarkovChain<State> _markovChain;
        private readonly GameStats _gameStats;
        public WeakEnemyState(IGameLogger gameLogger, GameStats gameStats)
        {
            _gameStats = gameStats;
            _gameLogger = gameLogger;

            _markovChain = new MarkovChain<State>()
                .AddState(State.SHRINE, 0.5)
                .AddState(State.WEAK_ENEMY, 1)
                .AddState(State.PVP, 1)
                .AddState(State.BOSS, 1);
        }
        public void Handle(PlayableCharacter player)
        {
            player.Statuses.IsInBattle = true;
            Enemy enemy = new Enemy()
            {
                Health = 100,
                Level = player.Level,
                Damage = 1 + player.Level / 2,
            };

            while (player.Health > 0 && enemy.Health > 0)
            {
                player.Attack(enemy);
                enemy.Attack(player);
            }
            player.XP += enemy.XP;
            if (player.Health <= 0)
            {
                _gameLogger.LogChange($"Player {player.Id} died from a weak enemy!");
                player.Statuses.IsAlive = false;
                _gameStats.WeakEnemiesKills++;
            }
            if (player.XP >= 100)
            {
                player.Health = player.Health + 50 > 100 ? 100 : player.Health + 50;
                player.Level += player.XP / 100;
                player.XP = player.XP % 100;
            }

        }
        public State NextState()
        {
            return _markovChain.GetNextState();
        }
    }
}
