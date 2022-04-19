using webAPI.data;
using webAPI.graphQL.inputs;
using webAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using webAPI.Models.other;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;

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
            else
                return false;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<bool> AddGroupAsync(AddGroupInput input, [ScopedService] AppDbContext context)
        {
            var group = new Group
            {
                name = input.name,
                description = input.description,
                dateCreated = input.dateCreated,
                ownerId = input.ownerId,
                avatar = input.avatar,
            };

            context.Groups.Add(group);
            await context.SaveChangesAsync();

            var memberInput = new AddMemberInput(group.Id, input.ownerId, true);
            await AddMemberAsync(memberInput, context);
            return true;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<bool> AddMemberAsync(AddMemberInput input, [ScopedService] AppDbContext context)
        {
            var member = new Membership
            {
                userId = input.userId,
                groupId = input.groupId,
                admin = input.admin
            };
            var currentMember = context.Memberships.Where(u => u.groupId == input.groupId && u.userId == input.userId).FirstOrDefault();
            if (currentMember == null)
            {
                context.Memberships.Add(member);
                await context.SaveChangesAsync();
                return true;
            }
            else

                return false;
        }


        [UseDbContext(typeof(AppDbContext))]
        public string UserLogin(LoginInput input, [Service] IConfiguration config, [ScopedService] AppDbContext context)
        {
            var currentUser = context.Users.Where(u => u.email == input.email).FirstOrDefault();

            if (currentUser != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(input.password, currentUser.password);
                if (verified)
                {
                    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["tokenSettings:Key"]));
                    var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

                    var jwtToken = new JwtSecurityToken(
                        issuer: config["tokenSettings:Issuer"],
                        audience: config["tokenSettings:Audience"],
                        expires: DateTime.Now.AddMinutes(2),
                        signingCredentials: credentials
                    );
                    string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                    return token;
                }

            }

            return "false";
        }
    }
}
