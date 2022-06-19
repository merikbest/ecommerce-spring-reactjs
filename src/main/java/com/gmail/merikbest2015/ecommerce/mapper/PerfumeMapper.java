package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.*;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponse;
import com.gmail.merikbest2015.ecommerce.enums.SearchPerfume;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.repository.projection.PerfumeProjection;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PerfumeMapper {

    private final CommonMapper commonMapper;
    private final PerfumeService perfumeService;

    PerfumeHeaderResponse getPerfumesHeaderResponse(List<PerfumeProjection> perfumes, Integer totalPages, Long totalElements) {
        List<PerfumeResponse> perfumeResponses = commonMapper.convertToResponseList(perfumes, PerfumeResponse.class);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        responseHeaders.add("page-total-elements", String.valueOf(totalElements));
        return new PerfumeHeaderResponse(perfumeResponses, responseHeaders);
    }

    public FullPerfumeResponse getPerfumeById(Long perfumeId) {
        return commonMapper.convertToResponse(perfumeService.getPerfumeById(perfumeId), FullPerfumeResponse.class);
    }

    public List<ReviewResponse> getReviewsByPerfumeId(Long perfumeId) {
        return commonMapper.convertToResponseList(perfumeService.getReviewsByPerfumeId(perfumeId), ReviewResponse.class);
    }

    public List<PerfumeResponse> getPerfumesByIds(List<Long> perfumesId) {
        return commonMapper.convertToResponseList(perfumeService.getPerfumesByIds(perfumesId), PerfumeResponse.class);
    }

    public PerfumeHeaderResponse getAllPerfumes(Pageable pageable) {
        Page<PerfumeProjection> perfumes = perfumeService.getAllPerfumes(pageable);
        return getPerfumesHeaderResponse(perfumes.getContent(), perfumes.getTotalPages(), perfumes.getTotalElements());
    }

    public PerfumeHeaderResponse findPerfumesByFilterParams(PerfumeSearchRequest filter, Pageable pageable) {
        Page<PerfumeProjection> perfumes = perfumeService.findPerfumesByFilterParams(filter.getPerfumers(), filter.getGenders(), 
                filter.getPrices(), filter.isSortByPrice(), pageable);
        return getPerfumesHeaderResponse(perfumes.getContent(), perfumes.getTotalPages(), perfumes.getTotalElements());
    }

    public List<PerfumeResponse> findByPerfumer(String perfumer) {
        return commonMapper.convertToResponseList(perfumeService.findByPerfumer(perfumer), PerfumeResponse.class);
    }

    public List<PerfumeResponse> findByPerfumeGender(String perfumeGender) {
        return commonMapper.convertToResponseList(perfumeService.findByPerfumeGender(perfumeGender), PerfumeResponse.class);
    }
    
    public PerfumeHeaderResponse findByInputText(SearchPerfume searchType, String text, Pageable pageable) {
        Page<PerfumeProjection> perfumes = perfumeService.findByInputText(searchType, text, pageable);
        return getPerfumesHeaderResponse(perfumes.getContent(), perfumes.getTotalPages(), perfumes.getTotalElements());
    }

    public FullPerfumeResponse savePerfume(PerfumeRequest perfumeRequest, MultipartFile file, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Perfume perfume = commonMapper.convertToEntity(perfumeRequest, Perfume.class);
        return commonMapper.convertToResponse(perfumeService.savePerfume(perfume, file), FullPerfumeResponse.class);
    }

    public String deletePerfume(Long perfumeId) {
        return perfumeService.deletePerfume(perfumeId);
    }
}
