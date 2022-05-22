package com.gmail.merikbest2015.ecommerce.dto.order;

import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemResponse {
    private Long id;
    private Long amount;
    private Long quantity;
    private PerfumeResponse perfume;
}
