package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Admin controller class.
 * The @RestController it's a convenience annotation that combines @Controller and @ResponseBody. Annotation serves to
 * inform Spring that this class is a bean and must be loaded when the application starts.
 * The @RequestMapping("/api/v1/rest") annotation informs that this controller will process requests whose URI begins
 * with "/api/v1/rest".
 * The @PreAuthorize("hasAuthority('ADMIN')") annotation says the controller is accessible only to users
 * with administrator rights.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 * @see User
 * @see Perfume
 * @see Order
 * @see UserService
 * @see PerfumeService
 * @see OrderService
 */
@RestController
@RequestMapping("/api/v1/rest")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminRestController {
    /**
     * Upload path for images.
     */
    @Value("${upload.path}")
    private String uploadPath;

    /**
     * Service object for working with users.
     */
    private final UserService userService;

    /**
     * Service object for working with products.
     */
    private final PerfumeService perfumeService;

    /**
     * Service object for working with orders.
     */
    private final OrderService orderService;

    /**
     * Constructor for initializing the main variables of the admin controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService    service object for working with users.
     * @param perfumeService service object for working with products.
     * @param orderService   service object for working with orders.
     */
    @Autowired
    public AdminRestController(UserService userService, PerfumeService perfumeService, OrderService orderService) {
        this.userService = userService;
        this.perfumeService = perfumeService;
        this.orderService = orderService;
    }

    /**
     * Save new product to the database by an administrator.
     * URL request {"/admin/add"}, method POST.
     *
     * @param perfume       saved product.
     * @param bindingResult errors in validating http request.
     * @param file          file image.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PostMapping("/admin/add")
    public ResponseEntity<?> addPerfume(
            @Valid Perfume perfume,
            BindingResult bindingResult,
            @RequestPart(name = "file", required = false) MultipartFile file
    ) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            saveFile(perfume, file);

            Perfume savedPerfume = perfumeService.save(perfume);

            return new ResponseEntity<>(savedPerfume, HttpStatus.CREATED);
        }
    }

    /**
     * Update and save product to the database by an administrator.
     * URL request {"/admin/edit"}, method PUT.
     *
     * @param perfume       edited product.
     * @param bindingResult errors in validating http request.
     * @param file          file image.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PutMapping("/admin/edit")
    public ResponseEntity<?> updatePerfume(
            @Valid Perfume perfume,
            BindingResult bindingResult,
            @RequestPart(name = "file", required = false) MultipartFile file
    ) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        } else {
            saveFile(perfume, file);

            perfumeService.saveProductInfoById(perfume.getPerfumeTitle(), perfume.getPerfumer(), perfume.getYear(),
                    perfume.getCountry(), perfume.getPerfumeGender(), perfume.getFragranceTopNotes(),
                    perfume.getFragranceMiddleNotes(), perfume.getFragranceBaseNotes(), perfume.getDescription(),
                    perfume.getFilename(), perfume.getPrice(), perfume.getVolume(), perfume.getType(), perfume.getId());

            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    /**
     * Returns all orders of all users.
     * URL request {"/admin/orders"}, method GET.
     *
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping("/admin/orders")
    public ResponseEntity<?> getAllOrders() {
        List<Order> orders = orderService.findAll();

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    /**
     * Returns user for edit by an administrator.
     * URL request {"/admin/user/{id}"}, method GET.
     *
     * @param userId user id.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping("/admin/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") Long userId) {
        User user = userService.getOne(userId);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Returns all users.
     * URL request {"/admin/user/all"}, method GET.
     *
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping("/admin/user/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.findAll();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Update and save user by an administrator.
     * URL request {"/admin/user/edit"}, method POST.
     *
     * @param username user name.
     * @param form     user roles.
     * @param user     user id.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @PutMapping("/admin/user/edit")
    public ResponseEntity<?> updateUser(
            @RequestParam String username,
            @RequestParam Map<String, String> form,
            @RequestParam("userId") User user
    ) {
        userService.userSave(username, form, user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Method for saving file in upload directory.
     *
     * @param perfume current product.
     * @param file    file image.
     */
    private void saveFile(Perfume perfume, @RequestParam("file") MultipartFile file) throws IOException {
        if (file == null) {
            perfume.setFilename("empty.jpg");
        } else {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + "." + file.getOriginalFilename();

            file.transferTo(new File(uploadPath + "/" + resultFilename));
            perfume.setFilename(resultFilename);
        }
    }
}
