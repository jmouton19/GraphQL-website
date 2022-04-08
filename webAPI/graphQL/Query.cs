using webAPI.data;
using webAPI.Models;


namespace webAPI.graphQL{
    public class Query{
        [UseProjection]
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<User> GetUsers([ScopedService] AppDbContext context){
            return context.Users;
        }
        [UseProjection]
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<Group> GetGroups([ScopedService] AppDbContext context){
            return context.Groups;
        }
        [UseProjection]
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<Membership> GetMemberships([ScopedService] AppDbContext context){
            return context.Memberships;
        }
        [UseProjection]
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<Post> GetPosts([ScopedService] AppDbContext context){
            return context.Posts;
        }
        [UseProjection]
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<Comment> GetComments([ScopedService] AppDbContext context){
            return context.Comments;
        }
    }
}