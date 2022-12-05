using AspReact.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using TodoDomainModels;

namespace AspReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext db;

        public TodoController(TodoContext db)
        {
            this.db = db;
        }

        [HttpGet("{id}")]
        public ActionResult<Todo> GetTodoById(int id)
        {
            var currentTodo = this.db.Todos
                              .Where(l => l.TodoId == id)
                              .FirstOrDefault();

            if (currentTodo == null)
            {
                return NotFound();
            }
            return currentTodo;
        }

        [HttpGet("today")]
        public IEnumerable<Todo> GetTodayTodos()
        {
            var shortTodayDate = DateTime.Now.ToString("yyyy-MM-dd");
            var todayDate = DateTime.Now;
            var todos = db.Todos
                          .Where(todo =>
                                    todo.DueDate.Date == todayDate.Date)
                          .ToList();
            //var todos = db.Todos.ToList();
            return todos;
        }

        [HttpGet("status/{id}")]
        public async Task<ActionResult> ChangeState(int? id)
        {

            if (id == 0 || id == null)
            {
                return NotFound();
            }
            var item = db.Todos.Where(item => item.TodoId == id).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            item.Completed = !item.Completed;
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public ActionResult AddToTodo(Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return NotFound();
            }
            db.Todos.Add(todo);
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }

            var existingTodo = db.Todos
                              .Where(todo => todo.TodoId == id)
                              .FirstOrDefault();

            if (existingTodo == null)
            {
                return NotFound();
            }

            db.Todos.Remove(existingTodo);
            await db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTodoItem(Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return NotFound();
            }

            var existingTodo = db.Todos
                                    .Where(l => l.TodoId == todo.TodoId)
                                    .FirstOrDefault();

            if (existingTodo != null)
            {
                existingTodo.Title = todo.Title;
                existingTodo.Desc = todo.Desc;
                existingTodo.DueDate = todo.DueDate;
                await db.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }

}
