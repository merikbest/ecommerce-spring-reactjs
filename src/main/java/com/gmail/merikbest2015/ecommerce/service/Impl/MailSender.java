package com.gmail.merikbest2015.ecommerce.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * The class of the service layer for working with email.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see JavaMailSender
 * @see SimpleMailMessage
 */
@Service
public class MailSender {
    /**
     * Implementation of the {@link JavaMailSender} interface
     * to send messages to email.
     */
    private final JavaMailSender mailSender;

    /**
     * Login user of the SMTP server.
     */
    @Value("${spring.mail.username}")
    private String username;

    /**
     * Constructor for initializing the main variables of the mail service.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param mailSender implementation of the {@link JavaMailSender} interface
     *                   to send messages to email.
     */
    @Autowired
    public MailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends a message with the specified parameters.
     *
     * @param emailTo The email address to which the message will be sent.
     * @param subject Message subject.
     * @param message Message text.
     */
    public void send(String emailTo, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(username);
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailSender.send(mailMessage);
    }
}