using lab4.Models.Abstractions;
using lab4.Models.Tools;

namespace lab4.Models
{
    public class PlayableCharacter : Character
    {
        public int Armor { get; set; }
        public Tool Tool { get; set; }
        public PlayableCharacter()
        {
            Tool = new Sword()
            {
                Damage = 3,
            };
        }

        public override void Attack(Character target)
        {
            var random = new Random();
            var baseDamage = Damage + random.Next(0, 4) - 2;
            int additionalDamage = Tool.Durability > 0 ? Tool.Damage : 0;
            target.TakeDamage(baseDamage + additionalDamage);
        }
        public override void TakeDamage(int damage)
        {
            Health -= (damage - Armor) > 1 ? damage - Armor : 1;
        }
    }
}