package com.gmail.merikbest2015.ecommerce.dto.review;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReviewResponse {
    private Long id;
    private String author;
    private String message;
    private Integer rating;
    private LocalDate date;
}
