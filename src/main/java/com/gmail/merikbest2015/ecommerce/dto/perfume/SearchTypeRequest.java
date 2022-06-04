package com.gmail.merikbest2015.ecommerce.dto.perfume;

import com.gmail.merikbest2015.ecommerce.enums.SearchPerfume;
import lombok.Data;

@Data
public class SearchTypeRequest {
    private SearchPerfume searchType;
    private String text;
}
