package com.gmail.merikbest2015.ecommerce.utils.swagger;

import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeSearchRequestDto;
import graphql.ExecutionResult;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PerfumeAPI {

    @ApiOperation(value = "Returns list of perfumes", response = PerfumeResponseDto.class, responseContainer = "List")
    ResponseEntity<List<PerfumeResponseDto>> getAllPerfumes();

    @ApiOperation(value = "Returns perfume by Id", response = PerfumeResponseDto.class)
    ResponseEntity<PerfumeResponseDto> getPerfume(Long perfumeId);

    @ApiOperation(value = "Returns list of perfumes by filter parameters", response = PerfumeResponseDto.class, responseContainer = "List")
    ResponseEntity<List<PerfumeResponseDto>> findPerfumesByFilterParams(PerfumeSearchRequestDto filter);

    @ApiOperation(value = "Returns list of perfumes by perfume gender", response = PerfumeResponseDto.class, responseContainer = "List")
    ResponseEntity<List<PerfumeResponseDto>> findByPerfumeGender(PerfumeSearchRequestDto filter);

    @ApiOperation(value = "Returns list of perfumes by perfume brand", response = PerfumeResponseDto.class, responseContainer = "List")
    ResponseEntity<List<PerfumeResponseDto>> findByPerfumer(PerfumeSearchRequestDto filter);

    @ApiOperation(value = "Returns list of perfumes by GraphQL query")
    ResponseEntity<ExecutionResult> getAllPerfumesByQuery(GraphQLRequestDto request);

    @ApiOperation(value = "Returns perfume by GraphQL query")
    ResponseEntity<ExecutionResult> getPerfumeByQuery(GraphQLRequestDto request);
}
