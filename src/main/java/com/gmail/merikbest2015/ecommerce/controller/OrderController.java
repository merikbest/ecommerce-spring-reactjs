package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.OrderDto;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
import com.gmail.merikbest2015.ecommerce.mapper.OrderMapper;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    private final UserMapper userMapper;
    private final OrderMapper orderMapper;

    public OrderController(UserMapper userMapper, OrderMapper orderMapper) {
        this.userMapper = userMapper;
        this.orderMapper = orderMapper;
    }

    @GetMapping
    public ResponseEntity<List<PerfumeDto>> getOrder(@AuthenticationPrincipal UserDto userDto) {
        UserDto user = userMapper.findByEmail(userDto.getEmail());
        return ResponseEntity.ok(user.getPerfumeList());
    }

    @PostMapping
    public ResponseEntity<?> postOrder(@AuthenticationPrincipal UserDto userDto,
                                       @Valid @RequestBody OrderDto orderDto,
                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(ControllerUtils.getErrors(bindingResult));
        } else {
            return ResponseEntity.ok(orderMapper.postOrder(orderDto, userDto.getEmail()));
        }
    }

    @GetMapping("/finalize")
    public ResponseEntity<Long> finalizeOrder() {
        List<OrderDto> orderDtoList = orderMapper.findAll();
        OrderDto orderIndex = orderDtoList.get(orderDtoList.size() - 1);
        return ResponseEntity.ok(orderIndex.getId());
    }

    @GetMapping("/list")
    public ResponseEntity<List<OrderDto>> getUserOrdersList(@AuthenticationPrincipal UserDto userDto) {
        UserDto user = userMapper.findByEmail(userDto.getEmail());
        return ResponseEntity.ok(orderMapper.findOrderByUser(user));
    }
}
