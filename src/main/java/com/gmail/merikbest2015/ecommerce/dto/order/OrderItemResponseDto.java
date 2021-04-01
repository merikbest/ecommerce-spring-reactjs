package com.gmail.merikbest2015.ecommerce.dto.order;

import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import lombok.Data;

@Data
public class OrderItemResponseDto {
    private Long id;
    private Long amount;
    private Long quantity;
    private PerfumeResponseDto perfume;
}
