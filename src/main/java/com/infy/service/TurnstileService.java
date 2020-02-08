package com.infy.service;

import com.infy.service.dto.TurnstileDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.infy.domain.Turnstile}.
 */
public interface TurnstileService {

    /**
     * Save a turnstile.
     *
     * @param turnstileDTO the entity to save.
     * @return the persisted entity.
     */
    TurnstileDTO save(TurnstileDTO turnstileDTO);

    /**
     * Get all the turnstiles.
     *
     * @return the list of entities.
     */
    List<TurnstileDTO> findAll();


    /**
     * Get the "id" turnstile.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TurnstileDTO> findOne(Long id);

    /**
     * Delete the "id" turnstile.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
