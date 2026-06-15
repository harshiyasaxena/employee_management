package com.workforce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import com.workforce.entity.AnnouncementTarget;

@Entity
@Table(name = "announcements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String message;

    @Enumerated(EnumType.STRING)
    private AnnouncementTarget target;

    private LocalDateTime createdAt;
}