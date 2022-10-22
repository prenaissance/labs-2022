using lab5.Game;
using lab5.Game.Abstractions;
using lab5.Models;
using lab5.Models.Abstractions;
using lab5.Repositories.Abstractions;

namespace lab5.Contexts
{
    public class GameContext
    {
        private readonly Frames _frames;
        private readonly IRepository<PlayableCharacter> _playerRepository;
        private readonly IGameLogger _logger;
        private readonly GameStats _gameStats;

        public GameContext(Frames frames, IRepository<PlayableCharacter> players, IGameLogger logger, GameStats gameStats)
        {
            _frames = frames;
            _playerRepository = players;
            _logger = logger;
            _gameStats = gameStats;
        }
        public void AddPlayer(PlayableCharacter player)
        {
            _playerRepository.Add(player);
        }
        public async Task Loop()
        {
            while (_playerRepository.GetAll().Where(player => player.Statuses.IsAlive).Count() > 1)
            {
                foreach (PlayableCharacter player in _playerRepository.GetAll().Where(player => player.Statuses.IsAlive))
                {
                    if (player.Statuses.IsInBattle)
                    {
                        continue;
                    }
                    player.StateManager.CurrentState.Handle(player);
                    player.StateManager.NextState();
                }

                foreach (PlayableCharacter player in _playerRepository.GetAll().Where(player => player.Statuses.IsAlive))
                {
                    player.Statuses.IsInBattle = false;
                }
                _logger.LogStats();
                _frames.Count++;
                await Task.Delay(100);
            }

            var survivor = _playerRepository.GetAll().Where(player => player.Statuses.IsAlive).FirstOrDefault();
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.WriteLine($"Total iterations: {_frames.Count}");
            if (survivor == null)
            {
                Console.WriteLine("The game ended tragically with no survivors.");
                return;
            }
            Console.WriteLine($"Player {survivor.Id} won the game!");
            Console.ResetColor();
            Console.WriteLine($"Winner boss kills: {survivor.Statuses.BossKills}");
            Console.WriteLine($"Winner player kills: {survivor.Statuses.PvpKills}");
            Console.WriteLine($"Winner level: {survivor.Level}");
            Console.WriteLine($"Winner sword damage: {survivor.Tool.Damage}");
            Console.WriteLine();
            Console.WriteLine($"Players killed by bosses: {_gameStats.BossKills}");
            Console.WriteLine($"Players killed by other players: {_gameStats.PvpKills}");
            Console.WriteLine($"PLayers killed by weak enemies: {_gameStats.WeakEnemiesKills}");
            Console.WriteLine($"PLayers shrine visits: {_gameStats.ShrinesVisited}");
        }
    }
}