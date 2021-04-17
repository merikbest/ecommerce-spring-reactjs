package com.gmail.merikbest2015.ecommerce.dto.order;

import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class OrderItemResponseDto {

    @ApiModelProperty(position = 1, notes = "The database generated order item ID", example = "1")
    private Long id;

    @ApiModelProperty(position = 2, notes = "Amount", example = "100")
    private Long amount;

    @ApiModelProperty(position = 3, notes = "Perfume quantity", example = "1")
    private Long quantity;

    @ApiModelProperty(position = 4, notes = "Perfume")
    private PerfumeResponseDto perfume;
}
