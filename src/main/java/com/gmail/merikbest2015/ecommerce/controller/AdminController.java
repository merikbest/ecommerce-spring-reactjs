package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.order.OrderResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserResponseDto;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import com.gmail.merikbest2015.ecommerce.mapper.PerfumeMapper;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final UserMapper userMapper;
    private final PerfumeMapper perfumeMapper;
    private final OrderMapper orderMapper;

    @PostMapping("/add")
    public ResponseEntity<PerfumeResponseDto> addPerfume(@RequestPart(name = "file", required = false) MultipartFile file,
                                                         @RequestPart("perfume") @Valid PerfumeRequestDto perfume,
                                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.savePerfume(perfume, file));
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<PerfumeResponseDto> updatePerfume(@RequestPart(name = "file", required = false) MultipartFile file,
                                                            @RequestPart("perfume") @Valid PerfumeRequestDto perfume,
                                                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.savePerfume(perfume, file));
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        return ResponseEntity.ok(orderMapper.findAllOrders());
    }

    @PostMapping("/order")
    public ResponseEntity<List<OrderResponseDto>> getUserOrdersByEmail(@RequestBody UserRequestDto user) {
        return ResponseEntity.ok(orderMapper.findOrderByEmail(user.getEmail()));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(userMapper.findUserById(userId));
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userMapper.findAllUsers());
    }

    @PutMapping("/user/edit")
    public ResponseEntity<String> updateUser(@RequestParam String username,
                                             @RequestParam Map<String, String> form,
                                             @RequestParam("userId") UserRequestDto userDto) {
        userMapper.userSave(username, form, userDto);
        return ResponseEntity.ok("User updated successfully.");
    }
}
