import { useEffect, useState } from "react";

import {Table,Avatar,Badge,Group,Paper,Text,Title,} from "@mantine/core";

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


<Title order={1} mb={5}>
  Field Workers
</Title>

<Text c="dimmed" mb={30}>
  Manage field personnel and
  view their activity.
</Text>

<Paper
  shadow="sm"
  radius="lg"
  p="lg"
  withBorder
>

  <Table
    highlightOnHover
    verticalSpacing="md"
  >

    <Table.Thead>

      <Table.Tr>

        <Table.Th>
          Field Worker
        </Table.Th>

        <Table.Th>
          Primary Region
        </Table.Th>

        <Table.Th>
          Status
        </Table.Th>

        <Table.Th>
          Joined
        </Table.Th>

      </Table.Tr>

    </Table.Thead>

    <Table.Tbody>

      {
        workers.map((worker) => (

          <Table.Tr
            key={worker._id}
          >

            <Table.Td>

             <Group>

  <Avatar
    color="orange"
    radius="xl"
  >

    {
      worker.name
        ?.split(" ")
        .map((word) =>
          word[0]
        )
        .join("")
    }

  </Avatar>

  <div>

    <Text fw={600}>
      {worker.name}
    </Text>

    <Text
      size="sm"
      c="dimmed"
    >
      {worker.email}
    </Text>

  </div>

</Group>

            </Table.Td>

            <Table.Td>

              {
                worker.region ||
                "Not Assigned"
              }

            </Table.Td>

            <Table.Td>

              <Badge
  color="green"
  variant="light"
>

  Active

</Badge>

            </Table.Td>

            <Table.Td>

              {
  new Date(
    worker.createdAt
  ).toLocaleDateString()
}

            </Table.Td>

          </Table.Tr>
        ))
      }

    </Table.Tbody>

  </Table>

</Paper>


  </div>
);

};
export default FieldWorkers;
