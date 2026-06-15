package com.workforce.controller;

import com.workforce.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @GetMapping("/test")
    public String sendTestEmail() {

        emailService.sendEmail(
                "harshiyasaxena07@gmail.com",
                "Workforce Management Test",
                "Congratulations! Your email configuration is working."
        );

        return "Email Sent Successfully!";
    }
}