package com.workforce.service;

import com.workforce.entity.Attendance;

import java.util.List;

import com.workforce.dto.LeaveRequestDto;

public interface AttendanceService {

    Attendance checkIn(Long employeeId);

    Attendance checkOut(Long employeeId);

    Attendance applyLeave(Long employeeId, LeaveRequestDto dto);

    List<Attendance> getAllAttendance();

    List<Attendance> getMyAttendance(String email);
}