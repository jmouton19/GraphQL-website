using HotChocolate.AspNetCore.Authorization;
using webAPI.data;
using webAPI.Models;
using UseFilteringAttribute = HotChocolate.Data.UseFilteringAttribute;
using UseSortingAttribute = HotChocolate.Data.UseSortingAttribute;

namespace webAPI.graphQL
{
    public class Query
    {
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [Authorize]

        public IQueryable<User> GetUsers([ScopedService] AppDbContext context)
        {
            return context.Users;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [Authorize]

        public IQueryable<Group> GetGroups([ScopedService] AppDbContext context)
        {
            return context.Groups;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [Authorize]

        public IQueryable<Membership> GetMemberships([ScopedService] AppDbContext context)
        {
            return context.Memberships;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [Authorize]

        public IQueryable<Post> GetPosts([ScopedService] AppDbContext context)
        {
            return context.Posts;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [Authorize]
        public IQueryable<Comment> GetComments([ScopedService] AppDbContext context)
        {
            return context.Comments;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [Authorize]

        public IQueryable<Friendship> GetFriendships([ScopedService] AppDbContext context)
        {
            return context.Friendships;
        }
    }
}