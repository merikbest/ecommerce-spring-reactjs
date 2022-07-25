package com.gmail.merikbest2015.ecommerce.dto.perfume;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FullPerfumeResponse extends PerfumeResponse {
    private Integer year;
    private String country;
    private String perfumeGender;
    private String fragranceTopNotes;
    private String fragranceMiddleNotes;
    private String fragranceBaseNotes;
    private String description;
    private String type;
    private MultipartFile file;
}
