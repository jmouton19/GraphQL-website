using webAPI.data;
using webAPI.graphQL.inputs;
using webAPI.graphQL.outputs;
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
        public async Task<AuthOutput> AddUserAsync(AddUserInput input, [Service] IConfiguration config, [ScopedService] AppDbContext context)
        {
            var authOutput = new AuthOutput();
            authOutput.success = false;
            authOutput.message = "Sign up failed.";

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
                    authOutput.user = addedUser;
                    authOutput.success = true;
                    authOutput.message = "Signed up sucessfully.";
                    var utility = new Utilities();
                    authOutput.jwt = utility.getJWT(input.email, input.password, config, context);
                    return authOutput;
                }
                return authOutput;

            }
            else
                return authOutput;
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
        public async Task<Response> UpdateGroupAsync(UpdateGroupInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentGroup = context.Groups.Where(u => u.Id == input.groupId).FirstOrDefault();
            if (currentGroup != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

                if (identity != null)
                {
                    string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                    var currentMember = context.Memberships.Where(u => u.userId == Int32.Parse(idendityId) && u.groupId == currentGroup.Id).FirstOrDefault();
                    if (idendityId != null && (currentGroup.ownerId.ToString() == idendityId || currentMember?.admin == true))
                    {
                        if (input.description != null)
                            currentGroup.description = input.description;
                        if (input.name != null)
                            currentGroup.name = input.name;
                        if (input.avatar != null)
                            currentGroup.avatar = input.avatar;

                        context.Groups.Update(currentGroup);
                        await context.SaveChangesAsync();
                        response.success = true;
                        response.message = "Group profile has been updated.";
                    }
                    else
                    {
                        response.success = false;
                        response.message = "You shall not pass!";
                    }
                }
                else
                {
                    response.success = false;
                    response.message = "Null identity.";
                }

            }
            else
            {
                response.success = false;
                response.message = "Group does not exist.";
            }

            return response;
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

                var memberInput = new AddMemberInput(group.Id);
                await AddMemberAsync(memberInput, context, contextAccessor);
                var updatePrivs = new EditAdminInput(group.Id, group.ownerId, true);
                await EditAdminAsync(updatePrivs, context, contextAccessor);
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
                    admin = false
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
        [Authorize]
        public async Task<Response> EditAdminAsync(EditAdminInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentGroup = context.Groups.Where(u => u.Id == input.groupId).FirstOrDefault();
            if (currentGroup != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                    if (idendityId != null && idendityId == currentGroup.ownerId.ToString())
                    {
                        var currentMember = context.Memberships.Where(u => u.userId == input.userId && u.groupId == input.groupId).FirstOrDefault();
                        if (currentMember != null)
                        {
                            currentMember.admin = input.admin;
                            context.Memberships.Update(currentMember);
                            await context.SaveChangesAsync();
                            response.success = true;
                            response.message = "Member updated.";
                        }
                        else
                        {
                            response.success = false;
                            response.message = "Member does not exist.";
                        }

                    }
                    else
                    {
                        response.success = false;
                        response.message = "You must construct additional pylons!";
                    }
                }
                else
                {
                    response.success = false;
                    response.message = "Null Identity";
                }
            }
            else
            {
                response.success = false;
                response.message = "Group does not exist";
            }
            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> KickMemberAsync(EditAdminInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentGroup = context.Groups.Where(u => u.Id == input.groupId).FirstOrDefault();
            if (currentGroup != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                    var adminMember = context.Memberships.Where(u => u.userId == Int32.Parse(idendityId) && u.groupId == currentGroup.Id).FirstOrDefault();
                    if (idendityId != null && (currentGroup.ownerId.ToString() == idendityId || adminMember?.admin == true))
                    {
                        var currentMember = context.Memberships.Where(u => u.userId == input.userId && u.groupId == input.groupId).FirstOrDefault();
                        if (currentMember != null)
                        {
                            if (currentMember != adminMember)
                            {
                                context.Memberships.Remove(currentMember);
                                await context.SaveChangesAsync();
                                response.success = true;
                                response.message = "Member has been kicked.";
                            }
                            else
                            {
                                response.success = false;
                                response.message = "You cant kick yourself m8.";
                            }

                        }
                        else
                        {
                            response.success = false;
                            response.message = "Member does not exist.";
                        }

                    }
                    else
                    {
                        response.success = false;
                        response.message = "You must construct additional pylons!";
                    }
                }
                else
                {
                    response.success = false;
                    response.message = "Null Identity";
                }
            }
            else
            {
                response.success = false;
                response.message = "Group does not exist";
            }
            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        public AuthOutput UserLogin(LoginInput input, [Service] IConfiguration config, [ScopedService] AppDbContext context)
        {
            var authOutput = new AuthOutput();
            try
            {
                authOutput.user = context.Users.Where(u => u.email == input.email).FirstOrDefault();
                var utility = new Utilities();
                authOutput.jwt = utility.getJWT(input.email, input.password, config, context);
                if (authOutput.user.Equals(null) || authOutput.jwt == "false")
                {
                    throw new System.Exception();
                }
                authOutput.success = true;
                authOutput.message = "Logged in successfully.";
            }
            catch (System.Exception)
            {
                authOutput.user = null;
                authOutput.success = false;
                authOutput.message = "Log in failed.";
            }
            return authOutput;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddPostAsync(AddPostInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            if (idendityId != null)
            {
                var currentmember = context.Memberships.Where(u => u.Id == input.creatorId).FirstOrDefault();
                if (currentmember != null)
                {
                    if (idendityId == currentmember.userId.ToString())
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
                    else
                        return "success:false,message:I used to be an adventurer like you, but then I took an arrow in the knee.";
                }
                return "success:false,message:Member does not exist.";
            }
            return "success:false,message:Null identity.";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddCommmentAsync(AddCommentInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            if (idendityId != null)
            {
                var currentmember = context.Memberships.Where(u => u.Id == input.creatorId).FirstOrDefault();
                if (currentmember != null)
                {
                    if (idendityId == currentmember.userId.ToString())
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
                    else
                        return "success:false,message:I used to be an adventurer like you, but then I took an arrow in the knee.";
                }
                return "success:false,message:Member does not exist.";
            }
            return "success:false,message:Null identity.";
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<string> AddFriendAsync(AddFriendInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            if (idendityId == input.senderId.ToString())
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
            return "success:false,message:Mission Failed, we'll get em next time.";
        }

    }
}
