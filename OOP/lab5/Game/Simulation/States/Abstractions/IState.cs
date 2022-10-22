
using lab5.Models;

namespace lab5.Game.Simulation.States.Abstractions
{
    public interface IState
    {
        void Handle(PlayableCharacter player);
        State NextState();
    }
    public enum State
    {
        INITIAL,
        WEAK_ENEMY,
        SHRINE,
        BOSS,
        PVP
    }
}