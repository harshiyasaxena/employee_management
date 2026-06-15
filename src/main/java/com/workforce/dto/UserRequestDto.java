package com.workforce.dto;

import com.workforce.entity.Role;
import lombok.Data;

@Data
public class UserRequestDto {

    private String name;
    private String email;
    private String password;
    private String department;
    private Role role;

}