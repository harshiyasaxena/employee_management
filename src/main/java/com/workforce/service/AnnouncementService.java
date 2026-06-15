package com.workforce.service;

import com.workforce.dto.AnnouncementRequestDto;
import com.workforce.entity.Announcement;

import java.util.List;

public interface AnnouncementService {

    Announcement createAnnouncement(AnnouncementRequestDto dto);

    List<Announcement> getAllAnnouncements();

    List<Announcement> getAnnouncementsByRole(String role);
}