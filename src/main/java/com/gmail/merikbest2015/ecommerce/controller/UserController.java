package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoOut;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoOut;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserMapper userMapper;
    private final OrderMapper orderMapper;

    @GetMapping("/edit")
    public ResponseEntity<UserDtoOut> getUserInfo(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userMapper.findUserByEmail(user.getEmail()));
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateUserInfo(@AuthenticationPrincipal User user,
                                                 @RequestBody AuthenticationRequestDto request) {
        userMapper.updateProfile(user, request.getPassword(), request.getEmail());
        return ResponseEntity.ok("User updated successfully.");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDtoOut>> getAllUserOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderMapper.findOrderByEmail(user.getEmail()));
    }

    @PostMapping("/review")
    public ResponseEntity<String> addReviewToPerfume(@RequestParam(required = false, name = "perfumeId") Long perfumeId,
                                                     @Valid @RequestBody ReviewDtoIn reviewDto,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            userMapper.addReviewToPerfume(reviewDto, perfumeId);
            return ResponseEntity.ok("Review added successfully.");
        }
    }
}
