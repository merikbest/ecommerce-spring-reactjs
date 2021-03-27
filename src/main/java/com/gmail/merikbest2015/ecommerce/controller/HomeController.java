package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoOut;
import com.gmail.merikbest2015.ecommerce.mapper.PerfumeMapper;
import graphql.ExecutionResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/home")
public class HomeController {

    private final PerfumeMapper perfumeMapper;

    @GetMapping
    public ResponseEntity<List<PerfumeDtoOut>> getAllPerfumes() {
        return ResponseEntity.ok(perfumeMapper.findAllPerfumes());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<PerfumeDtoOut> getPerfume(@PathVariable("id") Long perfumeId) {
        return ResponseEntity.ok(perfumeMapper.findPerfumeById(perfumeId));
    }

    @PostMapping("/graphql/perfumes")
    public ResponseEntity<ExecutionResult> getAllPerfumesByQuery(@RequestBody GraphQLRequestDto request) {
        return ResponseEntity.ok(perfumeMapper.getAllPerfumesByQuery(request.getQuery()));
    }

    @PostMapping("/graphql/perfume")
    public ResponseEntity<ExecutionResult> getPerfumeByQuery(@RequestBody GraphQLRequestDto request) {
        return ResponseEntity.ok(perfumeMapper.getPerfumeByQuery(request.getQuery()));
    }
}
