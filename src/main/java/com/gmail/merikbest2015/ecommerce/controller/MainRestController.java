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

/**
 * Home page controller class.
 * This controller and related pages can be accessed by all users, regardless of their roles.
 * The @RestController it's a convenience annotation that combines @Controller and @ResponseBody. Annotation serves to
 * inform Spring that this class is a bean and must be loaded when the application starts.
 * The @RequestMapping("/api/v1/rest") annotation informs that this controller will process requests whose URI begins
 * with "/api/v1/rest".
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 * @see Perfume
 * @see PerfumeService
 */
@RestController
@RequestMapping("/api/v1/rest")
public class MainRestController {
    /**
     * Service object for working with products.
     */
    private final PerfumeService perfumeService;

    /**
     * Constructor for initializing the main variables of the main controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param perfumeService Service object for working with products.
     */
    @Autowired
    public MainRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    /**
     * Returns all products to the home page.
     * URL request {"/"}, method GET.
     *
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping
    public ResponseEntity<?> getAllProducts() {
        List<Perfume> perfumes = perfumeService.findAll();

        return new ResponseEntity<>(perfumes, HttpStatus.OK);
    }

    /**
     * Returns product to the home page.
     * URL request {"/product/{id}"}, method GET.
     *
     * @param perfumeId product id.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Long perfumeId) {
        Perfume perfume = perfumeService.getOne(perfumeId);

        return new ResponseEntity<>(perfume, HttpStatus.OK);
    }
}
