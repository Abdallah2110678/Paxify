// src/main/java/com/example/backend/repositories/DoctorProfileRepo.java
package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {}
