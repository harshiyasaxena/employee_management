package com.workforce.repository;

import com.workforce.entity.Attendance;
import com.workforce.entity.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    long countByStatus(AttendanceStatus status);
}