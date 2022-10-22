using lab5.Game;

namespace lab5.Models.Abstractions
{
    public abstract class Character : Entity
    {
        public int Level { get; set; } = 1;
        public int XP { get; set; } = 0;
        public int Health { get; set; } = 100;
        public int Damage { get; set; } = 10;
        public abstract void Attack(Character target);
        public virtual void TakeDamage(int damage)
        {
            Health -= damage;
        }
    }
}