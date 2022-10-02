namespace lab3.Models
{
    public class Sword : Tool
    {

        public Sword()
        {
            Damage = 10;
        }

        public override void Use()
        {
        }

        public override void Repair()
        {
            Damage++;
        }
    }
}