package com.soap.ecommerce.dto.order;

import com.soap.ecommerce.dto.perfume.PerfumeResponseDto;
import lombok.Data;

@Data
public class OrderItemResponseDto {
    private Long id;
    private Long amount;
    private Long quantity;
    private PerfumeResponseDto perfume;
}
