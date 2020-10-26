package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * A repository for {@link Order} objects providing a set of JPA methods for working with the database.
 * Inherits interface {@link JpaRepository}.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Order
 * @see JpaRepository
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    /**
     * Returns list of orders authenticated user.
     *
     * @param user name of authenticated user.
     * @return An object of type {@link List} is a list of orders of authenticated user.
     */
    List<Order> findOrderByUser(User user);
}