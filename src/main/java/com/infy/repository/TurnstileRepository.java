package com.infy.repository;
import com.infy.domain.Turnstile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Turnstile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TurnstileRepository extends JpaRepository<Turnstile, Long> {

}
