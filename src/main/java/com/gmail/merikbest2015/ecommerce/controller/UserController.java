package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserResponseDto;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.exception.PasswordException;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import com.gmail.merikbest2015.ecommerce.security.UserPrincipal;
import com.gmail.merikbest2015.ecommerce.service.graphql.GraphQLProvider;
import com.gmail.merikbest2015.ecommerce.utils.ControllerUtils;
import graphql.ExecutionResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserMapper userMapper;
    private final OrderMapper orderMapper;
    private final GraphQLProvider graphQLProvider;
    private final ControllerUtils controllerUtils;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/info")
    public ResponseEntity<UserResponseDto> getUserInfo(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(userMapper.findUserByEmail(user.getEmail()));
    }

    @PostMapping("/graphql/info")
    public ResponseEntity<ExecutionResult> getUserInfoByQuery(@RequestBody GraphQLRequestDto request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PutMapping("/edit")
    public ResponseEntity<UserResponseDto> updateUserInfo(@AuthenticationPrincipal UserPrincipal user,
                                                          @Valid @RequestBody UserRequestDto request,
                                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(userMapper.updateProfile(user.getEmail(), request));
        }
    }

    @PutMapping("/edit/password")
    public ResponseEntity<String> updateUserPassword(@AuthenticationPrincipal UserPrincipal user,
                                                     @Valid @RequestBody PasswordResetRequestDto passwordReset,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else if (controllerUtils.isPasswordDifferent(passwordReset.getPassword(), passwordReset.getPassword2())) {
            throw new PasswordException("Passwords do not match.");
        } else {
            return ResponseEntity.ok(userMapper.passwordReset(user.getEmail(), passwordReset.getPassword()));
        }
    }

    @PostMapping("/cart")
    public ResponseEntity<List<PerfumeResponseDto>> getCart(@RequestBody List<Long> perfumesIds) {
        return ResponseEntity.ok(userMapper.getCart(perfumesIds));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getUserOrders(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(orderMapper.findOrderByEmail(user.getEmail()));
    }

    @PostMapping("/graphql/orders")
    public ResponseEntity<ExecutionResult> getUserOrdersByQuery(@RequestBody GraphQLRequestDto request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping("/order")
    public ResponseEntity<OrderResponseDto> postOrder(@Valid @RequestBody OrderRequestDto order, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(orderMapper.postOrder(order));
        }
    }

    @PostMapping("/review")
    public ResponseEntity<PerfumeResponseDto> addReviewToPerfume(@Valid @RequestBody ReviewRequestDto review,
                                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            PerfumeResponseDto perfume = userMapper.addReviewToPerfume(review, review.getPerfumeId());
            messagingTemplate.convertAndSend("/topic/reviews/" + perfume.getId(), perfume);
            return ResponseEntity.ok(perfume);
        }
    }
}
