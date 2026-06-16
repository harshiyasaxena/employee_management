package com.workforce.service;

import com.workforce.entity.Attendance;
import com.workforce.entity.AttendanceStatus;
import com.workforce.entity.User;
import com.workforce.repository.AttendanceRepository;
import com.workforce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    @Override
    public Attendance checkIn(Long employeeId) {

        User employee = userRepository.findById(employeeId)
                .orElseThrow();

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(LocalDate.now())
                .checkIn(LocalTime.now())
                .status(AttendanceStatus.PRESENT)
                .build();

        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance checkOut(Long attendanceId) {

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow();

        attendance.setCheckOut(LocalTime.now());

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @Override
public List<Attendance> getMyAttendance(String email) {
    return attendanceRepository.findByEmployeeEmail(email);
}
}