package com.gmail.merikbest2015.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@Table(name = "perfume")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String perfumeTitle;
    private String perfumer;
    private Integer year;
    private String country;
    private String perfumeGender;
    private String fragranceTopNotes;
    private String fragranceMiddleNotes;
    private String fragranceBaseNotes;
    private String description;
    private String filename;
    private Integer price;
    private String volume;
    private String type;

    @OneToMany
    private List<Review> reviews;
}
