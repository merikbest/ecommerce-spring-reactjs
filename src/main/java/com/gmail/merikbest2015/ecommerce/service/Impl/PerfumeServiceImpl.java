package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * The service layer class implements the accessor methods of {@link Perfume} objects
 * in the {@link PerfumeService} interface database.
 * The class is marked with the @Service annotation - an annotation announcing that this class
 * is a service - a component of the service layer. Service is a subtype of @Component class.
 * Using this annotation will automatically search for service beans.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Perfume
 * @see PerfumeService
 * @see PerfumeRepository
 */
@Service
public class PerfumeServiceImpl implements PerfumeService {
    /**
     * Implementation of the {@link PerfumeRepository} interface
     * for working with perfumes with a database.
     */
    private final PerfumeRepository perfumeRepository;

    /**
     * Constructor for initializing the main variables of the order service.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param perfumeRepository implementation of the {@link PerfumeRepository} interface
     *                        for working with perfumes with a database.
     */
    @Autowired
    public PerfumeServiceImpl(PerfumeRepository perfumeRepository) {
        this.perfumeRepository = perfumeRepository;
    }

    /**
     * Return list of all perfumes.
     *
     * @return list of {@link Perfume}.
     */
    @Override
    public List<Perfume> findAll() {
        return perfumeRepository.findAll();
    }

    /**
     * Returns list of perfumes.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param pageable object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    @Override
    public Page<Perfume> findAll(Pageable pageable) {
        return perfumeRepository.findAll(pageable);
    }

    /**
     * Returns list of perfumes in which the price is in the range between of starting price and ending price.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param startingPrice The starting price of the product that the user enters.
     * @param endingPrice   The ending price of the product that the user enters.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    @Override
    public Page<Perfume> findByPriceBetween(Integer startingPrice, Integer endingPrice, Pageable pageable) {
        return perfumeRepository.findByPriceBetween(startingPrice, endingPrice, pageable);
    }

    /**
     * Returns list of perfumes which has the same perfume manufacturer with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumer perfume manufacturer to return.
     * @param pageable object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    @Override
    public Page<Perfume> findByPerfumer(String perfumer, Pageable pageable) {
        return perfumeRepository.findByPerfumer(perfumer, pageable);
    }

    /**
     * Returns list of perfumes which has the same gender with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumeGender perfume gender to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    @Override
    public Page<Perfume> findByPerfumeGender(String perfumeGender, Pageable pageable) {
        return perfumeRepository.findByPerfumeGender(perfumeGender, pageable);
    }

    /**
     * Returns list of perfumes which has the same genders with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumeGenders perfume genders to return.
     * @param pageable      object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    @Override
    public Page<Perfume> findByPerfumeGenderIn(List<String> perfumeGenders, Pageable pageable) {
        return perfumeRepository.findByPerfumeGenderIn(perfumeGenders, pageable);
    }

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
    @Override
    public Page<Perfume> findByPerfumerOrPerfumeTitle(String perfumer, String perfumeTitle, Pageable pageable) {
        return perfumeRepository.findByPerfumerOrPerfumeTitle(perfumer, perfumeTitle, pageable);
    }

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
    @Override
    public Page<Perfume> findByPerfumerInAndPerfumeGenderIn(List<String> perfumers, List<String> genders, Pageable pageable) {
        return perfumeRepository.findByPerfumerInAndPerfumeGenderIn(perfumers, genders, pageable);
    }

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
    @Override
    public Page<Perfume> findByPerfumerInOrPerfumeGenderIn(List<String> perfumers, List<String> genders, Pageable pageable) {
        return perfumeRepository.findByPerfumerInOrPerfumeGenderIn(perfumers, genders, pageable);
    }

    /**
     * Returns list of perfumes which has the same perfume manufacturers
     * with the value of the input parameter.
     * A {@link Page} is a sublist of a list of objects.
     *
     * @param perfumers perfume manufacturers to return.
     * @param pageable  object that specifies the information of the requested page.
     * @return list of {@link Perfume}.
     */
    @Override
    public Page<Perfume> findByPerfumerIn(List<String> perfumers, Pageable pageable) {
        return perfumeRepository.findByPerfumerIn(perfumers, pageable);
    }

    /**
     * Returns minimum price of perfume.
     *
     * @return minimum price {@link Perfume}.
     */
    @Override
    public BigDecimal minPerfumePrice() {
        return perfumeRepository.minPerfumePrice();
    }

    /**
     * Returns maximum price of perfume from the database.
     *
     * @return maximum price {@link Perfume}.
     */
    @Override
    public BigDecimal maxPerfumePrice() {
        return perfumeRepository.maxPerfumePrice();
    }

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
    @Override
    public void saveProductInfoById(String perfumeTitle, String perfumer, Integer year, String country,
                                    String perfumeGender, String fragranceTopNotes, String fragranceMiddleNotes,
                                    String fragranceBaseNotes, String description, String filename,
                                    Integer price, String volume, String type, Long id
    ) {
        perfumeRepository.saveProductInfoById(perfumeTitle, perfumer, year, country, perfumeGender, fragranceTopNotes,
                fragranceMiddleNotes, fragranceBaseNotes, description, filename, price, volume, type, id);
    }

    /**
     * Save perfume info.
     *
     * @param perfume perfume object to return.
     * @return The {@link Perfume} class object which will be saved in the database.
     */
    @Override
    public Perfume save(Perfume perfume) {
        return perfumeRepository.save(perfume);
    }
}
