package com.alten.shop.service;

import com.alten.shop.model.User;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    private final SecretKey key = Jwts.SIG.HS256.key().build();

    public String generateToken(User user) {
        return Jwts.builder().subject(user.getEmail())
                .claim("username", user.getUsername())
                .claim("firstname", user.getFirstname())
                .claim("isAdmin", user.getEmail().equals("admin@admin.com"))
                .issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }

}