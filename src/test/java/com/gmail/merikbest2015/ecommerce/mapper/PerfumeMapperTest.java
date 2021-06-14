package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class PerfumeMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertToEntity() {
        PerfumeRequest perfumeRequest = new PerfumeRequest();
        perfumeRequest.setPerfumer(PERFUMER_CHANEL);
        perfumeRequest.setPerfumeTitle(PERFUME_TITLE);
        perfumeRequest.setYear(YEAR);
        perfumeRequest.setCountry(COUNTRY);
        perfumeRequest.setPerfumeGender(PERFUME_GENDER);
        perfumeRequest.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        perfumeRequest.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        perfumeRequest.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        perfumeRequest.setPrice(PRICE);
        perfumeRequest.setVolume(VOLUME);
        perfumeRequest.setType(TYPE);

        Perfume perfume = modelMapper.map(perfumeRequest, Perfume.class);
        assertEquals(perfumeRequest.getPerfumer(), perfume.getPerfumer());
        assertEquals(perfumeRequest.getPerfumeTitle(), perfume.getPerfumeTitle());
        assertEquals(perfumeRequest.getYear(), perfume.getYear());
        assertEquals(perfumeRequest.getCountry(), perfume.getCountry());
        assertEquals(perfumeRequest.getPerfumeGender(), perfume.getPerfumeGender());
        assertEquals(perfumeRequest.getFragranceTopNotes(), perfume.getFragranceTopNotes());
        assertEquals(perfumeRequest.getFragranceMiddleNotes(), perfume.getFragranceMiddleNotes());
        assertEquals(perfumeRequest.getFragranceBaseNotes(), perfume.getFragranceBaseNotes());
        assertEquals(perfumeRequest.getPrice(), perfume.getPrice());
        assertEquals(perfumeRequest.getVolume(), perfume.getVolume());
        assertEquals(perfumeRequest.getType(), perfume.getType());
    }

    @Test
    public void convertToResponseDto() {
        Perfume perfume = new Perfume();
        perfume.setId(1L);
        perfume.setPerfumer(PERFUMER_CHANEL);
        perfume.setPerfumeTitle(PERFUME_TITLE);
        perfume.setYear(YEAR);
        perfume.setCountry(COUNTRY);
        perfume.setPerfumeGender(PERFUME_GENDER);
        perfume.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        perfume.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        perfume.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        perfume.setPrice(PRICE);
        perfume.setVolume(VOLUME);
        perfume.setType(TYPE);

        PerfumeResponse perfumeResponse = modelMapper.map(perfume, PerfumeResponse.class);
        assertEquals(perfume.getId(), perfumeResponse.getId());
        assertEquals(perfume.getPerfumer(), perfumeResponse.getPerfumer());
        assertEquals(perfume.getPerfumeTitle(), perfumeResponse.getPerfumeTitle());
        assertEquals(perfume.getYear(), perfumeResponse.getYear());
        assertEquals(perfume.getCountry(), perfumeResponse.getCountry());
        assertEquals(perfume.getPerfumeGender(), perfumeResponse.getPerfumeGender());
        assertEquals(perfume.getFragranceTopNotes(), perfumeResponse.getFragranceTopNotes());
        assertEquals(perfume.getFragranceMiddleNotes(), perfumeResponse.getFragranceMiddleNotes());
        assertEquals(perfume.getFragranceBaseNotes(), perfumeResponse.getFragranceBaseNotes());
        assertEquals(perfume.getPrice(), perfumeResponse.getPrice());
        assertEquals(perfume.getVolume(), perfumeResponse.getVolume());
        assertEquals(perfume.getType(), perfumeResponse.getType());
    }
}
