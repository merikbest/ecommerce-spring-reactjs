package com.gmail.merikbest2015.ecommerce.utils.swagger;

import com.gmail.merikbest2015.ecommerce.dto.order.OrderResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserResponseDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdminAPI {

    @ApiOperation(value = "Add perfume to database", response = PerfumeResponseDto.class)
    ResponseEntity<PerfumeResponseDto> addPerfume(MultipartFile file, PerfumeRequestDto perfume, BindingResult bindingResult);

    @ApiOperation(value = "Update perfume", response = PerfumeResponseDto.class)
    ResponseEntity<PerfumeResponseDto> updatePerfume(MultipartFile file, PerfumeRequestDto perfume, BindingResult bindingResult);

    @ApiOperation(value = "Get all orders from database", response = OrderResponseDto.class, responseContainer = "List")
    ResponseEntity<List<OrderResponseDto>> getAllOrders();

    @ApiOperation(value = "Get user order by email", response = OrderResponseDto.class, responseContainer = "List")
    ResponseEntity<List<OrderResponseDto>> getUserOrdersByEmail(UserRequestDto user);

    @ApiOperation(value = "Get user by id", response = UserResponseDto.class)
    ResponseEntity<UserResponseDto> getUser(Long userId);

    @ApiOperation(value = "Get users from database", response = UserResponseDto.class, responseContainer = "List")
    ResponseEntity<List<UserResponseDto>> getAllUsers();
}
