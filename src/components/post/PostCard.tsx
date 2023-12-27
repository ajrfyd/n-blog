import React, { useCallback, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { PostType } from '../../ types/postTypes';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from '../slider/Slider';

type PostCardProps = {
  post: PostType;
};

const PostCard = ({ post }: PostCardProps) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const getCreatedAt = useCallback((date: string) => new Intl.DateTimeFormat("ko", { dateStyle: "medium" }).format(new Date(date)), []);
  // (date: string) => new Intl.DateTimeFormat("ko", { dateStyle: "medium" }).format(new Date(date))

  return (
    <CardContainer 
      onClick={() => navigate(`/post/${post.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* <Card.Header>Tags</Card.Header> */}
      <Card.Header>{getCreatedAt(post.createdAt.toString())}</Card.Header>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          { post.body }
        </Card.Text>
      </Card.Body>
      <Slider items={post.tags} $hovered={hovered}/>
    </CardContainer>
  )
}

export default React.memo(PostCard);

const CardContainer = styled(Card)`
  cursor: pointer;
  min-height: 200px;

  .card-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis !important;
  }

  .card-text {
    /* white-space: normal; */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: var(--purple);
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 5px rgba(0, 0, 0, .4);
  }
`;