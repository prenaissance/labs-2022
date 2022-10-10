using lab4.Game.Abstractions;
using lab4.Models.Abstractions;

namespace lab4.Game
{
    public class GameLogger : IGameLogger
    {
        private readonly Character _player;
        public GameLogger(Character player)
        {
            _player = player;
        }
        public void LogStats()
        {
            Console.BackgroundColor = ConsoleColor.DarkBlue;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"Health: {_player.Health}/100    Damage: {_player.Damage}    XP: {_player.XP}/100");
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