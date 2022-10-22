using lab5.Game.Abstractions;
using lab5.Game.Simulation.States.Abstractions;
using lab5.Models;
using lab5.Models.Abstractions;
using lab5.Game;

namespace lab5.Game.Simulation.States
{
    public class ShrineState : IState
    {
        private readonly IGameLogger _logger;
        private readonly WeakEnemyState _weakEnemyState;
        private readonly MarkovChain<State> _markovChain;
        private readonly GameStats _gameStats;
        public ShrineState(IGameLogger logger, WeakEnemyState weakEnemyState, GameStats gameStats)
        {
            _logger = logger;
            _weakEnemyState = weakEnemyState;
            _gameStats = gameStats;

            _markovChain = new MarkovChain<State>()
                .AddState(State.WEAK_ENEMY, 0.5)
                .AddState(State.SHRINE, 1)
                .AddState(State.PVP, 1);
        }
        public void Handle(PlayableCharacter player)
        {
            player.Health = 100;
            _logger.LogChange($"Player {player.Id} found a shrine and fully healed!");
            _gameStats.ShrinesVisited++;
        }
        public State NextState()
        {
            var markovChain = new MarkovChain<State>()
                .AddState(State.WEAK_ENEMY, 0.5)
                .AddState(State.BOSS, 1)
                .AddState(State.PVP, 2);

            return _markovChain.GetNextState();
        }
    }
}
