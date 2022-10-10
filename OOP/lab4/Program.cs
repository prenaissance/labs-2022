using lab4.Contexts;
using lab4.Game;
using lab4.Models;
using lab4.Repositories;
using lab4.Models.Abstractions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using lab4.Game.States.Abstractions;
using lab4.Game.States;

namespace lab4
{
    class Program
    {
        static void Main(string[] args)
        {
            IHost host = DependencyRegister.GetHost();
            // host.Services.GetRequiredService<GameContext>();
            IState state = host.Services.GetRequiredService<InitialState>();
            state.Handle();

            System.Console.WriteLine("Next state would be:");
            Console.WriteLine(state.NextState().GetType().Name);

            state = host.Services.GetRequiredService<WeakEnemyState>();
            for (int i = 0; i < 5; i++)
            {
                state.Handle();
            }

            System.Console.WriteLine("Moving player to a shrine");
            state = host.Services.GetRequiredService<ShrineState>();
            state.Handle();
        }
    }
}