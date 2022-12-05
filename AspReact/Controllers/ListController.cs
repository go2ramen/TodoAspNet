using AspReact.Data;
using AspReact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using TodoDomainModels;

namespace AspReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : Controller
    {
        private readonly TodoContext db;
        public ListController(TodoContext context)
        {
            this.db = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoList>> GetAllList()
        {
            var data = this.db.TodoLists
                              .Include(l => l.TodoItems)
                              .Select(e => new TodoList{
                                  ListId = e.ListId,
                                  Name = e.Name,
                                  Desc = e.Desc,
                                  TodoItems = e.TodoItems.ToList()
                              });

            return data.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<TodoList> GetListById(int id)
        {

            var data = this.db.TodoLists
                              .Where(l => l.ListId == id)
                              .Include(l => l.TodoItems)
                              .Select(e => new TodoList
                              {
                                  ListId = e.ListId,
                                  Name = e.Name,
                                  Desc = e.Desc,
                                  TodoItems = e.TodoItems.ToList()
                              });
            var resultList = data.ToList().FirstOrDefault();
            if (resultList == null)
            {
                return NotFound();
            }

            return resultList;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var list = db.TodoLists
                         .Where(l => l.ListId == id)
                         .FirstOrDefault();

            if (list == null)
            {
                return NotFound();
            }

            db.TodoLists.Remove(list);
            await db.SaveChangesAsync();
            return Ok(list);
        }

        [HttpPost]
        public ActionResult AddToList(TodoList list)
        {
            if(!ModelState.IsValid)
            {
                return NotFound();
            }
            db.TodoLists.Add(list);
            db.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateList(TodoList item)
        {
            if (!ModelState.IsValid)
            {
                return NotFound();
            }

            var existingList = db.TodoLists
                                    .Where(l => l.ListId == item.ListId)
                                    .FirstOrDefault();

            if (existingList != null)
            {
                existingList.Name = item.Name;
                existingList.Desc = item.Desc;
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
