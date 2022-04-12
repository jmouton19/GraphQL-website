using webAPI.data;
using webAPI.Models;


namespace webAPI.graphQL{
    public class Query{
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<User> GetUsers([ScopedService] AppDbContext context){
            return context.Users;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<Group> GetGroups([ScopedService] AppDbContext context){
            return context.Groups;
        }
       [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<Membership> GetMemberships([ScopedService] AppDbContext context){
            return context.Memberships;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<Post> GetPosts([ScopedService] AppDbContext context){
            return context.Posts;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<Comment> GetComments([ScopedService] AppDbContext context){
            return context.Comments;
        }
    }
}