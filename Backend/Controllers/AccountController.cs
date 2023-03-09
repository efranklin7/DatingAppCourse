using Backend.DTOs;
using Backend.Interfaces;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly ITokenService tokenService;

        public AccountController(AppDbContext context,ITokenService tokenService) // uses the implementation 
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]// POST: api/account/register
        public async Task<ActionResult<UserDto>> Post(RegisterDto registerDto)
        {
            if (name(registerDto.UserName.ToLower()))
            {
                return BadRequest("User name already exist");
            }
            using var hmac = new HMACSHA512();

            var user = new User()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            context.users.Add(user);
            await context.SaveChangesAsync();
            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Post(loginDto loginDto)
        {
            var user = await context.users.FirstOrDefaultAsync(user=>user.UserName==loginDto.UserName);
            if (user==null)
            {
                return Unauthorized();
            }
            var hmac = new HMACSHA512(user.PasswordSalt);
            var password = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < password.Length; i++)
            {
                if (password[i] != user.PasswordHash[i])
                {
                    return Unauthorized("wrong password");
                }
            }
            return new UserDto
            {
                UserName = user.UserName,
                Token = tokenService.CreateToken(user)
            };

        }
        private bool name(string name)
        {
           var x = context.users.Any(x => x.UserName == name);
            return x;
        }
            

            
    }
}
