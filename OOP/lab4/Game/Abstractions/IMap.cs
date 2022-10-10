namespace lab4.Game.Abstractions
{
    public interface IMap
    {
        int Width { get; set; }
        int Height { get; set; }
        List<string> IslandNames { get; init; }
        void AddIsland(string name);
    }
}