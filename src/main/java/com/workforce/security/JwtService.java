package com.workforce.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import io.jsonwebtoken.Claims;

@Service
public class JwtService {

        private static final String SECRET_KEY = "mySecretKeyForJwtAuthenticationWorkforceManagement2026";

        private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        public String generateToken(String email, String role) {

    return Jwts.builder()
            .subject(email)
            .claim("role", role)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(key)
            .compact();
}

        public String extractEmail(String token) {

                Claims claims = Jwts.parser()
                                .verifyWith(key)
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();

                return claims.getSubject();
        }

        public boolean validateToken(String token) {

                try {

                        Jwts.parser()
                                        .verifyWith(key)
                                        .build()
                                        .parseSignedClaims(token);

                        return true;

                } catch (Exception e) {

                        return false;
                }
        }
        public String extractRole(String token) {

    Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();

    return claims.get("role", String.class);
}
}