using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class SubscriberDatabaseSettings : ISubscriberDatabaseSettings
    {
        public string SubscriberCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ISubscriberDatabaseSettings
    {
        string SubscriberCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class Subscriber
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; }
         
        [BsonElement]
        public List<send> sendedEmail { get; set; }

        [BsonElement]
        public string subscriberEmail { get; set; }
    }
     
    public class send
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } 

        [BsonElement]
        public bool isSeen { get; set; } 
    }
}  