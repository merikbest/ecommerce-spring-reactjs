package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Role;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * User controller class.
 * The @Controller annotation serves to inform Spring that this class is a bean and must be
 * loaded when the application starts.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see User
 * @see Perfume
 * @see UserService
 * @see PerfumeService
 */
@Controller
@Slf4j
@RequestMapping("/user")
public class UserController {
    /**
     * Service object for working with users.
     */
    private final UserService userService;

    /**
     * Service object for working with products.
     */
    private final PerfumeService perfumeService;

    /**
     * Upload path for images.
     */
    @Value("${upload.path}")
    private String uploadPath;

    /**
     * Constructor for initializing the main variables of the cart controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService    service object for working with users.
     * @param perfumeService service object for working with products.
     */
    @Autowired
    public UserController(UserService userService, PerfumeService perfumeService) {
        this.userService = userService;
        this.perfumeService = perfumeService;
    }

    /**
     * Returns a list of products for editing by an administrator.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/productlist"}, method GET.
     *
     * @param pageable object that specifies the information of the requested page.
     * @param model    class object {@link Model}.
     * @return productList page with model attributes.
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("productlist")
    public String getAllProducts(@PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC, size = 12) Pageable pageable, Model model) {
        Page<Perfume> page = perfumeService.findAll(pageable);
        int[] pagination = ControllerUtils.computePagination(page);

        model.addAttribute("pagination", pagination);
        model.addAttribute("url", "productlist");
        model.addAttribute("page", page);

        return "admin/productList";
    }

    /**
     * Returns a product for editing by an administrator.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/productlist/{perfume}"}, method GET.
     *
     * @param perfume the product to editing.
     * @param model   class object {@link Model}.
     * @return productEdit page with model attributes.
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("productlist/{perfume}")
    public String editProduct(@PathVariable Perfume perfume, Model model) {
        model.addAttribute("perfume", perfume);

        return "admin/productEdit";
    }

    /**
     * Save edited product to the database by an administrator.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/productlist"}, method POST.
     *
     * @param perfume edited product.
     * @param file    file image.
     * @return redirect to "/user/productlist".
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("productlist")
    public String saveEditedProduct(Perfume perfume, @RequestParam("file") MultipartFile file) throws IOException {
        saveFile(perfume, file);

        perfumeService.saveProductInfoById(perfume.getPerfumeTitle(), perfume.getPerfumer(), perfume.getYear(),
                perfume.getCountry(), perfume.getPerfumeGender(), perfume.getFragranceTopNotes(), perfume.getFragranceMiddleNotes(),
                perfume.getFragranceBaseNotes(), perfume.getDescription(), perfume.getFilename(), perfume.getPrice(),
                perfume.getVolume(), perfume.getType(), perfume.getId());

        log.debug("ADMIN save edited product to DB: id={}, perfumer={}, perfume={}",
                perfume.getId(), perfume.getPerfumer(), perfume.getPerfumeTitle());

        return "redirect:/user/productlist";
    }

    /**
     * Returns adding product page.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/add"}, method GET.
     *
     * @return addToDb page.
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("add")
    public String addProductToBd() {
        return "admin/addToDb";
    }

    /**
     * Save new product to the database by an administrator.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/add"}, method POST.
     *
     * @param perfume       saved product.
     * @param bindingResult errors in validating http request.
     * @param model         class object {@link Model}.
     * @param file          file image.
     * @return addToDb page.
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("add")
    public String addProductToBd(
            @Valid Perfume perfume,
            BindingResult bindingResult,
            Model model,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorsMap = ControllerUtils.getErrors(bindingResult);

            model.mergeAttributes(errorsMap);

            return "admin/addToDb";
        } else {
            saveFile(perfume, file);

            perfumeService.save(perfume);

            log.debug("ADMIN added product to DB: id={}, perfumer={}, perfume={}",
                    perfume.getId(), perfume.getPerfumer(), perfume.getPerfumeTitle());
        }

        return "admin/addToDb";
    }

    /**
     * Returns all users.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/user"}, method GET.
     *
     * @param model class object {@link Model}.
     * @return userList page with model attributes.
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public String userList(Model model) {
        model.addAttribute("users", userService.findAll());

        return "admin/userList";
    }

    /**
     * Returns user for edit by an administrator.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/user/{user}"}, method GET.
     *
     * @param user  user id.
     * @param model class object {@link Model}.
     * @return userEdit page with model attributes.
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("{user}")
    public String userEditForm(@PathVariable User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("roles", Role.values());

        return "admin/userEdit";
    }

    /**
     * Save edited user by an administrator.
     * The @PreAuthorize annotation says the controller is accessible
     * only to users with administrator rights.
     * URL request {"/user"}, method POST.
     *
     * @param username user name.
     * @param form     user roles.
     * @param user     user id.
     * @return redirect to "/user".
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public String userSaveEditForm(
            @RequestParam String username,
            @RequestParam Map<String, String> form,
            @RequestParam("userId") User user
    ) {
        userService.userSave(username, form, user);

        log.debug("ADMIN save edited user form: id={}, name={}, form={}", user.getId(), username, form);

        return "redirect:/user";
    }

    /**
     * Returns profile information for current user.
     * URL request {"/user/edit"}, method GET.
     *
     * @param user  request Authenticated user.
     * @param model class object {@link Model}.
     * @return userEditProfile page with model attributes.
     */
    @GetMapping("edit")
    public String getProfileInfo(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("username", user.getUsername());
        model.addAttribute("email", user.getEmail());

        return "user/userEditProfile";
    }

    /**
     * Save edited password or email to the database by user.
     * URL request {"/user/edit"}, method POST.
     *
     * @param user     request Authenticated user.
     * @param password password to change.
     * @param email    email to change.
     * @return redirect to "/user/cabinet".
     */
    @PostMapping("edit")
    public String updateProfileInfo(
            @AuthenticationPrincipal User user,
            @RequestParam String password,
            @RequestParam String email
    ) {
        userService.updateProfile(user, password, email);

        log.debug("{} change personal info: password={}, email={}", user.getUsername(), password, email);

        return "redirect:/cabinet";
    }

    /**
     * Method for saving file in upload directory.
     *
     * @param perfume current product.
     * @param file    file image.
     */
    private void saveFile(Perfume perfume, @RequestParam("file") MultipartFile file) throws IOException {
        if (file != null && !file.getOriginalFilename().isEmpty()) {
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