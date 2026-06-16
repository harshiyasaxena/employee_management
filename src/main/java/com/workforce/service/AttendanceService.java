package com.workforce.service;

import com.workforce.entity.Attendance;

import java.util.List;

public interface AttendanceService {

    Attendance checkIn(Long employeeId);

    Attendance checkOut(Long attendanceId);

    List<Attendance> getAllAttendance();

    List<Attendance> getMyAttendance(String email);
}