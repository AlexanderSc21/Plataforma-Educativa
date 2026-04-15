package com.edu.plataforma.repository;

import com.edu.plataforma.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
