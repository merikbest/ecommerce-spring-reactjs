package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.dto.PerfumeSearchFilterDto;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rest")
public class MenuRestController {

    private final PerfumeService perfumeService;
    private final PerfumeRepository perfumeRepository;

    @Autowired
    public MenuRestController(PerfumeService perfumeService, PerfumeRepository perfumeRepository) {
        this.perfumeService = perfumeService;
        this.perfumeRepository = perfumeRepository;
    }

    @PostMapping("/menu/search")
    public ResponseEntity<?> getProductsByFilterParams(@RequestBody PerfumeSearchFilterDto filterDto) {
        List<Perfume> filter = perfumeService.filter(filterDto.getPerfumer(), filterDto.getGender(), filterDto.getPrice());

        return ResponseEntity.ok(filter);
    }
}
