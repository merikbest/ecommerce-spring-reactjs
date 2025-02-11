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
@Table(name = "onyx")
public class Onyx {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "onyx_title")
    private String onyxTitle;

    @Column(name = "country")
    private String country;

    @Column(name = "crystals_gender")
    private String crystalsGender;

    @Column(name = "description")
    private String description;
    
    @Column(name = "filename")
    private String filename;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "quantity")
    private int quantity;
    
    @Column(name = "onyx_rating")
    private Double onyxRating;

    @OneToMany
    @ToString.Exclude
    private List<Review> reviews;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Onyx onyx = (Onyx) o;
        return Objects.equals(id, onyx.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
