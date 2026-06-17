package com.workforce.controller;

import com.workforce.entity.Attendance;
import com.workforce.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.workforce.dto.LeaveRequestDto;

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

    @PostMapping("/checkout/{employeeId}")
public Attendance checkOut(
        @PathVariable Long employeeId) {
    return attendanceService.checkOut(employeeId);
}

@PostMapping("/leave/{employeeId}")
public Attendance applyLeave(
        @PathVariable Long employeeId,
        @RequestBody LeaveRequestDto dto) {
    return attendanceService.applyLeave(employeeId, dto);
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