using Microsoft.EntityFrameworkCore;
using practicode3;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

console.writeLine(Environment.GetEnvironmentVariable("CONNECTION_STRING"));

builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(Environment.GetEnvironmentVariable("CONNECTION_STRING"),
    new MySqlServerVersion(new Version(9, 0, 0))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapPost("users/login", async (User user, ToDoDbContext db) =>
{
    try
    {
        User u = await db.Users.FirstAsync((u1) => u1.UserName == user.UserName);
        if (u.Password != user.Password)
            return Results.Unauthorized();
        return Results.Ok(u.Id);
    }
    catch (Exception)
    {
        return Results.Unauthorized();
    }
});

app.MapPost("users/register", async (User u, ToDoDbContext db) =>
{
    await db.Users.AddAsync(u);
    await db.SaveChangesAsync();
    return u.Id;
});

app.MapGet("tasks/{userId}", async (int userId, ToDoDbContext db) =>
{
    var items = await db.Users
        .Where(u => u.Id == userId)
        .SelectMany(u => u.Items)
        .ToListAsync();

    if (items == null || !items.Any()) return Results.NotFound();
    return Results.Ok(items);

});

app.MapPost("tasks/{userId}", async (int userId, Item i, ToDoDbContext db) =>
{
    i.UserId = userId;
    await db.Items.AddAsync(i);
    await db.SaveChangesAsync();
    return i;
});

app.MapPut("tasks/{userId}/{id}", async (int userId, int id, bool IsComplete, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null) return Results.NotFound();
    if (item.UserId != userId)
        return Results.Forbid();
    item.IsComplete = IsComplete;

    await db.SaveChangesAsync();

    return Results.Ok(item);
});

app.MapDelete("tasks/{userId}/{id}", async (int userId, int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null) return Results.NotFound();
    if (item.UserId != userId)
        return Results.Forbid();
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
