package com.workforce.dto;

import com.workforce.entity.AnnouncementTarget;
import lombok.Data;

@Data
public class AnnouncementRequestDto {

    private String title;

    private String message;

    private AnnouncementTarget target;
}