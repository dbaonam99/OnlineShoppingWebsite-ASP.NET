using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class OrderDatabaseSettings : IOrderDatabaseSettings
    {
        public string OrderCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IOrderDatabaseSettings
    {
        string OrderCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class Order
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; }
         
        [BsonElement]
        public List<orderInfo> orderList { get; set; }

        [BsonElement]
        public string orderAvatar { get; set; }

        [BsonElement]
        public int orderId { get; set; }

        [BsonElement]
        public string orderName { get; set; }

        [BsonElement]
        public string orderEmail { get; set; }

        [BsonElement]
        public string orderPhone { get; set; }

        [BsonElement]
        public string orderTinh { get; set; }

        [BsonElement]
        public string orderHuyen { get; set; }

        [BsonElement]
        public string orderAddress { get; set; }

        [BsonElement]
        public long orderTotal { get; set; }

        [BsonElement]
        public string orderPaymentMethod { get; set; }

        [BsonElement]
        public string orderDate { get; set; }
    }

    [BsonNoId]
    public class orderInfo
    {
        [BsonElement]
        public string id { get; set; }

        [BsonElement]
        public int amount { get; set; } 
    }
}  