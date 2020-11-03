package com.gmail.merikbest2015.ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Set;

/**
 * Data Transfer Object class which receives responses from google services.
 * The response is a JSON object.
 * The @Value annotation generates getters and setters.
 * The @JsonIgnoreProperties annotation indicate that any properties not bound in this type should be ignored.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class CaptchaResponseDto {
    /**
     * Successful status from response.
     */
    private boolean success;

    /**
     * Errors from response.
     * The @JsonAlias annotation used to define one or more alternative names for property,
     * accepted during deserialization as alternative to the official name.
     */
    @JsonAlias("error-codes")
    private Set<String> errorCodes;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Set<String> getErrorCodes() {
        return errorCodes;
    }

    public void setErrorCodes(Set<String> errorCodes) {
        this.errorCodes = errorCodes;
    }
}
