package fact.it.driverservice;

import org.junit.jupiter.api.Test;
import fact.it.driverservice.dto.DriverRequest;
import fact.it.driverservice.dto.DriverResponse;
import fact.it.driverservice.model.Driver;
import fact.it.driverservice.repository.DriverRepository;
import fact.it.driverservice.service.DriverService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DriverServiceApplicationTests {

	@InjectMocks
	private DriverService driverService;

	@Mock
	private DriverRepository driverRepository;

	@Test
	public void testCreateDriver() {
		// Arrange
		DriverRequest driverRequest = new DriverRequest();
		driverRequest.setTeamId("TeamA");
		driverRequest.setFirstName("John");
		driverRequest.setLastName("Doe");
		driverRequest.setNationality("American");
		driverRequest.setCarNumber(7);
		driverRequest.setChampionshipsWon(3);

		// Act
		DriverResponse driverResponse = driverService.saveDriver(driverRequest);

		// Assert
		assertEquals("TeamA", driverResponse.getTeamId());
		assertEquals("John", driverResponse.getFirstName());
		assertEquals("Doe", driverResponse.getLastName());
		assertEquals("American", driverResponse.getNationality());
		assertEquals(7, driverResponse.getCarNumber());
		assertEquals(3, driverResponse.getChampionshipsWon());
		verify(driverRepository, times(1)).save(any(Driver.class));
	}

	@Test
	public void testGetAllDrivers() {
		// Arrange
		Driver driver = new Driver();
		driver.setId(1L);
		driver.setTeamId("TeamA");
		driver.setFirstName("John");
		driver.setLastName("Doe");
		driver.setNationality("American");
		driver.setCarNumber(7);
		driver.setChampionshipsWon(3);

		when(driverRepository.findAll()).thenReturn(Arrays.asList(driver));

		// Act
		List<DriverResponse> drivers = driverService.getAllDrivers();

		// Assert
		assertEquals(1, drivers.size());
		assertEquals("TeamA", drivers.get(0).getTeamId());
		assertEquals("John", drivers.get(0).getFirstName());
		assertEquals("Doe", drivers.get(0).getLastName());
		assertEquals("American", drivers.get(0).getNationality());
		assertEquals(7, drivers.get(0).getCarNumber());
		assertEquals(3, drivers.get(0).getChampionshipsWon());
		verify(driverRepository, times(1)).findAll();
	}

	@Test
	public void testGetDriverById() {
		// Arrange
		Driver driver = new Driver();
		driver.setId(1L);
		driver.setTeamId("TeamB");
		driver.setFirstName("Jane");
		driver.setLastName("Smith");
		driver.setNationality("British");
		driver.setCarNumber(10);
		driver.setChampionshipsWon(2);

		when(driverRepository.findById(1L)).thenReturn(Optional.of(driver));

		// Act
		Optional<DriverResponse> driverResponse = driverService.getDriverById(1L);

		// Assert
		assertTrue(driverResponse.isPresent());
		assertEquals("TeamB", driverResponse.get().getTeamId());
		assertEquals("Jane", driverResponse.get().getFirstName());
		assertEquals("Smith", driverResponse.get().getLastName());
		assertEquals("British", driverResponse.get().getNationality());
		assertEquals(10, driverResponse.get().getCarNumber());
		assertEquals(2, driverResponse.get().getChampionshipsWon());
		verify(driverRepository, times(1)).findById(1L);
	}

	@Test
	public void testUpdateDriver() {
		// Arrange
		Driver existingDriver = new Driver();
		existingDriver.setId(1L);
		existingDriver.setTeamId("TeamX");
		existingDriver.setFirstName("Michael");
		existingDriver.setLastName("Jordan");
		existingDriver.setNationality("Canadian");
		existingDriver.setCarNumber(23);
		existingDriver.setChampionshipsWon(5);

		DriverRequest driverRequest = new DriverRequest();
		driverRequest.setTeamId("TeamY");
		driverRequest.setFirstName("Michael");
		driverRequest.setLastName("Jordan");
		driverRequest.setNationality("Canadian");
		driverRequest.setCarNumber(99);
		driverRequest.setChampionshipsWon(6);

		when(driverRepository.findById(1L)).thenReturn(Optional.of(existingDriver));
		when(driverRepository.save(any(Driver.class))).thenReturn(existingDriver);

		// Act
		DriverResponse updatedDriver = driverService.updateDriver(1L, driverRequest);

		// Assert
		assertEquals("TeamY", updatedDriver.getTeamId());
		assertEquals("Michael", updatedDriver.getFirstName());
		assertEquals("Jordan", updatedDriver.getLastName());
		assertEquals("Canadian", updatedDriver.getNationality());
		assertEquals(99, updatedDriver.getCarNumber());
		assertEquals(6, updatedDriver.getChampionshipsWon());
		verify(driverRepository, times(1)).save(any(Driver.class));
	}

	@Test
	public void testDeleteDriver() {
		// Arrange
		Long driverId = 1L;

		// Act
		driverService.deleteDriver(driverId);

		// Assert
		verify(driverRepository, times(1)).deleteById(driverId);
	}
}
