package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeSearchFilterDto;
import com.gmail.merikbest2015.ecommerce.mapper.PerfumeMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    private final PerfumeMapper perfumeMapper;

    public MenuController(PerfumeMapper perfumeMapper) {
        this.perfumeMapper = perfumeMapper;
    }

    @PostMapping("/search")
    public ResponseEntity<List<PerfumeDto>> findPerfumesByFilterParams(@RequestBody PerfumeSearchFilterDto filterDto) {
        return ResponseEntity.ok(perfumeMapper.filter(filterDto.getPerfumers(), filterDto.getGenders(), filterDto.getPrices()));
    }

    @PostMapping("/gender")
    public ResponseEntity<List<PerfumeDto>> findByPerfumeGender(@RequestBody PerfumeSearchFilterDto filterDto) {
        return ResponseEntity.ok(perfumeMapper.findByPerfumeGenderOrderByPriceDesc(filterDto.getPerfumeGender()));
    }

    @PostMapping("/perfumer")
    public ResponseEntity<List<PerfumeDto>> findByPerfumer(@RequestBody PerfumeSearchFilterDto filterDto) {
        return ResponseEntity.ok(perfumeMapper.findByPerfumerOrderByPriceDesc(filterDto.getPerfumer()));
    }
}
