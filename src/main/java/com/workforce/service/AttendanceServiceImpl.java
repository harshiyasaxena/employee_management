package com.workforce.service;

import com.workforce.dto.LeaveRequestDto;
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

    private static final LocalTime CHECK_IN_DEADLINE = LocalTime.of(9, 0);
    private static final LocalTime CHECK_OUT_DEADLINE = LocalTime.of(17, 0);

    @Override
    public Attendance checkIn(Long employeeId) {
        User employee = userRepository.findById(employeeId).orElseThrow();

        LocalDate today = LocalDate.now();

        Attendance existing = attendanceRepository
                .findByEmployeeEmailAndDate(employee.getEmail(), today)
                .orElse(null);

        if (existing != null) {
            if (existing.getStatus() == AttendanceStatus.ABSENT) {
                throw new RuntimeException("Leave applied for today. Check-in not allowed.");
            }

            if (existing.getCheckIn() != null) {
                throw new RuntimeException("You have already checked in today.");
            }

            existing.setCheckIn(LocalTime.now());

            if (LocalTime.now().isAfter(CHECK_IN_DEADLINE)) {
                existing.setStatus(AttendanceStatus.LATE);
            } else {
                existing.setStatus(AttendanceStatus.PRESENT);
            }

            return attendanceRepository.save(existing);
        }

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(today)
                .checkIn(LocalTime.now())
                .status(LocalTime.now().isAfter(CHECK_IN_DEADLINE)
                        ? AttendanceStatus.LATE
                        : AttendanceStatus.PRESENT)
                .build();

        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance checkOut(Long employeeId) {
        User employee = userRepository.findById(employeeId).orElseThrow();

        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository
                .findByEmployeeEmailAndDate(employee.getEmail(), today)
                .orElseThrow(() -> new RuntimeException("Please check in first"));

        if (attendance.getStatus() == AttendanceStatus.ABSENT) {
            throw new RuntimeException("Leave applied for today. Check-out not allowed.");
        }

        if (attendance.getCheckIn() == null) {
            throw new RuntimeException("Please check in first");
        }

        if (attendance.getCheckOut() != null) {
            throw new RuntimeException("You have already checked out today.");
        }

        attendance.setCheckOut(LocalTime.now());

        if (LocalTime.now().isBefore(CHECK_OUT_DEADLINE)) {
            attendance.setStatus(AttendanceStatus.LATE);
        }

        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance applyLeave(Long employeeId, LeaveRequestDto dto) {
        User employee = userRepository.findById(employeeId).orElseThrow();

        LocalDate start = dto.getStartDate();
        LocalDate end = dto.getEndDate();

        if (end.isBefore(start)) {
            throw new RuntimeException("End date cannot be before start date");
        }

        LocalDate date = start;
        Attendance lastSaved = null;

        while (!date.isAfter(end)) {
            Attendance existing = attendanceRepository
                    .findByEmployeeEmailAndDate(employee.getEmail(), date)
                    .orElse(null);

            if (existing != null) {
                existing.setStatus(AttendanceStatus.ABSENT);
                existing.setCheckIn(null);
                existing.setCheckOut(null);
                lastSaved = attendanceRepository.save(existing);
            } else {
                Attendance leave = Attendance.builder()
                        .employee(employee)
                        .date(date)
                        .status(AttendanceStatus.ABSENT)
                        .build();

                lastSaved = attendanceRepository.save(leave);
            }

            date = date.plusDays(1);
        }

        return lastSaved;
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