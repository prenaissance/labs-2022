using lab4.Game.Abstractions;
using lab4.Game.Simulation.States.Abstractions;
using lab4.Models;
using lab4.Models.Abstractions;
using lab4.Game;

namespace lab4.Game.Simulation.States
{
    public class WeakEnemyState : IState
    {
        private readonly Character _player;
        private readonly Frames _frames;
        private readonly IGameLogger _gameLogger;
        // private readonly ShrineState _shrineState;
        public WeakEnemyState(Character player, Frames frames, IGameLogger gameLogger/*, ShrineState shrineState*/)
        {
            _player = player;
            _frames = frames;
            _gameLogger = gameLogger;
            // _shrineState = shrineState;
        }
        public void Handle()
        {
            Enemy enemy = new Enemy()
            {
                Health = 100,
                Level = _player.Level,
                Damage = 5 + _player.Level,
            };

            _gameLogger.LogEnemy("Player and weak enemy fight!");
            while (_player.Health > 0 && enemy.Health > 0)
            {
                _player.Attack(enemy);
                enemy.Attack(_player);
            }
            _player.XP += enemy.XP;
            if (_player.XP >= 100)
            {
                _player.Health = _player.Health + 50 > 100 ? 100 : _player.Health + 50;
                _player.Level += _player.XP / 100;
                _player.XP = _player.XP % 100;
                _gameLogger.LogChange("Level up!");
            }
            _gameLogger.LogStats();

        }
        public State NextState()
        {
            return State.WEAK_ENEMY;
        }
    }
}
