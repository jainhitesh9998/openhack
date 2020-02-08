package com.infy.web.rest;

import com.infy.domain.Camera;
import com.infy.service.CameraService;
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
 * REST controller for managing {@link com.infy.domain.Camera}.
 */
@RestController
@RequestMapping("/api")
public class CameraResource {

    private final Logger log = LoggerFactory.getLogger(CameraResource.class);

    private static final String ENTITY_NAME = "camera";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CameraService cameraService;

    public CameraResource(CameraService cameraService) {
        this.cameraService = cameraService;
    }

    /**
     * {@code POST  /cameras} : Create a new camera.
     *
     * @param camera the camera to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new camera, or with status {@code 400 (Bad Request)} if the camera has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cameras")
    public ResponseEntity<Camera> createCamera(@Valid @RequestBody Camera camera) throws URISyntaxException {
        log.debug("REST request to save Camera : {}", camera);
        if (camera.getId() != null) {
            throw new BadRequestAlertException("A new camera cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Camera result = cameraService.save(camera);
        return ResponseEntity.created(new URI("/api/cameras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cameras} : Updates an existing camera.
     *
     * @param camera the camera to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated camera,
     * or with status {@code 400 (Bad Request)} if the camera is not valid,
     * or with status {@code 500 (Internal Server Error)} if the camera couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cameras")
    public ResponseEntity<Camera> updateCamera(@Valid @RequestBody Camera camera) throws URISyntaxException {
        log.debug("REST request to update Camera : {}", camera);
        if (camera.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Camera result = cameraService.save(camera);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, camera.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cameras} : get all the cameras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cameras in body.
     */
    @GetMapping("/cameras")
    public List<Camera> getAllCameras() {
        log.debug("REST request to get all Cameras");
        return cameraService.findAll();
    }

    /**
     * {@code GET  /cameras/:id} : get the "id" camera.
     *
     * @param id the id of the camera to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the camera, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cameras/{id}")
    public ResponseEntity<Camera> getCamera(@PathVariable Long id) {
        log.debug("REST request to get Camera : {}", id);
        Optional<Camera> camera = cameraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(camera);
    }

    /**
     * {@code DELETE  /cameras/:id} : delete the "id" camera.
     *
     * @param id the id of the camera to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cameras/{id}")
    public ResponseEntity<Void> deleteCamera(@PathVariable Long id) {
        log.debug("REST request to delete Camera : {}", id);
        cameraService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
