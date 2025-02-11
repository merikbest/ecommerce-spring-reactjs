package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Crystal;
import com.gmail.merikbest2015.ecommerce.dto.perfume.CrystalSearchRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchCrystal;
import com.gmail.merikbest2015.ecommerce.enums.SearchPerfume;
import com.gmail.merikbest2015.ecommerce.repository.projection.CrystalProjection;
import graphql.schema.DataFetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CrystalService {

    Crystal getCrystalById(Long perfumeId);

    Page<Crystal> getAllCrystals(Pageable pageable);

    List<CrystalProjection> getCrystalsByIds(List<Long> crystalsId);

    Page<CrystalProjection> findCrystalsByFilterParams(CrystalSearchRequest filter, Pageable pageable);

    List<Crystal> findByCrystal(String perfumer);

    List<Crystal> findByPerfumeGender(String crystalGender);
    
//    Page<CrystalProjection> findByInCrystal(SearchCrystal searchType, String text, Pageable pageable);

    Crystal saveCrystal(Crystal Crystal, MultipartFile file);

    String deleteCrystal(Long crystalId);

    DataFetcher<Crystal> getCrystalByQuery();

    DataFetcher<List<CrystalProjection>> getAllCrystalsByQuery();

    DataFetcher<List<Crystal>> getAllCrystalsByIdsQuery();

	List findByCrystalGender(String crystalGender);

	Page<CrystalProjection> findByInputText(SearchCrystal searchType, String text, Pageable pageable);
}
