using lab5.Models.Abstractions;
using lab5.Repositories.Abstractions;

namespace lab5.Repositories
{
    public class EntityRepository<T> : IRepository<T> where T : Entity
    {
        private readonly List<T> _entities = new List<T>();
        public void Add(T entity)
        {
            entity.Id = (_entities.Count > 0 ? _entities.Last().Id : 0) + 1;
            _entities.Add(entity);
        }
        public void Remove(T entity)
        {
            _entities.Remove(entity);
        }
        public void Remove(int id)
        {
            var entity = _entities.Find(entity => entity.Id == id);
            if (entity != null)
            {
                _entities.Remove(entity);
            }
        }
        public T? Get(int id)
        {
            return _entities.FirstOrDefault(entity => entity.Id == id);
        }
        public IEnumerable<T> GetAll()
        {
            return _entities;
        }
    }
}