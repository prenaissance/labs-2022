using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using lab5.Game;
using lab5.Contexts;
using lab5.Game.Abstractions;
using lab5.Models;
using lab5.Models.Abstractions;
using lab5.Game.Simulation.States;
using lab5.Repositories.Abstractions;
using lab5.Repositories;
using lab5.Game.Simulation;

namespace lab5
{
    public static class DependencyRegister
    {

        static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services
                        .AddSingleton<GameContext>()
                        .AddSingleton<GameStats>()
                        .AddSingleton<IRepository<PlayableCharacter>, EntityRepository<PlayableCharacter>>()
                        .AddTransient<StateManager>()
                        .AddTransient<PlayableCharacter>()
                        .AddSingleton<Frames>()
                        .AddSingleton<IMap, StarterMap>()
                        .AddSingleton<IGameLogger, GameLogger>()
                        .AddSingleton<ShrineState>()
                        .AddSingleton<WeakEnemyState>()
                        .AddSingleton<InitialState>()
                        .AddSingleton<BossState>()
                        .AddSingleton<PvpState>();
                });

        public static IHost GetHost() => CreateHostBuilder(new string[] { }).Build();
    }
}