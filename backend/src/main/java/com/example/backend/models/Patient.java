package com.example.backend.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("PATIENT")
@Getter @Setter @NoArgsConstructor
public class Patient extends User {
    // uses: phoneNumber, address
}
