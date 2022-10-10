using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using lab4.Game;
using lab4.Contexts;
using lab4.Game.Abstractions;
using lab4.Models;
using lab4.Models.Abstractions;
using lab4.Game.States;

namespace lab4
{
    public static class DependencyRegister
    {

        static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services
                        .AddSingleton<GameContext>()
                        .AddSingleton<Frames>()
                        .AddSingleton<IMap, StarterMap>()
                        .AddSingleton<Character, PlayableCharacter>()
                        .AddSingleton<IGameLogger, GameLogger>()
                        .AddSingleton<ShrineState>()
                        .AddSingleton<WeakEnemyState>()
                        .AddSingleton<InitialState>();
                });

        public static IHost GetHost() => CreateHostBuilder(new string[] { }).Build();
    }
}