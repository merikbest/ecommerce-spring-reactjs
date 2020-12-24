package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * User REST shopping cart controller class.
 * This controller can be accessed by all users, regardless of their roles.
 * The @RestController it's a convenience annotation that combines @Controller and @ResponseBody. Annotation serves to
 * inform Spring that this class is a bean and must be loaded when the application starts.
 * The @RequestMapping("/api/v1/rest") annotation informs that this controller will process requests whose URI begins
 * with "/api/v1/rest".
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 * @see User
 * @see UserService
 */
@RestController
@RequestMapping("/api/v1/rest")
public class CartRestController {
    /**
     * Service object for working with user shopping cart.
     */
    private final UserService userService;

    /**
     * Constructor for initializing the main variables of the cart controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService service object for working with user shopping cart.
     */
    @Autowired
    public CartRestController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Returns user shopping cart.
     * URL request {"/cart"}, method GET.
     *
     * @param userSession requested Authenticated user.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping("/cart/{email}")
    public ResponseEntity<?> getCart(@PathVariable String email) {
        User user = userService.findByEmail(email);
        List<Perfume> perfumeList = user.getPerfumeList();

        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }

    /**
     * Adds a product to the user shopping cart.
     * URL request {"/cart/add"}, method POST.
     *
     * @param perfume     the product to add to the cart.
     * @param userSession request Authenticated user.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody Perfume perfume, @AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        user.getPerfumeList().add(perfume);

        userService.save(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Remove product from user shopping cart.
     * URL request {"/cart/remove"}, method POST.
     *
     * @param perfume     the product to be removed from the user shopping cart.
     * @param userSession request Authenticated user.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PostMapping("/cart/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody Perfume perfume, @AuthenticationPrincipal User userSession) {
        User user = userService.findByEmail(userSession.getEmail());
        user.getPerfumeList().remove(perfume);

        userService.save(user);

        List<Perfume> perfumeList = user.getPerfumeList();

        return new ResponseEntity<>(perfumeList, HttpStatus.OK);
    }
}
