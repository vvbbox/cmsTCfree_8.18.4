using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using cmsTC.Server;
using cmsTC.Server.Services;
using TutoCito.cmsTCapi.api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));

var connectionString4 = builder.Configuration.GetConnectionString("DefaultConnection4") ?? throw new InvalidOperationException("Connection string 'DefaultConnection4' not found.");
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(connectionString4));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add Identity services
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddDefaultUI();

// Add Razor Pages, Controllers, and MVC services
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
builder.Services.AddMvc();

// Add Authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("Manager", policy => policy.RequireRole("Manager"));
    options.AddPolicy("Member", policy => policy.RequireRole("Member"));
});

// Configure EmailSender
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddTransient<IEmailSender, EmailSender>();

var app = builder.Build();

// Seed roles
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var roles = new[] { "Admin", "Manager", "Member" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseDefaultFiles();
/*
var cacheMaxAgeOneWeek = (60 * 60 * 24 * 7).ToString();

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append(
             "Cache-Control", $"public, max-age={cacheMaxAgeOneWeek}");
    }
});
*/
app.UseRouting();
app.UseAuthorization();

app.MapRazorPages();
//app.MapControllers();
/*
#pragma warning disable ASP0014
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "api",
        pattern: "api/{controller=Dashboard}/{action=Index}/{id?}");

    endpoints.MapFallbackToFile("/js/index.html"); // Для SPA
});
#pragma warning disable ASP0014

*/
app.MapAreaControllerRoute(
    name: "areas",
    areaName: "api",
    pattern: "{area:exists}/{controller}/{action}/{id?}");

//app.MapFallbackToFile("/js/index.html");

//app.MapFallbackToFile("/first", "/js/first/index.html");
//app.MapFallbackToFile("/second", "/js/second/eng/index.html");

// Добавляем маршруты для SPA
//app.MapFallbackToPage("/FirstSpa", "/FirstSpa");
//app.MapFallbackToPage("/SecondSpa", "/SecondSpa");

app.Run();