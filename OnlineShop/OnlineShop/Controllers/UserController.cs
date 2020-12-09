using OnlineShop.Models;
using OnlineShop.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using System.Linq;
using MongoDB.Bson;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService; 

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var userByEmail = _userService.CheckLoginInfo(user.userEmail, user.userPassword);

            if (userByEmail == null)
            {
                return NotFound();
            }

            return Ok(userByEmail); 
        }

        [HttpPost("register")]
        public ActionResult<User> Create(User user)
        {
            var findByEmail = _userService.FindByEmail(user.userEmail);

            if (findByEmail != null)
            {
                return BadRequest("Email already exists!");
            }

            _userService.Create(user);
            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
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

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User bookIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Update(id, bookIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.Id);

            return NoContent();
        }
    }
}