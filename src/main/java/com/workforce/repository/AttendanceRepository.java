package com.workforce.repository;

import com.workforce.entity.Attendance;
import com.workforce.entity.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    long countByStatus(AttendanceStatus status);

    List<Attendance> findByEmployeeEmail(String email);
}