
export const getAllLists = async() => {
    return await fetch("api/list");
}

export const getListById = async (id) => {
    const response = await fetch(`api/list/${id}`);
    const data = await response.json();
    return data;
}


export const updateListItem = async (list) => {
    console.log(list);
    const response = await fetch(`api/list/${list.listId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            listId: list.listId,
            Name: list.name,
            Desc: list.desc,
            todoItems: list.todoItems,
        })
    });
    return response;
}

export const deleteTodoById = async (id) => {
    const response = await fetch(`api/todo/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const getTodoById = async (id) => {
    const response = await fetch(`api/todo/${id}`);
    
    const data = await response.json();
    //console.log(data);
    return data;
}

export const addTodoToDb = async(todo) => {
  return await fetch("api/todo", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
  });
}

export const changeStatusOfTodo = async(id) => {
    return await fetch(`/api/todo/status/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const updateTodo = async (todo) => {
    console.log(todo);
    const response = await fetch(`api/todo/${todo.TodoId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return response;
}

export const getTodayTodos = async () => {
    const response = await fetch("api/todo/today");
    const data = response.json();
    return data;
}