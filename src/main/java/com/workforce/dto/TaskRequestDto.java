package com.workforce.dto;

import com.workforce.entity.TaskPriority;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TaskRequestDto {

    private String title;
    private String description;
    private TaskPriority priority;
    private LocalDate deadline;

    private Long assignedById;

    private boolean assignToAll;

    private Long assignedToId;

    private List<Long> assignedToIds;
}