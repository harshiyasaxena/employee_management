package com.workforce.service;

import com.workforce.dto.ProfileResponseDto;
import com.workforce.dto.UpdateProfileDto;
import com.workforce.dto.UserRequestDto;
import com.workforce.entity.User;

import java.util.List;

public interface UserService {

    User addEmployee(UserRequestDto dto);

    List<User> getAllEmployees();

    User getEmployeeById(Long id);

    void deleteEmployee(Long id);

    ProfileResponseDto getProfile(String email);

    User updateProfile(
            String email,
            UpdateProfileDto dto);

}