using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TodoDomainModels;

namespace AspReact.Data
{
    public class TodoContext : DbContext
    {
        public DbSet<TodoList> TodoLists { get; set; }
        public DbSet<Todo> Todos { get; set; }

        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
