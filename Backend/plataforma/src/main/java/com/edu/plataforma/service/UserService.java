package com.edu.plataforma.service;

import com.edu.plataforma.model.Certificate;
import com.edu.plataforma.model.Progress;
import com.edu.plataforma.model.User;
import com.edu.plataforma.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<Certificate> getCertificatesByUser(Long id) {
        return userRepository.findById(id).map(User::getCertificates).orElse(null);
    }

    public List<Progress> getProgressByUser(Long id) {
        return userRepository.findById(id).map(User::getProgresses).orElse(null);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User update(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setName(userDetails.getName());
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
