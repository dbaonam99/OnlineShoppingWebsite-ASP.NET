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
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;

        public NewsController(NewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public ActionResult<List<News>> Get() =>
            _newsService.Get();

        [HttpGet("{id:length(24)}", Name = "GetNews")]
        public ActionResult<News> Get(string id)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        [HttpPost]
        public ActionResult<News> Create(News news)
        {
            _newsService.Create(news);

            return CreatedAtRoute("GetNews", new { id = news.Id.ToString() }, news);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, News newsIn)
        {
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            _newsService.Update(id, newsIn);

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
            var news = _newsService.Get(id);

            if (news == null)
            {
                return NotFound();
            }

            _newsService.Remove(news.Id);

            return NoContent();
        }
    }
}