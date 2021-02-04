package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoIn;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderMapper orderMapper;

    @PostMapping
    public ResponseEntity<OrderDtoIn> postOrder(@Valid @RequestBody OrderDtoIn orderDtoIn, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(orderMapper.postOrder(orderDtoIn));
        }
    }

    @GetMapping("/finalize")
    public ResponseEntity<Long> finalizeOrder() {
        return ResponseEntity.ok(orderMapper.finalizeOrder());
    }
}
