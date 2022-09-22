namespace lab2.Game
{
    public class PlayableCharacter
    {
        public int Health { get; set; }
        public int Damage { get; set; }
        public int Speed { get; set; }
        public int Armor { get; set; }
        public PlayableCharacter(int health, int damage, int speed, int armor)
        {
            Health = health;
            Damage = damage;
            Speed = speed;
            Armor = armor;
        }
        public void Attack()
        {
            System.Console.WriteLine("Nothing to attack with! I can't hold other objects!");
        }
        public void TakeDamage(int damage)
        {
            Health -= damage;
        }
    }
}