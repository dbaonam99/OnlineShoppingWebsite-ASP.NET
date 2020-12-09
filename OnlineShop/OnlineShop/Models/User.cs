using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class UserDatabaseSettings : IUserDatabaseSettings
    {
        public string UserCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IUserDatabaseSettings
    {
        string UserCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class User
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [FromForm]
        [BsonElement]
        public string userAvt { get; set; }

        [BsonElement]
        public string userName { get; set; }

        [BsonElement]
        public string userTinh { get; set; }

        [BsonElement]
        public string userHuyen { get; set; }

        [BsonElement]
        public string userEmail { get; set; }

        [BsonElement]
        public string userPassword { get; set; }

        [BsonElement]
        public string userPhone { get; set; }

        [BsonElement]
        public string userAddress { get; set; }

        [BsonElement]
        public string userRole { get; set; }

        [BsonElement]
        public string userCreateDay { get; set; }
    }
}  