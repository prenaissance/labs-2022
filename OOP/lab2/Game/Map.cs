namespace lab2.Game
{
    public class Map
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public List<string> IslandNames { get; set; } = new List<string>();
        public Map(int width, int height)
        {
            Width = width;
            Height = height;
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