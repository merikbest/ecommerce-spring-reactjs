package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.service.PerfumeService;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PerfumeServiceImpl implements PerfumeService {

    @Value("${upload.path}")
    private String uploadPath;
    private final PerfumeRepository perfumeRepository;

    @Override
    public DataFetcher<Perfume> getPerfumeByQuery() {
        return dataFetchingEnvironment -> {
            Long perfumeId = dataFetchingEnvironment.getArgument("id");
            return perfumeRepository.findById(perfumeId).get();
        };
    }

    @Override
    public DataFetcher<List<Perfume>> getAllPerfumesByQuery() {
        return dataFetchingEnvironment -> perfumeRepository.findAll();
    }

    @Override
    public Perfume findPerfumeById(Long perfumeId) {
        return perfumeRepository.findById(perfumeId).get();
    }

    @Override
    public List<Perfume> findAllPerfumes() {
        return perfumeRepository.findAll();
    }

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

    @Override
    public List<Perfume> findByPerfumerOrderByPriceDesc(String perfumer) {
        return perfumeRepository.findByPerfumerOrderByPriceDesc(perfumer);
    }

    @Override
    public List<Perfume> findByPerfumeGenderOrderByPriceDesc(String perfumeGender) {
        return perfumeRepository.findByPerfumeGenderOrderByPriceDesc(perfumeGender);
    }

    @Override
    public Perfume savePerfume(Perfume perfume, MultipartFile file) {
        if (file == null) {
            perfume.setFilename("empty.jpg");
        } else {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + "." + file.getOriginalFilename();

            try {
                file.transferTo(new File(uploadPath + "/" + resultFilename));
            } catch (IOException e) {
                e.printStackTrace();
            }
            perfume.setFilename(resultFilename);
        }
        return perfumeRepository.save(perfume);
    }
}
