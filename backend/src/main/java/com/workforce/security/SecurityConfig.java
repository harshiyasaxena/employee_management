package com.workforce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http
                                .cors(Customizer.withDefaults())
                                .csrf(csrf -> csrf.disable())

                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                .authorizeHttpRequests(auth -> auth

                                                .requestMatchers("/api/auth/**")
                                                .permitAll()

                                                // Employee self-service endpoints
                                                .requestMatchers(
                                                                "/api/employees/profile",
                                                                "/api/tasks/my",
                                                                "/api/tasks/my/stats",
                                                                "/api/attendance/my",
                                                                "/api/attendance/checkin/**",
                                                                "/api/attendance/checkout/**",
                                                                "/api/attendance/leave/**")
                                                .authenticated()

                                                // Manager-only endpoints
                                                .requestMatchers("/api/dashboard/**")
                                                .hasRole("MANAGER")

                                                .requestMatchers(
                                                                "/api/employees",
                                                                "/api/employees/*")
                                                .hasRole("MANAGER")

                                                .requestMatchers(
                                                                "/api/tasks",
                                                                "/api/tasks/*")
                                                .hasRole("MANAGER")

                                                .requestMatchers("/api/announcements")
                                                .hasRole("MANAGER")

                                                .anyRequest()
                                                .authenticated())

                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class)

                                .httpBasic(Customizer.withDefaults());

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOriginPatterns(
                                List.of(
                                                "http://localhost:5173",
                                                "https://*.vercel.app"));

                configuration.setAllowedMethods(
                                List.of(
                                                "GET",
                                                "POST",
                                                "PUT",
                                                "DELETE",
                                                "OPTIONS"));

                configuration.setAllowedHeaders(
                                List.of("*"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration(
                                "/**",
                                configuration);

                return source;
        }
}