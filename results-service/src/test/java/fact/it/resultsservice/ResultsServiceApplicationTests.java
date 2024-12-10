package fact.it.resultsservice;

import fact.it.resultsservice.dto.*;
import fact.it.resultsservice.model.Result;
import fact.it.resultsservice.repository.ResultRepository;
import fact.it.resultsservice.service.ResultService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ResultsServiceApplicationTests {

    @InjectMocks
    private ResultService resultService;

    @Mock
    private ResultRepository resultRepository;

    @Test
    public void testGetResultById_Success() {
        // Arrange
        String resultId = "1";
        Result.DriverResult driverResult = new Result.DriverResult(7, 1, true, 50, BigDecimal.valueOf(25));

        Result result = new Result();
        result.setId(resultId);
        result.setTrackId(101);
        result.setDate(new Date());
        result.setResults(Arrays.asList(driverResult));

        ResultRequest resultRequest = new ResultRequest();

        ResultRequest.DriverResultRequest driverResultRequest = new ResultRequest.DriverResultRequest();
        resultRequest.setId(resultId);
        resultRequest.setTrackId(101);
        resultRequest.setDate(result.getDate());
        resultRequest.setResults(Arrays.asList(driverResultRequest));

        when(resultRepository.findById(resultId)).thenReturn(Optional.of(result));

        // Act
        ResultResponse response = resultService.getResultById(resultId);

        // Assert
        assertNotNull(response);
        assertEquals(resultId, response.getId());
        assertEquals(101, response.getTrackId());
        assertEquals(1, response.getResults().size());

        ResultResponse.DriverResultResponse resultResponse = response.getResults().get(0);
        assertEquals(7, resultResponse.getCarNumber());
        assertEquals(1, resultResponse.getPosition());
        assertEquals(BigDecimal.valueOf(25), resultResponse.getPoints());
        verify(resultRepository, times(1)).findById(resultId);
    }


    @Test
    public void testAddResult_Success() {
        // Arrange
        ResultRequest.DriverResultRequest driverResultRequest = new ResultRequest.DriverResultRequest();
        driverResultRequest.setCarNumber(7);
        driverResultRequest.setPosition(1);
        driverResultRequest.setFastestLap(true);
        driverResultRequest.setLapsCompleted(50);
        driverResultRequest.setPoints(BigDecimal.valueOf(25));

        ResultRequest resultRequest = new ResultRequest();
        resultRequest.setTrackId(101);
        resultRequest.setDate(new Date());
        resultRequest.setResults(Arrays.asList(driverResultRequest));

        Result result = new Result();
        result.setId("1");
        result.setTrackId(101);
        result.setDate(new Date());
        result.setResults(Arrays.asList(new Result.DriverResult(7, 1, true, 50, BigDecimal.valueOf(25))));
        when(resultRepository.save(any(Result.class))).thenReturn(result);

        // Act
        Result response = resultService.addResult(resultRequest);

        // Assert
        assertNotNull(response);
        assertEquals("1", response.getId());
        assertEquals(101, response.getTrackId());
        assertEquals(1, response.getResults().size());
        verify(resultRepository, times(1)).save(any(Result.class));
    }
}
