using webAPI.data;
using webAPI.graphQL.inputs;
using webAPI.graphQL.outputs;
using webAPI.Models;
using webAPI.Models.other;
using HotChocolate.AspNetCore.Authorization;
using System.Security.Claims;
using Geolocation;
using Microsoft.EntityFrameworkCore;
using FluentEmail.Core;
using System.Web;

namespace webAPI.graphQL
{

    public class Mutation
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<AuthOutput> AddUserAsync(AddUserInput input, [Service] IConfiguration config, [ScopedService] AppDbContext context, [Service] IFluentEmail email)
        {
            var authOutput = new AuthOutput();
            authOutput.success = false;
            authOutput.message = "Sign up failed.";
            authOutput.jwt = null;

            var user = new User
            {
                email = input.email,
                username = input.username,
                firstName = input.firstName,
                lastName = input.lastName,
                DOB = input.DOB,
                avatar = input.avatar,
                validated = false,
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
                    await utility.validationEmailAsync(addedUser, config, email);
                    return authOutput;
                }
                return authOutput;

            }
            else
                return authOutput;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> UpdateUserAsync(UpdateUserInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentUser = context.Users.Where(u => u.Id == input.userId).FirstOrDefault();
            if (currentUser != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

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
                        {
                            response.success = false;
                            response.message = "Username already taken.";
                            return response;
                        }

                    }

                    if (input.email != null && input.email != currentUser.email)
                    {
                        var checker = context.Users.Where(u => u.email == input.email).FirstOrDefault();
                        if (checker == null)
                            currentUser.email = input.email;
                        else
                        {
                            response.success = false;
                            response.message = "Email already taken.";
                            return response;
                        }
                    }

                    if (input.newPassword != null)
                    {
                        if (input.oldPassword != null)
                        {
                            bool verified = BCrypt.Net.BCrypt.Verify(input.oldPassword, currentUser.password);
                            if (verified)
                                currentUser.password = BCrypt.Net.BCrypt.HashPassword(input.newPassword);
                            else
                            {
                                response.success = false;
                                response.message = "Incorrect password.";
                                return response;
                            }
                        }
                        else
                        {
                            response.success = false;
                            response.message = "Please provide old password.";
                            return response;
                        }
                    }
                    context.Users.Update(currentUser);
                    await context.SaveChangesAsync();
                    response.success = true;
                    response.message = "User profile has been updated.";
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
                response.message = "This user does not exist.";
            }
            return response;
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
                response.message = "Group does not exist.";
            }

            return response;
        }


        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> DeleteUserAsync(int userId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentUser = context.Users.Where(u => u.Id == userId).FirstOrDefault();
            if (currentUser != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

                string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                if (idendityId != null && idendityId == userId.ToString())
                {
                    context.Users.Remove(currentUser);
                    await context.SaveChangesAsync();
                    response.success = true;
                    response.message = "User profile deleted.";
                    return response;
                }
                else
                {
                    response.success = false;
                    response.message = "You must construct additional pylons.";
                    return response;
                }
            }
            else
            {
                response.success = false;
                response.message = "This user does not exist.";
                return response;
            }
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> DeleteGroupAsync(int groupId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentGroup = context.Groups.Where(u => u.Id == groupId).FirstOrDefault();
            if (currentGroup != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

                string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                if (idendityId != null && idendityId == currentGroup.ownerId.ToString())
                {
                    List<Membership> memberships = context.Memberships.Where(u => u.groupId == groupId).ToList();
                    foreach (Membership membership in memberships)
                    {
                        context.Memberships.Remove(membership);
                    }
                    context.Groups.Remove(currentGroup);
                    await context.SaveChangesAsync();
                    response.success = true;
                    response.message = "Group deleted";
                }
                else
                {
                    response.success = false;
                    response.message = "You have no power here!";
                }

            }
            else
            {
                response.success = false;
                response.message = "This group does not exist.";
            }
            return response;
        }
        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> DeletePostAsync(int postId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentPost = context.Posts.Where(u => u.Id == postId).FirstOrDefault();
            if (currentPost != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;

                string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                var currentMember = context.Memberships.Where(u => u.Id == currentPost.creatorId).FirstOrDefault();
                if (idendityId != null && idendityId == currentMember?.userId.ToString())
                {
                    context.Posts.Remove(currentPost);
                    await context.SaveChangesAsync();
                    response.success = true;
                    response.message = "Post deleted.";
                }
                else
                {
                    response.success = false;
                    response.message = "You have no power here!";
                }
            }
            else
            {
                response.success = false;
                response.message = "Post does not exist.";
            }

            return response;
        }
        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> DeleteCommentAsync(int commentId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var currentComment = context.Comments.Where(u => u.Id == commentId).FirstOrDefault();
            if (currentComment != null)
            {
                var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                if (idendityId != null && idendityId == currentComment.creatorId.ToString())
                {
                    context.Comments.Remove(currentComment);
                    await context.SaveChangesAsync();
                    response.success = true;
                    response.message = "Comment deleted.";
                }
                else
                {
                    response.success = false;
                    response.message = "You have no power here!";
                }
            }
            else
            {
                response.success = false;
                response.message = "Comment does not exist.";
            }

            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> DeleteFriendAsync(int friendId, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            //this is pepega list but it do be magnum tho
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            List<Friendship> friendships = context.Friendships.Where(u => u.accepted == true && ((u.senderId == Int32.Parse(idendityId) && u.receiverId == friendId) || (u.senderId == friendId && u.receiverId == Int32.Parse(idendityId)))).ToList();
            if (friendships.Count != 0)
            {
                foreach (Friendship friendship in friendships)
                {
                    context.Friendships.Remove(friendship);
                }

                await context.SaveChangesAsync();
                response.success = true;
                response.message = "Friend deleted lmao.";
            }
            else
            {
                response.success = false;
                response.message = "Not friends.";
            }

            return response;
        }
        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> AddGroupAsync(AddGroupInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;

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
            response.success = true;
            response.message = "Group has been created.";

            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> AddMemberAsync(AddMemberInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;

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
                response.success = true;
                response.message = "Membership created.";
            }
            else
            {
                response.success = false;
                response.message = "Membership already exists.";
            }
            return response;
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

                string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                var adminMember = context.Memberships.Where(u => u.userId == Int32.Parse(idendityId) && u.groupId == currentGroup.Id).FirstOrDefault();
                if (idendityId != null && idendityId == currentGroup.ownerId.ToString())
                {
                    var currentMember = context.Memberships.Where(u => u.userId == input.userId && u.groupId == input.groupId).FirstOrDefault();
                    if (currentMember != null && currentMember != adminMember)
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
                        response.message = "Unable to edit member.";
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

                string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
                var adminMember = context.Memberships.Where(u => u.userId == Int32.Parse(idendityId) && u.groupId == currentGroup.Id).FirstOrDefault();
                if (idendityId != null && (currentGroup.ownerId.ToString() == idendityId || adminMember?.admin == true))
                {
                    var currentMember = context.Memberships.Where(u => u.userId == input.userId && u.groupId == input.groupId).FirstOrDefault();
                    if (currentMember != null)
                    {
                        if (currentMember != adminMember)
                        {
                            if (currentMember.admin != true)
                            {
                                context.Memberships.Remove(currentMember);
                                await context.SaveChangesAsync();
                                response.success = true;
                                response.message = "Member has been kicked.";
                            }
                            else
                            {
                                response.success = false;
                                response.message = "Admins cant be kicked.";

                            }
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
                response.message = "Group does not exist";
            }
            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        public AuthOutput UserLogin(LoginInput input, [Service] IConfiguration config, [ScopedService] AppDbContext context)
        {
            var authOutput = new AuthOutput();
            authOutput.user = null;
            authOutput.success = false;
            authOutput.message = "Please activate your account.";
            try
            {
                authOutput.user = context.Users.Where(u => u.email == input.email).FirstOrDefault();
                var utility = new Utilities();
                authOutput.jwt = utility.getJWT(input.email, input.password, config, context);
                if (authOutput.user == null || authOutput.jwt == "false")
                {
                    throw new System.Exception();
                }
                if (authOutput.user.validated == false)
                {
                    return authOutput;
                }
                authOutput.success = true;
                authOutput.message = "Logged in successfully.";
            }
            catch (System.Exception)
            {
                authOutput.user = null;
                authOutput.jwt = null;
                authOutput.success = false;
                authOutput.message = "Log in failed.";
            }
            return authOutput;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> AddPostAsync(AddPostInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;

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

                    context.Posts.Add(post);
                    await context.SaveChangesAsync();

                    response.success = true;
                    response.message = "Post created.";
                }
                else
                {
                    response.success = false;
                    response.message = "I used to be an adventurer like you, but then I took an arrow in the knee.";
                }
            }
            else
            {
                response.success = false;
                response.message = "Member does not exist.";
            }

            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> AddCommmentAsync(AddCommentInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;

            var currentPost = context.Posts.Include(x => x.creator).Where(u => u.Id == input.postId).FirstOrDefault();
            var comment = new Comment
            {
                body = input.body,
                dateCreated = input.dateCreated,
                creatorId = Int32.Parse(idendityId),
                postId = input.postId
            };
            if (currentPost != null)
            {
                if (currentPost.creator?.userId == Int32.Parse(idendityId))
                {
                    response.success = true;
                    response.message = "Comment created.";
                }
                else if (currentPost.creator?.groupId != null)
                {
                    var currentMember = context.Memberships.Where(u => u.userId == Int32.Parse(idendityId) && u.groupId == currentPost.creator.groupId).FirstOrDefault();
                    if (currentMember != null)
                    {
                        response.success = true;
                        response.message = "Comment created.";
                    }
                    else
                    {
                        response.success = false;
                        response.message = "You are not a member of this group.";
                    }
                }
                else
                {
                    var currentFriend = context.Friendships.Where(u => u.accepted == true && ((u.senderId == Int32.Parse(idendityId) && u.receiverId == currentPost.creator.userId) || (u.senderId == currentPost.creator.userId && u.receiverId == Int32.Parse(idendityId)))).FirstOrDefault();
                    if (currentFriend != null)
                    {
                        response.success = true;
                        response.message = "Comment created.";
                    }
                    else
                    {
                        response.success = false;
                        response.message = "You are not a friend of this user.";
                    }
                }
            }
            else
            {
                response.success = false;
                response.message = "Post does not exist.";
            }
            if (response.success)
            {
                context.Comments.Add(comment);
                await context.SaveChangesAsync();
            }
            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public async Task<Response> AddFriendAsync(AddFriendInput input, [ScopedService] AppDbContext context, [Service] IHttpContextAccessor contextAccessor)
        {
            var response = new Response();
            response.success = false;
            response.message = string.Empty;

            var identity = contextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            string idendityId = identity.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Sid).Value;
            if (idendityId == input.senderId.ToString())
            {
                var currentFriendship = context.Friendships.Where(u => u.senderId == input.senderId && u.receiverId == input.receiverId).FirstOrDefault();
                if (currentFriendship != null)
                {
                    if (currentFriendship.accepted != true)
                    {
                        response.success = false;
                        response.message = "Friend request already sent.";
                    }
                    else
                    {
                        response.success = false;
                        response.message = "You are already friends.";
                    }
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
                            response.success = true;
                            response.message = "Friend added.";
                        }
                        else
                        {
                            response.success = false;
                            response.message = "You are already friends.";
                        }
                    }
                    else
                    {
                        context.Friendships.Add(friendship);
                        await context.SaveChangesAsync();
                        response.success = true;
                        response.message = "friend requested.";
                    }
                }
            }
            else
            {
                response.success = false;
                response.message = "Mission Failed, we'll get em next time.";
            }

            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        [Authorize]
        public DistanceOutput Distance(AddDistanceInput input, [ScopedService] AppDbContext context)
        {
            var response = new DistanceOutput
            {
                message = string.Empty,
                success = false,
                posts = new List<PostDist>()
            };

            Coordinate origin = new Coordinate(input.latitude, input.longitude);

            List<Post> posts = context.Posts.ToList();
            foreach (Post post in posts)
            {
                Coordinate destination = new Coordinate(post.latitude, post.longitude);
                double distance = GeoCalculator.GetDistance(origin, destination, 2, DistanceUnit.Kilometers);

                PostDist postDist = new PostDist
                {
                    post = post,
                    distance = distance
                };

                if (distance <= input.radius)
                {
                    response.posts.Add(postDist);
                }
                else if (input.radius == null)
                {
                    response.posts.Add(postDist);
                }

            }
            response.posts.Sort((s1, s2) => s1.distance.CompareTo(s2.distance));
            if (input.quantity != null)
            {
                int quantity = (int)input.quantity;
                if (quantity > response.posts.Count)
                    quantity = response.posts.Count;
                response.posts.RemoveRange(quantity, response.posts.Count - quantity);
            }
            response.success = true;
            response.message = "lekker lekker";
            return response;

        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Response> ValidateAccountAsync(AddValidateInput input, [ScopedService] AppDbContext context)
        {
            var response = new Response
            {
                message = string.Empty,
                success = false
            };
            var currentUser = context.Users.Where(u => u.Id == input.userId).FirstOrDefault();
            if (currentUser != null)
            {
                if (currentUser.validated == false)
                {
                    string tokenString = currentUser.email + currentUser.username;
                    var token = HttpUtility.UrlDecode(input.key);
                    bool verified = BCrypt.Net.BCrypt.Verify(tokenString, token);
                    if (verified)
                    {
                        currentUser.validated = true;
                        context.Users.Update(currentUser);
                        await context.SaveChangesAsync();
                        response.success = true;
                        response.message = "Account has been activated.";
                    }
                    else
                    {
                        response.success = false;
                        response.message = "Access denied!";
                    }
                }
                else
                {
                    response.success = false;
                    response.message = "Account has already been activated.";
                }
            }
            else
            {
                response.success = false;
                response.message = "This user does not exist.";
            }
            return response;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Response> resendValidationAsync(string emailInput, [Service] IConfiguration config, [ScopedService] AppDbContext context, [Service] IFluentEmail email)
        {
            var response = new Response
            {
                message = string.Empty,
                success = false
            };
            var addedUser = context.Users.Where(u => u.email == emailInput).FirstOrDefault();
            if (addedUser != null)
            {
                var utility = new Utilities();
                await utility.validationEmailAsync(addedUser, config, email);
                response.success = true;
                response.message = "Activation email has been sent.";
            }
            else
            {
                response.success = false;
                response.message = "This user does not exist.";
            }
            return response;
        }

    }
}
