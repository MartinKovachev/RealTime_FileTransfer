using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TUSofiaProject.Core.Interfaces;

namespace TUSofiaProject.Persistence
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IConfiguration configuration;

        public LoginRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> Login()
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                claims: new List<Claim>(),
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCredentials
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return tokenString;
        }
    }
}
