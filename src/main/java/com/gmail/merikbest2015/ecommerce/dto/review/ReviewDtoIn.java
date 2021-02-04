package com.gmail.merikbest2015.ecommerce.dto.review;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ReviewDtoIn {

    @NotBlank(message = "Fill in the input field")
    private String author;

    @NotBlank(message = "Fill in the input field")
    private String message;
}
