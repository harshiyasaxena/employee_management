package com.workforce.service;

import com.workforce.dto.ProfileResponseDto;
import com.workforce.dto.UpdateProfileDto;
import com.workforce.dto.UserRequestDto;
import com.workforce.entity.User;
import com.workforce.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User addEmployee(UserRequestDto dto) {

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .department(dto.getDepartment())
                .role(dto.getRole())
                .build();

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllEmployees() {
        return userRepository.findAll();
    }

    @Override
    public User getEmployeeById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public void deleteEmployee(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public ProfileResponseDto getProfile(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        return new ProfileResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getDepartment());
    }

    @Override
    public User updateProfile(
            String email,
            UpdateProfileDto dto) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        user.setName(dto.getName());

        user.setDepartment(dto.getDepartment());

        if (dto.getPassword() != null &&
                !dto.getPassword().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(
                            dto.getPassword()));
        }

        return userRepository.save(user);
    }
}