package com.infy.service;

import com.infy.domain.Turnstile;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Turnstile}.
 */
public interface TurnstileService {

    /**
     * Save a turnstile.
     *
     * @param turnstile the entity to save.
     * @return the persisted entity.
     */
    Turnstile save(Turnstile turnstile);

    /**
     * Get all the turnstiles.
     *
     * @return the list of entities.
     */
    List<Turnstile> findAll();


    /**
     * Get the "id" turnstile.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Turnstile> findOne(Long id);

    /**
     * Delete the "id" turnstile.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
