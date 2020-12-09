using OnlineShop.Models;
using OnlineShop.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic; 
using System.Net.Mail;
using MongoDB.Bson;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService; 

        public TodoController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public ActionResult<List<Todo>> Get() =>
            _todoService.Get();

        [HttpGet("{id:length(24)}", Name = "GetTodo")]
        public ActionResult<Todo> Get(string id)
        {
            var user = _todoService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Todo bookIn)
        {
            var product = _todoService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _todoService.Update(id, bookIn);

            return NoContent();
        }

        [HttpPost]
        public ActionResult<Todo> Create([FromBody] Todo product)
        { 
            _todoService.Create(product);

            return CreatedAtRoute("GetTodo", new { id = product.Id.ToString() }, product);
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var product = _todoService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _todoService.Remove(product.Id);

            return NoContent();
        }
    }
}