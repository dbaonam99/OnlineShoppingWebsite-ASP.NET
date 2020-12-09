using OnlineShop.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;

namespace OnlineShop.Services
{
    public class CollectionService
    {
        private readonly IMongoCollection<Collection> _collection;

        public CollectionService(ICollectionDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _collection = database.GetCollection<Collection>(settings.CollectionCollectionName);
        }

        public List<Collection> Get() =>
            _collection.Find(collection => true).ToList();

        public Collection Get(string id) =>
            _collection.Find<Collection>(collection => collection.Id == id).FirstOrDefault();

        public Collection Create(Collection collection)
        {
            _collection.InsertOne(collection);
            return collection;
        }

        public void Update(string id, Collection productIn) =>
            _collection.ReplaceOne(collection => collection.Id == id, productIn);

        public void Remove(Collection productIn) =>
            _collection.DeleteOne(collection => collection.Id == productIn.Id);

        public void Remove(string id) =>
            _collection.DeleteOne(collection => collection.Id == id);
    }
}