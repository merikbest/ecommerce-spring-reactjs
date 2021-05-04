package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    List<Perfume> findAllByOrderByIdAsc();

    List<Perfume> findByPerfumerIn(List<String> perfumers);

    List<Perfume> findByPerfumeGenderIn(List<String> genders);

    List<Perfume> findByPriceBetween(Integer startingPrice, Integer endingPrice);

    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);

    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender);

    List<Perfume> findByIdIn(List<Long> perfumesIds);
}
