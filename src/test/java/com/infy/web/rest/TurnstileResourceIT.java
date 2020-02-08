package com.infy.web.rest;

import com.infy.OpenhackApp;
import com.infy.domain.Turnstile;
import com.infy.repository.TurnstileRepository;
import com.infy.service.TurnstileService;
import com.infy.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.infy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TurnstileResource} REST controller.
 */
@SpringBootTest(classes = OpenhackApp.class)
public class TurnstileResourceIT {

    private static final String DEFAULT_IDENTIFIER = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFIER = "BBBBBBBBBB";

    private static final String DEFAULT_TURNSTILE_ID = "AAAAAAAAAA";
    private static final String UPDATED_TURNSTILE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ANDROID_THINGS_IN_ID = "AAAAAAAAAA";
    private static final String UPDATED_ANDROID_THINGS_IN_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ANDROID_THINGS_OUT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ANDROID_THINGS_OUT_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_CREATED = Instant.ofEpochMilli(-1L);

    @Autowired
    private TurnstileRepository turnstileRepository;

    @Autowired
    private TurnstileService turnstileService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTurnstileMockMvc;

    private Turnstile turnstile;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TurnstileResource turnstileResource = new TurnstileResource(turnstileService);
        this.restTurnstileMockMvc = MockMvcBuilders.standaloneSetup(turnstileResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Turnstile createEntity(EntityManager em) {
        Turnstile turnstile = new Turnstile()
            .identifier(DEFAULT_IDENTIFIER)
            .turnstileId(DEFAULT_TURNSTILE_ID)
            .androidThingsInId(DEFAULT_ANDROID_THINGS_IN_ID)
            .androidThingsOutId(DEFAULT_ANDROID_THINGS_OUT_ID)
            .created(DEFAULT_CREATED);
        return turnstile;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Turnstile createUpdatedEntity(EntityManager em) {
        Turnstile turnstile = new Turnstile()
            .identifier(UPDATED_IDENTIFIER)
            .turnstileId(UPDATED_TURNSTILE_ID)
            .androidThingsInId(UPDATED_ANDROID_THINGS_IN_ID)
            .androidThingsOutId(UPDATED_ANDROID_THINGS_OUT_ID)
            .created(UPDATED_CREATED);
        return turnstile;
    }

    @BeforeEach
    public void initTest() {
        turnstile = createEntity(em);
    }

    @Test
    @Transactional
    public void createTurnstile() throws Exception {
        int databaseSizeBeforeCreate = turnstileRepository.findAll().size();

        // Create the Turnstile
        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isCreated());

        // Validate the Turnstile in the database
        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeCreate + 1);
        Turnstile testTurnstile = turnstileList.get(turnstileList.size() - 1);
        assertThat(testTurnstile.getIdentifier()).isEqualTo(DEFAULT_IDENTIFIER);
        assertThat(testTurnstile.getTurnstileId()).isEqualTo(DEFAULT_TURNSTILE_ID);
        assertThat(testTurnstile.getAndroidThingsInId()).isEqualTo(DEFAULT_ANDROID_THINGS_IN_ID);
        assertThat(testTurnstile.getAndroidThingsOutId()).isEqualTo(DEFAULT_ANDROID_THINGS_OUT_ID);
        assertThat(testTurnstile.getCreated()).isEqualTo(DEFAULT_CREATED);
    }

    @Test
    @Transactional
    public void createTurnstileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = turnstileRepository.findAll().size();

        // Create the Turnstile with an existing ID
        turnstile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        // Validate the Turnstile in the database
        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdentifierIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnstileRepository.findAll().size();
        // set the field null
        turnstile.setIdentifier(null);

        // Create the Turnstile, which fails.

        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTurnstileIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnstileRepository.findAll().size();
        // set the field null
        turnstile.setTurnstileId(null);

        // Create the Turnstile, which fails.

        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAndroidThingsInIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnstileRepository.findAll().size();
        // set the field null
        turnstile.setAndroidThingsInId(null);

        // Create the Turnstile, which fails.

        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAndroidThingsOutIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnstileRepository.findAll().size();
        // set the field null
        turnstile.setAndroidThingsOutId(null);

        // Create the Turnstile, which fails.

        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnstileRepository.findAll().size();
        // set the field null
        turnstile.setCreated(null);

        // Create the Turnstile, which fails.

