package com.infy.service;

import com.infy.domain.Camera;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Camera}.
 */
public interface CameraService {

    /**
     * Save a camera.
     *
     * @param camera the entity to save.
     * @return the persisted entity.
     */
    Camera save(Camera camera);

    /**
     * Get all the cameras.
     *
     * @return the list of entities.
     */
    List<Camera> findAll();


    /**
     * Get the "id" camera.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Camera> findOne(Long id);

    /**
     * Delete the "id" camera.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
