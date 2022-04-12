using webAPI.data;
using webAPI.graphQL.Users;
using webAPI.Models;
using BCrypt;

namespace webAPI.graphQL{

    public class Mutation{
        [UseDbContext(typeof(AppDbContext))]
        public async Task<AddUserPayload> AddUserAsync(AddUserInput input,[ScopedService] AppDbContext context){
            var user= new User{
                email=input.email,
                username=input.username,
                firstName=input.firstName,
                lastName=input.lastName,
                DOB=input.DOB,
                avatar=input.avatar,
                password=input.password
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return new AddUserPayload(user);
        }

        [UseDbContext(typeof(AppDbContext))]
        public bool UserLogin(LoginInput login,[ScopedService] AppDbContext context)
    {
    	var currentUser = context.Users.Where(u => u.email == login.email && u.password == login.password).FirstOrDefault();

    	if (currentUser != null)
    	{
    		return true;
    	}
        
    	return false;
    }
    }
}