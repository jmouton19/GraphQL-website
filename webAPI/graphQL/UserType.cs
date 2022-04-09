using webAPI.data;
using webAPI.Models;

public class UserType : ObjectType<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Description("Awe");

        descriptor.Field(u => u.password).Ignore();
        descriptor.Field(u => u.email).Ignore();

        descriptor.Field(u => u.OwnedGroups)
                    .ResolveWith<Resolvers>(u => u.GetGroups(default!, default!))
                    .UseDbContext<AppDbContext>()
                    .Description("Groups owned by this user.");
    }

     private class Resolvers
    {
        public IQueryable<Group> GetGroups(User user, [ScopedService] AppDbContext context)
        {
            return context.Groups.Where(g => g.ownerId == user.Id);
        }
    }
}
