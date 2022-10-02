using lab3.Models.Abstractions;

namespace lab3.Models
{
    public class Enemy : Character
    {
        private readonly int _loot;
        public Enemy()
        {
            _loot = new Random().Next(1, 100);
        }
        public override void Attack(Character other)
        {
            other.TakeDamage(Damage);

            if (Health <= 0)
            {
                System.Console.WriteLine($"Enemy died and dropped {_loot} gold");
            }
        }
    }
}