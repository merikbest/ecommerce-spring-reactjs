package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetDto;
import com.gmail.merikbest2015.ecommerce.service.Impl.UserServiceImpl;

import java.util.List;
import java.util.Map;

/**
 * The service layer interface describes a set of methods for working with objects of the {@link User} class.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see User
 * @see UserServiceImpl
 */
public interface UserService {
    /**
     * Retrieves an User by its id.
     *
     * @param id must not be null.
     * @return User with the given id.
     */
    User getOne(Long id);

    /**
     * Returns the user with the same email as the value of the input parameter.
     *
     * @param email user email to return.
     * @return The {@link User} class object.
     */
    User findByEmail(String email);

    /**
     * Return list of all registered users.
     *
     * @return list of {@link User}.
     */
    List<User> findAll();

    /**
     * Returns the user with the same name as the value of the input parameter.
     *
     * @param username user name to return.
     * @return The {@link User} class object.
     */
    User findByUsername(String username);

    /**
     * Returns the user that has the same activation code as the value of the input parameter.
     *
     * @param code activation code to return.
     * @return The {@link User} class object.
     */
    User findByActivationCode(String code);

    /**
     * Returns the user that has the same password reset code as the value of the input parameter.
     *
     * @param code password reset code.
     * @return The {@link User} class object.
     */
    User findByPasswordResetCode(String code);

    /**
     * Save user info.
     *
     * @param user user object to return.
     * @return The {@link User} class object which will be saved in the database.
     */
    User save(User user);

    /**
     * Save user in database and send activation code to user email.
     *
     * @param user user who has registered.
     * @return true if the user is not exists.
     */
    boolean addUser(User user);

    /**
     * Return true if activation code is exists.
     *
     * @param code activation code from the database.
     * @return true if activation code is exists.
     */
    boolean activateUser(String code);

    /**
     * Send message to user email with activation/reset code.
     *
     * @param user the user to whom a message with an activation code will be sent to email.
     * @param emailMessages email message body.
     * @param subject email message subject.
     * @param code activation/reset code.
     * @param urlPart part of url.
     */
    void sendMessage(User user, List<String> emailMessages, String subject, String code, String urlPart);

    /**
     * Send password reset code to user email.
     *
     * @param email users email.
     * @return true if user email is exists.
     */
    boolean sendPasswordResetCode(String email);

    /**
     * Reset user password.
     *
     * @param passwordReset data transfer object with user email and password.
     */
    void passwordReset(PasswordResetDto passwordReset);

    /**
     * Save updated user with set of roles.
     *
     * @param username user name of registered user.
     * @param form     form of user roles.
     * @param user     user from the database.
     */
    void userSave(String username, Map<String, String> form, User user);

    /**
     * Save updated user profile with new password or email.
     *
     * @param user      user from the database.
     * @param password  the user's password to be changed.
     * @param email     the user's email to be changed.
     */
    void updateProfile(User user, String password, String email);

    /**
     * Save perfume review.
     *
     * @param review    review for current perfume with author and message
     * @param perfumeId perfume id in database
     */
    void addReviewToPerfume(Review review, Long perfumeId);
}