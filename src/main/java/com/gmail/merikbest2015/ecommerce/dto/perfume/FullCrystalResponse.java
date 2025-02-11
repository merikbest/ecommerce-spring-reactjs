package com.gmail.merikbest2015.ecommerce.dto.perfume;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FullCrystalResponse extends CrystalSearchRequest {
    private String crystalsTitle;
    private String crystalGender;
    private String country;
    private String description;
    private String price;
    private String type;
    private MultipartFile filename;
    private int quantity;
    private int crystalsRating;

}


