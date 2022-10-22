using lab5.Models.Abstractions;

namespace lab5.Models
{
    public class Enemy : Character
    {
        public Enemy()
        {
            XP = new Random().Next(30, 100);
        }
        public override void Attack(Character other)
        {
            if (Health > 0)
            {
                other.TakeDamage(Damage);
            }
        }
    }
}