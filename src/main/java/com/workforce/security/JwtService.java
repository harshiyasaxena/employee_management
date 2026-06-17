package com.workforce.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService {

        @Value("${jwt.secret}")
        private String secretKey;

private SecretKey getKey() {
    return Keys.hmacShaKeyFor(
            secretKey.getBytes(StandardCharsets.UTF_8)
    );
}

        public String generateToken(String email, String role) {

                return Jwts.builder()
                                .subject(email)
                                .claim("role", role)
                                .issuedAt(new Date())
                                .expiration(new Date(System.currentTimeMillis() + 86400000))
                                .signWith(getKey())
                                .compact();
        }

        public String extractEmail(String token) {

                Claims claims = Jwts.parser()
                                .verifyWith(getKey())
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();

                return claims.getSubject();
        }

        public boolean validateToken(String token) {

                try {

                        Jwts.parser()
                                        .verifyWith(getKey())
                                        .build()
                                        .parseSignedClaims(token);

                        return true;

                } catch (Exception e) {

                        return false;
                }
        }

        public String extractRole(String token) {

                Claims claims = Jwts.parser()
                                .verifyWith(getKey())
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();

                return claims.get("role", String.class);
        }
}