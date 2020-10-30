package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rest")
public class MenuRestController {

    private final PerfumeService perfumeService;

    @Autowired
    public MenuRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @PostMapping("/menu/search")
    public ResponseEntity<?> getProductsByFilterParams(@RequestBody List<String> perfumer) {
        List<Perfume> perfumes = perfumeService.findAll();

        if (!perfumer.isEmpty()) {
            perfumes = perfumeService.findByPerfumerIn(perfumer);
        }

        return ResponseEntity.ok(perfumes);
    }
}
