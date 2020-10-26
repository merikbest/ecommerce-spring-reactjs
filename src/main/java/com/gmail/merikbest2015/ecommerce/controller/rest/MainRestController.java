package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rest")
public class MainRestController {

    private final PerfumeService perfumeService;

    private final PerfumeRepository perfumeRepository;

    @Autowired
    public MainRestController(PerfumeService perfumeService, PerfumeRepository perfumeRepository) {
        this.perfumeService = perfumeService;
        this.perfumeRepository = perfumeRepository;
    }

    @GetMapping
    public List<Perfume> getAll() {
        return perfumeService.findAll();
    }

    @GetMapping("/product/{id}")
    public Optional<Perfume> getProduct(@PathVariable("id") Long perfumeId) {
        return perfumeRepository.findById(perfumeId);
    }
}
