package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.PerfumeDto;
import com.gmail.merikbest2015.ecommerce.dto.ReviewDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    private final ModelMapper modelMapper;
    private final PerfumeMapper perfumeMapper;
    private final UserService userService;

    public UserMapper(ModelMapper modelMapper, PerfumeMapper perfumeMapper, UserService userService) {
        this.modelMapper = modelMapper;
        this.perfumeMapper = perfumeMapper;
        this.userService = userService;
    }

    User convertToEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    private Review convertToEntity(ReviewDto reviewDto) {
        return modelMapper.map(reviewDto, Review.class);
    }

    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public UserDto findUserById(Long userId) {
        return convertToDto(userService.findUserById(userId));
    }

    public UserDto findByEmail(String email) {
        return convertToDto(userService.findByEmail(email));
    }

    public List<PerfumeDto> getCart(String email) {
        return perfumeMapper.convertListToDto(userService.getCart(email));
    }

    public List<PerfumeDto> getCartId(List<Long> perfumesIds) {
        return perfumeMapper.convertListToDto(userService.getCartId(perfumesIds));
    }

    public List<UserDto> findAllUsers() {
        return userService.findAllUsers()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto findByUsername(String username) {
        return convertToDto(userService.findByUsername(username));
    }

    public UserDto findByActivationCode(String code) {
        return convertToDto(userService.findByActivationCode(code));
    }

    public UserDto findByPasswordResetCode(String code) {
        return convertToDto(userService.findByPasswordResetCode(code));
    }

    public UserDto saveUser(UserDto userDto) {
        return convertToDto(userService.saveUser(convertToEntity(userDto)));
    }

    public Map<String, Object> login(String email) {
        return userService.login(email);
    }

    public boolean addUser(UserDto userDto) {
        return userService.addUser(convertToEntity(userDto));
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

    public void userSave(String username, Map<String, String> form, UserDto userDto) {
        userService.userSave(username, form, convertToEntity(userDto));
    }

    public void updateProfile(UserDto userDto, String password, String email) {
        userService.updateProfile(convertToEntity(userDto), password, email);
    }

    public void addReviewToPerfume(ReviewDto reviewDto, Long perfumeId) {
        userService.addReviewToPerfume(convertToEntity(reviewDto), perfumeId);
    }
}
