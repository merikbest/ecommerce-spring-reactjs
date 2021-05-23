package com.soap.ecommerce.service.Impl;

import com.mservice.paygate.models.CaptureMoMoRequest;
import com.mservice.paygate.models.CaptureMoMoResponse;
import com.mservice.paygate.processor.allinone.CaptureMoMoProcess;
import com.mservice.shared.exception.MoMoException;
import com.mservice.shared.sharedmodels.Environment;
import com.soap.ecommerce.dto.momo.CaptureRequest;
import com.soap.ecommerce.dto.momo.CaptureResponse;
import com.soap.ecommerce.service.MomoCaptureProcess;
import com.soap.ecommerce.utils.MomoEnvironment;
import com.soap.ecommerce.utils.MomoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MomoCaptureProcessIml implements MomoCaptureProcess {
    private static final Logger logger = LoggerFactory.getLogger(MomoCaptureProcessIml.class);

    @Value("${momo.return.url}")
    private String RETURN_URL_BASE;

    private final MomoEnvironment momoEnvironment;
    private final MomoMapper momoMapper;

    @Autowired
    public MomoCaptureProcessIml(MomoEnvironment momoEnvironment, MomoMapper momoMapper) {
        this.momoEnvironment = momoEnvironment;
        this.momoMapper = momoMapper;
    }

    @Override
    @Transactional
    public CaptureResponse execute(CaptureRequest paymentRequest) {
        final CaptureMoMoRequest captureMoMoRequest = createPaymentRequest(paymentRequest);
        try {
            final CaptureMoMoProcess process = getCaptureProcess();
            CaptureMoMoResponse captureMoMoResponse = process.execute(captureMoMoRequest);
            return momoMapper.convertToCaptureResponse(captureMoMoResponse);
        } catch (MoMoException e) {
            logger.error("fail to execute payment capture momo: {}", e);
            e.printStackTrace();
            return null;
        }
    }

    private CaptureMoMoRequest createPaymentRequest(CaptureRequest paymentRequest){
        final CaptureMoMoProcess process = getCaptureProcess();

        final String returnUrl = RETURN_URL_BASE;
        paymentRequest.setOrderId(String.valueOf(System.currentTimeMillis()));
        paymentRequest.setRequestId(String.valueOf(System.currentTimeMillis()));
        final CaptureMoMoRequest captureMoMoRequest = process.createPaymentCreationRequest(
                String.format("%s_%s", System.currentTimeMillis(), paymentRequest.getOrderId()),
                paymentRequest.getRequestId(),
                String.valueOf(paymentRequest.getAmount()),
                paymentRequest.getOrderInfo(),
                returnUrl,
                paymentRequest.getNotifyUrl(),
                paymentRequest.getExtraData()
        );
        return captureMoMoRequest;
    }

    private CaptureMoMoProcess getCaptureProcess(){
        final Environment environment = momoEnvironment.getMomoEnvironment();
        final CaptureMoMoProcess process = new CaptureMoMoProcess(environment);
        return process;
    }
}
