package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoOut;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoOut;
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
    public ResponseEntity<PerfumeDtoIn> addPerfume(@RequestPart(name = "file", required = false) MultipartFile file,
                                                   @RequestPart("perfume") @Valid PerfumeDtoIn perfume,
                                                   BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.savePerfume(perfume, file));
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<PerfumeDtoIn> updatePerfume(@RequestPart(name = "file", required = false) MultipartFile file,
                                                      @RequestPart("perfume") @Valid PerfumeDtoIn perfume,
                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.savePerfume(perfume, file));
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDtoOut>> getAllOrders() {
        return ResponseEntity.ok(orderMapper.findAllOrders());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDtoOut> getUser(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(userMapper.findUserById(userId));
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<UserDtoOut>> getAllUsers() {
        return ResponseEntity.ok(userMapper.findAllUsers());
    }

    @PutMapping("/user/edit")
    public ResponseEntity<String> updateUser(@RequestParam String username,
                                             @RequestParam Map<String, String> form,
                                             @RequestParam("userId") UserDtoIn userDto) {
        userMapper.userSave(username, form, userDto);
        return ResponseEntity.ok("User updated successfully.");
    }
}
