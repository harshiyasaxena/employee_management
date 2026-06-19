package com.workforce.controller;

import com.workforce.dto.UserRequestDto;
import com.workforce.entity.User;
import com.workforce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.workforce.dto.ProfileResponseDto;
import com.workforce.dto.UpdateProfileDto;
import org.springframework.security.core.Authentication;
import com.workforce.dto.ProfileResponseDto;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public User addEmployee(@RequestBody UserRequestDto dto) {
        return userService.addEmployee(dto);
    }

    @GetMapping
    public List<User> getAllEmployees() {
        return userService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public User getEmployee(@PathVariable Long id) {
        return userService.getEmployeeById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        userService.deleteEmployee(id);
        return "Employee Deleted Successfully";
    }

    @GetMapping("/profile")
    public ProfileResponseDto getProfile(
            Authentication authentication) {

        return userService.getProfile(
                authentication.getName());
    }

    @PutMapping("/profile")
    public User updateProfile(
            Authentication authentication,
            @RequestBody UpdateProfileDto dto) {

        return userService.updateProfile(
                authentication.getName(),
                dto);
    }
}