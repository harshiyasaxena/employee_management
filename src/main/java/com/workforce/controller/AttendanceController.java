package com.workforce.controller;

import com.workforce.entity.Attendance;
import com.workforce.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/checkin/{employeeId}")
    public Attendance checkIn(
            @PathVariable Long employeeId) {

        return attendanceService.checkIn(employeeId);
    }

    @PostMapping("/checkout/{attendanceId}")
    public Attendance checkOut(
            @PathVariable Long attendanceId) {

        return attendanceService.checkOut(attendanceId);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }
     @GetMapping("/my")
    public List<Attendance> getMyAttendance(Authentication authentication) {
        return attendanceService.getMyAttendance(authentication.getName());
    }
}