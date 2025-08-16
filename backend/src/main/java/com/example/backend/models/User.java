package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "uk_users_email", columnNames = "email"))
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING, length = 20)
@Getter @Setter @NoArgsConstructor
public abstract class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 120)
    private String name;

    @Email @NotBlank
    @Column(nullable = false, length = 160)
    private String email;

    @JsonIgnore
    @NotBlank
    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 10)
    private String gender;

    // Shared nullable columns for subclasses (keeps a single table)
    @Column(length = 255)
    protected String description;   // used by Doctor

    @Column(length = 1000)
    protected String bio;           // used by Doctor

    @Column(length = 32)
    protected String phoneNumber;   // used by Patient

    @Column(length = 255)
    protected String address;       // used by Patient
}
