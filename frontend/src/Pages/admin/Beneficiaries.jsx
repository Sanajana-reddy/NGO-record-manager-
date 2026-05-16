import React from "react";
import { useState, useEffect } from "react";

import {
Title,
Text,
Button,
Group,
Paper,
TextInput,
Table,
} from "@mantine/core";
import API from "../../Services/api";



const Beneficiaries = () => {
    const [beneficiaries,setBeneficiaries] =useState([]);
    const fetchBeneficiaries =
  async () => {

    try {

      const response =
        await API.get(
          "/api/beneficiaries"
        );

      console.log(response.data);

      setBeneficiaries(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };
  useEffect(() => {

  fetchBeneficiaries();

}, []);

return (


<div>

  <Group
    justify="space-between"
    mb={30}
  >

    <div>

      <Title order={1}>
        Beneficiaries
      </Title>

      <Text c="dimmed">

        Directory of individuals
        receiving NGO services.

      </Text>

    </div>

    

  </Group>


  <Paper
    shadow="sm"
    radius="lg"
    p="xl"
    withBorder
  >

    <TextInput
      placeholder="
      Search by name,
      region, or phone...
      "
      
      mb={30}
      size="md"
    />


    <Table
      highlightOnHover
      verticalSpacing="lg"
    >

      <Table.Thead>

        <Table.Tr>

          <Table.Th>
            Name
          </Table.Th>

          <Table.Th>
            Age / Gender
          </Table.Th>

          <Table.Th>
            Location
          </Table.Th>

          <Table.Th>
            Contact
          </Table.Th>

          <Table.Th>
            Registered
          </Table.Th>

          <Table.Th>
            How helped
          </Table.Th>

          <Table.Th>
            Actions
          </Table.Th>

        </Table.Tr>

      </Table.Thead>


      <Table.Tbody>

{
beneficiaries.map(
(person) => (


    <Table.Tr
      key={person._id}
    >

      <Table.Td>

        <Text fw={600}>
          {person.name}
        </Text>

      </Table.Td>

      <Table.Td>

        {person.age}y •
        {" "}
        {person.gender}

      </Table.Td>

      <Table.Td>

        <Text>
          {person.region}
        </Text>

        <Text
          size="sm"
          c="dimmed"
        >
          {person.village}
        </Text>

      </Table.Td>

      <Table.Td>

        {person.phone}

      </Table.Td>

      <Table.Td>

        {
          new Date(
            person.createdAt
          ).toLocaleDateString()
        }

      </Table.Td>

      <Table.Td>
        {person.assistance || "-"}
      </Table.Td>

      <Table.Td>
        <Group spacing="xs">
          <Button
            size="xs"
            variant="outline"
            onClick={async () => {
              const newAssistance = window.prompt("How did the NGO help this person?", person.assistance || "");
              if (newAssistance !== null) {
                try {
                  await API.put(`/api/beneficiaries/${person._id}`, { assistance: newAssistance });
                  fetchBeneficiaries();
                } catch (err) {
                  console.error(err);
                  alert("Failed to update");
                }
              }
            }}
          >
            Edit
          </Button>

          <Button
            size="xs"
            color="red"
            variant="outline"
            onClick={async () => {
              if (window.confirm("Delete this beneficiary?")) {
                try {
                  await API.delete(`/api/beneficiaries/${person._id}`);
                  fetchBeneficiaries();
                } catch (err) {
                  console.error(err);
                  alert("Failed to delete");
                }
              }
            }}
          >
            Delete
          </Button>
        </Group>
      </Table.Td>

    </Table.Tr>
  )
)


}

</Table.Tbody>


    </Table>

  </Paper>

</div>


);
};

export default Beneficiaries;
