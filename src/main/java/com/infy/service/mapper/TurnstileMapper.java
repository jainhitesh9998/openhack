package com.infy.service.mapper;

import com.infy.domain.*;
import com.infy.service.dto.TurnstileDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Turnstile} and its DTO {@link TurnstileDTO}.
 */
@Mapper(componentModel = "spring", uses = {ZoneMapper.class, CameraMapper.class})
public interface TurnstileMapper extends EntityMapper<TurnstileDTO, Turnstile> {

    @Mapping(source = "zoneIn.id", target = "zoneInId")
    @Mapping(source = "zoneOut.id", target = "zoneOutId")
    @Mapping(source = "cameraIn.id", target = "cameraInId")
    @Mapping(source = "cameraOut.id", target = "cameraOutId")
    TurnstileDTO toDto(Turnstile turnstile);

    @Mapping(source = "zoneInId", target = "zoneIn")
    @Mapping(source = "zoneOutId", target = "zoneOut")
    @Mapping(source = "cameraInId", target = "cameraIn")
    @Mapping(source = "cameraOutId", target = "cameraOut")
    Turnstile toEntity(TurnstileDTO turnstileDTO);

    default Turnstile fromId(Long id) {
        if (id == null) {
            return null;
        }
        Turnstile turnstile = new Turnstile();
        turnstile.setId(id);
        return turnstile;
    }
}
