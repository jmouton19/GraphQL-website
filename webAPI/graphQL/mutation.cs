using webAPI.data;
using webAPI.graphQL.inputs;
using webAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using webAPI.Models.other;
using System.IdentityModel.Tokens.Jwt;
using HotChocolate.AspNetCore.Authorization;
using System.Security.Claims;

namespace webAPI.graphQL
{

    public class Mutation
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<string> AddUserAsync(AddUserInput input, [ScopedService] AppDbContext context)
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

                var addedUser = context.Users.Where(u => u.email == user.email).FirstOrDefault();
                if (addedUser != null)
                {
                    var member = new Membership
                    {
                        userId = addedUser.Id,
                        groupId = null,
                        admin = null
                    };
                    context.Memberships.Add(member);
                    await context.SaveChangesAsync();
                    return "true";
                }
                return "false";

            }
            else
                return "false";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> UpdateUserAsync(UpdateUserInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {

            var currentUser = context.Users.Where(u => u.Id == input.userId).FirstOrDefault();
            if (currentUser != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                    if (idendityId != null && idendityId == input.userId.ToString())
                    {
                        if (input.firstName != null)
                            currentUser.firstName = input.firstName;
                        if (input.lastName != null)
                            currentUser.lastName = input.lastName;
                        if (input.avatar != null)
                            currentUser.avatar = input.avatar;
                        if (input.DOB != null)
                            currentUser.DOB = input.DOB;


                        if (input.username != null && input.username != currentUser.username)
                        {
                            var checker = context.Users.Where(u => u.username == input.username).FirstOrDefault();
                            if (checker == null)
                                currentUser.username = input.username;
                            else
                                return "success:false,message:Username already taken.";

                        }

                        if (input.email != null && input.email != currentUser.email)
                        {
                            var checker = context.Users.Where(u => u.email == input.email).FirstOrDefault();
                            if (checker == null)
                                currentUser.email = input.email;
                            else
                                return "success:false,message:Email already taken.";

                        }

                        if (input.newPassword != null)
                        {
                            if (input.oldPassword != null)
                            {
                                bool verified = BCrypt.Net.BCrypt.Verify(input.oldPassword, currentUser.password);
                                if (verified)
                                    currentUser.password = BCrypt.Net.BCrypt.HashPassword(input.newPassword);
                                else
                                    return "success:false,message:Incorrect password.";
                            }
                            else
                                return "success:false,message:Please provide old password.";

                        }

                        context.Users.Update(currentUser);
                        await context.SaveChangesAsync();
                        return "success:true,message:User profile has been updated.";
                    }
                    else return "success:false,message:You shall not pass!";
                }
                else
                    return "success:false,message:Null identity.";
            }
            else
                return "success:false,message:This user does not exist.";
        }



        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> DeleteUserAsync(int userId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {

            var currentUser = context.Users.Where(u => u.Id == userId).FirstOrDefault();
            if (currentUser != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                    if (idendityId != null && idendityId == userId.ToString())
                    {
                        context.Users.Remove(currentUser);
                        await context.SaveChangesAsync();
                        return "success:true,message:User profile deleted.";
                    }
                    else
                        return "success:false,message:You must construct additional pylons.";

                }
                else
                    return "success:false,message:Null identity.";
            }
            else
                return "success:false,message:This user does not exist.";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> DeleteGroupAsync(int groupId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var currentGroup = context.Groups.Where(u => u.Id == groupId).FirstOrDefault();
            if (currentGroup != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                    if (idendityId != null && idendityId == currentGroup.ownerId.ToString())
                    {
                        context.Groups.Remove(currentGroup);
                        await context.SaveChangesAsync();
                        return "success:true,message:Group deleted.";
                    }
                    else
                        return "success:false,message:You have no power here!";

                }
                else
                    return "success:false,message:Null identity.";
            }
            else
                return "success:false,message:This group does not exist.";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddGroupAsync(AddGroupInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            if (idendityId != null)
            {
                var group = new Group
                {
                    name = input.name,
                    description = input.description,
                    dateCreated = input.dateCreated,
                    ownerId = Int32.Parse(idendityId),
                    avatar = input.avatar,
                };

                context.Groups.Add(group);
                await context.SaveChangesAsync();

                var memberInput = new AddMemberInput(group.Id, true);
                await AddMemberAsync(memberInput, context, contextAccessor);
                return "true";
            }
            else
                return "false";

        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddMemberAsync(AddMemberInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            if (idendityId != null)
            {
                var member = new Membership
                {
                    userId = Int32.Parse(idendityId),
                    groupId = input.groupId,
                    admin = input.admin
                };
                var currentMember = context.Memberships.Where(u => u.groupId == input.groupId && u.userId == member.userId).FirstOrDefault();
                if (currentMember == null)
                {
                    context.Memberships.Add(member);
                    await context.SaveChangesAsync();
                    return "true";
                }
                else

                    return "false";
            }
            else
                return "false";
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
                    var claims = new[]{
                        new Claim(ClaimTypes.Sid,currentUser.Id.ToString())
                    };

                    var jwtToken = new JwtSecurityToken(
                        issuer: config["tokenSettings:Issuer"],
                        audience: config["tokenSettings:Audience"],
                        claims,
                        expires: DateTime.Now.AddMinutes(15),
                        signingCredentials: credentials
                    );
                    string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                    return token;
                }

            }

            return "false";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddPostAsync(AddPostInput input, [ScopedService] AppDbContext context)
        {
            var post = new Post
            {
                body = input.body,
                dateCreated = input.dateCreated,
                video = input.video,
                latitude = input.latitude,
                longitude = input.longitude,
                creatorId = input.creatorId
            };

            try
            {
                context.Posts.Add(post);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return "success:false,message:Post could not be created.";
            }


            return "success:true,message:Post created.";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddCommmentAsync(AddCommentInput input, [ScopedService] AppDbContext context)
        {
            var comment = new Comment
            {
                body = input.body,
                dateCreated = input.dateCreated,
                creatorId = input.creatorId,
                postId = input.postId
            };
            try
            {
                context.Comments.Add(comment);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return "success:false,message:Comment could not be created.";
            }

            return "success:true,message:Comment created.";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddFriendAsync(AddFriendInput input, [ScopedService] AppDbContext context)
        {

            var currentFriendship = context.Friendships.Where(u => u.senderId == input.senderId && u.receiverId == input.receiverId).FirstOrDefault();
            if (currentFriendship != null)
            {
                if (currentFriendship.accepted != true)
                    return "success:false,message:Friend request already sent.";
                else
                    return "success:false,message:You are already friends";

            }
            else
            {
                var friendship = new Friendship
                {
                    senderId = input.senderId,
                    receiverId = input.receiverId,
                    accepted = false
                };

                currentFriendship = context.Friendships.Where(u => u.senderId == input.receiverId && u.receiverId == input.senderId).FirstOrDefault();
                if (currentFriendship != null)
                {
                    if (currentFriendship.accepted != true)
                    {
                        currentFriendship.accepted = true;
                        context.Friendships.Update(currentFriendship);
                        await context.SaveChangesAsync();
                        return "success:true,message:Friend added";
                    }
                    else
                        return "success:false,message:You are already friends";

                }
                else
                {
                    context.Friendships.Add(friendship);
                    await context.SaveChangesAsync();
                    return "success:true,message:friend requested";
                }


            }

        }

    }
}
