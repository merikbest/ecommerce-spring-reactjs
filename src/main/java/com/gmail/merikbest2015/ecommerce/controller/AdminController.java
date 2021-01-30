package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.OrderDto;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import com.gmail.merikbest2015.ecommerce.mapper.PerfumeMapper;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserMapper userMapper;
    private final PerfumeMapper perfumeMapper;
    private final OrderMapper orderMapper;

    public AdminController(UserMapper userMapper, PerfumeMapper perfumeMapper, OrderMapper orderMapper) {
        this.userMapper = userMapper;
        this.perfumeMapper = perfumeMapper;
        this.orderMapper = orderMapper;
    }

    @PostMapping("/add")
    public ResponseEntity<PerfumeDto> addPerfume(@Valid PerfumeDto perfumeDto,
                                                 BindingResult bindingResult,
                                                 @RequestPart(name = "file", required = false) MultipartFile file) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.savePerfume(perfumeDto, file));
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<PerfumeDto> updatePerfume(@Valid PerfumeDto perfumeDto,
                                                    BindingResult bindingResult,
                                                    @RequestPart(name = "file", required = false) MultipartFile file) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.savePerfume(perfumeDto, file));
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderMapper.findAll());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(userMapper.findUserById(userId));
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userMapper.findAllUsers());
    }

    @PutMapping("/user/edit")
    public ResponseEntity<String> updateUser(@RequestParam String username,
                                             @RequestParam Map<String, String> form,
                                             @RequestParam("userId") UserDto userDto) {
        userMapper.userSave(username, form, userDto);
        return ResponseEntity.ok("User updated successfully.");
    }
}
