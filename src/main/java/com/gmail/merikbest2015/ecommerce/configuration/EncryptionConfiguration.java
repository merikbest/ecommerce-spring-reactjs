package com.gmail.merikbest2015.ecommerce.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Encoder configuration class.
 * Marked with @Configuration annotation - the class is the source of the bean definition.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@Configuration
public class EncryptionConfiguration {
    /**
     * Implementation of PasswordEncoder that uses the BCrypt strong hashing function.
     *
     * @return strength the log rounds to use, between 4 and 31.
     */
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(8);
    }
}