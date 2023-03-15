using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.Extensions
{
    public static class AppServiceExtension
    {
        public static IServiceCollection AddAppServices(this IServiceCollection Services,
            IConfiguration config)
        {
            Services.AddScoped<ITokenService, TokenService>(); // here it creates the implementation

            Services.AddDbContext<AppDbContext>(
                options => options.UseSqlServer(config.GetConnectionString("DB")));
            Services.AddCors(x => x.AddPolicy("corsPolicy",
                build => build.WithOrigins("http://localhost:4200", "https://localhost:4200").AllowAnyMethod().AllowAnyHeader()));

           
            return Services;
        }
    }
}
