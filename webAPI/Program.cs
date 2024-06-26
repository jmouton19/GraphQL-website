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

builder.Services.AddFluentEmail(builder.Configuration["SMPTsettings:user"]).AddRazorRenderer()
.AddSmtpSender(builder.Configuration["SMPTsettings:host"], 587, builder.Configuration["SMPTsettings:user"], builder.Configuration["SMPTsettings:password"]);


builder.Services.AddHttpContextAccessor();
builder.Services.AddAuthorization();

builder.Services.AddGraphQLServer().AddAuthorization().AddQueryType<Query>().AddMutationType<Mutation>().AddProjections()
.AddFiltering().AddSorting();
builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
        options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = builder.Configuration["tokenSettings:Issuer"],
                ValidateIssuer = true,
                ValidAudience = builder.Configuration["tokenSettings:Audience"],
                ValidateAudience = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["tokenSettings:Key"])), //hide this lol
                ValidateIssuerSigningKey = true
            };
        });

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "wwwroot";
});

var app = builder.Build();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapGraphQL();
app.UseGraphQLVoyager(new VoyagerOptions()
{
    GraphQLEndPoint = "/graphql"
}, "/graphql-voyager");

app.UseStaticFiles();
app.UseSpaStaticFiles();
if (builder.Environment.IsProduction())
{
    app.UseSpa(spa =>
    {
        spa.Options.SourcePath = "wwwroot";
        if (builder.Environment.IsDevelopment())
        {
            spa.UseReactDevelopmentServer(npmScript: "start");
        }
    });
}

app.UseAuthentication();
app.UseAuthorization();

app.Run();
