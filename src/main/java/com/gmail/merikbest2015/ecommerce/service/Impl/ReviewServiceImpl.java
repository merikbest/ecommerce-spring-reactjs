package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.repository.ReviewRepository;
import com.gmail.merikbest2015.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.PERFUME_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final PerfumeRepository perfumeRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public List<Review> getReviewsByPerfumeId(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
                .orElseThrow(() -> new ApiRequestException(PERFUME_NOT_FOUND, HttpStatus.NOT_FOUND));
        return perfume.getReviews();
    }

    @Override
    @Transactional
    public Review addReviewToPerfume(Review review, Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
                .orElseThrow(() -> new ApiRequestException(PERFUME_NOT_FOUND, HttpStatus.NOT_FOUND));
        List<Review> reviews = perfume.getReviews();
        reviews.add(review);
        double totalReviews = reviews.size();
        double sumRating = reviews.stream().mapToInt(Review::getRating).sum();
        perfume.setPerfumeRating(sumRating / totalReviews);
        return reviewRepository.save(review);
    }
}
