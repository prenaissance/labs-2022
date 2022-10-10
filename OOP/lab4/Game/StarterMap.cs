using lab4.Game.Abstractions;

namespace lab4.Game
{
    public class StarterMap : IMap
    {
        public int Width { get; set; } = 800;
        public int Height { get; set; } = 600;
        public List<string> IslandNames { get; init; } = new List<string>();
        public StarterMap(int width, int height)
        {
            Width = width;
            Height = height;
            AddIsland("Nexus");
            AddIsland("Graveyard");
            AddIsland("Wilderness");
        }

        public void AddIsland(string name)
        {
            IslandNames.Add(name);
        }

        public override string ToString()
        {
            return $"Map: {Width}x{Height}, Islands: {string.Join(", ", IslandNames)}";
        }
    }
}