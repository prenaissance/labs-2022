// See https://aka.ms/new-console-template for more information
using lab2.Contexts;
using lab2.Game;
using lab2.Models;
using lab2.Repositories;

System.Console.WriteLine("Some angles...");
var angle = new Angle(90.56);
System.Console.WriteLine(angle);
angle += new Angle(d: 300, m: 12, s: 1);
System.Console.WriteLine(angle);
System.Console.ReadLine();

var frames = new Frames();
var gameContext = new GameContext();
System.Console.WriteLine($"Game running at {gameContext.FPS} FPS");

frames.Count = 34;
System.Console.WriteLine($"Frames: {frames.Count}");
frames.Flush();

var map = new Map(10, 10);
map.AddIsland("Island 1");
map.AddIsland("Island 2");
System.Console.WriteLine($"Current Map: {map}");

var player = new PlayableCharacter(100, 10, 5, 0);
var enemy = new Enemy(100, 10, 5);
System.Console.WriteLine($"Player health: {player.Health}");
System.Console.WriteLine($"Enemy health: {enemy.Health}");
System.Console.WriteLine();

System.Console.WriteLine("Created tool");
var tool = new Tool(30, 1);
tool.Use();
System.Console.WriteLine("used tool");
System.Console.WriteLine($"Tool durability is {tool.Durability} (was 30)");

Console.ReadLine();

var user = new User("John", "password", 11);
System.Console.WriteLine($"John has {user.Happiness} happiness");
System.Console.WriteLine("John eats");
user.TryEat();
System.Console.WriteLine($"John has {user.Happiness} happiness");

var coords = new Coords(1, 2);
var coords2 = new Coords(3, 4);
System.Console.WriteLine($"Coords: {coords}");
System.Console.WriteLine($"Coords2: {coords2}");
System.Console.ReadLine();
var coordsRepo = new Repository<Coords>();
coordsRepo.Add(coords);
coordsRepo.Add(coords2);

System.Console.WriteLine("Coords with id 1:");

var coordsWithId1 = coordsRepo.Get(1);

System.Console.WriteLine(coordsWithId1);