package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeDtoOut;
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
        PerfumeDtoIn perfumeDtoIn = new PerfumeDtoIn();
        perfumeDtoIn.setPerfumer(PERFUMER_CHANEL);
        perfumeDtoIn.setPerfumeTitle(PERFUME_TITLE);
        perfumeDtoIn.setYear(YEAR);
        perfumeDtoIn.setCountry(COUNTRY);
        perfumeDtoIn.setPerfumeGender(PERFUME_GENDER);
        perfumeDtoIn.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        perfumeDtoIn.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        perfumeDtoIn.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        perfumeDtoIn.setPrice(PRICE);
        perfumeDtoIn.setVolume(VOLUME);
        perfumeDtoIn.setType(TYPE);

        Perfume perfume = modelMapper.map(perfumeDtoIn, Perfume.class);
        assertEquals(perfumeDtoIn.getPerfumer(), perfume.getPerfumer());
        assertEquals(perfumeDtoIn.getPerfumeTitle(), perfume.getPerfumeTitle());
        assertEquals(perfumeDtoIn.getYear(), perfume.getYear());
        assertEquals(perfumeDtoIn.getCountry(), perfume.getCountry());
        assertEquals(perfumeDtoIn.getPerfumeGender(), perfume.getPerfumeGender());
        assertEquals(perfumeDtoIn.getFragranceTopNotes(), perfume.getFragranceTopNotes());
        assertEquals(perfumeDtoIn.getFragranceMiddleNotes(), perfume.getFragranceMiddleNotes());
        assertEquals(perfumeDtoIn.getFragranceBaseNotes(), perfume.getFragranceBaseNotes());
        assertEquals(perfumeDtoIn.getPrice(), perfume.getPrice());
        assertEquals(perfumeDtoIn.getVolume(), perfume.getVolume());
        assertEquals(perfumeDtoIn.getType(), perfume.getType());
    }

    @Test
    public void convertToDtoIn() {
        Perfume perfume = new Perfume();
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

        PerfumeDtoIn perfumeDtoIn = modelMapper.map(perfume, PerfumeDtoIn.class);
        assertEquals(perfume.getPerfumer(), perfumeDtoIn.getPerfumer());
        assertEquals(perfume.getPerfumeTitle(), perfumeDtoIn.getPerfumeTitle());
        assertEquals(perfume.getYear(), perfumeDtoIn.getYear());
        assertEquals(perfume.getCountry(), perfumeDtoIn.getCountry());
        assertEquals(perfume.getPerfumeGender(), perfumeDtoIn.getPerfumeGender());
        assertEquals(perfume.getFragranceTopNotes(), perfumeDtoIn.getFragranceTopNotes());
        assertEquals(perfume.getFragranceMiddleNotes(), perfumeDtoIn.getFragranceMiddleNotes());
        assertEquals(perfume.getFragranceBaseNotes(), perfumeDtoIn.getFragranceBaseNotes());
        assertEquals(perfume.getPrice(), perfumeDtoIn.getPrice());
        assertEquals(perfume.getVolume(), perfumeDtoIn.getVolume());
        assertEquals(perfume.getType(), perfumeDtoIn.getType());
    }

    @Test
    public void convertToDtoOut() {
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

        PerfumeDtoOut perfumeDtoOut = modelMapper.map(perfume, PerfumeDtoOut.class);
        assertEquals(perfume.getId(), perfumeDtoOut.getId());
        assertEquals(perfume.getPerfumer(), perfumeDtoOut.getPerfumer());
        assertEquals(perfume.getPerfumeTitle(), perfumeDtoOut.getPerfumeTitle());
        assertEquals(perfume.getYear(), perfumeDtoOut.getYear());
        assertEquals(perfume.getCountry(), perfumeDtoOut.getCountry());
        assertEquals(perfume.getPerfumeGender(), perfumeDtoOut.getPerfumeGender());
        assertEquals(perfume.getFragranceTopNotes(), perfumeDtoOut.getFragranceTopNotes());
        assertEquals(perfume.getFragranceMiddleNotes(), perfumeDtoOut.getFragranceMiddleNotes());
        assertEquals(perfume.getFragranceBaseNotes(), perfumeDtoOut.getFragranceBaseNotes());
        assertEquals(perfume.getPrice(), perfumeDtoOut.getPrice());
        assertEquals(perfume.getVolume(), perfumeDtoOut.getVolume());
        assertEquals(perfume.getType(), perfumeDtoOut.getType());
    }
}
