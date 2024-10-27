package fact.it.trackservice.controller;


import fact.it.trackservice.model.Track;
import fact.it.trackservice.service.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tracks")
@RequiredArgsConstructor
public class TrackController {

    private final TrackService trackService;

    //Get all tracks
    @GetMapping
    public List<Track> getAllTracks(){return trackService.getAllTracks();}

    //Create a new track
    @PostMapping
    public Track createTrack(@RequestBody Track track){return trackService.saveTrack(track);}
}
