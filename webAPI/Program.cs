using GraphQL.Server.Ui.Voyager;
using Microsoft.EntityFrameworkCore;
using webAPI.data;
using webAPI.graphQL;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPooledDbContextFactory<AppDbContext>(opts =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    opts.UseNpgsql(connectionString);
});

builder.Services.AddGraphQLServer().AddQueryType<Query>().AddMutationType<Mutation>().AddProjections().AddFiltering().AddSorting();
//.AddType<UserType>()

var app = builder.Build();

app.MapGraphQL();
app.UseGraphQLVoyager(new VoyagerOptions()
{
    GraphQLEndPoint = "/graphql"
}, "/graphql-voyager");

app.Run();
