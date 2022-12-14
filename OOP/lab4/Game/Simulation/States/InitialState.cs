using lab4.Game.Abstractions;
using lab4.Game.Simulation.States.Abstractions;
using lab4.Models.Abstractions;
using lab4.Game;

namespace lab4.Game.Simulation.States
{
    public class InitialState : IState
    {
        private readonly Character _player;
        private readonly Frames _frames;
        private readonly IGameLogger _logger;
        private readonly WeakEnemyState _weakEnemyState;
        public InitialState(Character player, Frames frames, IGameLogger logger, WeakEnemyState weakEnemyState)
        {
            _player = player;
            _frames = frames;
            _logger = logger;
            _weakEnemyState = weakEnemyState;
        }
        public void Handle()
        {
            _logger.LogChange("Game started!");
            _logger.LogStats();
        }
        public State NextState()
        {
            return State.WEAK_ENEMY;
        }
    }
}
