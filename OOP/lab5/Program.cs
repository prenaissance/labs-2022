using lab5.Contexts;
using lab5.Game;
using lab5.Models;
using lab5.Repositories;
using lab5.Models.Abstractions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using lab5.Game.Simulation.States.Abstractions;
using lab5.Game.Simulation.States;
using lab5.Game.Simulation;

namespace lab5
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string playerCountString = string.IsNullOrWhiteSpace(args[0]) ? "10" : args[0];
            int.TryParse(playerCountString, out int playerCount);
            IHost host = DependencyRegister.GetHost();
            GameContext gameContext = host.Services.GetRequiredService<GameContext>();
            for (int i = 0; i < playerCount; i++)
            {
                gameContext.AddPlayer(host.Services.GetRequiredService<PlayableCharacter>());
            }
            await gameContext.Loop();
        }
    }
}