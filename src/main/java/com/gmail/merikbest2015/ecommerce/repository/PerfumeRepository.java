package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    List<Perfume> findAllByOrderByIdAsc();

    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);

    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender);

    List<Perfume> findByIdIn(List<Long> perfumesIds);

    @Query("SELECT perfume FROM Perfume perfume " +
            "WHERE (coalesce(:perfumers, null) IS NULL OR perfume.perfumer IN :perfumers) " +
            "AND (coalesce(:genders, null) IS NULL OR perfume.perfumeGender IN :genders) " +
            "AND (coalesce(:priceStart, null) IS NULL OR perfume.price BETWEEN :priceStart AND :priceEnd) " +
            "ORDER BY CASE WHEN :sortByPrice = true THEN perfume.price ELSE -perfume.price END ASC")
    List<Perfume> findPerfumesByFilterParams(
            List<String> perfumers, 
            List<String> genders, 
            Integer priceStart, 
            Integer priceEnd, 
            boolean sortByPrice);

    @Query("SELECT perfume FROM Perfume perfume " +
            "WHERE UPPER(perfume.perfumer) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY perfume.price DESC")
    List<Perfume> findByPerfumer(String text);

    @Query("SELECT perfume FROM Perfume perfume " +
            "WHERE UPPER(perfume.perfumeTitle) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY perfume.price DESC")
    List<Perfume> findByPerfumeTitle(String text);

    @Query("SELECT perfume FROM Perfume perfume " +
            "WHERE UPPER(perfume.country) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "ORDER BY perfume.price DESC")
    List<Perfume> findByManufacturerCountry(String text);
}
