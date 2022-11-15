using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace API.Middleware
{

    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _envy;
    public class ExceptionMiddleware
    {
        public ExceptionMiddleware
        (RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment envy)
        {
            _next = next;
            _logger = logger;
            _envy = envy;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
        }
    }
}