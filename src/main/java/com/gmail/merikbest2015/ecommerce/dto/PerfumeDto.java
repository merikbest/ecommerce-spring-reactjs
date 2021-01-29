package com.gmail.merikbest2015.ecommerce.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class PerfumeDto {

    private Long id;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeTitle;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumer;

    @NotNull(message = "Fill in the input field")
    private Integer year;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String country;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String perfumeGender;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceTopNotes;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceMiddleNotes;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String fragranceBaseNotes;
    private String description;
    private String filename;

    @NotNull(message = "Fill in the input field")
    private Integer price;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String volume;

    @NotBlank(message = "Fill in the input field")
    @Length(max = 255)
    private String type;
    private List<ReviewDto> reviews;
}
