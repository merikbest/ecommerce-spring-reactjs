package com.soap.ecommerce.utils;

import com.mservice.shared.sharedmodels.Environment;
import com.mservice.shared.sharedmodels.PartnerInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MomoEnvironment {

    @Value("${momo.partner.code}")
    private String PARTNER_CODE;

    @Value("${momo.access.key}")
    private String ACCESS_KEY;

    @Value("${momo.secret.key}")
    private String SECRET_KEY;

    @Value("${momo.end.point}")
    private String END_POINT;

    @Value("${momo.target.environent}")
    private String TARGET_ENVIRONMENT;

    public MomoEnvironment() {
    }

    public Environment getMomoEnvironment() {
        final PartnerInfo partnerInfo = new PartnerInfo(PARTNER_CODE, ACCESS_KEY, SECRET_KEY);
        final Environment environment = new Environment(END_POINT, partnerInfo, TARGET_ENVIRONMENT);
        return environment;
    }
}
