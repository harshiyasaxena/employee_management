package com.workforce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EmployeeDashboardStatsDto {

    private long assignedTasks;

    private long completedTasks;

    private long pendingTasks;
}