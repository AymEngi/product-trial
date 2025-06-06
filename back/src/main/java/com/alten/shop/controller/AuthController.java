package com.alten.shop.controller;

import com.alten.shop.dto.AuthRequest;
import com.alten.shop.dto.RegisterRequest;
import com.alten.shop.model.User;
import com.alten.shop.repository.UserRepository;
import com.alten.shop.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepo;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/account")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        User user = User.builder()
                .username(req.getUsername())
                .firstname(req.getFirstname())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .build();
        userRepo.save(user);
        return ResponseEntity.ok("Account created");
    }

    @PostMapping("/token")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        return userRepo.findByEmail(req.getEmail()).map(user -> {
            if (encoder.matches(req.getPassword(), user.getPassword())) {
                String token = jwtService.generateToken(user);
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(403).body("Invalid credentials");
            }
        }).orElse(ResponseEntity.status(403).body("User not found"));
    }
}
