package com.gmail.merikbest2015.ecommerce.dto.perfume;

import lombok.Data;

import java.util.List;

@Data
public class PerfumeSearchFilterDto {
    private List<Integer> prices;
    private List<String> perfumers;
    private List<String> genders;
    private String perfumeGender;
    private String perfumer;
}
