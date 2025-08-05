package org.learn.todo.service.impl;

import lombok.AllArgsConstructor;
import org.learn.todo.dto.TodoDto;
import org.learn.todo.entity.Todo;
import org.learn.todo.exception.ResourceNotFoundException;
import org.learn.todo.repository.TodoRepository;
import org.learn.todo.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = modelMapper.map(todoDto, Todo.class);

        Todo savedTodo = todoRepository.save(todo);

        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);

        return savedTodoDto;
    }

    @Override
    public TodoDto getTodoById(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("Todo not found by ID:"+todoId));

        TodoDto todoDto = modelMapper.map(todo, TodoDto.class);

        return todoDto;
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<TodoDto> todoDtos = todoRepository.findAll().stream().map((todo)->modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());

        return todoDtos;
    }

    @Override
    public TodoDto updateTodo(Long todoId, TodoDto updatedTodoDto) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(()->new ResourceNotFoundException("Todo not found by ID: "+todoId));

        todo.setTitle(updatedTodoDto.getTitle());
        todo.setDescription(updatedTodoDto.getDescription());
        todo.setCompleted(updatedTodoDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);

        return modelMapper.map(updatedTodo, TodoDto.class);
    }

    @Override
    public void deleteTodo(Long todoId) {
        todoRepository.findById(todoId).orElseThrow(()->new ResourceNotFoundException("Todo not found by ID: "+ todoId));

        todoRepository.deleteById(todoId);
    }

    @Override
    public TodoDto completeTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(()-> new ResourceNotFoundException("Todo not found by ID: "+todoId));

        todo.setCompleted(true);

        Todo savedTodo = todoRepository.save(todo);

        return modelMapper.map(savedTodo,TodoDto.class);
    }

    @Override
    public TodoDto inCompleteTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(()-> new ResourceNotFoundException("Todo not found by ID: "+todoId));

        todo.setCompleted(false);

        Todo savedTodo = todoRepository.save(todo);

        return modelMapper.map(savedTodo,TodoDto.class);
    }
}
