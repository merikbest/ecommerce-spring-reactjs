package com.gmail.merikbest2015.ecommerce.dto.order;

import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoOut;
import lombok.Data;

@Data
public class OrderItemDtoOut {
    private Long id;
    private Long amount;
    private Long quantity;
    private PerfumeDtoOut perfume;
}
