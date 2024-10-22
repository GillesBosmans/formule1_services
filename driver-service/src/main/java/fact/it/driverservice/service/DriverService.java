package fact.it.driverservice.service;

import fact.it.driverservice.model.Driver;
import fact.it.driverservice.repository.DriverRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class DriverService {

    private final DriverRepository driverRepository;

    @PostConstruct
    public void loadData() {
        if (driverRepository.count() == 0) {
            List<Driver> f1Drivers2023 = List.of(
                    new Driver(null, "RedBull", "Max", "Verstappen", "Dutch", 33, 3),
                    new Driver(null, "RedBull", "Sergio", "Perez", "Mexican", 11, 0),
                    new Driver(null, "Mercedes", "Lewis", "Hamilton", "British", 44, 7),
                    new Driver(null, "Mercedes", "George", "Russell", "British", 63, 0),
                    new Driver(null, "Ferrari", "Charles", "Leclerc", "Monegasque", 16, 0),
                    new Driver(null, "Ferrari", "Carlos", "Sainz", "Spanish", 55, 0),
                    new Driver(null, "McLaren", "Lando", "Norris", "British", 4, 0),
                    new Driver(null, "McLaren", "Oscar", "Piastri", "Australian", 81, 0),
                    new Driver(null, "Alpine", "Esteban", "Ocon", "French", 31, 0),
                    new Driver(null, "Alpine", "Pierre", "Gasly", "French", 10, 0),
                    new Driver(null, "Aston Martin", "Fernando", "Alonso", "Spanish", 14, 2),
                    new Driver(null, "Aston Martin", "Lance", "Stroll", "Canadian", 18, 0),
                    new Driver(null, "AlphaTauri", "Yuki", "Tsunoda", "Japanese", 22, 0),
                    new Driver(null, "AlphaTauri", "Daniel", "Ricciardo", "Australian", 3, 0),
                    new Driver(null, "Williams", "Alex", "Albon", "Thai", 23, 0),
                    new Driver(null, "Williams", "Logan", "Sargeant", "American", 2, 0),
                    new Driver(null, "Alfa Romeo", "Valtteri", "Bottas", "Finnish", 77, 0),
                    new Driver(null, "Alfa Romeo", "Guanyu", "Zhou", "Chinese", 24, 0),
                    new Driver(null, "Haas", "Kevin", "Magnussen", "Danish", 20, 0),
                    new Driver(null, "Haas", "Nico", "Hulkenberg", "German", 27, 0)
            );

            driverRepository.saveAll(f1Drivers2023);
        }
    }

    // Get all drivers
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Get a single driver by ID
    public Optional<Driver> getDriverById(Long id) {
        return driverRepository.findById(id);
    }

    // Create a new driver
    public Driver saveDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // Update an existing driver
    public Driver updateDriver(Long id, Driver updatedDriver) {
        return driverRepository.findById(id).map(driver -> {
            driver.setFirstName(updatedDriver.getFirstName());
            driver.setTeamId(updatedDriver.getTeamId());
            driver.setNationality(updatedDriver.getNationality());
            driver.setCarNumber(updatedDriver.getCarNumber());
            driver.setChampionshipsWon(updatedDriver.getChampionshipsWon());
            return driverRepository.save(driver);
        }).orElseThrow(() -> new RuntimeException("Driver not found"));
    }

    // Delete a driver by ID
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}
