using Angularapi.Models;
using Microsoft.EntityFrameworkCore;

namespace angularapi.Context
{
    public class AppDbContext:DbContext
    {
        public DbSet<FeedBack> feedback{get;set;}

        public AppDbContext(DbContextOptions<AppDbContext>options)
         : base(options)
         {
          
         }
         protected override void OnModelCreating(ModelBuilder builder)
         {
            base.OnModelCreating(builder);
         }
    }
}