package com.gmail.merikbest2015.ecommerce.dto.perfume;

import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponseDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@ApiModel(value = "Perfume Response")
public class PerfumeResponseDto {

    @ApiModelProperty(position = 1, notes = "The database generated product ID", example = "43")
    private Long id;

    @ApiModelProperty(position = 2, notes = "Perfume Title", example = "Sauvage")
    private String perfumeTitle;

    @ApiModelProperty(position = 3, notes = "Perfume Brand", example = "Dior")
    private String perfumer;

    @ApiModelProperty(position = 4, notes = "Production start year", example = "2015")
    private Integer year;

    @ApiModelProperty(position = 5, notes = "Manufacturer country", example = "France")
    private String country;

    @ApiModelProperty(position = 6, notes = "Perfume Gender", example = "male")
    private String perfumeGender;

    @ApiModelProperty(position = 7, notes = "Fragrance Top Notes", example = "Sichuan Pepper")
    private String fragranceTopNotes;

    @ApiModelProperty(position = 8, notes = "Fragrance Middle Notes", example = "Bergamot")
    private String fragranceMiddleNotes;

    @ApiModelProperty(position = 9, notes = "Fragrance Base Notes", example = "Ambroxan")
    private String fragranceBaseNotes;

    @ApiModelProperty(position = 10, notes = "Perfume description")
    private String description;

    @ApiModelProperty(position = 11, notes = "Filename in database", example = "Dior Sauvage.jpg")
    private String filename;

    @ApiModelProperty(position = 12, notes = "Perfume price", example = "62")
    private Integer price;

    @ApiModelProperty(position = 13, notes = "Perfume volume", example = "100")
    private String volume;

    @ApiModelProperty(position = 14, notes = "Perfume type", example = "Eau de parfum")
    private String type;

    @ApiModelProperty(position = 15, notes = "List of Perfume reviews")
    private List<ReviewResponseDto> reviews;

    @ApiModelProperty(position = 16)
    private MultipartFile file;
}
