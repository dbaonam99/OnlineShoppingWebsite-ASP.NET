using OnlineShop.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Services
{
    public class VietnamService
    {
        private readonly IMongoCollection<Vietnam> _vietnam;

        public VietnamService(IVietnamDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _vietnam = database.GetCollection<Vietnam>(settings.VietnamCollectionName);
        }

        public List<Vietnam> Get() =>
            _vietnam.Find(vietnam => true).ToList();
    }
}