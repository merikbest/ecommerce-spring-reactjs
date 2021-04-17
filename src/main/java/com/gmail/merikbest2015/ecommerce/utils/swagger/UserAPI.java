package com.gmail.merikbest2015.ecommerce.utils.swagger;

import com.gmail.merikbest2015.ecommerce.dto.PasswordResetRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserResponseDto;
import com.gmail.merikbest2015.ecommerce.security.UserPrincipal;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface UserAPI {

    @ApiOperation(value = "Return user information", response = UserResponseDto.class)
    ResponseEntity<UserResponseDto> getUserInfo(UserPrincipal user);

    @ApiOperation(value = "Update user information", response = UserResponseDto.class)
    ResponseEntity<UserResponseDto> updateUserInfo(UserPrincipal user, UserRequestDto request, BindingResult bindingResult);

    @ApiOperation(value = "Update user password")
    ResponseEntity<String> updateUserPassword(UserPrincipal user, PasswordResetRequestDto passwordReset, BindingResult bindingResult);

    @ApiOperation(value = "Get perfumes in cart by ids", response = PerfumeResponseDto.class, responseContainer = "List")
    ResponseEntity<List<PerfumeResponseDto>> getCart(List<Long> perfumesIds);

    @ApiOperation(value = "Get user orders", response = OrderResponseDto.class, responseContainer = "List")
    ResponseEntity<List<OrderResponseDto>> getAllUserOrders(UserPrincipal user);

    @ApiOperation(value = "Post order", response = OrderResponseDto.class)
    ResponseEntity<OrderResponseDto> postOrder(OrderRequestDto order, BindingResult bindingResult);

    @ApiOperation(value = "Finalize order")
    ResponseEntity<Long> finalizeOrder();

    @ApiOperation(value = "Add review to perfume")
    ResponseEntity<String> addReviewToPerfume(ReviewRequestDto review, BindingResult bindingResult);
}
