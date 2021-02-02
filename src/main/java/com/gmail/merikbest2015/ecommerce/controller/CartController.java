package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final UserMapper userMapper;

    public CartController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @PostMapping
    public ResponseEntity<List<PerfumeDto>> getCart(@RequestBody List<Long> perfumesIds) {
        return ResponseEntity.ok(userMapper.getCartId(perfumesIds));
    }
}
