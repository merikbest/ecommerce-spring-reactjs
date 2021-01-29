package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.OrderDto;
import com.gmail.merikbest2015.ecommerce.dto.ReviewDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserMapper userMapper;
    private final OrderMapper orderMapper;

    public UserController(UserMapper userMapper, OrderMapper orderMapper) {
        this.userMapper = userMapper;
        this.orderMapper = orderMapper;
    }

    @GetMapping("/edit")
    public ResponseEntity<UserDto> getUserInfo(@AuthenticationPrincipal UserDto userDto) {
        return ResponseEntity.ok(userMapper.findByEmail(userDto.getEmail()));
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateUserInfo(@AuthenticationPrincipal UserDto userDto,
                                                 @RequestBody AuthenticationRequestDto request) {
        userMapper.updateProfile(userDto, request.getPassword(), request.getEmail());
        return ResponseEntity.ok("User updated successfully.");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getAllUserOrders(@AuthenticationPrincipal UserDto userDto) {
        return ResponseEntity.ok(orderMapper.findOrderByUser(userDto));
    }

    @PostMapping("/review")
    public ResponseEntity<?> addReviewToPerfume(@RequestParam(required = false, name = "perfumeId") Long perfumeId,
                                                @Valid ReviewDto reviewDto,
                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return ResponseEntity.badRequest().body(errorsMap);
        } else {
            userMapper.addReviewToPerfume(reviewDto, perfumeId);
            return ResponseEntity.ok("Review added successfully.");
        }
    }
}
