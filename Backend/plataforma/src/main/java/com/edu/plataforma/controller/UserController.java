package com.edu.plataforma.controller;

import com.edu.plataforma.model.Certificate;
import com.edu.plataforma.model.Progress;
import com.edu.plataforma.model.User;
import com.edu.plataforma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/certificates")
    public ResponseEntity<List<Certificate>> getCertificatesByUser(@PathVariable Long id) {
        List<Certificate> certificates = userService.getCertificatesByUser(id);
        return certificates != null ? ResponseEntity.ok(certificates) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<List<Progress>> getProgressByUser(@PathVariable Long id) {
        List<Progress> progresses = userService.getProgressByUser(id);
        return progresses != null ? ResponseEntity.ok(progresses) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userService.update(id, userDetails);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}