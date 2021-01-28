package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    List<Perfume> findByPerfumerInAndPerfumeGenderInOrderByPriceDesc(List<String> perfumers, List<String> genders);

    List<Perfume> findByPerfumerInOrPerfumeGenderInOrderByPriceDesc(List<String> perfumers, List<String> genders);

    List<Perfume> findByPriceBetweenOrderByPriceDesc(Integer startingPrice, Integer endingPrice);

    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);

    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender);

    @Modifying
    @Transactional
    @Query("update Perfume p set p.perfumeTitle = ?1, p.perfumer = ?2, p.year = ?3, p.country = ?4, " +
            "p.perfumeGender = ?5, p.fragranceTopNotes = ?6, p.fragranceMiddleNotes = ?7, p.fragranceBaseNotes = ?8," +
            "p.description = ?9, p.filename = ?10, p.price = ?11, p.volume = ?12, p.type = ?13  where p.id = ?14")
    void saveProductInfoById(String perfumeTitle, String perfumer, Integer year, String country, String perfumeGender,
                             String fragranceTopNotes, String fragranceMiddleNotes, String fragranceBaseNotes, String description,
                             String filename, Integer price, String volume, String type, Long id);
}
