using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class TodoDatabaseSettings : ITodoDatabaseSettings
    {
        public string TodoCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ITodoDatabaseSettings
    {
        string TodoCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class Todo
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; }
         
        [BsonElement]
        public bool isDone { get; set; }

        [BsonElement]
        public string todoContent { get; set; }

        [BsonElement]
        public string todoDate { get; set; }
    } 
}  