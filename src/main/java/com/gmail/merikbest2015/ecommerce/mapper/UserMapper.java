package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.perfume.FullPerfumeResponse;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequest;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponse;
import com.gmail.merikbest2015.ecommerce.dto.user.BaseUserResponse;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequest;
import com.gmail.merikbest2015.ecommerce.dto.user.UserResponse;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final CommonMapper commonMapper;
    private final UserService userService;

    public UserResponse findUserById(Long userId) {
        return commonMapper.convertToResponse(userService.findUserById(userId), UserResponse.class);
    }

    public UserResponse findUserByEmail(String email) {
        return commonMapper.convertToResponse(userService.findUserByEmail(email), UserResponse.class);
    }

    public List<FullPerfumeResponse> getCart(List<Long> perfumesIds) {
        return commonMapper.convertToResponseList(userService.getCart(perfumesIds), FullPerfumeResponse.class);
    }

    public List<BaseUserResponse> findAllUsers() {
        return commonMapper.convertToResponseList(userService.findAllUsers(), BaseUserResponse.class);
    }

    public UserResponse updateProfile(String email, UserRequest userRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        User user = commonMapper.convertToEntity(userRequest, User.class);
        return commonMapper.convertToResponse(userService.updateProfile(email, user), UserResponse.class);
    }

    public ReviewResponse addReviewToPerfume(ReviewRequest reviewRequest, Long perfumeId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Review review = commonMapper.convertToEntity(reviewRequest, Review.class);
        return commonMapper.convertToResponse(userService.addReviewToPerfume(review, perfumeId), ReviewResponse.class);
    }
}
