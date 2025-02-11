package com.gmail.merikbest2015.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gmail.merikbest2015.ecommerce.domain.Crystal;
import com.gmail.merikbest2015.ecommerce.dto.perfume.CrystalSearchRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchCrystal;
import com.gmail.merikbest2015.ecommerce.mapper.CrystalMapper;
import com.gmail.merikbest2015.ecommerce.repository.CrystalRepository;
import com.gmail.merikbest2015.ecommerce.repository.projection.CrystalProjection;

import graphql.schema.DataFetcher;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CrystalServiceImpl implements CrystalService {

	@Autowired
	CrystalRepository repository;
	
	
	
	@Override
	public Crystal getCrystalById(Long perfumeId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Crystal> getAllCrystals(Pageable pageable) {
	
		return repository.findAll(pageable);
	}

	@Override
	public List<CrystalProjection> getCrystalsByIds(List<Long> crystalsId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<CrystalProjection> findCrystalsByFilterParams(CrystalSearchRequest filter, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Crystal> findByCrystal(String perfumer) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Crystal> findByPerfumeGender(String crystalGender) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Crystal saveCrystal(Crystal Crystal, MultipartFile file) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteCrystal(Long crystalId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataFetcher<Crystal> getCrystalByQuery() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataFetcher<List<CrystalProjection>> getAllCrystalsByQuery() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataFetcher<List<Crystal>> getAllCrystalsByIdsQuery() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List findByCrystalGender(String crystalGender) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<CrystalProjection> findByInputText(SearchCrystal searchType, String text, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

}
