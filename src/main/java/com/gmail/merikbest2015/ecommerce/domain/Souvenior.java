package com.gmail.merikbest2015.ecommerce.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Table(name = "souvenior")
public class Souvenior {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "souvenior_title")
    private String souveniorTitle;

    @Column(name = "year")
    private Integer year;
    
    @Column(name = "country")
    private String country;

    @Column(name = "souvenior_gender")
    private String souveniorGender;

    @Column(name = "fragrance_top_notes")
    private String fragranceTopNotes;

    @Column(name = "fragrance_middle_notes")
    private String fragranceMiddleNotes;
    
    @Column(name = "fragrance_base_notes")
    private String fragranceBaseNotes;

    @Column(name = "description")
    private String description;
    
    @Column(name = "filename")
    private String filename;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "volume")
    private String volume;
    
    @Column(name = "type")
    private String type;
    
    @Column(name = "souvenior_rating")
    private Double souveniorRating;

    @OneToMany
    @ToString.Exclude
    private List<Review> reviews;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Souvenior souvenior = (Souvenior) o;
        return Objects.equals(id, souvenior.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
