package com.infy.service.impl;

import com.infy.service.TurnstileService;
import com.infy.domain.Turnstile;
import com.infy.repository.TurnstileRepository;
import com.infy.service.dto.TurnstileDTO;
import com.infy.service.mapper.TurnstileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Turnstile}.
 */
@Service
@Transactional
public class TurnstileServiceImpl implements TurnstileService {

    private final Logger log = LoggerFactory.getLogger(TurnstileServiceImpl.class);

    private final TurnstileRepository turnstileRepository;

    private final TurnstileMapper turnstileMapper;

    public TurnstileServiceImpl(TurnstileRepository turnstileRepository, TurnstileMapper turnstileMapper) {
        this.turnstileRepository = turnstileRepository;
        this.turnstileMapper = turnstileMapper;
    }

    /**
     * Save a turnstile.
     *
     * @param turnstileDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TurnstileDTO save(TurnstileDTO turnstileDTO) {
        log.debug("Request to save Turnstile : {}", turnstileDTO);
        Turnstile turnstile = turnstileMapper.toEntity(turnstileDTO);
        turnstile = turnstileRepository.save(turnstile);
        return turnstileMapper.toDto(turnstile);
    }

    /**
     * Get all the turnstiles.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TurnstileDTO> findAll() {
        log.debug("Request to get all Turnstiles");
        return turnstileRepository.findAll().stream()
            .map(turnstileMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one turnstile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TurnstileDTO> findOne(Long id) {
        log.debug("Request to get Turnstile : {}", id);
        return turnstileRepository.findById(id)
            .map(turnstileMapper::toDto);
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
