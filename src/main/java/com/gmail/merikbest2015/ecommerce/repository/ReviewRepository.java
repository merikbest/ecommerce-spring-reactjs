package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * A repository for {@link Review} objects providing a set of JPA methods for working with the database.
 * Inherits interface {@link JpaRepository}.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Review
 * @see JpaRepository
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
