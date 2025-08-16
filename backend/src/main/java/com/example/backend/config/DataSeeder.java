package com.example.backend.config;

import com.example.backend.models.Doctor;
import com.example.backend.models.Patient;
import com.example.backend.repositories.DoctorRepo;
import com.example.backend.repositories.PatientRepo;
import com.example.backend.repositories.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(UserRepo users, DoctorRepo doctors, PatientRepo patients, PasswordEncoder encoder) {
        return args -> {
            if (users.existsByEmail("doc@site.com")) return;

            Doctor d = new Doctor();
            d.setName("Dr House");
            d.setEmail("doc@site.com");
            d.setPassword(encoder.encode("Doc@123"));
            d.setGender("male");
            d.setDescription("Internal medicine");
            d.setBio("Diagnostic specialist.");
            doctors.save(d);

            Patient p = new Patient();
            p.setName("Jane Doe");
            p.setEmail("patient@site.com");
            p.setPassword(encoder.encode("Patient@123"));
            p.setGender("female");
            p.setPhoneNumber("01001234567");
            p.setAddress("Nasr City, Cairo");
            patients.save(p);
        };
    }
}
