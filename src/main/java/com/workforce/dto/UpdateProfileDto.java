package com.workforce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileDto {

    private String name;

    private String email;

    private String department;

    private String password;
}