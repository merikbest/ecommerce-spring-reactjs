package com.gmail.merikbest2015.ecommerce.controller;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.API_V1_CRYSTALS;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.CRYSTAL_ID;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.IDS;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmail.merikbest2015.ecommerce.dto.HeaderResponse;
import com.gmail.merikbest2015.ecommerce.dto.perfume.CrystalResponse;
import com.gmail.merikbest2015.ecommerce.dto.perfume.FullCrystalResponse;
import com.gmail.merikbest2015.ecommerce.mapper.CrystalMapper;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_CRYSTALS)
public class CrystalController {

//    private final GraphQLProvider graphQLProvider;
    

	@Autowired
    private final CrystalMapper crystalMapper;

    @GetMapping
    public ResponseEntity<List<CrystalResponse>> getAllCrystals(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<CrystalResponse> response = crystalMapper.getAllCrystals(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping( CRYSTAL_ID)
    public ResponseEntity<FullCrystalResponse> getCrystalById(@PathVariable Long CrystalId) {
        return ResponseEntity.ok(crystalMapper.getCrystalById(CrystalId));
    }

    @PostMapping(IDS)
    public ResponseEntity<List<CrystalResponse>> getCrystalsByIds(@RequestBody List<Long> CrystalsIds) {
        return ResponseEntity.ok(crystalMapper.getCrystalsByIds(CrystalsIds));
    }

//    @PostMapping(SEARCH)
//    public ResponseEntity<List<CrystalResponse>> findCrystalsByFilterParams(@RequestBody CrystalsearchRequest filter,
//                                                                            @PageableDefault(size = 15) Pageable pageable) {
//        HeaderResponse<CrystalResponse> response = crystalMapper.findCrystalsByFilterParams(filter, pageable);
//        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
//    }
//
//    @PostMapping(SEARCH_GENDER)
//    public ResponseEntity<List<CrystalResponse>> findByCrystalGender(@RequestBody CrystalsearchRequest filter) {
//        return ResponseEntity.ok(crystalMapper.findByCrystalGender(filter.getCrystalGender()));
//    }
//
//    @PostMapping(SEARCH_CrystalR)
//    public ResponseEntity<List<CrystalResponse>> findByCrystalr(@RequestBody CrystalsearchRequest filter) {
//        return ResponseEntity.ok(crystalMapper.findByCrystalr(filter.getCrystalr()));
//    }
//
//    @PostMapping(SEARCH_TEXT)
//    public ResponseEntity<List<CrystalResponse>> findByInputText(@RequestBody SearchTypeRequest searchType,
//                                                                 @PageableDefault(size = 15) Pageable pageable) {
//        HeaderResponse<CrystalResponse> response = crystalMapper.findByInputText(searchType.getSearchType(), searchType.getText(), pageable);
//        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
//    }
//
//    @PostMapping(GRAPHQL_IDS)
//    public ResponseEntity<ExecutionResult> getCrystalsByIdsQuery(@RequestBody GraphQLRequest request) {
//        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
//    }
//
//    @PostMapping(GRAPHQL_Crystals)
//    public ResponseEntity<ExecutionResult> getAllCrystalsByQuery(@RequestBody GraphQLRequest request) {
//        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
//    }
//
//    @PostMapping(GRAPHQL_Crystal)
//    public ResponseEntity<ExecutionResult> getCrystalByQuery(@RequestBody GraphQLRequest request) {
//        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
//    }
}
