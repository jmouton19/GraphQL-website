using webAPI.data;
using webAPI.Models;


namespace webAPI.graphQL{
    public class Query{
        [UseProjection]
        public IQueryable<User> GetUsers([Service] AppDbContext context){
            return context.Users;
        }
    }
}