package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Customer shopping cart controller class.
 * This controller and related pages can be accessed by all users, regardless of their roles.
 * The @Controller annotation serves to inform Spring that this class is a bean and must be
 * loaded when the application starts.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see User
 * @see UserService
 */
@Controller
public class CartController {
    /**
     * Service object for working with customer shopping cart.
     */
    private final UserService userService;

    /**
     * Constructor for initializing the main variables of the cart controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService service object for working with user shopping cart.
     */
    @Autowired
    public CartController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Returns customer shopping cart.
     * URL request {"/cart"}, method GET.
     *
     * @param userSession requested Authenticated customer.
     * @param model       class object {@link Model}.
     * @return cart page with model attributes.
     */
    @GetMapping("/cart")
    public String getCart(@AuthenticationPrincipal User userSession, Model model) {
        User userFromDB = userService.findByUsername(userSession.getUsername());
        model.addAttribute("perfumes", userFromDB.getPerfumeList());

        return "cart";
    }

    /**
     * Adds a product to the customer shopping cart and redirects it to "/cart".
     * URL request {"/cart/add"}, method POST.
     *
     * @param perfume     the product to add to the cart.
     * @param userSession request Authenticated customer.
     * @return redirect to cart page.
     */
    @PostMapping("/cart/add")
    public String addToCart(
            @RequestParam("add") Perfume perfume,
            @AuthenticationPrincipal User userSession
    ) {
        User user = userService.findByUsername(userSession.getUsername());
        user.getPerfumeList().add(perfume);
        userService.save(user);

        return "redirect:/cart";
    }

    /**
     * Remove product from customer shopping cart and redirects it to "/cart".
     * URL request {"/cart/remove"}, method POST.
     *
     * @param perfume     the product to be removed from the customer shopping cart.
     * @param userSession request Authenticated customer.
     * @return redirect to cart page.
     */
    @PostMapping("/cart/remove")
    public String removeFromCart(
            @RequestParam(value = "perfumeId") Perfume perfume,
            @AuthenticationPrincipal User userSession
    ) {
        User user = userService.findByUsername(userSession.getUsername());

        if (perfume != null) {
            user.getPerfumeList().remove(perfume);
        }

        userService.save(user);

        return "redirect:/cart";
    }
}