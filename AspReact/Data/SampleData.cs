using System.Linq;
using TodoDomainModels;

namespace AspReact.Data
{
    public static class SampleData
    {
        public static void Initialize(TodoContext context)
        {
            TodoList list = new TodoList
            {
                Name = "Home todo list",
                Desc = "how works"
            };
            TodoList list2 = new TodoList
            {
                Name = "Work",
                Desc = "urgent work todos"
            };
            if (!context.Todos.Any())
            {
                Todo todo1 = new Todo
                {
                    Title = "Moloko",
                    Desc = "asdfasdf",
                    Completed = false,
                    DueDate = new System.DateTime(2022, 12, 2),
                    TodoList = list
                };

                Todo todo2 = new Todo
                {
                    Title = "Kola",
                    Desc = "asdfasdf",
                    Completed = false,
                    DueDate = new System.DateTime(2022, 12, 2),
                    TodoList = list
                };

                Todo todo3 = new Todo
                {
                    Title = "Pivo",
                    Desc = "asdfasdf",
                    Completed = false,
                    DueDate = new System.DateTime(2022, 12, 2),
                    TodoList = list2
                };

                context.Todos.AddRange(todo1, todo2, todo3);
                context.SaveChanges();
            }
        }
    }
}
