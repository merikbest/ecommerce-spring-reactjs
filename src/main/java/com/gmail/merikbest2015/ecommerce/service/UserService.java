package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.User;
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
     * Return true if user is not exists.
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
     * Send message to user email with activation code.
     *
     * @param user the user to whom a message with an activation code will be sent to email.
     */
    void sendMessage(User user);

    /**
     * Return list of all registered users.
     *
     * @return list of {@link User}.
     */
    List<User> findAll();

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
     * Save user info.
     *
     * @param user user object to return.
     * @return The {@link User} class object which will be saved in the database.
     */
    User save(User user);

    User findByEmail(String email);

    User getOne(Long id);
}