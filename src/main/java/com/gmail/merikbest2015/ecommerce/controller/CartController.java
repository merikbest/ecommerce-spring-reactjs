package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final UserService userService;

    public CartController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getCart(@PathVariable String email) {
        User user = userService.findByEmail(email);
        List<Perfume> perfumeList = user.getPerfumeList();
        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Perfume perfume, @AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        user.getPerfumeList().add(perfume);
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody Perfume perfume, @AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        user.getPerfumeList().remove(perfume);
        userService.save(user);
        List<Perfume> perfumeList = user.getPerfumeList();
        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }
}
