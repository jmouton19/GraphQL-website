using webAPI.data;
using webAPI.graphQL.Users;
using webAPI.Models;
using BCrypt.Net;

namespace webAPI.graphQL
{

    public class Mutation
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<bool> AddUserAsync(AddUserInput input, [ScopedService] AppDbContext context)
        {
            var user = new User
            {
                email = input.email,
                username = input.username,
                firstName = input.firstName,
                lastName = input.lastName,
                DOB = input.DOB,
                avatar = input.avatar,
                password = BCrypt.Net.BCrypt.HashPassword(input.password)
            };
            var currentUser = context.Users.Where(u => u.email == input.email || u.username == input.username).FirstOrDefault();
            if (currentUser == null)
            {
                context.Users.Add(user);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        [UseDbContext(typeof(AppDbContext))]
        public bool UserLogin(LoginInput input, [ScopedService] AppDbContext context)
        {
            var currentUser = context.Users.Where(u => u.email == input.email).FirstOrDefault();

            if (currentUser != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(input.password, currentUser.password);
                if (verified)
                    return true;
            }

            return false;
        }
    }
}