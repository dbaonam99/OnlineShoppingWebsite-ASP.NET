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
    public class SubscriberController : ControllerBase
    {
        private readonly SubscriberService _subscriberService; 

        public SubscriberController(SubscriberService subscriberService)
        {
            _subscriberService = subscriberService;
        }

        [HttpGet]
        public ActionResult<List<Subscriber>> Get() =>
            _subscriberService.Get();

        [HttpGet("{id:length(24)}", Name = "GetSubscriber")]
        public ActionResult<Subscriber> Get(string id)
        {
            var user = _subscriberService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Subscriber bookIn)
        {
            var product = _subscriberService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _subscriberService.Update(id, bookIn);

            return NoContent();
        }

        [HttpPost]
        public ActionResult<Subscriber> Create([FromBody] Subscriber product)
        {        
            var findByEmail = _subscriberService.FindByEmail(product.subscriberEmail);

            if (findByEmail != null)
            {
                return BadRequest("Email already exists!");
            }   

            MailMessage mail = new MailMessage();
            mail.To.Add(product.subscriberEmail);
            mail.From = new MailAddress("obamavn99@gmail.com");
            mail.Subject = "SOBER SHOP";

            string Body = "Cảm ơn bạn đã đăng kí nhận tin mới tại SOBER shop";
            mail.Body = Body;

            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
            smtp.Credentials = new System.Net.NetworkCredential
                 ("18521118@gm.uit.edu.vn", "Dbnbl08081999");
            //Or your Smtp Email ID and Password
            smtp.EnableSsl = true;
            smtp.Send(mail);

            product.sendedEmail.Add(new send{ Id= ObjectId.GenerateNewId().ToString(), isSeen = false});

            _subscriberService.Create(product);

            return CreatedAtRoute("GetSubscriber", new { id = product.Id.ToString() }, product);
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var product = _subscriberService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _subscriberService.Remove(product.Id);

            return NoContent();
        }
    }
}