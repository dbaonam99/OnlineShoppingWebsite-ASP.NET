using OnlineShop.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Services
{
    public class SubscriberService
    {
        private readonly IMongoCollection<Subscriber> _user;

        public SubscriberService(ISubscriberDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<Subscriber>(settings.SubscriberCollectionName);
        }

        public List<Subscriber> Get() =>
            _user.Find(product => true).ToList();

        public Subscriber Get(string id) =>
            _user.Find<Subscriber>(product => product.Id == id).FirstOrDefault();

        public Subscriber Create(Subscriber product)
        {
            _user.InsertOne(product);
            return product;
        }

        public Subscriber FindByEmail(string email) =>
            _user.Find<Subscriber>(subscriber => subscriber.subscriberEmail == email).FirstOrDefault();

        public void Update(string id, Subscriber productIn) =>
            _user.ReplaceOne(product => product.Id == id, productIn);

        public void Remove(string id) =>
            _user.DeleteOne(product => product.Id == id);
    }
}