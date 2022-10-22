using lab5.Game.Simulation;
using lab5.Models.Abstractions;
using lab5.Models.Tools;

namespace lab5.Models
{
    public class PlayableCharacter : Character
    {
        public int Armor { get; set; }
        public Tool Tool { get; set; } = new Sword() { Damage = 3 };
        public PlayerStatuses Statuses { get; set; } = new PlayerStatuses();
        public StateManager StateManager { get; set; }
        public PlayableCharacter(StateManager stateManager)
        {
            this.StateManager = stateManager;
        }

        public override void Attack(Character target)
        {
            var random = new Random();
            var baseDamage = Level + Damage + random.Next(0, 4) - 2;
            int additionalDamage = Tool.Durability > 0 ? Tool.Damage : 0;
            target.TakeDamage(baseDamage + additionalDamage);
        }
        public override void TakeDamage(int damage)
        {
            Health -= (damage - Armor) > 1 ? damage - Armor : 1;
        }
    }
}