        restTurnstileMockMvc.perform(post("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTurnstiles() throws Exception {
        // Initialize the database
        turnstileRepository.saveAndFlush(turnstile);

        // Get all the turnstileList
        restTurnstileMockMvc.perform(get("/api/turnstiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(turnstile.getId().intValue())))
            .andExpect(jsonPath("$.[*].identifier").value(hasItem(DEFAULT_IDENTIFIER.toString())))
            .andExpect(jsonPath("$.[*].turnstileId").value(hasItem(DEFAULT_TURNSTILE_ID.toString())))
            .andExpect(jsonPath("$.[*].androidThingsInId").value(hasItem(DEFAULT_ANDROID_THINGS_IN_ID.toString())))
            .andExpect(jsonPath("$.[*].androidThingsOutId").value(hasItem(DEFAULT_ANDROID_THINGS_OUT_ID.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())));
    }
    
    @Test
    @Transactional
    public void getTurnstile() throws Exception {
        // Initialize the database
        turnstileRepository.saveAndFlush(turnstile);

        // Get the turnstile
        restTurnstileMockMvc.perform(get("/api/turnstiles/{id}", turnstile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(turnstile.getId().intValue()))
            .andExpect(jsonPath("$.identifier").value(DEFAULT_IDENTIFIER.toString()))
            .andExpect(jsonPath("$.turnstileId").value(DEFAULT_TURNSTILE_ID.toString()))
            .andExpect(jsonPath("$.androidThingsInId").value(DEFAULT_ANDROID_THINGS_IN_ID.toString()))
            .andExpect(jsonPath("$.androidThingsOutId").value(DEFAULT_ANDROID_THINGS_OUT_ID.toString()))
            .andExpect(jsonPath("$.created").value(DEFAULT_CREATED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTurnstile() throws Exception {
        // Get the turnstile
        restTurnstileMockMvc.perform(get("/api/turnstiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTurnstile() throws Exception {
        // Initialize the database
        turnstileService.save(turnstile);

        int databaseSizeBeforeUpdate = turnstileRepository.findAll().size();

        // Update the turnstile
        Turnstile updatedTurnstile = turnstileRepository.findById(turnstile.getId()).get();
        // Disconnect from session so that the updates on updatedTurnstile are not directly saved in db
        em.detach(updatedTurnstile);
        updatedTurnstile
            .identifier(UPDATED_IDENTIFIER)
            .turnstileId(UPDATED_TURNSTILE_ID)
            .androidThingsInId(UPDATED_ANDROID_THINGS_IN_ID)
            .androidThingsOutId(UPDATED_ANDROID_THINGS_OUT_ID)
            .created(UPDATED_CREATED);

        restTurnstileMockMvc.perform(put("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTurnstile)))
            .andExpect(status().isOk());

        // Validate the Turnstile in the database
        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeUpdate);
        Turnstile testTurnstile = turnstileList.get(turnstileList.size() - 1);
        assertThat(testTurnstile.getIdentifier()).isEqualTo(UPDATED_IDENTIFIER);
        assertThat(testTurnstile.getTurnstileId()).isEqualTo(UPDATED_TURNSTILE_ID);
        assertThat(testTurnstile.getAndroidThingsInId()).isEqualTo(UPDATED_ANDROID_THINGS_IN_ID);
        assertThat(testTurnstile.getAndroidThingsOutId()).isEqualTo(UPDATED_ANDROID_THINGS_OUT_ID);
        assertThat(testTurnstile.getCreated()).isEqualTo(UPDATED_CREATED);
    }

    @Test
    @Transactional
    public void updateNonExistingTurnstile() throws Exception {
        int databaseSizeBeforeUpdate = turnstileRepository.findAll().size();

        // Create the Turnstile

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTurnstileMockMvc.perform(put("/api/turnstiles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnstile)))
            .andExpect(status().isBadRequest());

        // Validate the Turnstile in the database
        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTurnstile() throws Exception {
        // Initialize the database
        turnstileService.save(turnstile);

        int databaseSizeBeforeDelete = turnstileRepository.findAll().size();

        // Delete the turnstile
        restTurnstileMockMvc.perform(delete("/api/turnstiles/{id}", turnstile.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Turnstile> turnstileList = turnstileRepository.findAll();
        assertThat(turnstileList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Turnstile.class);
        Turnstile turnstile1 = new Turnstile();
        turnstile1.setId(1L);
        Turnstile turnstile2 = new Turnstile();
        turnstile2.setId(turnstile1.getId());
        assertThat(turnstile1).isEqualTo(turnstile2);
        turnstile2.setId(2L);
        assertThat(turnstile1).isNotEqualTo(turnstile2);
        turnstile1.setId(null);
        assertThat(turnstile1).isNotEqualTo(turnstile2);
    }
}
