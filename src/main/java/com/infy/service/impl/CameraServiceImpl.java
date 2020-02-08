package com.infy.service.impl;

import com.infy.service.CameraService;
import com.infy.domain.Camera;
import com.infy.repository.CameraRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Camera}.
 */
@Service
@Transactional
public class CameraServiceImpl implements CameraService {

    private final Logger log = LoggerFactory.getLogger(CameraServiceImpl.class);

    private final CameraRepository cameraRepository;

    public CameraServiceImpl(CameraRepository cameraRepository) {
        this.cameraRepository = cameraRepository;
    }

    /**
     * Save a camera.
     *
     * @param camera the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Camera save(Camera camera) {
        log.debug("Request to save Camera : {}", camera);
        return cameraRepository.save(camera);
    }

    /**
     * Get all the cameras.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Camera> findAll() {
        log.debug("Request to get all Cameras");
        return cameraRepository.findAll();
    }


    /**
     * Get one camera by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Camera> findOne(Long id) {
        log.debug("Request to get Camera : {}", id);
        return cameraRepository.findById(id);
    }

    /**
     * Delete the camera by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Camera : {}", id);
        cameraRepository.deleteById(id);
    }
}
