using lab5.Game.Abstractions;
using lab5.Game.Simulation.States.Abstractions;
using lab5.Models;
using lab5.Models.Abstractions;
using lab5.Game;
using lab5.Repositories.Abstractions;

namespace lab5.Game.Simulation.States
{
    public class PvpState : IState
    {
        private readonly IGameLogger _gameLogger;
        private readonly IRepository<PlayableCharacter> _playerRepository;
        private readonly GameStats _gameStats;
        public PvpState(IGameLogger gameLogger, IRepository<PlayableCharacter> playerRepository, GameStats gameStats)
        {
            _gameLogger = gameLogger;
            _playerRepository = playerRepository;
            _gameStats = gameStats;
        }
        private void UpdateResult(PlayableCharacter winner, PlayableCharacter loser)
        {
            _gameLogger.LogChange($"Player {loser.Id} died from player {winner.Id}!");
            loser.Statuses.IsAlive = false;
            winner.Statuses.PvpKills++;
            winner.Level += 2;
            winner.Health = Math.Max(winner.Health + 50, 100);
            _gameStats.PvpKills++;
        }
        public void Handle(PlayableCharacter player)
        {
            PlayableCharacter? otherPlayer = _playerRepository
                .GetAll()
                .Where(x => x.Id != player.Id)
                .Where(x => x.Statuses.IsAlive == true && x.Statuses.IsInBattle == false)
                .FirstOrDefault();
            if (otherPlayer == null)
            {
                _gameLogger.LogChange($"Player {player.Id} tried to fight, but found no one.");
                return;
            }
            player.Statuses.IsInBattle = true;
            otherPlayer.Statuses.IsInBattle = true;
            otherPlayer.StateManager.CurrentState = player.StateManager.CurrentState;//pvp state

            while (player.Health > 0 && otherPlayer.Health > 0)
            {
                player.Attack(otherPlayer);
                if (player.Health <= 0)
                {
                    UpdateResult(otherPlayer, player);
                }
                else if (otherPlayer.Health <= 0)
                {
                    UpdateResult(player, otherPlayer);
                }
                else
                {
                    otherPlayer.Attack(player);
                }
            }
        }
        public State NextState()
        {
            return State.WEAK_ENEMY;
        }
    }
}
