package org.learn.todo.service;

import org.learn.todo.dto.TodoDto;

import java.util.List;

public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);
    TodoDto getTodoById(Long todoId);
    List<TodoDto> getAllTodos();
    TodoDto updateTodo(Long todoId, TodoDto updatedTodoDto);
    void deleteTodo(Long todoId);
    TodoDto completeTodo(Long todoId);
    TodoDto inCompleteTodo(Long todoId);
}
