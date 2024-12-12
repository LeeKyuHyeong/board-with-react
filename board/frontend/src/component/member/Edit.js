import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const EditContainer = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
`;

const EditHeader = styled.h2`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  width: 100%;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const Edit = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:8011/api/members/${id}`);
        setMember(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching member details');
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8011/api/members/${id}`, member);
      alert('Member updated successfully');
      navigate(`/members/${id}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      alert('Failed to update member');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <EditContainer>
      <EditHeader>Edit Member</EditHeader>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={member.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={member.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            type="password"
            name="password"
            value={member.password}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </EditContainer>
  );
};

export default Edit;