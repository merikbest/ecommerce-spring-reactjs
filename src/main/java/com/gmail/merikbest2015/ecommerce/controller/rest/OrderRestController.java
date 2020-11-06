package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rest")
public class OrderRestController {

    private final UserService userService;

    private final OrderService orderService;

    @Autowired
    public OrderRestController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }

    @GetMapping("/order")
    public ResponseEntity<?> getOrder(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        List<Perfume> perfumeList = user.getPerfumeList();

        return ResponseEntity.ok(perfumeList);
    }

    @PostMapping("/order")
    public ResponseEntity<?> postOrder(
            @AuthenticationPrincipal User userSession,
            @Valid @RequestBody Order validOrder,
            BindingResult bindingResult
    ) {
        User user = userService.findByEmail(userSession.getEmail());
        Order order = new Order(user);

        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            order.getPerfumeList().addAll(user.getPerfumeList());
            order.setTotalPrice(validOrder.getTotalPrice());
            order.setFirstName(validOrder.getFirstName());
            order.setLastName(validOrder.getLastName());
            order.setCity(validOrder.getCity());
            order.setAddress(validOrder.getAddress());
            order.setPostIndex(validOrder.getPostIndex());
            order.setEmail(validOrder.getEmail());
            order.setPhoneNumber(validOrder.getPhoneNumber());

            user.getPerfumeList().clear();

            orderService.save(order);
        }

        return ResponseEntity.ok("OK");
    }

    @GetMapping("/order/finalize")
    public ResponseEntity<?> finalizeOrder() {
        List<Order> orderList = orderService.findAll();
        Order orderIndex = orderList.get(orderList.size() - 1);

        return ResponseEntity.ok(orderIndex.getId());
    }

    @GetMapping("/order/list")
    public ResponseEntity<?> getUserOrdersList(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        List<Order> orders = orderService.findOrderByUser(user);

        return ResponseEntity.ok(orders);
    }
}
