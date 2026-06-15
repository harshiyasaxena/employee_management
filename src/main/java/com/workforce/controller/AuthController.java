package com.workforce.controller;

import com.workforce.dto.LoginRequest;
import com.workforce.dto.LoginResponse;
import com.workforce.entity.User;
import com.workforce.repository.UserRepository;
import com.workforce.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.workforce.dto.RegisterRequest;
import com.workforce.entity.Role;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name());

       return new LoginResponse(
    token,
    user.getRole().name(),
    user.getEmail()
);
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .department(request.getDepartment())
                .role(Role.EMPLOYEE)
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }
}