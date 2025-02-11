package com.gmail.merikbest2015.ecommerce.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface CrystalProjection {
    Long getId();
    String getCrystalTitle();
    String getCrystal();
    Integer getPrice();
    String getFilename();
    Double getCrystalRating();
    
    @Value("#{target.reviews.size()}")
    Integer getReviewsCount();

    void setCrystal(String perfumer);
    void setCrystalGender(String perfumeGender);
    void setPrice(Integer price);
}
