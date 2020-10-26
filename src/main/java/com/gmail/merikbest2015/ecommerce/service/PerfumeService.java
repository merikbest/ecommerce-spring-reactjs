package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.service.Impl.PerfumeServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

/**
 * The service layer interface describes a set of methods for working with objects of the {@link Perfume} class.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Perfume
 * @see PerfumeServiceImpl
 */
public interface PerfumeService {
    /**
     * Return list of all perfumes.
     *
     * @return list of {@link Perfume}.
     */
    List<Perfume> findAll();

    /**
     * Returns list of perfumes.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param pageable object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findAll(Pageable pageable);

    /**
     * Returns list of perfumes in which the price is in the range between of starting price and ending price.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param startingPrice The starting price of the product that the user enters.
     * @param endingPrice   The ending price of the product that the user enters.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPriceBetween(Integer startingPrice, Integer endingPrice, Pageable pageable);

    /**
     * Returns list of perfumes which has the same perfume manufacturer with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumer perfume manufacturer to return.
     * @param pageable object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumer(String perfumer, Pageable pageable);

    /**
     * Returns list of perfumes which has the same gender with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumeGender perfume gender to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumeGender(String perfumeGender, Pageable pageable);

    /**
     * Returns list of perfumes which has the same genders with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumeGenders perfume genders to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumeGenderIn(List<String> perfumeGenders, Pageable pageable);

    /**
     * Returns list of perfumes which has the same perfume manufacturer or perfume title
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
     * Returns list of perfumes which has the same perfume manufacturers and genders
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
     * Returns list of perfumes which has the same perfume manufacturers and genders
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
     * Returns list of perfumes which has the same perfume manufacturers
     * with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumers perfume manufacturers to return.
     * @param pageable  object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    Page<Perfume> findByPerfumerIn (List<String> perfumers, Pageable pageable);

    /**
     * Returns minimum price of perfume.
     *
     * @return minimum price {@link Perfume}.
     */
    BigDecimal minPerfumePrice();

    /**
     * Returns maximum price of perfume from the database.
     *
     * @return maximum price {@link Perfume}.
     */
    BigDecimal maxPerfumePrice();

    /**
     * Save updated perfume.
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
    void saveProductInfoById(String perfumeTitle, String perfumer, Integer year, String country, String perfumeGender,
                             String fragranceTopNotes, String fragranceMiddleNotes, String fragranceBaseNotes, String description,
                             String filename, Integer price, String volume, String type, Long id);

    /**
     * Save perfume info.
     *
     * @param perfume perfume object to return.
     * @return The {@link Perfume} class object which will be saved in the database.
     */
    Perfume save(Perfume perfume);
}