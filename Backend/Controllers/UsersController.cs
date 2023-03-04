using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext context;

        public UsersController(AppDbContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> get()
        {
            List<User> users = await context.users.ToListAsync();
            return users;
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> get(int id)
        {
            var user = await context.users.FirstOrDefaultAsync(x=>x.Id==id);
            if (user==null)
            {
                return NotFound();
            }
            return user;
        }
        [HttpPost]
        public async Task<ActionResult<User>> post(User x)
        {
            if (x.UserName==null)
            {
                return BadRequest("Needs a user name");
            }
            context.Add(x);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
