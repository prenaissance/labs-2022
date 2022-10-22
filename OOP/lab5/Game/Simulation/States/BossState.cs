using lab5.Game.Simulation.States.Abstractions;
using lab5.Game.Abstractions;
using lab5.Models.Abstractions;
using lab5.Models;
using lab5.Models.Tools;

namespace lab5.Game.Simulation.States
{
    public class BossState : IState
    {
        private readonly IGameLogger _logger;
        private readonly MarkovChain<State> _markovChain;
        private readonly GameStats _gameStats;
        public BossState(IGameLogger logger, GameStats gameStats)
        {
            _logger = logger;
            _gameStats = gameStats;

            _markovChain = new MarkovChain<State>()
                .AddState(State.WEAK_ENEMY, 1)
                .AddState(State.SHRINE, 0.5)
                .AddState(State.PVP, 1);
        }
        public void Handle(PlayableCharacter player)
        {
            player.Statuses.IsInBattle = true;
            player.Health -= 70;
            player.Tool = new Sword()
            {
                Damage = new Random().Next(10, 15)
            };
            if (player.Health <= 0)
            {
                _logger.LogChange($"Player {player.Id} died from a boss fight!");
                player.Statuses.IsAlive = false;
                _gameStats.BossKills++;
            }
            else
            {
                _logger.LogChange($"Player {player.Id} killed a boss and stole its sword!");
                player.Statuses.BossKills++;
            }
        }
        public State NextState()
        {
            return _markovChain.GetNextState();
        }
    }
}