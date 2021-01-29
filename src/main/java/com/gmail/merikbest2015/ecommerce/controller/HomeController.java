package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.mapper.PerfumeMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/home")
public class HomeController {

    private final PerfumeMapper perfumeMapper;

    public HomeController(PerfumeMapper perfumeMapper) {
        this.perfumeMapper = perfumeMapper;
    }

    @GetMapping
    public ResponseEntity<List<PerfumeDto>> getAllPerfumes() {
        return ResponseEntity.ok(perfumeMapper.findAllPerfumes());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<PerfumeDto> getPerfume(@PathVariable("id") Long perfumeId) {
        return ResponseEntity.ok(perfumeMapper.findPerfumeById(perfumeId));
    }
}
