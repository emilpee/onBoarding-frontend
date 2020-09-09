import React, { useEffect, useState, FunctionComponent } from "react";
import axios from "axios";
import { Header, Footer } from "../../components/";
import { User } from "../../interfaces";
import { UserContext } from "../../context/userContext";
import { Container } from "react-bootstrap";
import "./styles.scss";

interface DashboardProps {
  user: User;
}

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  const { user } = props;
  const [signedInUser, setSignedInUser] = useState<User>(null);
  const query = window.location.search.substring(1);
  const token = query.split("access_token=")[1];
  const id = query.split("user=")[1];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then(({ data }) => {
        setSignedInUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, token, id, signedInUser]);

  return (
    <UserContext.Provider value={signedInUser}>
      <Header user={signedInUser} />
      <Container className="container" fluid>
        <h1 className="display-4">Dashboard</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          laborum voluptatem enim eligendi corrupti quos, accusantium,
          consequuntur fuga asperiores eius inventore recusandae modi animi cum.
          Atque totam ipsa minus deserunt? Esse mollitia obcaecati omnis nihil
          magnam fuga dolorum inventore consequatur neque eius. Deserunt
          molestiae praesentium sunt ipsa ad totam explicabo. Atque quae
          temporibus molestias accusamus aperiam cumque porro hic saepe? Vel,
          dolorem praesentium minima a molestiae modi. Esse enim facilis eaque
          unde sit inventore accusamus, ducimus nulla aspernatur consequuntur
          deserunt? Blanditiis quaerat magnam, ducimus culpa ut odio sunt cum
          aliquam? Corporis, ipsum obcaecati impedit recusandae nihil quas
          eveniet autem mollitia similique perspiciatis deleniti, alias, iure
          magnam aliquid amet! Ab ea eum similique quam. Molestias repellendus
          tempora pariatur rem ea exercitationem. Aliquid atque fugiat ad quo
          qui beatae officia voluptatibus! Fugiat nulla reprehenderit accusamus
          eligendi dolore deleniti, qui eum quos neque id dolorum sint
          perferendis iusto aliquid quae quibusdam molestiae quia. Dolorem
          dolore aspernatur ipsam! Quasi ex vel laudantium sit ullam
          necessitatibus optio voluptates? Odit nihil porro quo cum quia illum,
          aperiam, reprehenderit ullam, praesentium exercitationem dolorum id
          corporis iste quasi?
        </p>
      </Container>
      <Footer />
    </UserContext.Provider>
  );
};

export default Dashboard;
