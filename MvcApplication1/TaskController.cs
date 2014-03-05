using System.Collections.Generic;
using System.Web.Http;

namespace MvcApplication1
{
    using System;
    using System.Diagnostics;
    using System.Linq;

    using MvcApplication1.Models;

    public class TaskController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Task> Get()
        {
            return Tasks.TasksList;
        }
        
        // POST api/<controller>
        /// <summary>
        /// Dzialanie w ten sposob powoduje utworzenie obiektu Task na podstawie danych dostarczoncyh przez zapytanie AJAXowe
        /// </summary>
        /// <param name="task"></param>
        [HttpPost]
        public Guid Post(Task task)
        {
            Debug.Assert(task != null);
            
            Tasks.TasksList.Add(task);
            return Guid.NewGuid();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}