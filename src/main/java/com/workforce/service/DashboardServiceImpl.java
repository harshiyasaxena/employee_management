package com.workforce.service;

import com.workforce.dto.DashboardStatsDto;
import com.workforce.entity.AttendanceStatus;
import com.workforce.entity.TaskStatus;
import com.workforce.repository.AttendanceRepository;
import com.workforce.repository.TaskRepository;
import com.workforce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

        private final UserRepository userRepository;
        private final TaskRepository taskRepository;
        private final AttendanceRepository attendanceRepository;

        @Override
        public DashboardStatsDto getStats() {

                long totalEmployees = userRepository.count();

                long totalTasks = taskRepository.count();

                long completedTasks = taskRepository.countByStatus(TaskStatus.COMPLETED);
                double completionRate = 0.0;

                if (totalTasks > 0) {
                        completionRate = (completedTasks * 100.0) / totalTasks;
                }

                long overdueTasks = taskRepository.countByDeadlineBeforeAndStatusNot(
                                LocalDate.now(),
                                TaskStatus.COMPLETED);

                long pendingTasks = taskRepository.countByStatus(TaskStatus.PENDING) - overdueTasks;


                long presentEmployees = attendanceRepository.countByStatus(AttendanceStatus.PRESENT);

                return new DashboardStatsDto(
                                totalEmployees,
                                totalTasks,
                                completedTasks,
                                pendingTasks,
                                presentEmployees,
                                completionRate,
                                overdueTasks);
        }
}