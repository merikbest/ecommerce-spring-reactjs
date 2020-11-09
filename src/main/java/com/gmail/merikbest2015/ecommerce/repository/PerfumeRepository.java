package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * A repository for {@link Perfume} objects providing a set of JPA methods for working with the database.
 * Inherits interface {@link JpaRepository}.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 * @see Perfume
 * @see JpaRepository
 */
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
    /**
     * Returns list of perfumes from the database which has the same perfume manufacturers and genders
     * with the value of the input parameter.
     *
     * @param perfumers perfume manufacturers to return.
     * @param genders   genders to return.
     * @return list of {@link Perfume}.
     */
    List<Perfume> findByPerfumerInAndPerfumeGenderInOrderByPriceDesc(List<String> perfumers, List<String> genders);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturers or genders
     * with the value of the input parameter.
     *
     * @param perfumers perfume manufacturers to return.
     * @param genders   genders to return.
     * @return list of {@link Perfume}.
     */
    List<Perfume> findByPerfumerInOrPerfumeGenderInOrderByPriceDesc(List<String> perfumers, List<String> genders);

    /**
     * Returns list of perfumes from the database in which the price is in the range between of starting price
     * and ending price.
     *
     * @param startingPrice the starting price of the product that the user enters.
     * @param endingPrice   the ending price of the product that the user enters.
     * @return list of {@link Perfume}.
     */
    List<Perfume> findByPriceBetweenOrderByPriceDesc(Integer startingPrice, Integer endingPrice);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturer with the value of
     * the input parameter.
     *
     * @param perfumer perfume manufacturer to return.
     * @return list of {@link Perfume}.
     */
    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);

    /**
     * Returns list of perfumes from the database which has the same gender with the value of the input parameter.
     *
     * @param perfumeGender perfume gender to return.
     * @return list of {@link Perfume}.
     */
    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender);

    /**
     * Save updated perfume to the database.
     * The @Modifying annotation declaring manipulating queries.
     * The @Transactional annotation - before the execution of the method marked with this annotation,
     * a transaction starts, after the method is executed, the transaction is committed,
     * and when a RuntimeException is thrown, it is rolled back.
     * The @Query annotation to declare finder queries directly on repository methods.
     *
     * @param perfumeTitle          perfume title to update.
     * @param perfumer              perfume manufacturer to update.
     * @param year                  the year the perfume was released to update.
     * @param country               manufacturer country to update.
     * @param perfumeGender         gender to update to update.
     * @param fragranceTopNotes     fragrance top notes to update.
     * @param fragranceMiddleNotes  fragrance middle notes to update.
     * @param fragranceBaseNotes    fragrance base notes to update.
     * @param description           perfume description to update.
     * @param filename              perfume image to update.
     * @param price                 perfume price to update.
     * @param volume                perfume volume to update.
     * @param type                  type of fragrance to update.
     * @param id                    the unique code of the perfume to update.
     */
    @Modifying
    @Transactional
    @Query("update Perfume p set p.perfumeTitle = ?1, p.perfumer = ?2, p.year = ?3, p.country = ?4, " +
            "p.perfumeGender = ?5, p.fragranceTopNotes = ?6, p.fragranceMiddleNotes = ?7, p.fragranceBaseNotes = ?8," +
            "p.description = ?9, p.filename = ?10, p.price = ?11, p.volume = ?12, p.type = ?13  where p.id = ?14")
    void saveProductInfoById(String perfumeTitle, String perfumer, Integer year, String country, String perfumeGender,
                             String fragranceTopNotes, String fragranceMiddleNotes, String fragranceBaseNotes, String description,
                             String filename, Integer price, String volume, String type, Long id);
}