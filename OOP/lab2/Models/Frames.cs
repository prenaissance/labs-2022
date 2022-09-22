namespace lab2.Models
{
    class Frames
    {
        public int Count { get; set; }
        public void Flush()
        {
            Count = 0;
        }
    }
}