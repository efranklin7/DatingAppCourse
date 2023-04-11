using Backend.Errors;
using System.Net;
using System.Text.Json;

namespace Backend.ExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }
        //Middleware HAS InvokeAsync, to call next middleware
        public async Task InvokeAsync(HttpContext context) //acces to the http request beign passed
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {

                logger.LogError(ex, ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode=(int)HttpStatusCode.InternalServerError; //500code
                var response =env.IsDevelopment() ?
                    new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString()) // ? to not cause an exception
                    :
                    new ApiException(context.Response.StatusCode,ex.Message,"internal server error");

                // return response as json
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }

        }
    }
}
