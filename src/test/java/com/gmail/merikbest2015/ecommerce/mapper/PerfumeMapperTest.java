package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.FullPerfumeResponse;
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

        FullPerfumeResponse fullPerfumeResponse = modelMapper.map(perfume, FullPerfumeResponse.class);
        assertEquals(perfume.getId(), fullPerfumeResponse.getId());
        assertEquals(perfume.getPerfumer(), fullPerfumeResponse.getPerfumer());
        assertEquals(perfume.getPerfumeTitle(), fullPerfumeResponse.getPerfumeTitle());
        assertEquals(perfume.getYear(), fullPerfumeResponse.getYear());
        assertEquals(perfume.getCountry(), fullPerfumeResponse.getCountry());
        assertEquals(perfume.getPerfumeGender(), fullPerfumeResponse.getPerfumeGender());
        assertEquals(perfume.getFragranceTopNotes(), fullPerfumeResponse.getFragranceTopNotes());
        assertEquals(perfume.getFragranceMiddleNotes(), fullPerfumeResponse.getFragranceMiddleNotes());
        assertEquals(perfume.getFragranceBaseNotes(), fullPerfumeResponse.getFragranceBaseNotes());
        assertEquals(perfume.getPrice(), fullPerfumeResponse.getPrice());
        assertEquals(perfume.getVolume(), fullPerfumeResponse.getVolume());
        assertEquals(perfume.getType(), fullPerfumeResponse.getType());
    }
}
