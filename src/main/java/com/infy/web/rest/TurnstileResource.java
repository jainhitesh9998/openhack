package com.infy.web.rest;

import com.infy.domain.Turnstile;
import com.infy.service.TurnstileService;
import com.infy.web.rest.errors.BadRequestAlertException;

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
     * @param turnstile the turnstile to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turnstile, or with status {@code 400 (Bad Request)} if the turnstile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turnstiles")
    public ResponseEntity<Turnstile> createTurnstile(@Valid @RequestBody Turnstile turnstile) throws URISyntaxException {
        log.debug("REST request to save Turnstile : {}", turnstile);
        if (turnstile.getId() != null) {
            throw new BadRequestAlertException("A new turnstile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turnstile result = turnstileService.save(turnstile);
        return ResponseEntity.created(new URI("/api/turnstiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turnstiles} : Updates an existing turnstile.
     *
     * @param turnstile the turnstile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turnstile,
     * or with status {@code 400 (Bad Request)} if the turnstile is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turnstile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turnstiles")
    public ResponseEntity<Turnstile> updateTurnstile(@Valid @RequestBody Turnstile turnstile) throws URISyntaxException {
        log.debug("REST request to update Turnstile : {}", turnstile);
        if (turnstile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Turnstile result = turnstileService.save(turnstile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, turnstile.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /turnstiles} : get all the turnstiles.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turnstiles in body.
     */
    @GetMapping("/turnstiles")
    public List<Turnstile> getAllTurnstiles() {
        log.debug("REST request to get all Turnstiles");
        return turnstileService.findAll();
    }

    /**
     * {@code GET  /turnstiles/:id} : get the "id" turnstile.
     *
     * @param id the id of the turnstile to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turnstile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turnstiles/{id}")
    public ResponseEntity<Turnstile> getTurnstile(@PathVariable Long id) {
        log.debug("REST request to get Turnstile : {}", id);
        Optional<Turnstile> turnstile = turnstileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(turnstile);
    }

    /**
     * {@code DELETE  /turnstiles/:id} : delete the "id" turnstile.
     *
     * @param id the id of the turnstile to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turnstiles/{id}")
    public ResponseEntity<Void> deleteTurnstile(@PathVariable Long id) {
        log.debug("REST request to delete Turnstile : {}", id);
        turnstileService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
