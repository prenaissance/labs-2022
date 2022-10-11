using lab4.Game.Simulation.States;
using lab4.Game.Simulation.States.Abstractions;

namespace lab4.Game.Simulation
{
    public class StateManager
    {
        private readonly Dictionary<State, IState> _stateMap = new();
        public IState CurrentState { get; private set; }

        public StateManager(InitialState initialState, WeakEnemyState weakEnemyState, ShrineState shrineState, BossState bossState)
        {
            _stateMap.Add(State.INITIAL, initialState);
            _stateMap.Add(State.WEAK_ENEMY, weakEnemyState);
            _stateMap.Add(State.SHRINE, shrineState);
            _stateMap.Add(State.BOSS, bossState);
            CurrentState = initialState;
        }
        public void NextState()
        {
            State state = CurrentState.NextState();
            CurrentState = _stateMap[state];
        }
    }
}