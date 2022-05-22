package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponse;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.FullPerfumeResponse;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponse;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PerfumeMapper {

    private final CommonMapper commonMapper;
    private final PerfumeService perfumeService;

    public FullPerfumeResponse findPerfumeById(Long perfumeId) {
        return commonMapper.convertToResponse(perfumeService.findPerfumeById(perfumeId), FullPerfumeResponse.class);
    }

    public List<ReviewResponse> getReviewsByPerfumeId(Long perfumeId) {
        return commonMapper.convertToResponseList(perfumeService.getReviewsByPerfumeId(perfumeId), ReviewResponse.class);
    }

    public List<PerfumeResponse> findPerfumesByIds(List<Long> perfumesId) {
        return commonMapper.convertToResponseList(perfumeService.findPerfumesByIds(perfumesId), PerfumeResponse.class);
    }

    public List<PerfumeResponse> findAllPerfumes() {
        return commonMapper.convertToResponseList(perfumeService.findAllPerfumes(), PerfumeResponse.class);
    }

    public List<PerfumeResponse> filter(List<String> perfumers, List<String> genders, List<Integer> prices, boolean sortByPrice) {
        List<Perfume> perfumeList = perfumeService.filter(perfumers, genders, prices, sortByPrice);
        return commonMapper.convertToResponseList(perfumeList, PerfumeResponse.class);
    }

    public List<PerfumeResponse> findByPerfumer(String perfumer) {
        return commonMapper.convertToResponseList(perfumeService.findByPerfumer(perfumer), PerfumeResponse.class);
    }

    public List<PerfumeResponse> findByPerfumeGender(String perfumeGender) {
        return commonMapper.convertToResponseList(perfumeService.findByPerfumeGender(perfumeGender), PerfumeResponse.class);
    }

    public FullPerfumeResponse savePerfume(PerfumeRequest perfumeRequest, MultipartFile file, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Perfume perfume = commonMapper.convertToEntity(perfumeRequest, Perfume.class);
        return commonMapper.convertToResponse(perfumeService.savePerfume(perfume, file), FullPerfumeResponse.class);
    }

    public List<PerfumeResponse> deleteOrder(Long perfumeId) {
        return commonMapper.convertToResponseList(perfumeService.deletePerfume(perfumeId), PerfumeResponse.class);
    }
}
