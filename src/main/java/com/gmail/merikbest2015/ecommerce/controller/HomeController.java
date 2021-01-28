package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/home")
public class HomeController {

    private final PerfumeService perfumeService;

    public HomeController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<Perfume> perfumes = perfumeService.findAll();
        return new ResponseEntity<>(perfumes, HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Long perfumeId) {
        Perfume perfume = perfumeService.getOne(perfumeId);
        return new ResponseEntity<>(perfume, HttpStatus.OK);
    }
}
