package com.gmail.merikbest2015.ecommerce.dto.review;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel(value = "Review Response")
public class ReviewResponseDto {

    @ApiModelProperty(notes = "The database generated review ID", example = "1", position = 1)
    private Long id;

    @ApiModelProperty(notes = "Review author", example = "John Doe", position = 2)
    private String author;

    @ApiModelProperty(notes = "Review message", example = "Message", position = 3)
    private String message;

    @ApiModelProperty(notes = "Review date", example = "2020 04 04", position = 4)
    private LocalDate date;
}
