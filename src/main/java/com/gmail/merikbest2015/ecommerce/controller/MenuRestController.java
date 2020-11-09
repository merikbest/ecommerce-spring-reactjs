package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeSearchFilterDto;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Menu controller class.
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
public class MenuRestController {
    /**
     * Service object for working with products.
     */
    private final PerfumeService perfumeService;

    /**
     * Constructor for initializing the main variables of the menu controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param perfumeService Service object for working with products.
     */
    @Autowired
    public MenuRestController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    /**
     * Returns list of perfumes to the menu page by selected parameters.
     * URL request {"/menu/search"}, method POST.
     *
     * @param filterDto data transfer object for filter search.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PostMapping("/menu/search")
    public ResponseEntity<?> findProductsByFilterParams(@RequestBody PerfumeSearchFilterDto filterDto) {
        List<Perfume> filter = perfumeService.filter(filterDto.getPerfumers(), filterDto.getGenders(), filterDto.getPrices());

        return new ResponseEntity<>(filter, HttpStatus.OK);
    }

    /**
     * Returns list of perfumes to the menu which has the same perfume gender with the value of the input parameter.
     * URL request {"/menu/gender"}, method POST.
     *
     * @param filterDto data transfer object for filter search.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PostMapping("/menu/gender")
    public ResponseEntity<?> findByPerfumeGender(@RequestBody PerfumeSearchFilterDto filterDto) {
        List<Perfume> gender = perfumeService.findByPerfumeGenderOrderByPriceDesc(filterDto.getPerfumeGender());

        return new ResponseEntity<>(gender, HttpStatus.OK);
    }

    /**
     * Returns list of perfumes to the menu page which has the same perfume manufacturer with the value of the input parameter.
     * URL request {"/menu/perfumer"}, method POST.
     *
     * @param filterDto data transfer object for filter search.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PostMapping("/menu/perfumer")
    public ResponseEntity<?> findByPerfumer(@RequestBody PerfumeSearchFilterDto filterDto) {
        List<Perfume> perfumer = perfumeService.findByPerfumerOrderByPriceDesc(filterDto.getPerfumer());

        return new ResponseEntity<>(perfumer, HttpStatus.OK);
    }
}
