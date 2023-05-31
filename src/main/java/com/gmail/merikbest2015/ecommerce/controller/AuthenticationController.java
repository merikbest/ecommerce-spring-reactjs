package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.PasswordResetRequest;
import com.gmail.merikbest2015.ecommerce.dto.auth.AuthenticationRequest;
import com.gmail.merikbest2015.ecommerce.dto.auth.AuthenticationResponse;
import com.gmail.merikbest2015.ecommerce.mapper.AuthenticationMapper;
import com.gmail.merikbest2015.ecommerce.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_AUTH)
public class AuthenticationController {

    private final AuthenticationMapper authenticationMapper;

    @PostMapping(LOGIN)
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationMapper.login(request));
    }

    @GetMapping(FORGOT_EMAIL)
    public ResponseEntity<String> forgotPassword(@PathVariable String email) {
        return ResponseEntity.ok(authenticationMapper.sendPasswordResetCode(email));
    }

    @GetMapping(RESET_CODE)
    public ResponseEntity<String> getEmailByPasswordResetCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.getEmailByPasswordResetCode(code));
    }

    @PostMapping(RESET)
    public ResponseEntity<String> passwordReset(@RequestBody PasswordResetRequest passwordReset) {
        return ResponseEntity.ok(authenticationMapper.passwordReset(passwordReset.getEmail(), passwordReset));
    }

    @PutMapping(EDIT_PASSWORD)
    public ResponseEntity<String> updateUserPassword(@AuthenticationPrincipal UserPrincipal user,
                                                     @Valid @RequestBody PasswordResetRequest passwordReset,
                                                     BindingResult bindingResult) {
        return ResponseEntity.ok(authenticationMapper.passwordReset(user.getEmail(), passwordReset, bindingResult));
    }
}
