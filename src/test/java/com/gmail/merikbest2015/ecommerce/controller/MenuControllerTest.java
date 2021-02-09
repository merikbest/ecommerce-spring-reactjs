package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeSearchFilterDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.PERFUMER_CHANEL;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.PERFUME_GENDER;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-perfumes-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-perfumes-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class MenuControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void findPerfumesByFilterParams() throws Exception {
        List<Integer> prices = new ArrayList<>();
        List<String> perfumers = new ArrayList<>();
        List<String> genders = new ArrayList<>();
        perfumers.add(PERFUMER_CHANEL);
        genders.add(PERFUME_GENDER);

        PerfumeSearchFilterDto filter = new PerfumeSearchFilterDto();
        filter.setPerfumers(perfumers);
        filter.setGenders(genders);
        filter.setPrices(prices);

        mockMvc.perform(post("/api/v1/menu/search")
                .content(mapper.writeValueAsString(filter))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumer").isNotEmpty())
                .andExpect(jsonPath("$[*].year").isNotEmpty())
                .andExpect(jsonPath("$[*].country").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeGender").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceTopNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceMiddleNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceBaseNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty())
                .andExpect(jsonPath("$[*].volume").isNotEmpty())
                .andExpect(jsonPath("$[*].type").isNotEmpty());
    }

    @Test
    public void findByPerfumeGender() throws Exception {
        PerfumeSearchFilterDto filter = new PerfumeSearchFilterDto();
        filter.setPerfumeGender(PERFUME_GENDER);

        mockMvc.perform(post("/api/v1/menu/gender")
                .content(mapper.writeValueAsString(filter))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumer").isNotEmpty())
                .andExpect(jsonPath("$[*].year").isNotEmpty())
                .andExpect(jsonPath("$[*].country").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeGender").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceTopNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceMiddleNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceBaseNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty())
                .andExpect(jsonPath("$[*].volume").isNotEmpty())
                .andExpect(jsonPath("$[*].type").isNotEmpty());
    }

    @Test
    public void findByPerfumer() throws Exception {
        PerfumeSearchFilterDto filter = new PerfumeSearchFilterDto();
        filter.setPerfumer(PERFUMER_CHANEL);

        mockMvc.perform(post("/api/v1/menu/perfumer")
                .content(mapper.writeValueAsString(filter))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumer").isNotEmpty())
                .andExpect(jsonPath("$[*].year").isNotEmpty())
                .andExpect(jsonPath("$[*].country").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeGender").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceTopNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceMiddleNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceBaseNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty())
                .andExpect(jsonPath("$[*].volume").isNotEmpty())
                .andExpect(jsonPath("$[*].type").isNotEmpty());
    }
}
