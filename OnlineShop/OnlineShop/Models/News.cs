using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class NewsDatabaseSettings : INewsDatabaseSettings
    {
        public string NewsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface INewsDatabaseSettings
    {
        string NewsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class News
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; }

        [BsonElement]
        public string newImg { get; set; }

        [BsonElement]
        public string newTime { get; set; }

        [BsonElement]
        public string newCate { get; set; }

        [BsonElement]
        public string newTitle { get; set; }

        [BsonElement]
        public string newContent { get; set; }

        [BsonElement]
        public int newView { get; set; } 
    }
}  