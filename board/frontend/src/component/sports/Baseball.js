import React, { useEffect, useState } from "react";
import axios from "axios";
import CommonUtils from "../common/CommonUtils";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "box-shadow 0.3s ease-in-out",
  },
  cardHover: {
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
    textDecoration: "none",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  source: {
    fontSize: "12px",
    color: "#999",
  },
};

const Baseball = () => {
  const [articles, setArticles] = useState([{}]);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
		const fetchNews = async () => {
      try {
        await axios.get("http://localhost:8011/api/news/baseball/")
				.then((response) => {
					setArticles(response.data);
					setLoading(false);
				})} catch (error) {
        console.error("Failed to fetch news", error);
        setLoading(false);
      }
    };

    fetchNews();

  }, []);

	if (loading) {
    return <div className="text-center mt-10">뉴스를 불러오는 중입니다...</div>;
  }

	if (articles.length === 0) {
    return <div className="text-center mt-10">관련 뉴스가 없습니다.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>야구 관련 최신 뉴스</h1>
      <div style={styles.grid}>
        {articles.map((article, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = styles.cardHover.boxShadow)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = styles.card.boxShadow)}
          >
            <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={styles.content}>
                <h2 style={styles.title}>{CommonUtils.decodeHtml(article.title)}</h2>
                <p style={styles.description}>
                  {CommonUtils.decodeHtml(article.description)}
                </p>
                <p style={styles.source}>출처: {article.originallink}</p>
								<p style={styles.source}>작성일: {article.dt}</p>
              </div>
            </a>
          </div>
        ))}
			</div>
    </div>
  );
};

export default Baseball;