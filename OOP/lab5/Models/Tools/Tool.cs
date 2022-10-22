using lab5.Models.Abstractions;

namespace lab5.Models.Tools
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