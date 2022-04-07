using Microsoft.EntityFrameworkCore;
using webAPI.Models;

namespace webAPI.data
{
    public class AppDbContext : DbContext{
        public AppDbContext(DbContextOptions options) :base(options){

        }
        public DbSet<User> Users { get; set; } = default!;
    }
}