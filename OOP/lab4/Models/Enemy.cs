using lab4.Models.Abstractions;

namespace lab4.Models
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