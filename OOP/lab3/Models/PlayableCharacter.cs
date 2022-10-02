using lab3.Models.Abstractions;

namespace lab3.Models
{
    public class PlayableCharacter : Character
    {
        public int Armor { get; set; }
        private Tool _tool;
        public PlayableCharacter(Tool tool)
        {
            _tool = tool;
        }

        public override void Attack(Character target)
        {
            var random = new Random();
            var baseDamage = Damage + random.Next(0, 4) - 2;
            int additionalDamage = _tool.Durability > 0 ? _tool.Damage : 0;
            target.TakeDamage(baseDamage + additionalDamage);
        }
    }
}