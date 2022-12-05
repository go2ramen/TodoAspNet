using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TodoDomainModels
{
    public class Todo
    {
        [Key]
        public int TodoId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Desc { get; set; }

        [Required]
        public Boolean Completed { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public int TodoListId { get; set; }
        public TodoList TodoList { get; set; }
    }
}
