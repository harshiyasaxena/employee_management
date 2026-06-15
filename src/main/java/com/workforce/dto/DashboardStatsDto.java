package com.workforce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDto {

    private Long totalEmployees;

    private Long totalTasks;

    private Long completedTasks;

    private Long pendingTasks;

    private Long presentEmployees;

    private Double completionRate;
    
    private Long overdueTasks;
}