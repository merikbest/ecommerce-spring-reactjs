package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
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
    public ResponseEntity<List<PerfumeDto>> getCart(@AuthenticationPrincipal UserDto userDto) {
        UserDto user = userMapper.findByEmail(userDto.getEmail());
        List<PerfumeDto> perfumeList = user.getPerfumeList();
        return ResponseEntity.ok(perfumeList);
    }

    @PostMapping("/add")
    public ResponseEntity<UserDto> addToCart(@RequestBody PerfumeDto perfumeDto,
                                             @AuthenticationPrincipal UserDto userDto) {
        UserDto user = userMapper.findByEmail(userDto.getEmail());
        user.getPerfumeList().add(perfumeDto);
        return ResponseEntity.ok(userMapper.saveUser(user));
    }

    @PostMapping("/remove")
    public ResponseEntity<List<PerfumeDto>> removeFromCart(@RequestBody PerfumeDto perfumeDto,
                                                           @AuthenticationPrincipal  UserDto userDto) {
        UserDto user = userMapper.findByEmail(userDto.getEmail());
        user.getPerfumeList().remove(perfumeDto);
        userMapper.saveUser(user);
        List<PerfumeDto> perfumeList = user.getPerfumeList();
        return ResponseEntity.ok(perfumeList);
    }
}
