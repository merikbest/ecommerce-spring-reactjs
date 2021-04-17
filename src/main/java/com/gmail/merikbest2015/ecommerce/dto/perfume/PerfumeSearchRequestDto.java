package com.gmail.merikbest2015.ecommerce.dto.perfume;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(value = "Perfume Search Request")
public class PerfumeSearchRequestDto {

    @ApiModelProperty(example = "[\"Dior\"]", position = 1)
    private List<String> perfumers;

    @ApiModelProperty(example = "[\"male\"]", position = 2)
    private List<String> genders;

    @ApiModelProperty(example = "[\"1\", \"200\"]", position = 3)
    private List<Integer> prices;

    @ApiModelProperty(example = "Dior", position = 4)
    private String perfumer;

    @ApiModelProperty(example = "male", position = 5)
    private String perfumeGender;
}
