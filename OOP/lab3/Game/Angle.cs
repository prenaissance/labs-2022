namespace lab3.Game
{
    public sealed class Angle : ICloneable
    {
        private int deg, min, sec;
        public int Degrees
        {
            get => deg;
            set => deg = (value + 360) % 360;
        }
        public int Minutes
        {
            get => min;
            set { Degrees += value / 60; min = value % 60; }
        }
        public int Seconds
        {
            get => sec;
            set { Minutes += value / 60; sec = value % 60; }
        }
        public Angle(int d = 0, int m = 0, int s = 0)
        {
            deg = min = sec;
            Degrees += d;
            Minutes += m;
            Seconds += s;
        }

        public Angle(double angle)//angle in degrees, not radians
        {
            angle += 360;
            angle %= 360;
            Degrees = (int)angle;
            angle -= Degrees;
            angle *= 60;
            Minutes = (int)angle;
            angle -= Minutes;
            angle *= 60;
            Seconds = (int)angle;
        }

        public void Deconstruct(out int d, out int m, out int s) => (d, m, s) = (Degrees, Minutes, Seconds);
        public override string ToString()
        {
            return $"{Degrees} o {Minutes}' {Seconds}''";
        }
        public override bool Equals(object? other) => this.ToString() == other?.ToString();
        public override int GetHashCode()
        {
            return this.ToString().GetHashCode();
        }

        public object Clone() => this.MemberwiseClone();

        public static bool operator ==(Angle current, Angle other) => current.Equals(other);
        public static bool operator !=(Angle current, Angle other) => !current.Equals(other);
        public static bool operator >(Angle current, Angle other)
        {

            int d1, m1, s1, d2, m2, s2;
            (d1, m1, s1) = current;
            (d2, m2, s2) = other;
            return d1 > d2 || m1 > m2 || s1 > s2;
        }
        public static bool operator <(Angle current, Angle other) => other > current;
        public static bool operator >=(Angle current, Angle other) => current == other || current > other;
        public static bool operator <=(Angle current, Angle other) => current == other || current < other;
        public static Angle operator -(Angle current) => new Angle(-current.Degrees, -current.Minutes, -current.Seconds);//unary
        public static Angle operator +(Angle current, Angle other)
        {
            Angle temp = new Angle(current.Degrees, current.Minutes, current.Seconds);
            temp.Seconds += other.Seconds;
            temp.Minutes += other.Minutes;
            temp.Degrees += other.Degrees;
            return temp;
        }
        public static Angle operator +(Angle current, double other) => current + new Angle(other);
        public static Angle operator +(double current, Angle other) => other + current;
        public static Angle operator -(Angle current, Angle other) => current + -other;
        public static Angle operator -(Angle current, double other) => current - new Angle(other);
        public static Angle operator -(double current, Angle other) => other - current;

    }
}