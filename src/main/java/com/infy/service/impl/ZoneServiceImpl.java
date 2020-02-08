package com.infy.service.impl;

import com.infy.service.ZoneService;
import com.infy.domain.Zone;
import com.infy.repository.ZoneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Zone}.
 */
@Service
@Transactional
public class ZoneServiceImpl implements ZoneService {

    private final Logger log = LoggerFactory.getLogger(ZoneServiceImpl.class);

    private final ZoneRepository zoneRepository;

    public ZoneServiceImpl(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

    /**
     * Save a zone.
     *
     * @param zone the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Zone save(Zone zone) {
        log.debug("Request to save Zone : {}", zone);
        return zoneRepository.save(zone);
    }

    /**
     * Get all the zones.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Zone> findAll() {
        log.debug("Request to get all Zones");
        return zoneRepository.findAll();
    }


    /**
     * Get one zone by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Zone> findOne(Long id) {
        log.debug("Request to get Zone : {}", id);
        return zoneRepository.findById(id);
    }

    /**
     * Delete the zone by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Zone : {}", id);
        zoneRepository.deleteById(id);
    }
}
