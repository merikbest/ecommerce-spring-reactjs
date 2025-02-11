package com.gmail.merikbest2015.ecommerce.dto.perfume;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrystalResponse {
    private Long id;
    private String Title;
    private String crystal;
    private double price;
    private Double crystalRating;
    private String filename;
    private Integer reviewsCount;
    private int quantity;
}
