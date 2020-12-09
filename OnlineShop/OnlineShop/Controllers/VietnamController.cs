using OnlineShop.Models;
using OnlineShop.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VietnamController : ControllerBase
    {
        private readonly VietnamService _vietnamService;

        public VietnamController(VietnamService vietnamService)
        {
            _vietnamService = vietnamService;
        }

        [HttpGet]
        public ActionResult<List<Vietnam>> Get() =>
            _vietnamService.Get();
    }
}