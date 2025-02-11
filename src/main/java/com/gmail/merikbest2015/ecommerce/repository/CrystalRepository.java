package com.gmail.merikbest2015.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.gmail.merikbest2015.ecommerce.domain.Crystal;

@Repository
public interface CrystalRepository extends JpaRepository<Crystal, Long>{

}
