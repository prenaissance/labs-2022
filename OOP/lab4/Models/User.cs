namespace lab4.Models
{
    public class User
    {
        public string Username { get; set; }
        private string Password { get; set; }
        public int Happiness { get; set; } = 5;

        private decimal _balance;
        public decimal Balance
        {
            get => _balance;
            set => _balance = value < 0 ? 0 : value;
        }

        public User(string username, string password, decimal balance = 0)
        {
            Username = username;
            Password = password;
            Balance = balance;
        }
        public bool TryEat()
        {
            if (Balance >= 10)
            {
                Balance -= 10;
                Happiness += 1;
                return true;
            }
            Happiness -= 1;
            return false;
        }

        public override string ToString()
        {
            return $"{Username} {Balance}";
        }


    }
}