package com.gmail.merikbest2015.ecommerce.repository;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * A repository for {@link Perfume} objects providing a set of JPA methods for working with the database.
 * Inherits interface {@link JpaRepository}.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Perfume
 * @see JpaRepository
 */
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
    /**
     * Returns list of perfumes from the database.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param pageable object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findAll(Pageable pageable);

    /**
     * Returns list of perfumes from the database in which the price is in the range between of starting price and ending price.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param startingPrice The starting price of the product that the user enters.
     * @param endingPrice   The ending price of the product that the user enters.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPriceBetween(Integer startingPrice, Integer endingPrice, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturer with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumer perfume manufacturer to return.
     * @param pageable object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumer(String perfumer, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same gender with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumeGender perfume gender to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumeGender(String perfumeGender, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same genders with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumeGenders perfume genders to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumeGenderIn(List<String> perfumeGenders, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturer or perfume title
     * with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumer      perfume manufacturer to return.
     * @param perfumeTitle  perfume title to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumerOrPerfumeTitle(String perfumer, String perfumeTitle, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturers and genders
     * with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumers perfume manufacturers to return.
     * @param genders   genders to return.
     * @param pageable  object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumerInAndPerfumeGenderIn(List<String> perfumers, List<String> genders, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturers and genders
     * with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumers perfume manufacturers to return.
     * @param genders   genders to return.
     * @param pageable  object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumerInOrPerfumeGenderIn (List<String> perfumers, List<String> genders, Pageable pageable);

    /**
     * Returns list of perfumes from the database which has the same perfume manufacturers
     * with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumers perfume manufacturers to return.
     * @param pageable  object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumerIn (List<String> perfumers, Pageable pageable);

    /**
     * Returns minimum price of perfume from the database.
     * The @Query annotation to declare finder queries directly on repository methods.
     *
     * @return minimum price {@link Perfume}.
     */
    @Query(value = "SELECT min(price) FROM Perfume ")
    BigDecimal minPerfumePrice();

    /**
     * Returns maximum price of perfume from the database.
     * The @Query annotation to declare finder queries directly on repository methods.
     *
     * @return maximum price {@link Perfume}.
     */
    @Query(value = "SELECT max(price) FROM Perfume ")
    BigDecimal maxPerfumePrice();

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

    //doc
    Optional<Perfume> findById(Long id);

    //doc
    List<Perfume> findByPerfumerInAndPerfumeGenderInOrderByPriceDesc(List<String> perfumers, List<String> genders);
    List<Perfume> findByPerfumerInOrPerfumeGenderInOrderByPriceDesc(List<String> perfumers, List<String> genders);
    List<Perfume> findByPriceBetweenOrderByPriceDesc(Integer startingPrice, Integer endingPrice);
    List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer);
    List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender);
}