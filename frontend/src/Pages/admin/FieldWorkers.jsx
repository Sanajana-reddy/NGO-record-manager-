import { useEffect, useState } from "react";

import {
Card,
Text,
Title,
SimpleGrid,
} from "@mantine/core";

import API from "../../Services/api.js";

const FieldWorkers = () => {

const [workers, setWorkers] =
useState([]);

const fetchWorkers = async () => {
try {

  const response =
    await API.get(
      "/api/admin/workers"
    );
console.log(response.data);

setWorkers(response.data);

} catch (error) {

  console.log(error);

}


};

useEffect(() => {


fetchWorkers();


}, []);

return (
<div>

  <Title order={2} mb={30}>
    Field Workers
  </Title>

  <SimpleGrid cols={3}>

    {
      workers.map((worker) => (

        <Card
          key={worker._id}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >

          <Title order={4} mb={10}>
            {worker.name}
          </Title>

          <Text>
            Email:
            {worker.email}
          </Text>

          <Text>
            Role:
            {worker.role}
          </Text>

        </Card>
      ))
    }

  </SimpleGrid>

</div>


);
};

export default FieldWorkers;
