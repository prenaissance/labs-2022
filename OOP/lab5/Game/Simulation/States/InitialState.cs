using lab5.Game.Abstractions;
using lab5.Game.Simulation.States.Abstractions;
using lab5.Models.Abstractions;
using lab5.Game;
using lab5.Models;

namespace lab5.Game.Simulation.States
{
    public class InitialState : IState
    {
        private readonly IGameLogger _logger;
        private readonly MarkovChain<State> _markovChain;
        public InitialState(IGameLogger logger)
        {
            _logger = logger;
            _markovChain = new MarkovChain<State>()
                .AddState(State.WEAK_ENEMY, 1)
                .AddState(State.PVP, 0.2);
        }
        public void Handle(PlayableCharacter player)
        {
        }
        public State NextState()
        {
            return _markovChain.GetNextState();
        }
    }
}
