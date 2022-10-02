using lab3.Models.Abstractions;

namespace lab3.Models
{
    public class Tool : Entity
    {
        public int Durability { get; set; } = 5;
        public int Damage { get; set; } = 1;
        public virtual void Use()
        {
            Durability--;
        }
        public virtual void Repair()
        {
            Durability++;
        }
    }
}