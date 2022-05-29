package com.gmail.merikbest2015.ecommerce.dto.review;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ReviewRequest {

    private Long perfumeId;

    @NotBlank(message = "Fill in the input field")
    private String author;

    @NotBlank(message = "Fill in the input field")
    private String message;

    @NotNull(message = "Choose perfume rating")
    private Integer rating;
}
