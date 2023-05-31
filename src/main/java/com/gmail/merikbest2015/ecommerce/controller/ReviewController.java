package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequest;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewResponse;
import com.gmail.merikbest2015.ecommerce.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.API_V1_REVIEW;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.PERFUME_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_REVIEW)
public class ReviewController {

    private final ReviewMapper reviewMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping(PERFUME_ID)
    public ResponseEntity<List<ReviewResponse>> getReviewsByPerfumeId(@PathVariable Long perfumeId) {
        return ResponseEntity.ok(reviewMapper.getReviewsByPerfumeId(perfumeId));
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> addReviewToPerfume(@Valid @RequestBody ReviewRequest reviewRequest,
                                                             BindingResult bindingResult) {
        ReviewResponse review = reviewMapper.addReviewToPerfume(reviewRequest, reviewRequest.getPerfumeId(), bindingResult);
        messagingTemplate.convertAndSend("/topic/reviews/" + reviewRequest.getPerfumeId(), review);
        return ResponseEntity.ok(review);
    }
}
