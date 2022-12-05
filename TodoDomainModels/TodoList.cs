using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TodoDomainModels
{
    public class TodoList
    {
        [Key]
        public int ListId { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public List<Todo> TodoItems { get; set; } = new List<Todo>();
    }
}
