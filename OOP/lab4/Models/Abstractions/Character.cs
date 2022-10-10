using lab4.Game;

namespace lab4.Models.Abstractions
{
    public abstract class Character : Entity, IMovable
    {
        public int Level { get; set; } = 1;
        public int XP { get; set; } = 0;
        public int Health { get; set; } = 100;
        public int Damage { get; set; } = 10;
        public int Speed { get; set; }
        public Coords Coords { get; set; } = new(0, 0);
        public Angle Angle { get; set; } = new(0);
        public void MoveTo(Coords coords)
        {
            Coords = coords;
        }
        public void LookAt(Angle angle)
        {
            Angle = angle;
        }
        public abstract void Attack(Character target);
        public virtual void TakeDamage(int damage)
        {
            Health -= damage;
        }
    }
}