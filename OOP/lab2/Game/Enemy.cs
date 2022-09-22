namespace lab2.Game
{
    public class Enemy
    {
        public int Health { get; set; }
        public int Damage { get; set; }
        public int Speed { get; set; }
        private readonly int _loot;
        public Enemy(int health, int damage, int speed)
        {
            Health = health;
            Damage = damage;
            Speed = speed;
            _loot = new Random().Next(1, 100);
        }
        public void GetDamaged(int damage)
        {
            Health -= damage;
            if (Health <= 0)
            {
                System.Console.WriteLine($"Enemy died and dropped {_loot} coins");
            }
        }
    }
}