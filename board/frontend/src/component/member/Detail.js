// Detail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DetailContainer = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
`;

const DetailHeader = styled.h2`
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  margin: 0.5rem 0;
  font-size: 1.2rem;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const Detail = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams(); // URL에서 id를 받아옵니다.
  const navigate = useNavigate();

  useEffect(() => {
		if (!id) {
			setError("Invalid access: ID is required.");
			setTimeout(() => {
				navigate("/", { state: { error: "Invalid access: ID is required." } });
			}, 2000); // 2초 후 메인 페이지로 이동
			return;
		}

    const fetchMemberDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8011/api/members/${id}`);
        setMember(response.data); // 받아온 데이터를 상태에 저장
        setLoading(false);
      } catch (error) {
        setError('Error fetching member details');
        setLoading(false);
      }
    };

    fetchMemberDetail();
  }, [id, navigate]);

  const goBack = () => {
    navigate('/lists'); // /members 페이지로 돌아가기
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DetailContainer>
      <DetailHeader>Member Details</DetailHeader>
      {member && (
        <>
          <DetailRow>
            <DetailLabel>Name:</DetailLabel>{member.name}
          </DetailRow>
          <DetailRow>
            <DetailLabel>Email:</DetailLabel>{member.email}
          </DetailRow>
          <DetailRow>
            <DetailLabel>Password:</DetailLabel>
          </DetailRow>
          {/* 추가적인 회원 상세 정보를 여기에 표시할 수 있습니다. */}

          <Button onClick={goBack}>Go Back</Button>
        </>
      )}
    </DetailContainer>
  );
};

export default Detail;
