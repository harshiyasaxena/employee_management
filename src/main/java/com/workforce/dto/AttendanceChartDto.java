package com.workforce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttendanceChartDto {
    private String month;
    private Long present;
    private Long late;
    private Long absent;
}