package com.infy.service;

import com.infy.domain.Zone;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Zone}.
 */
public interface ZoneService {

    /**
     * Save a zone.
     *
     * @param zone the entity to save.
     * @return the persisted entity.
     */
    Zone save(Zone zone);

    /**
     * Get all the zones.
     *
     * @return the list of entities.
     */
    List<Zone> findAll();


    /**
     * Get the "id" zone.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Zone> findOne(Long id);

    /**
     * Delete the "id" zone.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
