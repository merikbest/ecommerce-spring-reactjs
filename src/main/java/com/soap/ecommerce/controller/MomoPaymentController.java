package com.soap.ecommerce.controller;

import com.soap.ecommerce.dto.momo.CaptureRequest;
import com.soap.ecommerce.dto.momo.CaptureResponse;
import com.soap.ecommerce.service.MomoCaptureProcess;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RequestMapping("/api/v1/momos")
@RequiredArgsConstructor
@RestController
public class MomoPaymentController {

    private final MomoCaptureProcess momoCaptureProcess;

    @PostMapping
    public ResponseEntity<String> payBill(@Validated @RequestBody CaptureRequest captureRequest){
        CaptureResponse captureResponse = momoCaptureProcess.execute(captureRequest);
        if (Objects.nonNull(captureResponse)){
            return new ResponseEntity<>(captureResponse.getPayUrl(), HttpStatus.OK);
        }
        else {
            final String serverError = "Can not execute payment";
            return new ResponseEntity<>(serverError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
