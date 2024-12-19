package kh.react.board.naver.service;

import kh.react.board.naver.model.News;
import kh.react.board.naver.repository.NewsRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
public class NewsService {

    @Value("${naver.api.client-id}")
    private String clientId;

    @Value("${naver.api.client-secret}")
    private String clientSecret;

    @Autowired
    NewsRepository newsRepository;

    public List<News> getNewsByTypeAndDate(String newsType, LocalDate date) {
        return newsRepository.findByNewsTypeAndCreatedDate(newsType, date);
    }

    public List<Map<String, Object>> getBaseballNews(int size) {

        String url = "https://openapi.naver.com/v1/search/news.json?query=야구&start=1&sort=sim&display=" + size;

        // REST 요청 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        // 응답 데이터 처리
        List<Map<String, Object>> news = new ArrayList<>();
        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray items = jsonResponse.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                Map<String, Object> params = new HashMap<>();

                String title = item.getString("title").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String description = item.getString("description").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String link = item.getString("link");
                String originallink = item.getString("originallink");
                String dt = item.getString("pubDate");

                // 한국 야구 관련 키워드로 필터링
                if (
                        title.contains("KBO")
                        || title.contains("한국 야구")
                        || title.contains("프로 야구")
                        || title.contains("kbo")
                        || title.contains("미국프로 야구")
                        || title.contains("리틀 야구")
                        || title.contains("김도영")
                ) {

                    params.put("title", title);
                    params.put("link", link);
                    params.put("description", description);
                    params.put("originallink", originallink);
                    params.put("dt", dt);

                    news.add(params);
                }
            }
        }

        return news;
    }

    public List<Map<String, Object>> getVolleyballNews(int size) {

        String url = "https://openapi.naver.com/v1/search/news.json?query=배구&start=1&sort=sim&display=" + size;

        // REST 요청 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        // 응답 데이터 처리
        List<Map<String, Object>> news = new ArrayList<>();
        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray items = jsonResponse.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                Map<String, Object> params = new HashMap<>();

                String title = item.getString("title").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String description = item.getString("description").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String link = item.getString("link");
                String originallink = item.getString("originallink");
                String dt = item.getString("pubDate");

                // 관련 키워드로 필터링
                if (title.contains("여자 배구") || title.contains("한국 배구") || title.contains("남자 배구") || title.contains("kovo") || title.contains("KOVO") ) {

                    params.put("title", title);
                    params.put("link", link);
                    params.put("description", description);
                    params.put("originallink", originallink);
                    params.put("dt", dt);

                    news.add(params);
                }
            }
        }

        return news;
    }

    public List<Map<String, Object>> getSoccerNews(int size) {

        String url = "https://openapi.naver.com/v1/search/news.json?query=축구&start=1&sort=sim&display=" + size;

        // REST 요청 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        // 응답 데이터 처리
        List<Map<String, Object>> news = new ArrayList<>();
        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray items = jsonResponse.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                Map<String, Object> params = new HashMap<>();

                String title = item.getString("title").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String description = item.getString("description").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String link = item.getString("link");
                String originallink = item.getString("originallink");
                String dt = item.getString("pubDate");

                // 관련 키워드로 필터링
                if (title.contains("국내 축구") || title.contains("한국 축구") || title.contains("남자 축구") || title.contains("k리그") || title.contains("K리그")
                        || title.contains("K-리그") || title.contains("k-리그") || title.contains("여자 축구") || title.contains("해외 축구")
                ) {

                    params.put("title", title);
                    params.put("link", link);
                    params.put("description", description);
                    params.put("originallink", originallink);
                    params.put("dt", dt);

                    news.add(params);
                }
            }
        }

        return news;
    }

    public List<Map<String, Object>> getFloorballNews(int size) {

        String url = "https://openapi.naver.com/v1/search/news.json?query=스포츠&start=1&sort=sim&display=" + size;

        // REST 요청 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        // 응답 데이터 처리
        List<Map<String, Object>> news = new ArrayList<>();
        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray items = jsonResponse.getJSONArray("items");

            // 관련 뉴스만 필터링
            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                Map<String, Object> params = new HashMap<>();

                String title = item.getString("title").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String description = item.getString("description").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String link = item.getString("link");
                String originallink = item.getString("originallink");
                String dt = item.getString("pubDate");

                // 플로어볼 관련 키워드로 필터링
                if (
                        title.contains("플볼")
                        || title.contains("floorball")
                        || title.contains("floor-ball")
                        || title.contains("뉴스포츠")
                        || title.contains("뉴 스포츠")
                        || title.contains("플로우볼")
                        || title.contains("플로우 볼")
                        || title.contains("플로어볼")
                        || title.contains("플로어 볼")
                        || title.contains("Floorball")
                        || title.contains("Floor-ball")
                        || title.contains("Floor ball")
                        || title.contains("floor ball")
                ) {

                    params.put("title", title);
                    params.put("link", link);
                    params.put("description", description);
                    params.put("originallink", originallink);
                    params.put("dt", dt);

                    news.add(params);
                }
            }
        }

        return news;
    }

    public List<Map<String, Object>> getFrisbeeNews(int size) {

        String url = "https://openapi.naver.com/v1/search/news.json?query=스포츠&start=1&sort=sim&display=" + size;

        // REST 요청 설정
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        // 응답 데이터 처리
        List<Map<String, Object>> news = new ArrayList<>();
        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray items = jsonResponse.getJSONArray("items");

            // 한국 야구 관련 뉴스만 필터링
            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                Map<String, Object> params = new HashMap<>();

                String title = item.getString("title").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String description = item.getString("description").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String link = item.getString("link");
                String originallink = item.getString("originallink");
                String dt = item.getString("pubDate");

                // 프리즈비 관련 키워드로 필터링
                if (
                        title.contains("플라잉디스크")
                        || title.contains("플라잉 디스크")
                        || title.contains("프리스비")
                        || title.contains("프리즈비")
                        || title.contains("frisbee")
                        || title.contains("디스크 던지기")
                        || title.contains("뉴스포츠")
                        || title.contains("Frisbee")
                        || title.contains("FRISBEE")
                ) {

                    params.put("title", title);
                    params.put("link", link);
                    params.put("description", description);
                    params.put("originallink", originallink);
                    params.put("dt", dt);

                    news.add(params);
                }
            }
        }

        return news;
    }


    /*배치*/
    //야구
    public int fetchAndSaveBaseballNews() {
        int result = 0;

        try {
            String url = "https://openapi.naver.com/v1/search/news.json?query=야구&start=1&sort=sim&display=100";

            // REST 요청 설정
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            // 응답 데이터 처리
            List<News> newsList = new ArrayList<>();
            if (response.getStatusCode() == HttpStatus.OK) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray items = jsonResponse.getJSONArray("items");

                // 패치로 저장된 기사 수
                int cnt = 0;
                
                for (int i = 0; i < items.length(); i++) {
                    JSONObject item = items.getJSONObject(i);

                    String originalLink = (String) item.get("originallink"); // originalLink 값

                    // 중복 체크
                    if (newsRepository.existsById(originalLink)) {
                        continue; // 중복된 링크는 건너뜀
                    }

                    News news = new News();
                    news.setOriginalLink(originalLink);
                    news.setTitle(item.get("title").toString().replaceAll("<[^>]*>", "")); // HTML 태그 제거
                    news.setDescription(item.get("description").toString().replaceAll("<[^>]*>", ""));
                    news.setNewsType("baseball"); // 구분자
                    news.setCreatedDate(LocalDate.now()); // 저장 날짜

                    SimpleDateFormat parseDateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH);

                    Date parseDate = parseDateFormat.parse(item.get("pubDate").toString());

                    news.setPubDate(parseDate); //보도날짜

                    newsList.add(news);
                    cnt++;
                }
                // 데이터 저장
                newsRepository.saveAll(newsList);

                System.out.println("News fetched and saved successfully at " + LocalDate.now());
                result = cnt;
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred during news fetch.");
        }
        return result;
    }

    //축구
    public int fetchAndSaveSoccerNews() {
        int result = 0;

        try {
            String url = "https://openapi.naver.com/v1/search/news.json?query=축구&start=1&sort=sim&display=100";

            // REST 요청 설정
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            // 응답 데이터 처리
            List<News> newsList = new ArrayList<>();
            if (response.getStatusCode() == HttpStatus.OK) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray items = jsonResponse.getJSONArray("items");

                // 패치로 저장된 기사 수
                int cnt = 0;

                for (int i = 0; i < items.length(); i++) {
                    JSONObject item = items.getJSONObject(i);

                    String originalLink = (String) item.get("originallink"); // originalLink 값

                    // 중복 체크
                    if (newsRepository.existsById(originalLink)) {
                        continue; // 중복된 링크는 건너뜀
                    }

                    News news = new News();
                    news.setOriginalLink(originalLink);
                    news.setTitle(item.get("title").toString().replaceAll("<[^>]*>", "")); // HTML 태그 제거
                    news.setDescription(item.get("description").toString().replaceAll("<[^>]*>", ""));
                    news.setNewsType("soccer"); // 구분자
                    news.setCreatedDate(LocalDate.now()); // 저장 날짜

                    SimpleDateFormat parseDateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH);

                    Date parseDate = parseDateFormat.parse(item.get("pubDate").toString());

                    news.setPubDate(parseDate); //보도날짜

                    newsList.add(news);
                    cnt++;
                }
                // 데이터 저장
                newsRepository.saveAll(newsList);

                System.out.println("News fetched and saved successfully at " + LocalDate.now());
                result = cnt;
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred during news fetch.");
        }
        return result;
    }

    //배구
    public int fetchAndSaveVolleyballNews() {
        int result = 0;

        try {
            String url = "https://openapi.naver.com/v1/search/news.json?query=배구&start=1&sort=sim&display=100";

            // REST 요청 설정
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            // 응답 데이터 처리
            List<News> newsList = new ArrayList<>();
            if (response.getStatusCode() == HttpStatus.OK) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray items = jsonResponse.getJSONArray("items");

                // 패치로 저장된 기사 수
                int cnt = 0;
                
                for (int i = 0; i < items.length(); i++) {
                    JSONObject item = items.getJSONObject(i);

                    String originalLink = (String) item.get("originallink"); // originalLink 값

                    // 중복 체크
                    if (newsRepository.existsById(originalLink)) {
                        continue; // 중복된 링크는 건너뜀
                    }

                    News news = new News();
                    news.setOriginalLink(originalLink);
                    news.setTitle(item.get("title").toString().replaceAll("<[^>]*>", "")); // HTML 태그 제거
                    news.setDescription(item.get("description").toString().replaceAll("<[^>]*>", ""));
                    news.setNewsType("volleyball"); // 구분자
                    news.setCreatedDate(LocalDate.now()); // 저장 날짜

                    SimpleDateFormat parseDateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH);

                    Date parseDate = parseDateFormat.parse(item.get("pubDate").toString());

                    news.setPubDate(parseDate); //보도날짜

                    newsList.add(news);
                    cnt++;
                }
                // 데이터 저장
                newsRepository.saveAll(newsList);

                System.out.println("News fetched and saved successfully at " + LocalDate.now());
                result = cnt;
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred during news fetch.");
        }
        return result;
    }
}
