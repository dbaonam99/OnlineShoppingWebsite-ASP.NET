using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineShop.Models
{
    public class ProductDatabaseSettings : IProductDatabaseSettings
    {
        public string ProductCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IProductDatabaseSettings
    {
        string ProductCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public class Product
    { 
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; }

        [BsonElement]
        public string[] productImg { get; set; }

        [BsonElement]
        public string[] productSize { get; set; }

        [BsonElement]
        public string productName { get; set; }

        [BsonElement]
        public int productSale { get; set; }

        [BsonElement]
        public long productPrice { get; set; }

        [BsonElement]
        public string productCate { get; set; }

        [BsonElement]
        public string productGroupCate { get; set; }

        [BsonElement]
        public long productFinalPrice { get; set; }

        [BsonElement]
        public string productSex { get; set; }

        [BsonElement]
        public string productDate { get; set; }

        [BsonElement]
        public string productDes { get; set; }

        [BsonElement]
        public int productSold { get; set; } 

        [BsonElement]
        public List<VoteList> productVote { get; set; }
    }

    public class VoteList
    {
        [BsonElement]
        public string ratingName { get; set; }

        [BsonElement]
        public string ratingDate { get; set; }

        [BsonElement]
        public string ratingText { get; set; }

        [BsonElement]
        public string ratingEmail { get; set; }

        [BsonElement]
        public double ratingStar { get; set; }

        [BsonElement]
        public string ratingAvt { get; set; }
    }
}  