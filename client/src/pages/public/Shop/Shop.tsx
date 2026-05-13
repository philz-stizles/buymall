import { Container } from '../../../components/shared';

type Props = {};

const Shop = (props: Props) => {
  return (
    <section>
      <Container fluid>
        <div className="">
          <div className="col-md-3 pt-2">
            <h4>Search/Filter</h4>
            <hr />
          </div>
        </div>
        <div></div>
      </Container>
    </section>
  );
};

export default Shop;
