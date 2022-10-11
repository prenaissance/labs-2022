
namespace lab4.Game.Simulation.States.Abstractions
{
    public interface IState
    {
        void Handle();
        State NextState();
    }
    public enum State
    {
        INITIAL,
        WEAK_ENEMY,
        SHRINE,
        BOSS
    }
}