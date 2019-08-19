using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TUSofiaProject.Controllers.Resources;
using TUSofiaProject.Core.Interfaces;

namespace TUSofiaProject.Controllers
{
    public class LoginController : Controller
    {
        private ILoginRepository loginRepository;

        public LoginController(ILoginRepository loginRepository)
        {
            this.loginRepository = loginRepository;
        }

        [HttpPost]
        [Route("/api/login")]
        public async Task<IActionResult> Login([FromBody] UserLoginResource clientLogin)
        {
            if (clientLogin == null)
            {
                return BadRequest("Invalid client request");
            }

            if (clientLogin.UserName == "admin" && clientLogin.Password == "1234") // Only for test purposes
            {
                var tokenString = await loginRepository.Login();
                return Ok(new { token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}