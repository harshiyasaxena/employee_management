package com.workforce.service;

import com.workforce.dto.AnnouncementRequestDto;
import com.workforce.entity.Announcement;
import com.workforce.entity.AnnouncementTarget;
import com.workforce.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    @Override
    public Announcement createAnnouncement(AnnouncementRequestDto dto) {

        Announcement announcement = Announcement.builder()
                .title(dto.getTitle())
                .message(dto.getMessage())
                .target(dto.getTarget())
                .createdAt(LocalDateTime.now())
                .build();

        return announcementRepository.save(announcement);
    }

    @Override
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    @Override
    public List<Announcement> getAnnouncementsByRole(String role) {

        if (role.equalsIgnoreCase("EMPLOYEE")) {
            return announcementRepository.findByTargetIn(
                    List.of(
                            AnnouncementTarget.ALL,
                            AnnouncementTarget.EMPLOYEES
                    )
            );
        }

        if (role.equalsIgnoreCase("TEAM_LEAD")) {
            return announcementRepository.findByTargetIn(
                    List.of(
                            AnnouncementTarget.ALL,
                            AnnouncementTarget.TEAM_LEADS
                    )
            );
        }

        if (role.equalsIgnoreCase("MANAGER")) {
            return announcementRepository.findByTargetIn(
                    List.of(
                            AnnouncementTarget.ALL,
                            AnnouncementTarget.MANAGERS
                    )
            );
        }

        return List.of();
    }
}