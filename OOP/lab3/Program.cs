// See https://aka.ms/new-console-template for more information
using lab3.Contexts;
using lab3.Game;
using lab3.Models;
using lab3.Repositories;
using lab3.Models.Abstractions;

System.Console.WriteLine("View angles for player and enemy:");
var angle = new Angle(90.56);
System.Console.WriteLine(angle);
var angle2 = new Angle(d: 300, m: 12, s: 1);
System.Console.WriteLine(angle);
System.Console.WriteLine();
System.Console.WriteLine("Coords for player and enemy:");
var coords = new Coords(1, 2);
var coords2 = new Coords(3, 4);
System.Console.WriteLine($"Coords: {coords}");
System.Console.WriteLine($"Coords2: {coords2}");
System.Console.ReadLine();

var gameContext = GameContext.Instance;
System.Console.WriteLine($"Game running at {gameContext.FPS} FPS");

gameContext.Frames.Count = 34;
System.Console.WriteLine($"Frames: {gameContext.Frames.Count}");
gameContext.Frames.Flush();

var map = gameContext.Map;
map.AddIsland("Island 1");
map.AddIsland("Island 2");
System.Console.WriteLine($"Current Map: {map}");

Sword sword = new Sword()
{
    Damage = 5
};

var player = new PlayableCharacter(sword)
{
    Health = 100,
    Damage = 10,
    Speed = 5,
    Armor = 0,
    Coords = coords,
    Angle = angle
};

var enemy = new Enemy()
{
    Health = 100,
    Damage = 15,
    Speed = 5,
    Coords = coords2,
    Angle = angle2
};
System.Console.WriteLine("Adding player and enemy to repository");
var characterRepository = new EntityRepository<Character>();
characterRepository.Add(player);
characterRepository.Add(enemy);
System.Console.WriteLine("Getting character with id 2:");
System.Console.WriteLine(characterRepository.Get(2)!.ToString());
System.Console.WriteLine();

System.Console.WriteLine($"Player health: {player.Health}");
System.Console.WriteLine($"Enemy health: {enemy.Health}");
System.Console.WriteLine();
System.Console.WriteLine("Player and enemy fight each other to the death!");

while (player.Health > 0 && enemy.Health > 0)
{
    player.Attack(enemy);
    enemy.Attack(player);

    System.Console.WriteLine($"Player health: {player.Health}");
    System.Console.WriteLine($"Enemy health: {enemy.Health}");

}

if (player.Health > 0 && enemy.Health <= 0)
{
    System.Console.WriteLine("Player won!");
}
else if (player.Health <= 0 && enemy.Health > 0)
{
    System.Console.WriteLine("Enemy won!");
}
else
{
    System.Console.WriteLine("Draw!");
}