using webAPI.data;
using webAPI.Models;


namespace webAPI.graphQL{
    public class Query{
        [UseProjection]
        public IQueryable<User> GetUsers([Service] AppDbContext context){
            return context.Users;
        }
        [UseProjection]
        public IQueryable<Group> GetGroups([Service] AppDbContext context){
            return context.Groups;
        }
        [UseProjection]
        public IQueryable<Membership> GetMemberships([Service] AppDbContext context){
            return context.Memberships;
        }
        [UseProjection]
        public IQueryable<Post> GetPosts([Service] AppDbContext context){
            return context.Posts;
        }
        [UseProjection]
        public IQueryable<Comment> GetComments([Service] AppDbContext context){
            return context.Comments;
        }
    }
}