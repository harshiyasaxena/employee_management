package com.workforce.scheduler;

import com.workforce.entity.Task;
import com.workforce.repository.TaskRepository;
import com.workforce.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TaskReminderScheduler {

    private final TaskRepository taskRepository;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 9 * * *")
    public void sendDeadlineReminders() {

        LocalDate tomorrow = LocalDate.now().plusDays(1);

        List<Task> tasks =
                taskRepository.findByDeadline(tomorrow);

        for (Task task : tasks) {

            String body =
                    "Hello " + task.getAssignedTo().getName() + ",\n\n" +
                    "Reminder: Your task deadline is tomorrow.\n\n" +
                    "Task: " + task.getTitle() + "\n" +
                    "Priority: " + task.getPriority() + "\n" +
                    "Deadline: " + task.getDeadline() + "\n\n" +
                    "Regards,\n" +
                    "Workforce Management System";

            emailService.sendEmail(
                    task.getAssignedTo().getEmail(),
                    "Task Deadline Reminder",
                    body
            );
        }
    }
}