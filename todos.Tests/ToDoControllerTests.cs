 using System;
using Xunit;
using todo.Controllers;
using System.Linq;

namespace todos.Tests
{
    public class ToDoControllerTests
    {
        [Fact]
        public void Get_Returns_List_Of_Todos()
        {
            var undertest = new TodoController();
            var result = undertest.Get();
            Assert.Equal(3, result.Value.Count());

        }
        [Fact]
        public void Post_Creates_New_Todo()
        {
            var undertest = new TodoController();
            var result = undertest.Post("new task");
            Assert.Contains("new task", result.Value);
        }
        
  
    }
}
