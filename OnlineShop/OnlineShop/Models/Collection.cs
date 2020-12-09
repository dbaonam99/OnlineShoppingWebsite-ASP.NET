using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class CollectionDatabaseSettings : ICollectionDatabaseSettings
    {
        public string CollectionCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ICollectionDatabaseSettings
    {
        string CollectionCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class Collection
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
         
        [BsonElement]
        public string[] collectionItems { get; set; }

        [BsonElement]
        public string collectionBanner { get; set; }

        [BsonElement]
        public string collectionName { get; set; }

        [BsonElement]
        public string collectionTime { get; set; }
    } 
}  