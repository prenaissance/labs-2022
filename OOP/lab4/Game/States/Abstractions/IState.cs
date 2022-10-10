using lab4.Models.Abstractions;

namespace lab4.Game.States.Abstractions
{
    public interface IState
    {
        void Handle();
        IState NextState();
    }
}