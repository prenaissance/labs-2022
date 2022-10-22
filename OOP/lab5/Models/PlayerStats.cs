namespace lab5.Models
{
    public class PlayerStatuses
    {
        public bool IsAlive { get; set; } = true;
        public bool IsInBattle { get; set; } = false;
        public int BossKills { get; set; } = 0;
        public int PvpKills { get; set; } = 0;
    }
}