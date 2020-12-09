using OnlineShop.Models;
using OnlineShop.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using System.IO;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly CollectionService _collectionService;

        public CollectionController(CollectionService collectionService)
        {
            _collectionService = collectionService;
        }

        [HttpGet]
        public ActionResult<List<Collection>> Get() =>
            _collectionService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCollection")]
        public ActionResult<Collection> Get(string id)
        {
            var collection = _collectionService.Get(id);

            if (collection == null)
            {
                return NotFound();
            }

            return collection;
        }

        [HttpPost]
        public ActionResult<Collection> Create(Collection collection)
        {
            _collectionService.Create(collection);

            return CreatedAtRoute("GetCollection", new { id = collection.Id.ToString() }, collection);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Collection bookIn)
        {
            var product = _collectionService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _collectionService.Update(id, bookIn);

            return NoContent();
        }

        [HttpPost("UploadFile")]
        public async Task<dynamic> OnPostUploadAsync([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return "";
            var type = file.FileName.Split(".")[1];
            var nameimgmain = ObjectId.GenerateNewId().ToString() + "." + type;

            var fpath = Path.Combine(
                        Directory.GetCurrentDirectory(), "wwwroot/images",
                        nameimgmain);//post image to forder 
            using (var stream = new FileStream(fpath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return "https://localhost:4000/images/" + nameimgmain;
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var product = _collectionService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _collectionService.Remove(product.Id);

            return NoContent();
        }
    }
}