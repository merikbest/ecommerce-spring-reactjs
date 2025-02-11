package com.gmail.merikbest2015.ecommerce.mapper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import com.gmail.merikbest2015.ecommerce.domain.Crystal;
import com.gmail.merikbest2015.ecommerce.dto.HeaderResponse;
import com.gmail.merikbest2015.ecommerce.dto.perfume.CrystalRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.CrystalResponse;
import com.gmail.merikbest2015.ecommerce.dto.perfume.CrystalSearchRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.FullCrystalResponse;
import com.gmail.merikbest2015.ecommerce.enums.SearchCrystal;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.repository.projection.CrystalProjection;
import com.gmail.merikbest2015.ecommerce.service.CrystalService;
import com.gmail.merikbest2015.ecommerce.service.CrystalServiceImpl;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;

import lombok.RequiredArgsConstructor;

@Component
public class CrystalMapper {

	
    private   CommonMapper commonMapper;
    
//    @Autowired
    private  CrystalService crystalService;

    public FullCrystalResponse getCrystalById(Long CrystalId) {
        return commonMapper.convertToResponse(crystalService.getCrystalById(CrystalId), FullCrystalResponse.class);
    }

    public List<CrystalResponse> getCrystalsByIds(List<Long> CrystalsId) {
        return commonMapper.convertToResponseList(crystalService.getCrystalsByIds(CrystalsId), CrystalResponse.class);
    }

    public HeaderResponse<CrystalResponse> getAllCrystals(Pageable pageable) {
        Page<Crystal> Crystals = crystalService.getAllCrystals(pageable);
        return commonMapper.getHeaderResponse(Crystals.getContent(), Crystals.getTotalPages(), Crystals.getTotalElements(), CrystalResponse.class);
    }

    public HeaderResponse<CrystalResponse> findCrystalsByFilterParams(CrystalSearchRequest filter, Pageable pageable) {
        Page<CrystalProjection> Crystals = crystalService.findCrystalsByFilterParams(filter, pageable);
        return commonMapper.getHeaderResponse(Crystals.getContent(), Crystals.getTotalPages(), Crystals.getTotalElements(), CrystalResponse.class);
    }

    public List<CrystalResponse> findByCrystalr(String Crystalr) {
        return commonMapper.convertToResponseList(crystalService.findByCrystal(Crystalr), CrystalResponse.class);
    }

    public List<CrystalResponse> findByCrystalGender(String CrystalGender) {
        return commonMapper.convertToResponseList(crystalService.findByCrystalGender(CrystalGender), CrystalResponse.class);
    }
    
    public HeaderResponse<CrystalResponse> findByInputText(SearchCrystal searchType, String text, Pageable pageable) {
        Page<CrystalProjection> Crystals = crystalService.findByInputText(searchType, text, pageable);
        return commonMapper.getHeaderResponse(Crystals.getContent(), Crystals.getTotalPages(), Crystals.getTotalElements(), CrystalResponse.class);
    }

    public FullCrystalResponse saveCrystal(CrystalRequest crystalRequest, MultipartFile file, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Crystal Crystal = commonMapper.convertToEntity(crystalRequest, Crystal.class);
        return commonMapper.convertToResponse(crystalService.saveCrystal(Crystal, file), FullCrystalResponse.class);
    }

    public String deleteCrystal(Long CrystalId) {
        return crystalService.deleteCrystal(CrystalId);
    }

    public CrystalMapper() {
    	crystalService = new CrystalServiceImpl();
    	System.out.println(crystalService);
	}
	public CrystalMapper(CommonMapper commonMapper, CrystalService crystalService) {
		super();
		this.commonMapper = commonMapper;
		this.crystalService = crystalService;
	}
	
	

	
    
	
	
    
    
}
