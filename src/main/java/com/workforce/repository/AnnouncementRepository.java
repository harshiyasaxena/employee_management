package com.workforce.repository;

import com.workforce.entity.Announcement;
import com.workforce.entity.AnnouncementTarget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository
        extends JpaRepository<Announcement, Long> {

    List<Announcement> findByTargetIn(
            List<AnnouncementTarget> targets
    );
}