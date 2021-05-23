package com.soap.ecommerce.dto.perfume;

import lombok.Data;

import java.util.List;

@Data
public class PerfumeSearchRequestDto {
    private List<String> perfumers;
    private List<String> genders;
    private List<Integer> prices;
    private boolean sortByPrice;
    private String perfumer;
    private String perfumeGender;
}
