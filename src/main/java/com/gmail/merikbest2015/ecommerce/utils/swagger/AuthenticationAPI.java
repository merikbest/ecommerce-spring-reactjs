package com.gmail.merikbest2015.ecommerce.utils.swagger;

import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserResponseDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AuthenticationAPI {

    @ApiOperation(value = "Sign in")
    ResponseEntity<Map<String, Object>> login(AuthenticationRequestDto request);

    @ApiOperation(value = "Password reset request")
    ResponseEntity<String> forgotPassword(PasswordResetRequestDto passwordReset);

    @ApiOperation(value = "Get password reset code")
    ResponseEntity<UserResponseDto> getPasswordResetCode(String code);

    @ApiOperation(value = "Reset password")
    ResponseEntity<String> passwordReset(PasswordResetRequestDto passwordReset);
}
