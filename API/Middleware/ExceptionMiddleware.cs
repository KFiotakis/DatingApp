using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Text.Json;
using API.Errors;



namespace API.Middleware
{  public class ExceptionMiddleware
{

        public ExceptionMiddleware
        (RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment envy)
        {
            _next = next;
            _logger = logger;
            _envy = envy;
        }   
        
         private readonly RequestDelegate _next;
         private readonly ILogger<ExceptionMiddleware> _logger;
         private readonly IHostEnvironment _envy;

        public async Task InvokeAsync(HttpContext context)
        { 
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _envy.IsDevelopment()? 
                new ApiException(context.Response.StatusCode, ex.Message,ex.StackTrace?.ToString()):
                new ApiException(context.Response.StatusCode, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);
            }
        }  
        
     
    }
       
    
}