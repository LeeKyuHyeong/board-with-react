package kh.react.board.naver.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NaverNewsService {

    @Value("${naver.api.client-id}")
    private String clientId;

    @Value("${naver.api.client-secret}")
    private String clientSecret;

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

            // 한국 야구 관련 뉴스만 필터링
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

            // 한국 야구 관련 뉴스만 필터링
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

            // 한국 야구 관련 뉴스만 필터링
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

    public List<Map<String, Object>> getFlowballNews(int size) {

        String url = "https://openapi.naver.com/v1/search/news.json?query=플로우볼&start=1&sort=sim&display=" + size;

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

                // 한국 야구 관련 키워드로 필터링
                if (
                        title.contains("플볼")
//                        || title.contains("한국 축구")
//                        || title.contains("남자 축구")
//                        || title.contains("k리그")
//                        || title.contains("K리그")
//                        || title.contains("K-리그")
//                        || title.contains("k-리그")
//                        || title.contains("여자 축구")
//                        || title.contains("해외 축구")
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
}
