using OnlineShop.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _user;

        public UserService(IUserDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> Get() =>
            _user.Find(product => true).ToList();

        public User Get(string id) =>
            _user.Find<User>(product => product.Id == id).FirstOrDefault();

        public User FindByEmail(string email) =>
            _user.Find<User>(product => product.userEmail == email).FirstOrDefault();

        public User CheckLoginInfo(string email, string password) =>
            _user.Find<User>(user => user.userEmail == email && user.userPassword == password).FirstOrDefault();

        public User Create(User product)
        {
            _user.InsertOne(product);
            return product;
        }

        public void Update(string id, User productIn) =>
            _user.ReplaceOne(product => product.Id == id, productIn);

        public void Remove(User productIn) =>
            _user.DeleteOne(product => product.Id == productIn.Id);

        public void Remove(string id) =>
            _user.DeleteOne(product => product.Id == id);
    }
}