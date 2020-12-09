using OnlineShop.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Services
{
    public class TodoService
    {
        private readonly IMongoCollection<Todo> _user;

        public TodoService(ITodoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<Todo>(settings.TodoCollectionName);
        }

        public List<Todo> Get() =>
            _user.Find(product => true).ToList();

        public Todo Get(string id) =>
            _user.Find<Todo>(product => product.Id == id).FirstOrDefault();

        public Todo Create(Todo product)
        {
            _user.InsertOne(product);
            return product;
        }

        public void Update(string id, Todo productIn) =>
            _user.ReplaceOne(product => product.Id == id, productIn);

        public void Remove(string id) =>
            _user.DeleteOne(product => product.Id == id);
    }
}