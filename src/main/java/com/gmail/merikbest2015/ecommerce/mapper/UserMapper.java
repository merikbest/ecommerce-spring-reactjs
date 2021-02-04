package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoOut;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoOut;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final PerfumeMapper perfumeMapper;
    private final UserService userService;

    User convertToEntity(UserDtoIn userDto) {
        return modelMapper.map(userDto, User.class);
    }

    private Review convertToEntity(ReviewDtoIn reviewDto) {
        return modelMapper.map(reviewDto, Review.class);
    }

    private UserDtoIn convertToDtoIn(User user) {
        return modelMapper.map(user, UserDtoIn.class);
    }

    private UserDtoOut convertToDtoOut(User user) {
        return modelMapper.map(user, UserDtoOut.class);
    }

    public UserDtoOut findUserById(Long userId) {
        return convertToDtoOut(userService.findUserById(userId));
    }

    public UserDtoOut findUserByEmail(String email) {
        return convertToDtoOut(userService.findUserByEmail(email));
    }

    public List<PerfumeDtoOut> getCart(List<Long> perfumesIds) {
        return perfumeMapper.convertListToDtoOut(userService.getCart(perfumesIds));
    }

    public List<UserDtoOut> findAllUsers() {
        return userService.findAllUsers()
                .stream()
                .map(this::convertToDtoOut)
                .collect(Collectors.toList());
    }

    public UserDtoOut findByPasswordResetCode(String code) {
        return convertToDtoOut(userService.findByPasswordResetCode(code));
    }

    public UserDtoIn saveUser(UserDtoIn userDtoIn) {
        return convertToDtoIn(userService.saveUser(convertToEntity(userDtoIn)));
    }

    public Map<String, Object> login(String email) {
        return userService.login(email);
    }

    public boolean addUser(UserDtoIn userDtoIn) {
        return userService.addUser(convertToEntity(userDtoIn));
    }

    public boolean activateUser(String code) {
        return userService.activateUser(code);
    }

    public boolean sendPasswordResetCode(String email) {
        return userService.sendPasswordResetCode(email);
    }

    public void passwordReset(String email, String password) {
        userService.passwordReset(email, password);
    }

    public void userSave(String username, Map<String, String> form, UserDtoIn userDtoIn) {
        userService.userSave(username, form, convertToEntity(userDtoIn));
    }

    public void updateProfile(UserDtoIn userDto, String password, String email) {
        userService.updateProfile(convertToEntity(userDto), password, email);
    }

    public void addReviewToPerfume(ReviewDtoIn reviewDto, Long perfumeId) {
        userService.addReviewToPerfume(convertToEntity(reviewDto), perfumeId);
    }
}
