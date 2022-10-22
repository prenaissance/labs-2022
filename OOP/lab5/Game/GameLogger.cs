using lab5.Game.Abstractions;
using lab5.Models;
using lab5.Models.Abstractions;
using lab5.Repositories.Abstractions;

namespace lab5.Game
{
    public class GameLogger : IGameLogger
    {
        private readonly IRepository<PlayableCharacter> _playerRepository;
        public GameLogger(IRepository<PlayableCharacter> playerRepository)
        {
            _playerRepository = playerRepository;
        }
        public void LogStats()
        {
            Console.BackgroundColor = ConsoleColor.DarkBlue;
            Console.ForegroundColor = ConsoleColor.White;
            var alivePlayers = _playerRepository.GetAll().Where(player => player.Statuses.IsAlive);
            Console.WriteLine($"Alive players: {alivePlayers.Count()}");
            Console.ResetColor();
            Console.WriteLine();
        }

        public void LogEnemy(string message)
        {
            Console.ForegroundColor = ConsoleColor.DarkMagenta;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        public void LogChange(string message)
        {
            Console.ForegroundColor = ConsoleColor.DarkCyan;
            Console.WriteLine(message);
            Console.ResetColor();
        }
    }
}