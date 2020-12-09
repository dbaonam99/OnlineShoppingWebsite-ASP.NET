using OnlineShop.Models;
using OnlineShop.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.IO;
using MongoDB.Bson;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public ActionResult<List<Product>> Get() =>
            _productService.Get();

        [HttpGet("{id:length(24)}", Name = "GetProduct")]
        public ActionResult<Product> Get(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public ActionResult<Product> Create([FromBody] Product product)
        {
            _productService.Create(product);

            return CreatedAtRoute("GetProduct", new { id = product.Id.ToString() }, product);
        }


        [HttpPost("UploadFile")]
        public async Task<dynamic> OnPostUploadAsync([FromForm] List<IFormFile> file)
        {
            List<string> listFile = new List<string>();
            for (var i=0; i < file.Count; i++)
            {
                var type = file[i].FileName.Split(".")[1];
                var nameimgmain = ObjectId.GenerateNewId().ToString() + "." + type;

                var fpath = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot/images",
                            nameimgmain);//post image to forder 
                using (var stream = new FileStream(fpath, FileMode.Create))
                {
                    await file[i].CopyToAsync(stream);
                }
                listFile.Add("https://localhost:4000/images/" + nameimgmain);
            } 
            return listFile;
        } 

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Product bookIn)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _productService.Update(id, bookIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _productService.Remove(product.Id);

            return NoContent();
        }
    }
}