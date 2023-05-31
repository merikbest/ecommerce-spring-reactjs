package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeSearchRequest;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.repository.projection.PerfumeProjection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class PerfumeServiceImplTest {

    @Autowired
    private PerfumeServiceImpl perfumeService;

    @Autowired
    private SpelAwareProxyProjectionFactory factory;

    @MockBean
    private PerfumeRepository perfumeRepository;

    @Test
    public void findPerfumeById() {
        Perfume perfume = new Perfume();
        perfume.setId(123L);

        when(perfumeRepository.findById(123L)).thenReturn(java.util.Optional.of(perfume));
        perfumeService.getPerfumeById(123L);
        assertEquals(123L, perfume.getId());
        assertNotEquals(1L, perfume.getId());
        verify(perfumeRepository, times(1)).findById(123L);
    }

    @Test
    public void findAllPerfumes() {
        Pageable pageable = PageRequest.of(0, 20);
        List<PerfumeProjection> perfumeProjectionList = new ArrayList<>();
        perfumeProjectionList.add(factory.createProjection(PerfumeProjection.class));
        perfumeProjectionList.add(factory.createProjection(PerfumeProjection.class));
        Page<PerfumeProjection> perfumeList = new PageImpl<>(perfumeProjectionList);

        when(perfumeRepository.findAllByOrderByIdAsc(pageable)).thenReturn(perfumeList);
        perfumeService.getAllPerfumes(pageable);
        assertEquals(2, perfumeProjectionList.size());
        verify(perfumeRepository, times(1)).findAllByOrderByIdAsc(pageable);
    }

    @Test
    public void filter() {
        Pageable pageable = PageRequest.of(0, 20);
        
        PerfumeProjection perfumeChanel = factory.createProjection(PerfumeProjection.class);         
        perfumeChanel.setPerfumer(PERFUMER_CHANEL);
        perfumeChanel.setPerfumeGender(PERFUME_GENDER);
        perfumeChanel.setPrice(101);
        PerfumeProjection perfumeCreed = factory.createProjection(PerfumeProjection.class);
        perfumeCreed.setPerfumer(PERFUMER_CREED);
        perfumeCreed.setPerfumeGender(PERFUME_GENDER);
        perfumeCreed.setPrice(102);
        Page<PerfumeProjection> perfumeList = new PageImpl<>(Arrays.asList(perfumeChanel, perfumeCreed));

        List<String> perfumers = new ArrayList<>();
        perfumers.add(PERFUMER_CHANEL);
        perfumers.add(PERFUMER_CREED);

        List<String> genders = new ArrayList<>();
        genders.add(PERFUME_GENDER);

        when(perfumeRepository.findPerfumesByFilterParams(perfumers, genders, 1, 1000, false, pageable)).thenReturn(perfumeList);
        PerfumeSearchRequest filter = new PerfumeSearchRequest();
        filter.setPerfumers(perfumers);
        filter.setGenders(genders);
        filter.setPrices(Arrays.asList(1, 1000));
        filter.setSortByPrice(false);
        perfumeService.findPerfumesByFilterParams(filter, pageable);
        assertEquals(2, perfumeList.getTotalElements());
        assertEquals(perfumeList.getContent().get(0).getPerfumer(), PERFUMER_CHANEL);
        verify(perfumeRepository, times(1)).findPerfumesByFilterParams(perfumers, genders, 1, 1000, false, pageable);
    }

    @Test
    public void findByPerfumerOrderByPriceDesc() {
        Perfume perfumeChanel = new Perfume();
        perfumeChanel.setPerfumer(PERFUMER_CHANEL);
        Perfume perfumeCreed = new Perfume();
        perfumeCreed.setPerfumer(PERFUMER_CREED);
        List<Perfume> perfumeList = new ArrayList<>();
        perfumeList.add(perfumeChanel);
        perfumeList.add(perfumeCreed);

        when(perfumeRepository.findByPerfumerOrderByPriceDesc(PERFUMER_CHANEL)).thenReturn(perfumeList);
        perfumeService.findByPerfumer(PERFUMER_CHANEL);
        assertEquals(perfumeList.get(0).getPerfumer(), PERFUMER_CHANEL);
        assertNotEquals(perfumeList.get(0).getPerfumer(), PERFUMER_CREED);
        verify(perfumeRepository, times(1)).findByPerfumerOrderByPriceDesc(PERFUMER_CHANEL);
    }

    @Test
    public void findByPerfumeGenderOrderByPriceDesc() {
        Perfume perfumeChanel = new Perfume();
        perfumeChanel.setPerfumeGender(PERFUME_GENDER);
        List<Perfume> perfumeList = new ArrayList<>();
        perfumeList.add(perfumeChanel);

        when(perfumeRepository.findByPerfumeGenderOrderByPriceDesc(PERFUME_GENDER)).thenReturn(perfumeList);
        perfumeService.findByPerfumeGender(PERFUME_GENDER);
        assertEquals(perfumeList.get(0).getPerfumeGender(), PERFUME_GENDER);
        assertNotEquals(perfumeList.get(0).getPerfumeGender(), "male");
        verify(perfumeRepository, times(1)).findByPerfumeGenderOrderByPriceDesc(PERFUME_GENDER);
    }

    @Test
    public void savePerfume() {
        MultipartFile multipartFile = new MockMultipartFile(FILE_NAME, FILE_NAME, "multipart/form-data", FILE_PATH.getBytes());
        Perfume perfume = new Perfume();
        perfume.setId(1L);
        perfume.setPerfumer(PERFUMER_CHANEL);
        perfume.setFilename(multipartFile.getOriginalFilename());

        when(perfumeRepository.save(perfume)).thenReturn(perfume);
        perfumeService.savePerfume(perfume, multipartFile);
        verify(perfumeRepository, times(1)).save(perfume);
    }
}
