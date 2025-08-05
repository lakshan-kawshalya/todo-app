package org.learn.todo.service.impl;

import lombok.AllArgsConstructor;
import org.learn.todo.dto.LoginDto;
import org.learn.todo.dto.RegisterDto;
import org.learn.todo.entity.Role;
import org.learn.todo.entity.User;
import org.learn.todo.exception.TodoAPIException;
import org.learn.todo.repository.RoleRepository;
import org.learn.todo.repository.UserRepository;
import org.learn.todo.security.JwtTokenProvider;
import org.learn.todo.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {
        // check username is already exist
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST,"Username is already exist!.");
        }

        // check email is already exist
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST,"Email is already exist!.");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles=new HashSet<>();
        Role role = roleRepository.findByName("ROLE_USER");
        roles.add(role);

        user.setRoles(roles);

        userRepository.save(user);

        return "User registered successfully!.";
    }

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }
}
