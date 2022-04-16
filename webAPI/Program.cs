using GraphQL.Server.Ui.Voyager;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using webAPI.data;
using webAPI.graphQL;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddPooledDbContextFactory<AppDbContext>(opts =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    opts.UseNpgsql(connectionString);
});

builder.Services.AddGraphQLServer().AddAuthorization().AddQueryType<Query>().AddMutationType<Mutation>().AddProjections()
.AddFiltering().AddSorting();
builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = builder.Configuration["tokenSettings:Issuer"],
                ValidAudience = builder.Configuration["tokenSettings:Audience"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["tokenSettings:Key"])) //hide this lol
            };
        });

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "../client/build";
});

var app = builder.Build();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// app.UseStaticFiles();
// app.UseSpaStaticFiles();
// app.UseSpa(spa =>
// {
//     spa.Options.SourcePath = "../client";
//     if (builder.Environment.IsDevelopment())
//     {
//         spa.UseReactDevelopmentServer(npmScript: "start");
//     }
// });

app.UseAuthentication();
app.MapGraphQL();
app.UseGraphQLVoyager(new VoyagerOptions()
{
    GraphQLEndPoint = "/graphql"
}, "/graphql-voyager");

app.Run();
