import Nav from 'react-bootstrap/Nav';
import { ServerTagType } from '../../ types/postTypes';

type CategoriesProps = {
  tags: ServerTagType[];
};

const Categories = ({ tags }: CategoriesProps) => {
  
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      {
        tags.map(tag => (
          <Nav.Item key={tag.id}>
            <Nav.Link eventKey={`link-${tag.id}`}>{tag.label}</Nav.Link>
          </Nav.Item>
        ))
      }
    </Nav>
  );
}

export default Categories;