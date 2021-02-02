package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.OrderDto;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderMapper orderMapper;

    public OrderController(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @PostMapping
    public ResponseEntity<OrderDto> postOrder(@Valid @RequestBody OrderDto orderDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(orderMapper.postOrder(orderDto));
        }
    }

    @GetMapping("/finalize")
    public ResponseEntity<Long> finalizeOrder() {
        return ResponseEntity.ok(orderMapper.finalizeOrder());
    }
}
