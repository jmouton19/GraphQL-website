using GraphQL.Server.Ui.Voyager;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using webAPI.data;
using webAPI.graphQL;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
//hide this lol
var signingKey = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes("MySuperSecretKey"));

builder.Services.AddPooledDbContextFactory<AppDbContext>(opts =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    opts.UseNpgsql(connectionString);
});

builder.Services.AddGraphQLServer().AddAuthorization().AddQueryType<Query>().AddMutationType<Mutation>().AddProjections().AddFiltering().AddSorting();
//.AddType<UserType>()

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options => {
          options.TokenValidationParameters=new TokenValidationParameters{
                ValidIssuer = "https://auth.chillicream.com",
                ValidAudience = "https://graphql.chillicream.com",
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey
          };
        });

var app = builder.Build();
app.UseRouting();

app.UseAuthentication();
app.MapGraphQL();
app.UseGraphQLVoyager(new VoyagerOptions()
{
    GraphQLEndPoint = "/graphql"
}, "/graphql-voyager");

app.Run();
