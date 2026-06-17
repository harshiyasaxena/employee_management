package com.workforce.repository;

import com.workforce.entity.Attendance;
import com.workforce.entity.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;


public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    long countByStatus(AttendanceStatus status);

    List<Attendance> findByEmployeeEmail(String email);

    Optional<Attendance> findByEmployeeEmailAndDate(String email, LocalDate date);

    List<Attendance> findByDateBetween(LocalDate startDate, LocalDate endDate);
}