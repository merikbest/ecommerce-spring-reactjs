package com.gmail.merikbest2015.ecommerce.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface PerfumeProjection {
    Long getId();
    String getPerfumeTitle();
    String getPerfumer();
    Integer getPrice();
    String getFilename();
    Double getPerfumeRating();
    
    @Value("#{target.reviews.size()}")
    Integer getReviewsCount();
}
