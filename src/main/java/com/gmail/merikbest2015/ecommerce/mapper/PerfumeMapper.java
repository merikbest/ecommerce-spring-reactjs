package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
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

    private Perfume convertToEntity(PerfumeRequestDto perfumeRequestDto) {
        return modelMapper.map(perfumeRequestDto, Perfume.class);
    }

    PerfumeResponseDto convertToResponseDto(Perfume perfume) {
        return modelMapper.map(perfume, PerfumeResponseDto.class);
    }

    List<PerfumeResponseDto> convertListToResponseDto(List<Perfume> perfumes) {
        return perfumes.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public PerfumeResponseDto findPerfumeById(Long perfumeId) {
        return convertToResponseDto(perfumeService.findPerfumeById(perfumeId));
    }

    public List<PerfumeResponseDto> findPerfumesByIds(List<Long> perfumesId) {
        return convertListToResponseDto(perfumeService.findPerfumesByIds(perfumesId));
    }

    public List<PerfumeResponseDto> findAllPerfumes() {
        return convertListToResponseDto(perfumeService.findAllPerfumes());
    }

    public List<PerfumeResponseDto> filter(List<String> perfumers, List<String> genders, List<Integer> prices, boolean sortByPrice) {
        return convertListToResponseDto(perfumeService.filter(perfumers, genders, prices, sortByPrice));
    }

    public List<PerfumeResponseDto> findByPerfumerOrderByPriceDesc(String perfumer) {
        return convertListToResponseDto(perfumeService.findByPerfumerOrderByPriceDesc(perfumer));
    }

    public List<PerfumeResponseDto> findByPerfumeGenderOrderByPriceDesc(String perfumeGender) {
        return convertListToResponseDto(perfumeService.findByPerfumeGenderOrderByPriceDesc(perfumeGender));
    }

    public PerfumeResponseDto savePerfume(PerfumeRequestDto perfumeRequestDto, MultipartFile file) {
        return convertToResponseDto(perfumeService.savePerfume(convertToEntity(perfumeRequestDto), file));
    }

    public List<PerfumeResponseDto> deleteOrder(Long perfumeId) {
        return convertListToResponseDto(perfumeService.deletePerfume(perfumeId));
    }
}
