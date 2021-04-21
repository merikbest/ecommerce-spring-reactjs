package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import com.gmail.merikbest2015.ecommerce.service.graphql.GraphQLProvider;
import graphql.ExecutionResult;
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
    private final GraphQLProvider perfumeProvider;

    private Perfume convertToEntity(PerfumeRequestDto perfumeRequestDto) {
        return modelMapper.map(perfumeRequestDto, Perfume.class);
    }

    private PerfumeResponseDto convertToResponseDto(Perfume perfume) {
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

    public List<PerfumeResponseDto> findAllPerfumes() {
        return convertListToResponseDto(perfumeService.findAllPerfumes());
    }

    public List<PerfumeResponseDto> filter(List<String> perfumers, List<String> genders, List<Integer> prices) {
        return convertListToResponseDto(perfumeService.filter(perfumers, genders, prices));
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

    public ExecutionResult getAllPerfumesByQuery(String query) {
        return perfumeProvider.getGraphQL().execute(query);
    }

    public ExecutionResult getPerfumeByQuery(String query) {
        return perfumeProvider.getGraphQL().execute(query);
    }
}
