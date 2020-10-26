package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * Customer order controller class.
 * This controller and related pages can be accessed by all users, regardless of their roles.
 * The @Controller annotation serves to inform Spring that this class is a bean and must be
 * loaded when the application starts.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Order
 * @see User
 * @see OrderService
 * @see UserService
 */
@Controller
@Slf4j
public class OrderController {
    /**
     * Service object for working with customer.
     */
    private final UserService userService;

    /**
     * Service object for working orders.
     */
    private final OrderService orderService;

    /**
     * Constructor for initializing the main variables of the cart controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService  service object for working with customer.
     * @param orderService service object for working orders.
     */
    @Autowired
    public OrderController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }

    /**
     * Returns the checkout page.
     * URL request {"/order"}, method GET.
     *
     * @param userSession request Authenticated customer.
     * @param model       class object {@link Model}.
     * @return order page with model attributes.
     */
    @GetMapping("/order")
    public String getOrder(@AuthenticationPrincipal User userSession, Model model) {
        User userFromDB = userService.findByUsername(userSession.getUsername());
        model.addAttribute("perfumes", userFromDB.getPerfumeList());

        return "order/order";
    }

    /**
     * Saves the customers order and redirect to "/finalizeOrder".
     * URL request {"/order"}, method POST.
     *
     * @param userSession   requested Authenticated customer.
     * @param bindingResult errors in validating http request.
     * @param model         class object {@link Model}.
     * @return order page with model attributes.
     */
    @PostMapping("/order")
    public String postOrder(
            @AuthenticationPrincipal User userSession,
            @Valid Order validOrder,
            BindingResult bindingResult,
            Model model
    ) {
        User user = userService.findByUsername(userSession.getUsername());
        Order order = new Order(user);

        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            model.mergeAttributes(errorsMap);
            model.addAttribute("perfumes", user.getPerfumeList());

            return "order/order";
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

            log.debug("User {} id={} made an order: FirstName={}, LastName={}, TotalPrice={}, City={}, " +
                            "Address={}, PostIndex={}, Email={}, PhoneNumber={}",
                    user.getUsername(), user.getId(), order.getFirstName(), order.getLastName(), order.getTotalPrice(),
                    order.getCity(), order.getAddress(), order.getPostIndex(), order.getEmail(), order.getPhoneNumber());
        }

        return "redirect:/finalizeOrder";
    }

    /**
     * Returns the finalize order page with order index.
     * URL request {"/finalizeOrder"}, method GET.
     *
     * @param model class object {@link Model}.
     * @return finalizeOrder page with model attributes.
     */
    @GetMapping("/finalizeOrder")
    public String finalizeOrder(Model model) {
        List<Order> orderList = orderService.findAll();
        Order orderIndex = orderList.get(orderList.size() - 1);

        model.addAttribute("orderIndex", orderIndex.getId());

        return "order/finalizeOrder";
    }

    /**
     * Returns all customers orders.
     * URL request {"/userOrders"}, method GET.
     *
     * @param userSession requested Authenticated customer.
     * @param model       class object {@link Model}.
     * @return orders page with model attributes.
     */
    @GetMapping("/userOrders")
    public String getUserOrdersList(@AuthenticationPrincipal User userSession, Model model) {
        User userFromDB = userService.findByUsername(userSession.getUsername());
        List<Order> orders = orderService.findOrderByUser(userFromDB);
        model.addAttribute("orders", orders);

        return "order/orders";
    }

    /**
     * Returns all orders of all customers.
     * URL request {"/orders"}, method GET.
     *
     * @param model class object {@link Model}.
     * @return orders page with model attributes.
     */
    @GetMapping("/orders")
    public String getAllOrdersList(Model model) {
        List<Order> orders = orderService.findAll();
        model.addAttribute("orders", orders);

        return "order/orders";
    }
}
