package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PerfumeService {

    Perfume findPerfumeById(Long perfumeId);

    List<Perfume> findAllPerfumes();

    List<Perfume> filter(List<String> perfumers, List<String> genders, List<Integer> prices);

    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);

    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender);

    Perfume savePerfume(Perfume perfume, MultipartFile file);
}
