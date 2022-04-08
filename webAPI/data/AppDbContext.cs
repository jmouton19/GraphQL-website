using Microsoft.EntityFrameworkCore;
using webAPI.Models;

namespace webAPI.data
{
    public class AppDbContext : DbContext{
        public AppDbContext(DbContextOptions options) :base(options){
            
        }
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Group> Groups { get; set; } = default!;
        public DbSet<Membership> Memberships { get; set; } = default!;
        public DbSet<Post> Posts { get; set; } = default!;
        public DbSet<Comment> Comments { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder modelBuilder){
                modelBuilder.HasPostgresExtension("postgis");
                User nicol= new User {
                        Id = 1,
                        lastName = "Visser",
                        firstName = "Nicol",
                        DOB= DateOnly.Parse("11/23/1943"),
                        email="nicolvisser@yahoo.com",
                        password="1234",
                        username="VisserMan"
                        };

                    modelBuilder.Entity<User>().HasData(nicol);
                }

        }
}