using lab4.Game;
using lab4.Game.Abstractions;
using lab4.Models;
using lab4.Models.Abstractions;

namespace lab4.Contexts
{
    public class GameContext
    {
        private readonly IMap _map;
        private readonly Frames _frames;
        private readonly Character _player;
        public int Width { get; set; } = 800;
        public int Height { get; set; } = 600;
        public int FPS { get; set; } = 60;

        public GameContext(Frames frames, IMap map, Character player)
        {
            _frames = frames;
            _map = map;
            _player = player;
        }

        public void Start()
        {

        }

        private void Loop()
        {
            while (_player.Health > 0)
            {

            }

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("You died!");
            Console.ResetColor();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"You survived for {_frames.Count} iterations\n");
        }
    }
}