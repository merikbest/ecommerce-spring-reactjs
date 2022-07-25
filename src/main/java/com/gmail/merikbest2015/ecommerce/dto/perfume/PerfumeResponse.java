package com.gmail.merikbest2015.ecommerce.dto.perfume;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfumeResponse {
    private Long id;
    private String perfumeTitle;
    private String perfumer;
    private Integer price;
    private Double perfumeRating;
    private String filename;
    private Integer reviewsCount;
    private String volume;
}
