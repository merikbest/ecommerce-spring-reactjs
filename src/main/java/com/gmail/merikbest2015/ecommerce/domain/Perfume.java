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
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeTitle;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumer;

    @NotNull(message = "Fill in the input field")
    private Integer year;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String country;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeGender;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceTopNotes;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceMiddleNotes;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceBaseNotes;
    private String description;
    private String filename;

    @NotNull(message = "Fill in the input field")
    private Integer price;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String volume;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String type;

    @OneToMany
    private List<Review> reviews;
}
