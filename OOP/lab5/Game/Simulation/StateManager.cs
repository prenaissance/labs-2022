using lab5.Game.Simulation.States;
using lab5.Game.Simulation.States.Abstractions;

namespace lab5.Game.Simulation
{
    public class StateManager
    {
        private readonly Dictionary<State, IState> _stateMap = new();
        public IState CurrentState { get; set; }

        public StateManager(InitialState initialState, WeakEnemyState weakEnemyState, ShrineState shrineState, BossState bossState, PvpState pvpState)
        {
            _stateMap.Add(State.INITIAL, initialState);
            _stateMap.Add(State.WEAK_ENEMY, weakEnemyState);
            _stateMap.Add(State.SHRINE, shrineState);
            _stateMap.Add(State.BOSS, bossState);
            _stateMap.Add(State.PVP, pvpState);
            CurrentState = initialState;
        }
        public void NextState()
        {
            State state = CurrentState.NextState();
            CurrentState = _stateMap[state];
        }
    }
}