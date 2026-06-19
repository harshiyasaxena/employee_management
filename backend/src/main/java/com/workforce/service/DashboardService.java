package com.workforce.service;

import com.workforce.dto.DashboardStatsDto;
import com.workforce.dto.AttendanceChartDto;
import java.util.List;

public interface DashboardService {

    DashboardStatsDto getStats();

    List<AttendanceChartDto> getAttendanceChartData();
}