package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
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
@RequestMapping("/api/v1/order")
public class OrderController {

    private final UserService userService;
    private final OrderService orderService;

    public OrderController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<?> getOrder(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        List<Perfume> perfumeList = user.getPerfumeList();
        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> postOrder(@AuthenticationPrincipal User userSession,
                                       @Valid @RequestBody Order validOrder,
                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            Order order = orderService.postOrder(validOrder, userSession);
            return new ResponseEntity<>(order, HttpStatus.CREATED);
        }
    }

    @GetMapping("/finalize")
    public ResponseEntity<?> finalizeOrder() {
        List<Order> orderList = orderService.findAll();
        Order orderIndex = orderList.get(orderList.size() - 1);
        return new ResponseEntity<>(orderIndex.getId(), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getUserOrdersList(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        List<Order> orders = orderService.findOrderByUser(user);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
