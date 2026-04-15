    package com.edu.plataforma.model;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.List;

    @Entity
    @Table(name = "users")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(unique = true, nullable = false)
        private String email;

        @Column(nullable = false)
        private String password;

        private String name;

        private String role;

        @OneToMany(mappedBy = "user")
        private List<Progress> progresses;

        // NUEVA RELACIÓN: Para ver sus diplomas obtenidos
        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
        private List<Certificate> certificates;
    }