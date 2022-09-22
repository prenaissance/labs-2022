namespace lab2.Repositories
{
    public class Repository<T>
    {
        private readonly Dictionary<int, T> _dictionary = new();

        public T this[int key]
        {
            get => _dictionary[key];
            set => _dictionary[key] = value;
        }

        public T[] GetAll()
        {
            return _dictionary.Values.ToArray();
        }

        public T? Get(int key)
        {
            return _dictionary.ContainsKey(key) ? _dictionary[key] : default;
        }

        public void Add(T item)
        {
            _dictionary.Add(_dictionary.Count, item);
        }

        public T? Remove(int key)
        {
            return _dictionary.ContainsKey(key) ? _dictionary.Remove(key, out var item) ? item : default : default;
        }

        public void Update(int key, T item)
        {
            _dictionary[key] = item;
        }
    }
}