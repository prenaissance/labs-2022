using lab3.Game;

namespace lab3.Models.Abstractions
{
    public interface IMovable
    {
        public Coords Coords { get; set; }
        public Angle Angle { get; set; }
        public void MoveTo(Coords coords);
        public void LookAt(Angle angle);
    }
}