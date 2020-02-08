package com.infy.service.impl;

import com.infy.service.TurnstileService;
import com.infy.domain.Turnstile;
import com.infy.repository.TurnstileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Turnstile}.
 */
@Service
@Transactional
public class TurnstileServiceImpl implements TurnstileService {

    private final Logger log = LoggerFactory.getLogger(TurnstileServiceImpl.class);

    private final TurnstileRepository turnstileRepository;

    public TurnstileServiceImpl(TurnstileRepository turnstileRepository) {
        this.turnstileRepository = turnstileRepository;
    }

    /**
     * Save a turnstile.
     *
     * @param turnstile the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Turnstile save(Turnstile turnstile) {
        log.debug("Request to save Turnstile : {}", turnstile);
        return turnstileRepository.save(turnstile);
    }

    /**
     * Get all the turnstiles.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Turnstile> findAll() {
        log.debug("Request to get all Turnstiles");
        return turnstileRepository.findAll();
    }


    /**
     * Get one turnstile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Turnstile> findOne(Long id) {
        log.debug("Request to get Turnstile : {}", id);
        return turnstileRepository.findById(id);
    }

    /**
     * Delete the turnstile by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Turnstile : {}", id);
        turnstileRepository.deleteById(id);
    }
}
