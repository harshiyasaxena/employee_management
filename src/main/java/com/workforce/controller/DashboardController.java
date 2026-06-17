package com.workforce.controller;

import com.workforce.dto.DashboardStatsDto;
import com.workforce.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.workforce.dto.AttendanceChartDto;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {
        return dashboardService.getStats();
    }

    @GetMapping("/attendance-chart")
public List<AttendanceChartDto> getAttendanceChart() {
    return dashboardService.getAttendanceChartData();
}
}