package com.infy.web.rest;

import com.infy.service.TurnstileService;
import com.infy.web.rest.errors.BadRequestAlertException;
import com.infy.service.dto.TurnstileDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.infy.domain.Turnstile}.
 */
@RestController
@RequestMapping("/api")
public class TurnstileResource {

    private final Logger log = LoggerFactory.getLogger(TurnstileResource.class);

    private static final String ENTITY_NAME = "turnstile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TurnstileService turnstileService;

    public TurnstileResource(TurnstileService turnstileService) {
        this.turnstileService = turnstileService;
    }

    /**
     * {@code POST  /turnstiles} : Create a new turnstile.
     *
     * @param turnstileDTO the turnstileDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turnstileDTO, or with status {@code 400 (Bad Request)} if the turnstile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turnstiles")
    public ResponseEntity<TurnstileDTO> createTurnstile(@Valid @RequestBody TurnstileDTO turnstileDTO) throws URISyntaxException {
        log.debug("REST request to save Turnstile : {}", turnstileDTO);
        if (turnstileDTO.getId() != null) {
            throw new BadRequestAlertException("A new turnstile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TurnstileDTO result = turnstileService.save(turnstileDTO);
        return ResponseEntity.created(new URI("/api/turnstiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turnstiles} : Updates an existing turnstile.
     *
     * @param turnstileDTO the turnstileDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turnstileDTO,
     * or with status {@code 400 (Bad Request)} if the turnstileDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turnstileDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turnstiles")
    public ResponseEntity<TurnstileDTO> updateTurnstile(@Valid @RequestBody TurnstileDTO turnstileDTO) throws URISyntaxException {
        log.debug("REST request to update Turnstile : {}", turnstileDTO);
        if (turnstileDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TurnstileDTO result = turnstileService.save(turnstileDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, turnstileDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /turnstiles} : get all the turnstiles.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turnstiles in body.
     */
    @GetMapping("/turnstiles")
    public List<TurnstileDTO> getAllTurnstiles() {
        log.debug("REST request to get all Turnstiles");
        return turnstileService.findAll();
    }

    /**
     * {@code GET  /turnstiles/:id} : get the "id" turnstile.
     *
     * @param id the id of the turnstileDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turnstileDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turnstiles/{id}")
    public ResponseEntity<TurnstileDTO> getTurnstile(@PathVariable Long id) {
        log.debug("REST request to get Turnstile : {}", id);
        Optional<TurnstileDTO> turnstileDTO = turnstileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(turnstileDTO);
    }

    /**
     * {@code DELETE  /turnstiles/:id} : delete the "id" turnstile.
     *
     * @param id the id of the turnstileDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turnstiles/{id}")
    public ResponseEntity<Void> deleteTurnstile(@PathVariable Long id) {
        log.debug("REST request to delete Turnstile : {}", id);
        turnstileService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}