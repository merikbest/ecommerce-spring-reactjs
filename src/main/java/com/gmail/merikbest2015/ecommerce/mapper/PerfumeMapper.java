package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoOut;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PerfumeMapper {

    private final ModelMapper modelMapper;
    private final PerfumeService perfumeService;

    private Perfume convertToEntity(PerfumeDtoIn perfumeDto) {
        return modelMapper.map(perfumeDto, Perfume.class);
    }

    private PerfumeDtoIn convertToDtoIn(Perfume perfume) {
        return modelMapper.map(perfume, PerfumeDtoIn.class);
    }

    private PerfumeDtoOut convertToDtoOut(Perfume perfume) {
        return modelMapper.map(perfume, PerfumeDtoOut.class);
    }

    List<PerfumeDtoOut> convertListToDtoOut(List<Perfume> perfumes) {
        return perfumes.stream()
                .map(this::convertToDtoOut)
                .collect(Collectors.toList());
    }

    public PerfumeDtoOut findPerfumeById(Long perfumeId) {
        return convertToDtoOut(perfumeService.findPerfumeById(perfumeId));
    }

    public List<PerfumeDtoOut> findAllPerfumes() {
        return convertListToDtoOut(perfumeService.findAllPerfumes());
    }

    public List<PerfumeDtoOut> filter(List<String> perfumers, List<String> genders, List<Integer> prices) {
        return convertListToDtoOut(perfumeService.filter(perfumers, genders, prices));
    }

    public List<PerfumeDtoOut> findByPerfumerOrderByPriceDesc(String perfumer) {
        return convertListToDtoOut(perfumeService.findByPerfumerOrderByPriceDesc(perfumer));
    }

    public List<PerfumeDtoOut> findByPerfumeGenderOrderByPriceDesc(String perfumeGender) {
        return convertListToDtoOut(perfumeService.findByPerfumeGenderOrderByPriceDesc(perfumeGender));
    }

    public PerfumeDtoIn savePerfume(PerfumeDtoIn perfumeDtoIn, MultipartFile file) {
        return convertToDtoIn(perfumeService.savePerfume(convertToEntity(perfumeDtoIn), file));
    }
}
