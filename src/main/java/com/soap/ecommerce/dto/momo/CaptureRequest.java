package com.soap.ecommerce.dto.momo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaptureRequest {

    @NotBlank
    private String orderId;
    @NotBlank
    private String requestId;
    @NotBlank
    private String orderInfo;
    private String returnUrl;
    private String notifyUrl;
    private String extraData;
    @NotNull
    private Long amount;
}
