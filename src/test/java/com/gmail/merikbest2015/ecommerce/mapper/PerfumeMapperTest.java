package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeResponseDto;
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
        PerfumeRequestDto perfumeRequestDto = new PerfumeRequestDto();
        perfumeRequestDto.setPerfumer(PERFUMER_CHANEL);
        perfumeRequestDto.setPerfumeTitle(PERFUME_TITLE);
        perfumeRequestDto.setYear(YEAR);
        perfumeRequestDto.setCountry(COUNTRY);
        perfumeRequestDto.setPerfumeGender(PERFUME_GENDER);
        perfumeRequestDto.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        perfumeRequestDto.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        perfumeRequestDto.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        perfumeRequestDto.setPrice(PRICE);
        perfumeRequestDto.setVolume(VOLUME);
        perfumeRequestDto.setType(TYPE);

        Perfume perfume = modelMapper.map(perfumeRequestDto, Perfume.class);
        assertEquals(perfumeRequestDto.getPerfumer(), perfume.getPerfumer());
        assertEquals(perfumeRequestDto.getPerfumeTitle(), perfume.getPerfumeTitle());
        assertEquals(perfumeRequestDto.getYear(), perfume.getYear());
        assertEquals(perfumeRequestDto.getCountry(), perfume.getCountry());
        assertEquals(perfumeRequestDto.getPerfumeGender(), perfume.getPerfumeGender());
        assertEquals(perfumeRequestDto.getFragranceTopNotes(), perfume.getFragranceTopNotes());
        assertEquals(perfumeRequestDto.getFragranceMiddleNotes(), perfume.getFragranceMiddleNotes());
        assertEquals(perfumeRequestDto.getFragranceBaseNotes(), perfume.getFragranceBaseNotes());
        assertEquals(perfumeRequestDto.getPrice(), perfume.getPrice());
        assertEquals(perfumeRequestDto.getVolume(), perfume.getVolume());
        assertEquals(perfumeRequestDto.getType(), perfume.getType());
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

        PerfumeResponseDto perfumeResponseDto = modelMapper.map(perfume, PerfumeResponseDto.class);
        assertEquals(perfume.getId(), perfumeResponseDto.getId());
        assertEquals(perfume.getPerfumer(), perfumeResponseDto.getPerfumer());
        assertEquals(perfume.getPerfumeTitle(), perfumeResponseDto.getPerfumeTitle());
        assertEquals(perfume.getYear(), perfumeResponseDto.getYear());
        assertEquals(perfume.getCountry(), perfumeResponseDto.getCountry());
        assertEquals(perfume.getPerfumeGender(), perfumeResponseDto.getPerfumeGender());
        assertEquals(perfume.getFragranceTopNotes(), perfumeResponseDto.getFragranceTopNotes());
        assertEquals(perfume.getFragranceMiddleNotes(), perfumeResponseDto.getFragranceMiddleNotes());
        assertEquals(perfume.getFragranceBaseNotes(), perfumeResponseDto.getFragranceBaseNotes());
        assertEquals(perfume.getPrice(), perfumeResponseDto.getPrice());
        assertEquals(perfume.getVolume(), perfumeResponseDto.getVolume());
        assertEquals(perfume.getType(), perfumeResponseDto.getType());
    }
}
