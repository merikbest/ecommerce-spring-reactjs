package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PerfumeMapper {

    private final ModelMapper modelMapper;
    private final PerfumeService perfumeService;

    public PerfumeMapper(ModelMapper modelMapper, PerfumeService perfumeService) {
        this.modelMapper = modelMapper;
        this.perfumeService = perfumeService;
    }

    private Perfume convertToEntity(PerfumeDto perfumeDto) {
        return modelMapper.map(perfumeDto, Perfume.class);
    }

    private PerfumeDto convertToDto(Perfume perfume) {
        return modelMapper.map(perfume, PerfumeDto.class);
    }

    private List<PerfumeDto> convertListToDto(List<Perfume> perfumes) {
        return perfumes.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PerfumeDto findPerfumeById(Long perfumeId) {
        return convertToDto(perfumeService.findPerfumeById(perfumeId));
    }

    public List<PerfumeDto> findAllPerfumes() {
        return convertListToDto(perfumeService.findAllPerfumes());
    }

    public List<PerfumeDto> filter(List<String> perfumers, List<String> genders, List<Integer> prices) {
        return convertListToDto(perfumeService.filter(perfumers, genders, prices));
    }

    public List<PerfumeDto> findByPerfumerOrderByPriceDesc(String perfumer) {
        return convertListToDto(perfumeService.findByPerfumerOrderByPriceDesc(perfumer));
    }

    public List<PerfumeDto> findByPerfumeGenderOrderByPriceDesc(String perfumeGender) {
        return convertListToDto(perfumeService.findByPerfumeGenderOrderByPriceDesc(perfumeGender));
    }

//    void saveProductInfoById

    public PerfumeDto savePerfume(PerfumeDto perfumeDto) {
        return convertToDto(perfumeService.savePerfume(convertToEntity(perfumeDto)));
    }
}
