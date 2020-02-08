package com.infy.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.infy.domain.Turnstile} entity.
 */
public class TurnstileDTO implements Serializable {

    private Long id;

    @NotNull
    private String identifier;

    @NotNull
    private String turnstileId;

    @NotNull
    private String androidThingsInId;

    @NotNull
    private String androidThingsOutId;

    @NotNull
    private Instant created;


    private Long zoneInId;

    private Long zoneOutId;

    private Long cameraInId;

    private Long cameraOutId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getTurnstileId() {
        return turnstileId;
    }

    public void setTurnstileId(String turnstileId) {
        this.turnstileId = turnstileId;
    }

    public String getAndroidThingsInId() {
        return androidThingsInId;
    }

    public void setAndroidThingsInId(String androidThingsInId) {
        this.androidThingsInId = androidThingsInId;
    }

    public String getAndroidThingsOutId() {
        return androidThingsOutId;
    }

    public void setAndroidThingsOutId(String androidThingsOutId) {
        this.androidThingsOutId = androidThingsOutId;
    }

    public Instant getCreated() {
        return created;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Long getZoneInId() {
        return zoneInId;
    }

    public void setZoneInId(Long zoneId) {
        this.zoneInId = zoneId;
    }

    public Long getZoneOutId() {
        return zoneOutId;
    }

    public void setZoneOutId(Long zoneId) {
        this.zoneOutId = zoneId;
    }

    public Long getCameraInId() {
        return cameraInId;
    }

    public void setCameraInId(Long cameraId) {
        this.cameraInId = cameraId;
    }

    public Long getCameraOutId() {
        return cameraOutId;
    }

    public void setCameraOutId(Long cameraId) {
        this.cameraOutId = cameraId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TurnstileDTO turnstileDTO = (TurnstileDTO) o;
        if (turnstileDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), turnstileDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TurnstileDTO{" +
            "id=" + getId() +
            ", identifier='" + getIdentifier() + "'" +
            ", turnstileId='" + getTurnstileId() + "'" +
            ", androidThingsInId='" + getAndroidThingsInId() + "'" +
            ", androidThingsOutId='" + getAndroidThingsOutId() + "'" +
            ", created='" + getCreated() + "'" +
            ", zoneIn=" + getZoneInId() +
            ", zoneOut=" + getZoneOutId() +
            ", cameraIn=" + getCameraInId() +
            ", cameraOut=" + getCameraOutId() +
            "}";
    }
}
