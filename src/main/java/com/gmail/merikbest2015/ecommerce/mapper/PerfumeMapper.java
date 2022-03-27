package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponse;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PerfumeMapper {

    private final CommonMapper commonMapper;
    private final PerfumeService perfumeService;

    public PerfumeResponse findPerfumeById(Long perfumeId) {
        return commonMapper.convertToResponse(perfumeService.findPerfumeById(perfumeId), PerfumeResponse.class);
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

    public List<PerfumeResponse> findByPerfumerOrderByPriceDesc(String perfumer) {
        return commonMapper.convertToResponseList(perfumeService.findByPerfumerOrderByPriceDesc(perfumer), PerfumeResponse.class);
    }

    public List<PerfumeResponse> findByPerfumeGenderOrderByPriceDesc(String perfumeGender) {
        return commonMapper.convertToResponseList(perfumeService.findByPerfumeGenderOrderByPriceDesc(perfumeGender), PerfumeResponse.class);
    }

    public PerfumeResponse savePerfume(PerfumeRequest perfumeRequest, MultipartFile file, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Perfume perfume = commonMapper.convertToEntity(perfumeRequest, Perfume.class);
        return commonMapper.convertToResponse(perfumeService.savePerfume(perfume, file), PerfumeResponse.class);
    }

    public List<PerfumeResponse> deleteOrder(Long perfumeId) {
        return commonMapper.convertToResponseList(perfumeService.deletePerfume(perfumeId), PerfumeResponse.class);
    }
}
