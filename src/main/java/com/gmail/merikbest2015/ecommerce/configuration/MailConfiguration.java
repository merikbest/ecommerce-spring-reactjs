package com.gmail.merikbest2015.ecommerce.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

/**
 * Email configuration class.
 * Marked with @Configuration annotation - the class is the source of the bean definition.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see JavaMailSender
 * @see MailProperties
 */
@Configuration
public class MailConfiguration {
    /**
     * SMTP server host.
     */
    @Value("${spring.mail.host}")
    private String host;

    /**
     * Login user of the SMTP server.
     */
    @Value("${spring.mail.username}")
    private String username;

    /**
     * Login password of the SMTP server.
     */
    @Value("${spring.mail.password}")
    private String password;

    /**
     * SMTP server port.
     */
    @Value("${spring.mail.port}")
    private int port;

    /**
     * Protocol used by the SMTP server.
     */
    @Value("${spring.mail.protocol}")
    private String protocol;

    /**
     * SMTP authentication.
     * If true, attempt to authenticate the user using the AUTH command.
     */
    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String auth;

    /**
     * If true, enables the use of the STARTTLS command (if supported by the server)
     * to switch the connection to a TLS-protected connection before issuing any login commands.
     */
    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private String enable;

    /**
     * The initial debug mode.
     */
    @Value("${mail.debug}")
    private String debug;

    /**
     * Returns JavaMailSender bean.
     *
     * @return JavaMailSender bean.
     */
    @Bean
    public JavaMailSender getMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties mailProperties = mailSender.getJavaMailProperties();
        mailProperties.setProperty("mail.transport.protocol", protocol);
        mailProperties.setProperty("mail.debug", debug);
        mailProperties.setProperty("mail.smtp.auth", auth);
        mailProperties.setProperty("mail.smtp.starttls.enable", enable);

        return mailSender;
    }
}
