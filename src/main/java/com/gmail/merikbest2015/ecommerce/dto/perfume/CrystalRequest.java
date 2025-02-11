package com.gmail.merikbest2015.ecommerce.dto.perfume;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class CrystalRequest {

    private Long id;


    @Length(max = 255)
    private String crystalTitle;

    @Length(max = 255)
    private String country;


    @Length(max = 255)
    private String cristalGender;

    @Length(max = 255)
    private String description;
    
    private String filename;
    
    private double price;
    
    private int quantity;

}
