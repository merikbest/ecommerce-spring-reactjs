package com.gmail.merikbest2015.ecommerce.dto.perfume;

import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponse;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PerfumeResponse {
    private Long id;
    private String perfumeTitle;
    private String perfumer;
    private Integer year;
    private String country;
    private String perfumeGender;
    private String fragranceTopNotes;
    private String fragranceMiddleNotes;
    private String fragranceBaseNotes;
    private String description;
    private String filename;
    private Integer price;
    private String volume;
    private String type;
    private Double perfumeRating;
    private List<ReviewResponse> reviews;
    private MultipartFile file;
}
