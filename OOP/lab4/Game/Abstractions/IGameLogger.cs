namespace lab4.Game.Abstractions
{
    public interface IGameLogger
    {
        void LogStats();
        void LogEnemy(string message);
        void LogChange(string message);
    }
}