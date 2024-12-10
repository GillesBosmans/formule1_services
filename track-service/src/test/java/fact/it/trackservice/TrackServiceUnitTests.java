package fact.it.trackservice;

import fact.it.trackservice.dto.TrackRequest;
import fact.it.trackservice.dto.TrackResponse;
import fact.it.trackservice.model.Track;
import fact.it.trackservice.repository.TrackRepository;
import fact.it.trackservice.service.TrackService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class TrackServiceUnitTests {
	@InjectMocks
	private TrackService trackService;

	@Mock
	private TrackRepository trackRepository;

	@Test
	public void testGetAllTracks() {
		//Arrange
		Track track1 = new Track(null, "Spa Francorchamps", "Spa", "Belgium", 7.2, 17 );
		Track track2 = new Track(null, "Monza", "Milan", "Italy", 4.8, 12 );
		List<Track> tracks = Arrays.asList(track1, track2);

		when(trackRepository.findAll()).thenReturn(tracks);

		//Act
		List<TrackResponse> trackResponses = trackService.getAllTracks();

		// Assert
		assertEquals(2, trackResponses.size());
		assertEquals("Spa Francorchamps", trackResponses.get(0).getTrackName());
		assertEquals("Monza", trackResponses.get(1).getTrackName());

		verify(trackRepository, times(1)).findAll();

	}

	@Test
	public void testCreateTrack(){
		// Arrange
		TrackRequest track = new TrackRequest();
		track.setTrackName("Spa Francorchamps");
		track.setLocation("Spa");
		track.setCountry("Belgium");
		track.setTrackLengthKm(7.2);
		track.setNumberOfTurns(17);

		// Act
		TrackResponse trackResponse = trackService.saveTrack(track);

		//Assert
		verify(trackRepository, times(1)).save(any(Track.class));
		assertEquals("Spa Francorchamps", trackResponse.getTrackName());
		assertEquals("Spa", trackResponse.getLocation());
		assertEquals("Belgium", trackResponse.getCountry());
		assertEquals(7.2, trackResponse.getTrackLengthKm());
		assertEquals(17, trackResponse.getNumberOfTurns());





	}



}
