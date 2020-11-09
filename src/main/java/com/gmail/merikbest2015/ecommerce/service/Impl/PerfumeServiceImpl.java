package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The service layer class implements the accessor methods of {@link Perfume} objects
 * in the {@link PerfumeService} interface database.
 * The class is marked with the @Service annotation - an annotation announcing that this class
 * is a service - a component of the service layer. Service is a subtype of @Component class.
 * Using this annotation will automatically search for service beans.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
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
     * Constructor for initializing the main variables of the perfume service.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param perfumeRepository implementation of the {@link PerfumeRepository} interface
     *                          for working with perfumes with a database.
     */
    @Autowired
    public PerfumeServiceImpl(PerfumeRepository perfumeRepository) {
        this.perfumeRepository = perfumeRepository;
    }

    /**
     * Retrieves an Perfume by its id.
     *
     * @param id must not be null.
     * @return the Perfume with the given id.
     */
    @Override
    public Perfume getOne(Long id) {
        return perfumeRepository.getOne(id);
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
     * Returns list of perfumes which has the same perfume manufacturers, perfume genders and
     * the price is in the range between of starting price and ending price with the value of
     * the input parameter.
     *
     * @param perfumers perfume manufacturers to return.
     * @param genders   perfume genders to return.
     * @param prices    perfume price range
     * @return list of {@link Perfume}.
     */
    //TODO rewrite filter logic
    @Override
    public List<Perfume> filter(List<String> perfumers, List<String> genders, List<Integer> prices) {
        List<Perfume> perfumeList;

        if (!prices.isEmpty()) {
            perfumeList = perfumeRepository.findByPriceBetweenOrderByPriceDesc(prices.get(0), prices.get(1));
        } else if (!perfumers.isEmpty() && !genders.isEmpty()) {
            perfumeList = perfumeRepository.findByPerfumerInAndPerfumeGenderInOrderByPriceDesc(perfumers, genders);
        } else if (!perfumers.isEmpty() || !genders.isEmpty()) {
            perfumeList = perfumeRepository.findByPerfumerInOrPerfumeGenderInOrderByPriceDesc(perfumers, genders);
        } else {
            perfumeList = perfumeRepository.findAll();
        }

        return perfumeList;
    }

    /**
     * Returns list of perfumes which has the same perfume manufacturer with the value of the input parameter.
     *
     * @param perfumer perfume manufacturer to return.
     * @return list of {@link Perfume}.
     */
    @Override
    public List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer) {
        return perfumeRepository.findByPerfumerOrderByPriceDesc(perfumer);
    }

    /**
     * Returns list of perfumes which has the same gender with the value of the input parameter.
     *
     * @param perfumeGender perfume gender to return.
     * @return list of {@link Perfume}.
     */
    @Override
    public List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender) {
        return perfumeRepository.findByPerfumeGenderOrderByPriceDesc(perfumeGender);
    }

    /**
     * Save updated perfume.
     *
     * @param perfumeTitle         perfume title to update.
     * @param perfumer             perfume manufacturer to update.
     * @param year                 the year the perfume was released to update.
     * @param country              manufacturer country to update.
     * @param perfumeGender        gender to update to update.
     * @param fragranceTopNotes    fragrance top notes to update.
     * @param fragranceMiddleNotes fragrance middle notes to update.
     * @param fragranceBaseNotes   fragrance base notes to update.
     * @param description          perfume description to update.
     * @param filename             perfume image to update.
     * @param price                perfume price to update.
     * @param volume               perfume volume to update.
     * @param type                 type of fragrance to update.
     * @param id                   the unique code of the perfume to update.
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
