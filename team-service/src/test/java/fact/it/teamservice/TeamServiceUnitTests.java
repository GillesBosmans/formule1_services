package fact.it.teamservice;

import fact.it.teamservice.dto.TeamByIdResponse;
import fact.it.teamservice.dto.TeamRequest;
import fact.it.teamservice.dto.TeamResponse;
import fact.it.teamservice.model.Team;
import fact.it.teamservice.repository.TeamRepository;
import fact.it.teamservice.service.TeamService;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeamServiceUnitTests {

	@InjectMocks
	private TeamService teamService;

	@Mock
	private TeamRepository teamRepository;

	@Test
	public void testGetAllTeams() {
		//Arrange
		Team team1 = new Team(null, "FER", "Ferrari", "Maranello", "Fred Vasseur", 1950, 15);
		Team team2 = new Team(null, "MER", "Mercedes", "Woking", "Toto Wolff", 2010, 9);
		List<Team> teams = Arrays.asList(team1, team2);

		when(teamRepository.findAll()).thenReturn(teams);

		//Act
		List<TeamResponse> teamResponses = teamService.getAllTeams();

		///Assert
		assertEquals(2, teamResponses.size());
		assertEquals("FER", teamResponses.get(0).getTeamAbbreviation());
		assertEquals("MER", teamResponses.get(1).getTeamAbbreviation());

		verify(teamRepository, times(1)).findAll();
	}


	@Test
	public void testGetTeamById(){

		//Arrange
		Long teamId = 1L;
		Team team1 = new Team(1L, "FER", "Ferrari", "Maranello", "Fred Vasseur", 1950, 15);
		Team team2 = new Team(1L, "MER", "Mercedes", "Woking", "Toto Wolff", 2010, 9);
		List<Team> teams = Arrays.asList(team1, team2);

		when(teamRepository.findById(teamId))
				.thenAnswer(invocation -> teams.stream()
						.filter(team -> team.getId().equals(teamId))
						.findFirst());

		//Act
		Optional<TeamByIdResponse> teamResponse = teamService.getTeamById(teamId);

		//Assert
		assertTrue(teamResponse.isPresent());
		assertEquals("Ferrari", teamResponse.get().getTeamName());
		assertEquals("Maranello", teamResponse.get().getBaseLocation());
		assertEquals("Fred Vasseur", teamResponse.get().getTeamPrincipal());
		assertEquals(1950, teamResponse.get().getYearEstablished());
		assertEquals(15, teamResponse.get().getChampionshipsWon());

		verify(teamRepository, times(1)).findById(teamId);
	}

	@Test
	public void testCreateTeam(){

		// Arrange
		TeamRequest team = new TeamRequest();
		team.setTeamName("Ferrari");
		team.setTeamAbbreviation("FER");
		team.setTeamPrincipal("Fred Vasseur");
		team.setBaseLocation("Maranello");
		team.setYearEstablished(1950);
		team.setChampionshipsWon(15);

		// Act
		TeamResponse teamResponse = teamService.saveTeam(team);

		// Assert
		verify(teamRepository, times(1)).save(any(Team.class));
		assertEquals("Ferrari", teamResponse.getTeamName());
		assertEquals("FER", teamResponse.getTeamAbbreviation());
		assertEquals("Fred Vasseur", teamResponse.getTeamPrincipal());
		assertEquals("Maranello", teamResponse.getBaseLocation());
		assertEquals(1950, teamResponse.getYearEstablished());
		assertEquals(15, teamResponse.getChampionshipsWon());
	}

	@Test
	public void testUpdateTeam() {
		// Arrange
		Long teamId = 1L;
		Team existingTeam = new Team(teamId, "FER", "Ferrari", "Maranello", "Fred Vasseur", 1950, 15);
		Team updatedTeam = new Team(teamId, "FER", "Ferrari Updated", "Modena", "Fred Vasseur", 1950, 20);


		TeamRequest updatedTeamRequest = new TeamRequest();
		updatedTeamRequest.setTeamName("Ferrari Updated");
		updatedTeamRequest.setTeamAbbreviation("FER");
		updatedTeamRequest.setTeamPrincipal("Fred Vasseur");
		updatedTeamRequest.setBaseLocation("Modena");
		updatedTeamRequest.setYearEstablished(1950);
		updatedTeamRequest.setChampionshipsWon(20);

		when(teamRepository.findById(teamId)).thenReturn(Optional.of(existingTeam));
		when(teamRepository.save(any(Team.class))).thenReturn(updatedTeam);

		// Act
		Team updatedTeamResponse = teamService.updateTeam(teamId, updatedTeamRequest);

		// Assert
		assertEquals("Ferrari Updated", updatedTeamResponse.getTeamName());
		assertEquals("FER", updatedTeamResponse.getTeamAbbreviation());
		assertEquals("Fred Vasseur", updatedTeamResponse.getTeamPrincipal());
		assertEquals("Modena", updatedTeamResponse.getBaseLocation());
		assertEquals(1950, updatedTeamResponse.getYearEstablished());
		assertEquals(20, updatedTeamResponse.getChampionshipsWon());

		verify(teamRepository, times(1)).findById(teamId);
		verify(teamRepository, times(1)).save(any(Team.class));
	}

}

