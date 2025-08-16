package com.example.backend.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("DOCTOR")
@Getter @Setter @NoArgsConstructor
public class Doctor extends User {
    // uses: description, bio
}
