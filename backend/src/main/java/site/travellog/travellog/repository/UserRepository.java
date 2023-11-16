package site.travellog.travellog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.travellog.travellog.domain.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
}
