namespace lab4.Game.Simulation
{
    public class MarkovChain<T> where T : Enum
    {
        private Dictionary<T, double> _states = new();
        private Random _random = new();

        public MarkovChain<T> AddState(T state, double weight = 1)
        {
            if (_states.ContainsKey(state))
            {
                _states[state] += weight;
            }
            return this;
        }
        public T GetNextState()
        {
            var totalWeight = _states.Values.Sum();
            var randomValue = _random.NextDouble() * totalWeight;
            var currentWeight = 0.0;
            foreach (var (state, weight) in _states)
            {
                currentWeight += weight;
                if (currentWeight >= randomValue)
                {
                    return state;
                }
            }
            throw new Exception("Something went wrong");
        }
    }
}