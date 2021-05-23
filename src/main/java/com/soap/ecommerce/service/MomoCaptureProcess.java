package com.soap.ecommerce.service;

import com.soap.ecommerce.dto.momo.CaptureRequest;
import com.soap.ecommerce.dto.momo.CaptureResponse;

public interface MomoCaptureProcess {
    CaptureResponse execute(CaptureRequest paymentRequest);
}
