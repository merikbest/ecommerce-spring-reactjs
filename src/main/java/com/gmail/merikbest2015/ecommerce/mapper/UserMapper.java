package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponse;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequest;
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

    public List<PerfumeResponse> getCart(List<Long> perfumesIds) {
        return commonMapper.convertToResponseList(userService.getCart(perfumesIds), PerfumeResponse.class);
    }

    public List<UserResponse> findAllUsers() {
        return commonMapper.convertToResponseList(userService.findAllUsers(), UserResponse.class);
    }

    public UserResponse updateProfile(String email, UserRequest userRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        User user = commonMapper.convertToEntity(userRequest, User.class);
        return commonMapper.convertToResponse(userService.updateProfile(email, user), UserResponse.class);
    }

    public PerfumeResponse addReviewToPerfume(ReviewRequest reviewRequest, Long perfumeId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Review review = commonMapper.convertToEntity(reviewRequest, Review.class);
        return commonMapper.convertToResponse(userService.addReviewToPerfume(review, perfumeId), PerfumeResponse.class);
    }
}
