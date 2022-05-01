using Microsoft.EntityFrameworkCore;
using webAPI.Models;

namespace webAPI.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Friendship> Friendships { get; set; } = default!;
        public DbSet<Group> Groups { get; set; } = default!;
        public DbSet<Membership> Memberships { get; set; } = default!;
        public DbSet<Post> Posts { get; set; } = default!;
        public DbSet<Comment> Comments { get; set; } = default!;

        public string Hasher(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasMany(u => u.OwnedGroups).WithOne(g => g.owner!).HasForeignKey(g => g.ownerId);
            // modelBuilder.Entity<User>().HasMany(u => u.FriendshipsSent).WithOne(g => g.sender).HasForeignKey(g => g.senderId);
            // modelBuilder.Entity<User>().HasMany(u => u.FriendshipsReceived).WithOne(g => g.receiver).HasForeignKey(g => g.receiverId);
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.email).IsUnique();
                entity.HasIndex(e => e.username).IsUnique();
            });


            modelBuilder.Entity<Group>().HasMany(g => g.memberships).WithOne(g => g.group!).HasForeignKey(m => m.groupId);
            modelBuilder.Entity<User>().HasMany(u => u.memberships).WithOne(u => u.user!).HasForeignKey(m => m.userId);
            modelBuilder.Entity<Membership>().HasMany(m => m.posts).WithOne(m => m.creator!).HasForeignKey(p => p.creatorId);
            modelBuilder.Entity<Membership>().HasMany(m => m.comments).WithOne(m => m.creator!).HasForeignKey(p => p.creatorId);
            modelBuilder.Entity<Post>().HasMany(p => p.comments).WithOne(c => c.post!).HasForeignKey(c => c.postId);

            modelBuilder.Entity<User>()
            .HasIndex(u => u.username)
            .IsUnique(true);
            modelBuilder.Entity<User>()
            .HasIndex(u => u.email)
            .IsUnique(true);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                lastName = "Visser",
                firstName = "Nicol",
                DOB = DateOnly.ParseExact("11/23/1943", @"M/d/yyyy"),
                email = "nicolvisser@yahoo.com",
                password = Hasher("Visser"),
                username = "VisserMan",
                avatar = "https://i.ibb.co/hm99dG4/20d9de001ebe.png"
            },
                    new User
                    {
                        Id = 2,
                        lastName = "Mouton",
                        DOB = DateOnly.ParseExact("06/03/2000", @"M/d/yyyy"),
                        firstName = "Jacques",
                        email = "jcmouton@protonmail.com",
                        password = Hasher("Mouton"),
                        username = "JaySea",
                        avatar = "https://i.ibb.co/SBLGDZW/jc.png"
                    },
                    new User
                    {
                        Id = 3,
                        lastName = "Schommarz",
                        firstName = "Philip",
                        DOB = DateOnly.ParseExact("11/23/2000", @"M/d/yyyy"),
                        email = "philler@gmail.com",
                        password = Hasher("Schommarz"),
                        username = "Fillet",
                        avatar = "https://i.ibb.co/jg3970L/76cb8121601e.png"
                    },
                    new User
                    {
                        Id = 4,
                        lastName = "Steyn",
                        firstName = "Lize",
                        DOB = DateOnly.ParseExact("03/11/2000", @"M/d/yyyy"),
                        email = "mssteyn@rocketmail.com",
                        password = Hasher("Steyn"),
                        username = "MorneSteyn",
                        avatar = "https://i.ibb.co/VYbZ60Q/38816802529d.jpg"
                    },
                    new User
                    {
                        Id = 5,
                        lastName = "Uys",
                        firstName = "Eduan",
                        DOB = DateOnly.ParseExact("01/03/2000", @"M/d/yyyy"),
                        email = "eduanuys@gmail.com",
                        password = Hasher("Uys"),
                        username = "uysbeer",
                        avatar = "https://i.ibb.co/3cfRt6n/Image.png"
                    });
            modelBuilder.Entity<Group>().HasData(new Group
            {
                Id = 1,
                description = "Chess group for nerds",
                name = "Nicol's Chess Club",
                dateCreated = DateOnly.ParseExact("11/03/1947", @"M/d/yyyy"),
                ownerId = 1,
                avatar = "https://i.ibb.co/C61C35f/Screenshot-2022-04-24-at-20-49-25.png"
            },
            new Group
            {
                Id = 2,
                description = "Hit ball with stick",
                name = "Maties Hockey",
                dateCreated = DateOnly.ParseExact("11/03/1969", @"M/d/yyyy"),
                ownerId = 4,
                avatar = "https://i.ibb.co/TLCthzM/Screenshot-2022-04-24-at-20-52-57.png"
            });
            modelBuilder.Entity<Membership>().HasData(new Membership
            {
                Id = 4,
                userId = 1,
            },
            new Membership
            {
                Id = 5,
                userId = 2,
            },
            new Membership
            {
                Id = 6,
                userId = 3,
            },
            new Membership
            {
                Id = 7,
                userId = 4,
            },
            new Membership
            {
                Id = 1,
                admin = true,
                groupId = 1,
                userId = 1,
            },
            new Membership
            {
                Id = 9,
                admin = false,
                groupId = 2,
                userId = 1,
            },
            new Membership
            {
                Id = 2,
                admin = true,
                groupId = 2,
                userId = 4,
            },
            new Membership
            {
                Id = 3,
                admin = true,
                groupId = 1,
                userId = 2,
            },
            new Membership
            {
                Id = 8,
                userId = 5,
            });
            modelBuilder.Entity<Post>().HasData(new Post
            {
                Id = 1,
                body = "I like penguins",
                video = false,
                creatorId = 4,
                latitude = 29.6537,
                longitude = 79.9486,
                dateCreated = DateTime.UtcNow
            }, new Post
            {
                Id = 2,
                body = "u4vuh4i7wb9atdvj11rs",
                video = true,
                creatorId = 1,
                latitude = 82.8628,
                longitude = 135.0000,
                dateCreated = DateTime.UtcNow
            });

            modelBuilder.Entity<Comment>().HasData(new Comment
            {
                Id = 1,
                body = "i also like pengins",
                creatorId = 2,
                postId = 1,
                dateCreated = DateTime.UtcNow
            });
            modelBuilder.Entity<Friendship>().HasData(new Friendship
            {
                Id = 1,
                senderId = 1,
                receiverId = 2,
            }, new Friendship
            {
                Id = 2,
                senderId = 3,
                receiverId = 4,
                accepted = true
            });
        }
    }
}