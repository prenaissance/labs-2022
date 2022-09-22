namespace lab2.Contexts
{
    public class GameContext
    {
        private static readonly Lazy<GameContext> _lazy = new(() => new GameContext());
        public int Width { get; set; } = 800;
        public int Height { get; set; } = 600;
        public int FPS { get; set; } = 60;
        public static GameContext Instance
        {
            get => _lazy.Value;
        }

    }
}