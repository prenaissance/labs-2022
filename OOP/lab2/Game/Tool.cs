// tool class with durability, damage and some methods
namespace lab2.Game
{
    public class Tool
    {
        public int Durability { get; set; }
        public int Damage { get; set; }
        public Tool(int durability, int damage)
        {
            Durability = durability;
            Damage = damage;
        }
        public void Use()
        {
            Durability--;
        }
        public void Repair()
        {
            Durability++;
        }
    }
}