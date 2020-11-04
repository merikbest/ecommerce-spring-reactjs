package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rest")
public class CartRestController {

    private final UserService userService;

    @Autowired
    public CartRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        List<Perfume> perfumeList = user.getPerfumeList();

        return ResponseEntity.ok(perfumeList);
    }

    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody Perfume perfume, @AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        user.getPerfumeList().add(perfume);

        userService.save(user);

        return ResponseEntity.ok("OK");
    }

    @PostMapping("/cart/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody Perfume perfume, @AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        user.getPerfumeList().remove(perfume);

        userService.save(user);

        List<Perfume> perfumeList = user.getPerfumeList();

        return ResponseEntity.ok(perfumeList);
    }
}
