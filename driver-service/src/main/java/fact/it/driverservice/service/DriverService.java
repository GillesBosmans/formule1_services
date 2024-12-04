package fact.it.driverservice.service;

import fact.it.driverservice.dto.DriverRequest;
import fact.it.driverservice.dto.DriverResponse;
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
                    new Driver(null, "RED", "Max", "Verstappen", "Dutch", 33, 3),
                    new Driver(null, "RED", "Sergio", "Perez", "Mexican", 11, 0),
                    new Driver(null, "MER", "Lewis", "Hamilton", "British", 44, 7),
                    new Driver(null, "MER", "George", "Russell", "British", 63, 0),
                    new Driver(null, "FER", "Charles", "Leclerc", "Monegasque", 16, 0),
                    new Driver(null, "FER", "Carlos", "Sainz", "Spanish", 55, 0),
                    new Driver(null, "MCL", "Lando", "Norris", "British", 4, 0),
                    new Driver(null, "MCL", "Oscar", "Piastri", "Australian", 81, 0),
                    new Driver(null, "ALP", "Esteban", "Ocon", "French", 31, 0),
                    new Driver(null, "ALP", "Pierre", "Gasly", "French", 10, 0),
                    new Driver(null, "AST", "Fernando", "Alonso", "Spanish", 14, 2),
                    new Driver(null, "AST", "Lance", "Stroll", "Canadian", 18, 0),
                    new Driver(null, "ALT", "Yuki", "Tsunoda", "Japanese", 22, 0),
                    new Driver(null, "ALT", "Daniel", "Ricciardo", "Australian", 3, 0),
                    new Driver(null, "WIL", "Alex", "Albon", "Thai", 23, 0),
                    new Driver(null, "WIL", "Logan", "Sargeant", "American", 2, 0),
                    new Driver(null, "ALF", "Valtteri", "Bottas", "Finnish", 77, 0),
                    new Driver(null, "ALF", "Guanyu", "Zhou", "Chinese", 24, 0),
                    new Driver(null, "HAA", "Kevin", "Magnussen", "Danish", 20, 0),
                    new Driver(null, "HAA", "Nico", "Hulkenberg", "German", 27, 0)
            );

            driverRepository.saveAll(f1Drivers2023);
        }
    }

    // Get all drivers
    //    public List<Driver> getAllDrivers() {
    //        return driverRepository.findAll();
    //    }

    // Get a single driver by ID
    //    public Optional<Driver> getDriverById(Long id) {
    //        return driverRepository.findById(id);
    //    }

    // Get all drivers
    public List<DriverResponse> getAllDrivers() {
        List<Driver> driver = driverRepository.findAll();
        return driver.stream().map(this::mapToDriverResponse).toList();
    }

    // Get a single driver by ID
    public Optional<DriverResponse> getDriverById(Long id) {
        Optional<Driver> driver = driverRepository.findById(id);
        return driver.map(this::mapToDriverResponse);
    }

    // Create a new driver
    public DriverResponse saveDriver(DriverRequest driverRequest)
    {   Driver driver = Driver.builder()
            .teamId(driverRequest.getTeamId())
            .firstName(driverRequest.getFirstName())
            .lastName(driverRequest.getLastName())
            .nationality(driverRequest.getNationality())
            .carNumber(driverRequest.getCarNumber())
            .championshipsWon(driverRequest.getChampionshipsWon())
            .build();
        Driver savedDriver = driverRepository.save(driver);
        return mapToDriverResponse(savedDriver);
    }

    // Update an existing driver
    public DriverResponse updateDriver(Long id, DriverRequest updatedDriver) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        driver.setFirstName(updatedDriver.getFirstName());
        driver.setTeamId(updatedDriver.getTeamId());
        driver.setNationality(updatedDriver.getNationality());
        driver.setCarNumber(updatedDriver.getCarNumber());
        driver.setChampionshipsWon(updatedDriver.getChampionshipsWon());

        Driver savedDriver = driverRepository.save(driver);
        return mapToDriverResponse(savedDriver);
    }

    // Delete a driver by ID
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }


    //DTO
    private DriverResponse mapToDriverResponse(Driver driver) {
        return DriverResponse.builder()
                .id(driver.getId())
                .teamId(driver.getTeamId())
                .firstName(driver.getFirstName())
                .lastName(driver.getLastName())
                .nationality(driver.getNationality())
                .carNumber(driver.getCarNumber())
                .championshipsWon(driver.getChampionshipsWon())
                .build();
    }
}
