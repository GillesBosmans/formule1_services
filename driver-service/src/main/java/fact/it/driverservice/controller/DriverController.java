package fact.it.driverservice.controller;

import fact.it.driverservice.dto.DriverRequest;
import fact.it.driverservice.dto.DriverResponse;
import fact.it.driverservice.model.Driver;
import fact.it.driverservice.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    // Get all drivers
    @GetMapping
    public ResponseEntity<List<DriverResponse>> getAllDrivers() {
        List<DriverResponse> drivers = driverService.getAllDrivers();
        return drivers.isEmpty()
                ? ResponseEntity.noContent().build()  // 204 No Content
                : ResponseEntity.ok(drivers);        // 200 OK
    }

    // Get a driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<DriverResponse> getDriverById(@PathVariable Long id) {
        return driverService.getDriverById(id)
                .map(driver -> ResponseEntity.ok(driver))     // 200 OK
                .orElse(ResponseEntity.notFound().build());  // 404 Not Found
    }

    // Create a new driver
    @PostMapping
    public ResponseEntity<DriverResponse> createDriver(@RequestBody DriverRequest driverRequest) {
        try {
            DriverResponse createdDriver = driverService.saveDriver(driverRequest);
            return new ResponseEntity<>(createdDriver, HttpStatus.CREATED); // 201 Created
        } catch (IllegalArgumentException e) {  // Bad input
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        } catch (RuntimeException e) {  // General server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }

    // Update an existing driver
    @PutMapping("/{id}")
    public ResponseEntity<DriverResponse> updateDriver(@PathVariable Long id, @RequestBody DriverRequest driverRequest) {
        try {
            DriverResponse updatedDriver = driverService.updateDriver(id, driverRequest);
            return ResponseEntity.ok(updatedDriver);  // 200 OK
        } catch (IllegalArgumentException e) {  // Invalid input
            return ResponseEntity.badRequest().build();  // 400 Bad Request
        } catch (NoSuchElementException e) {  // Resource not found
            return ResponseEntity.notFound().build();  // 404 Not Found
        } catch (RuntimeException e) {  // Unexpected system error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // 500 Internal Server Error
        }
    }

    // Delete a driver
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        try {
            driverService.deleteDriver(id);
            return ResponseEntity.noContent().build();  // 204 No Content
        } catch (NoSuchElementException e) {  // Resource not found
            return ResponseEntity.notFound().build();  // 404 Not Found
        } catch (RuntimeException e) {  // Unexpected system error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // 500 Internal Server Error
        }
    }

}
