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
@Table(name = "witchcraft")
public class Witchcraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "witchcraft_title")
    private String witchcraftTitle;

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
    
    @Column(name = "witchcraft_rating")
    private Double witchcraftRating;

    @OneToMany
    @ToString.Exclude
    private List<Review> reviews;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Witchcraft witchcraft = (Witchcraft) o;
        return Objects.equals(id, witchcraft.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
