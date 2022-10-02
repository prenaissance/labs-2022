using lab3.Game;

namespace lab3.Contexts
{
    public class GameContext
    {
        private static readonly Lazy<GameContext> _lazy = new(() => new GameContext());
        public Frames Frames { get; set; }
        public Map Map { get; set; }
        public int Width { get; set; } = 800;
        public int Height { get; set; } = 600;
        public int FPS { get; set; } = 60;
        private GameContext()
        {
            Frames = new Frames();
            Map = new Map(Width, Height);
        }
        public static GameContext Instance
        {
            get => _lazy.Value;
        }

    }
}