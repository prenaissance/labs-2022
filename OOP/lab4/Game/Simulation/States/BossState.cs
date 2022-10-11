using lab4.Game.Simulation.States.Abstractions;
using lab4.Game.Abstractions;
using lab4.Models.Abstractions;

namespace lab4.Game.Simulation.States
{
    public class BossState : IState
    {
        private readonly Character _player;
        private readonly Frames _frames;
        private readonly IGameLogger _logger;
        public BossState(Character player, Frames frames, IGameLogger logger)
        {
            _player = player;
            _frames = frames;
            _logger = logger;
        }
        public void Handle()
        {
            _player.Health -= 20;
            _logger.LogChange("Not implemented!");
            _logger.LogStats();
        }
        public State NextState()
        {
            return State.SHRINE;
        }
    }
}