package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final UserMapper userMapper;

    public CartController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping
    public ResponseEntity<List<PerfumeDto>> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userMapper.getCart(user.getEmail()));
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody PerfumeDto perfumeDto, @AuthenticationPrincipal User user) {
        userMapper.addToCart(perfumeDto, user.getEmail());
        return ResponseEntity.ok("Perfume added to cart successfully.");
    }

    @PostMapping("/remove")
    public ResponseEntity<List<PerfumeDto>> removeFromCart(@RequestBody PerfumeDto perfumeDto,
                                                           @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userMapper.removeFromCart(perfumeDto, user.getEmail()));
    }
}
