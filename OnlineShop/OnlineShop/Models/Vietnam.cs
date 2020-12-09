using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class VietnamDatabaseSettings : IVietnamDatabaseSettings
    {
        public string VietnamCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IVietnamDatabaseSettings
    {
        string VietnamCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class Vietnam
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement]
        public List<listTinh> tinh { get; set; }

        [BsonElement]
        public List<listHuyen> huyen { get; set; }
    }

    [BsonNoId]
    public class listTinh
    {
        [BsonElement]
        public int id { get; set; }

        [BsonElement]
        public string name { get; set; }

        [BsonElement]
        public string location { get; set; }

        [BsonElement]
        public string type { get; set; }
    }

    [BsonNoId]
    public class listHuyen
    {
        [BsonElement]
        public int id { get; set; }

        [BsonElement]
        public string name { get; set; }

        [BsonElement]
        public string location { get; set; }

        [BsonElement]
        public string type { get; set; }

        [BsonElement]
        public int tinh_id { get; set; }
    }
}  