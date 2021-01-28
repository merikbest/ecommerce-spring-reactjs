package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.ReviewDto;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.http.HttpStatus;
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

    private final UserService userService;
    private final OrderService orderService;

    public UserController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }

    @GetMapping("/edit")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> updateUserInfo(@AuthenticationPrincipal User userSession,
                                            @RequestBody AuthenticationRequestDto request) {
        userService.updateProfile(userSession, request.getPassword(), request.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllUserOrders(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        List<Order> orders = orderService.findOrderByUser(user);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/review")
    public ResponseEntity<?> addReviewToPerfume(@RequestParam(required = false, name = "perfumeId") Long perfumeId,
                                                @Valid ReviewDto reviewDto,
                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            userService.addReviewToPerfume(reviewDto, perfumeId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
