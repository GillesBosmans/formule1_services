package fact.it.trackservice.service;


import fact.it.trackservice.dto.TrackRequest;
import fact.it.trackservice.dto.TrackResponse;
import fact.it.trackservice.model.Track;
import fact.it.trackservice.repository.TrackRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TrackService {

    private final TrackRepository trackRepository;

    @PostConstruct
    public void loadData(){
        if(trackRepository.count() == 0){
            List<Track> f1Tracks2023 = List.of(
                    new Track(null, "Bahrain International Circuit", "Sakhir", "Bahrain", 5.412, 15),
                    new Track(null, "Jeddah Corniche Circuit", "Jeddah", "Saudi Arabia", 6.174, 27),
                    new Track(null, "Albert Park Circuit", "Melbourne", "Australia", 5.278, 14),
                    new Track(null, "Baku City Circuit", "Baku", "Azerbaijan", 6.003, 20),
                    new Track(null, "Miami International Autodrome", "Miami", "USA", 5.412, 19),
                    new Track(null, "Imola Circuit", "Imola", "Italy", 4.909, 19),
                    new Track(null, "Circuit de Monaco", "Monte Carlo", "Monaco", 3.337, 19),
                    new Track(null, "Circuit de Barcelona-Catalunya", "Barcelona", "Spain", 4.675, 16),
                    new Track(null, "Circuit Gilles Villeneuve", "Montreal", "Canada", 4.361, 14),
                    new Track(null, "Red Bull Ring", "Spielberg", "Austria", 4.318, 10),
                    new Track(null, "Silverstone Circuit", "Silverstone", "United Kingdom", 5.891, 18),
                    new Track(null, "Hungaroring", "Budapest", "Hungary", 4.381, 14),
                    new Track(null, "Circuit de Spa-Francorchamps", "Stavelot", "Belgium", 7.004, 19),
                    new Track(null, "Zandvoort Circuit", "Zandvoort", "Netherlands", 4.259, 14),
                    new Track(null, "Monza Circuit", "Monza", "Italy", 5.793, 11),
                    new Track(null, "Marina Bay Street Circuit", "Marina Bay", "Singapore", 4.940, 23),
                    new Track(null, "Suzuka International Racing Course", "Suzuka", "Japan", 5.807, 18),
                    new Track(null, "Lusail International Circuit", "Lusail", "Qatar", 5.380, 16),
                    new Track(null, "Circuit of the Americas", "Austin", "USA", 5.513, 20),
                    new Track(null, "Autódromo Hermanos Rodríguez", "Mexico City", "Mexico", 4.304, 17),
                    new Track(null, "Interlagos Circuit", "São Paulo", "Brazil", 4.309, 15),
                    new Track(null, "Las Vegas Street Circuit", "Las Vegas", "USA", 6.120, 17),
                    new Track(null, "Yas Marina Circuit", "Abu Dhabi", "UAE", 5.281, 16)
            );
            trackRepository.saveAll(f1Tracks2023);
        }
    }

    // Get all tracks
    public List<TrackResponse> getAllTracks() {
        List<Track> tracks = trackRepository.findAll();
        return tracks.stream().map(this::mapToTrackResponse).toList();
    }

    // Create a new track
    public Track saveTrack(TrackRequest trackRequest)
    {   Track track = Track.builder()
            .trackName(trackRequest.getTrackName())
            .location(trackRequest.getLocation())
            .country(trackRequest.getCountry())
            .trackLengthKm(trackRequest.getTrackLengthKm())
            .numberOfTurns(trackRequest.getNumberOfTurns())
            .build();
        return trackRepository.save(track);
    }

    //DTO
    private TrackResponse mapToTrackResponse(Track track) {
        return TrackResponse.builder()
                .id(track.getId())
                .trackName(track.getTrackName())
                .location(track.getLocation())
                .country(track.getCountry())
                .trackLengthKm(track.getTrackLengthKm())
                .numberOfTurns(track.getNumberOfTurns())
                .build();
    }

}
