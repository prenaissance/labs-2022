namespace lab5.Repositories.Abstractions
{
    public interface IRepository<T>
    {
        void Add(T entity);
        void Remove(T entity);
        void Remove(int id);
        T? Get(int id);
        IEnumerable<T> GetAll();
    }
}