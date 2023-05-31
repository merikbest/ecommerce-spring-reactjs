package com.gmail.merikbest2015.ecommerce.dto.review;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.FILL_IN_THE_INPUT_FIELD;

@Data
public class ReviewRequest {

    private Long perfumeId;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    private String author;

    @NotBlank(message = FILL_IN_THE_INPUT_FIELD)
    private String message;

    @NotNull(message = "Choose perfume rating")
    private Integer rating;
}
