package com.gmail.merikbest2015.ecommerce.dto.perfume;

import lombok.Data;

import java.util.List;

@Data
public class CrystalSearchRequest {
    private List<String> crystals;
    private List<String> genders;
    private List<Integer> prices;
    private Boolean sortByPrice;
    private String crystal;
    private String crystalGender;
}
