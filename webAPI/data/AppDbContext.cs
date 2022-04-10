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
                modelBuilder.Entity<User>().HasMany(u=>u.OwnedGroups).WithOne(g=>g.owner!).HasForeignKey(g=>g.ownerId);
                modelBuilder.Entity<Group>().HasMany(g=>g.memberships).WithOne(g=>g.group!).HasForeignKey(m=>m.groupId);
                modelBuilder.Entity<User>().HasMany(u=>u.memberships).WithOne(u=>u.user!).HasForeignKey(m=>m.userId);
                modelBuilder.Entity<Membership>().HasMany(m=>m.posts).WithOne(m=>m.creator!).HasForeignKey(p=>p.creatorId);
                modelBuilder.Entity<Membership>().HasMany(m=>m.comments).WithOne(m=>m.creator!).HasForeignKey(p=>p.creatorId);
                modelBuilder.Entity<Post>().HasMany(p=>p.comments).WithOne(c=>c.post!).HasForeignKey(c=>c.postId);

                modelBuilder.Entity<User>()
                .HasIndex(u => u.username)
                .IsUnique(true);
                modelBuilder.Entity<User>()
                .HasIndex(u =>u.email)
                .IsUnique(true);


                modelBuilder.Entity<User>().HasData(new User {
                        Id = 1,
                        lastName = "Visser",
                        firstName = "Nicol",
                        DOB= DateOnly.Parse("11/23/1943"),
                        email="nicolvisser@yahoo.com",
                        password="1234",
                        username="VisserMan"
                        },
                        new User {
                        Id = 2,
                        lastName = "Mouton",
                        firstName = "JC",
                        DOB= DateOnly.Parse("06/03/2000"),
                        email="jcmouton@protonmail.com",
                        password="42069",
                        username="JaySea"
                        },
                        new User {
                        Id = 3,
                        lastName = "Schommarz",
                        firstName = "Philip",
                        DOB= DateOnly.Parse("11/23/2000"),
                        email="philler@gmail.com",
                        password="qwerty",
                        username="Fillet"
                        },
                        new User {
                        Id = 4,
                        lastName = "Steyn",
                        firstName = "Lize",
                        DOB= DateOnly.Parse("03/11/200"),
                        email="mssteyn@rocketmail.com",
                        password="hockey",
                        username="MorneSteyn"
                        });
                        modelBuilder.Entity<Group>().HasData(new Group {
                        Id = 1,
                        description="Chess group for nerds",
                        name="Nicol's Chess Club",
                        dateCreated=DateOnly.Parse("11/03/1947"),
                        ownerId=1,
                        },
                        new Group {
                        Id = 2,
                        description="Hit ball with stick",
                        name="Maties Hockey",
                        dateCreated=DateOnly.Parse("11/03/1969"),
                        ownerId=4,
                        });
                        modelBuilder.Entity<Membership>().HasData(new Membership {
                        Id = 1,
                        admin=true,
                        groupId=1,
                        userId=1,
                        },
                        new Membership {
                        Id = 2,
                        admin=true,
                        groupId=2,
                        userId=4,
                        },
                        new Membership {
                        Id = 3,
                        admin=false,
                        groupId=1,
                        userId=2,
                        });
                }  
        }
}