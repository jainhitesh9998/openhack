package com.infy.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Turnstile.
 */
@Entity
@Table(name = "turnstile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Turnstile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "identifier", nullable = false)
    private String identifier;

    @NotNull
    @Column(name = "turnstile_id", nullable = false)
    private String turnstileId;

    @NotNull
    @Column(name = "android_things_in_id", nullable = false)
    private String androidThingsInId;

    @NotNull
    @Column(name = "android_things_out_id", nullable = false)
    private String androidThingsOutId;

    @NotNull
    @Column(name = "created", nullable = false)
    private Instant created;

    @OneToOne
    @JoinColumn(unique = true)
    private Zone zoneIn;

    @OneToOne
    @JoinColumn(unique = true)
    private Zone zoneOut;

    @OneToOne
    @JoinColumn(unique = true)
    private Camera cameraIn;

    @OneToOne
    @JoinColumn(unique = true)
    private Camera cameraOut;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public Turnstile identifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getTurnstileId() {
        return turnstileId;
    }

    public Turnstile turnstileId(String turnstileId) {
        this.turnstileId = turnstileId;
        return this;
    }

    public void setTurnstileId(String turnstileId) {
        this.turnstileId = turnstileId;
    }

    public String getAndroidThingsInId() {
        return androidThingsInId;
    }

    public Turnstile androidThingsInId(String androidThingsInId) {
        this.androidThingsInId = androidThingsInId;
        return this;
    }

    public void setAndroidThingsInId(String androidThingsInId) {
        this.androidThingsInId = androidThingsInId;
    }

    public String getAndroidThingsOutId() {
        return androidThingsOutId;
    }

    public Turnstile androidThingsOutId(String androidThingsOutId) {
        this.androidThingsOutId = androidThingsOutId;
        return this;
    }

    public void setAndroidThingsOutId(String androidThingsOutId) {
        this.androidThingsOutId = androidThingsOutId;
    }

    public Instant getCreated() {
        return created;
    }

    public Turnstile created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Zone getZoneIn() {
        return zoneIn;
    }

    public Turnstile zoneIn(Zone zone) {
        this.zoneIn = zone;
        return this;
    }

    public void setZoneIn(Zone zone) {
        this.zoneIn = zone;
    }

    public Zone getZoneOut() {
        return zoneOut;
    }

    public Turnstile zoneOut(Zone zone) {
        this.zoneOut = zone;
        return this;
    }

    public void setZoneOut(Zone zone) {
        this.zoneOut = zone;
    }

    public Camera getCameraIn() {
        return cameraIn;
    }

    public Turnstile cameraIn(Camera camera) {
        this.cameraIn = camera;
        return this;
    }

    public void setCameraIn(Camera camera) {
        this.cameraIn = camera;
    }

    public Camera getCameraOut() {
        return cameraOut;
    }

    public Turnstile cameraOut(Camera camera) {
        this.cameraOut = camera;
        return this;
    }

    public void setCameraOut(Camera camera) {
        this.cameraOut = camera;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Turnstile)) {
            return false;
        }
        return id != null && id.equals(((Turnstile) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Turnstile{" +
            "id=" + getId() +
            ", identifier='" + getIdentifier() + "'" +
            ", turnstileId='" + getTurnstileId() + "'" +
            ", androidThingsInId='" + getAndroidThingsInId() + "'" +
            ", androidThingsOutId='" + getAndroidThingsOutId() + "'" +
            ", created='" + getCreated() + "'" +
            "}";
    }
}
