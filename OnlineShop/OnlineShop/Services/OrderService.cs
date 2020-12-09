using OnlineShop.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _order;

        public OrderService(IOrderDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _order = database.GetCollection<Order>(settings.OrderCollectionName);
        }

        public List<Order> Get() =>
            _order.Find(order => true).ToList();

        public Order Get(string id) =>
            _order.Find<Order>(order => order.Id == id).FirstOrDefault();

        public Order Create(Order order)
        {
            _order.InsertOne(order);
            return order;
        }

        public void Update(string id, Order productIn) =>
            _order.ReplaceOne(order => order.Id == id, productIn);

        public void Remove(Order productIn) =>
            _order.DeleteOne(product => product.Id == productIn.Id);

        public void Remove(string id) =>
            _order.DeleteOne(product => product.Id == id);
    }
}