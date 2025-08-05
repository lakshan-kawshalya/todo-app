package org.learn.todo.service;

import org.learn.todo.dto.LoginDto;
import org.learn.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login (LoginDto loginDto);
}
