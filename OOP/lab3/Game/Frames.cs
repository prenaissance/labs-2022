namespace lab3.Game
{
    public class Frames
    {
        public int Count { get; set; }
        public void Flush()
        {
            Count = 0;
        }
    }
}