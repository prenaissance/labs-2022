using lab3.Game;

namespace lab3.Models.Abstractions
{
    public abstract class Character : Entity, IMovable
    {
        public int Health { get; set; }
        public int Damage { get; set; }
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