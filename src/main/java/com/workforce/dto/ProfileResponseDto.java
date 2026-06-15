package com.workforce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfileResponseDto {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String department;
}