package com.workforce.controller;

import com.workforce.dto.AnnouncementRequestDto;
import com.workforce.entity.Announcement;
import com.workforce.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @PostMapping
    public Announcement createAnnouncement(
            @RequestBody AnnouncementRequestDto dto) {

        return announcementService.createAnnouncement(dto);
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {

        return announcementService.getAllAnnouncements();
    }

    @GetMapping("/role/{role}")
    public List<Announcement> getAnnouncementsByRole(
            @PathVariable String role) {

        return announcementService.getAnnouncementsByRole(role);
    }
}