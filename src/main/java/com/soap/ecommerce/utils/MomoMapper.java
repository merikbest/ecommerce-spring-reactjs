package com.soap.ecommerce.utils;

import com.mservice.paygate.models.CaptureMoMoResponse;
import com.soap.ecommerce.dto.momo.CaptureResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class MomoMapper {

    private static final Logger logger = LoggerFactory.getLogger(MomoMapper.class);

    public CaptureResponse convertToCaptureResponse(CaptureMoMoResponse captureMoMoResponse){
        CaptureResponse captureResponse = null;
        if (!isNull(captureMoMoResponse)){
            captureResponse = CaptureResponse.builder()
                    .orderId(captureMoMoResponse.getOrderId().split("_")[1])
                    .requestId(captureMoMoResponse.getRequestId())
                    .message(captureMoMoResponse.getMessage())
                    .payUrl(captureMoMoResponse.getPayUrl())
                    .build();
        }
        return captureResponse;
    }

    private boolean isNull(final Object object){
        return object == null;
    }

}
