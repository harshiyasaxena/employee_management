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
import com.workforce.dto.AttendanceChartDto;
import com.workforce.entity.Attendance;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.List;

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

                long presentEmployees = attendanceRepository.countByDateAndStatus(
                                LocalDate.now(),
                                AttendanceStatus.PRESENT);

                return new DashboardStatsDto(
                                totalEmployees,
                                totalTasks,
                                completedTasks,
                                pendingTasks,
                                presentEmployees,
                                completionRate,
                                overdueTasks);
        }

        @Override
        public List<AttendanceChartDto> getAttendanceChartData() {
                List<Attendance> allAttendance = attendanceRepository.findAll();

                Map<YearMonth, List<Attendance>> groupedByMonth = allAttendance.stream()
                                .collect(Collectors.groupingBy(a -> YearMonth.from(a.getDate())));

                return groupedByMonth.entrySet().stream()
                                .sorted(Map.Entry.comparingByKey())
                                .map(entry -> {
                                        YearMonth ym = entry.getKey();
                                        List<Attendance> records = entry.getValue();

                                        long present = records.stream()
                                                        .filter(a -> a.getStatus() == AttendanceStatus.PRESENT)
                                                        .count();

                                        long late = records.stream()
                                                        .filter(a -> a.getStatus() == AttendanceStatus.LATE)
                                                        .count();

                                        long absent = records.stream()
                                                        .filter(a -> a.getStatus() == AttendanceStatus.ABSENT)
                                                        .count();

                                        String monthLabel = ym.getMonth()
                                                        .getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

                                        return new AttendanceChartDto(
                                                        monthLabel,
                                                        present,
                                                        late,
                                                        absent);
                                })
                                .collect(Collectors.toList());
        }
}