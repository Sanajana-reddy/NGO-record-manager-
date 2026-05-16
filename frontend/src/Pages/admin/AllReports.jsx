import { useEffect, useState } from "react";

import { Card, Text, Title, SimpleGrid, TextInput, Table, Button, Group, ScrollArea } from "@mantine/core";

import API from "../../Services/api";

const AllReports = () => {

const [reports, setReports] =
useState([]);

const [search, setSearch] =
useState("");

const [regionFilter,
setRegionFilter] =
useState("");

const [activityFilter,
setActivityFilter] =
useState("");

const fetchReports = async () => {


try {

  const response =
    await API.get(
      "/api/admin/reports"
    );

  setReports(response.data);

} catch (error) {

  console.log(error);

}


};

useEffect(() => {


// Data is loaded from the backend once when this route mounts.
// eslint-disable-next-line react-hooks/set-state-in-effect
fetchReports();


}, []);

const filteredReports =
reports.filter((report) => {


  const workerName =
    report.workerId?.name
      ?.toLowerCase() || "";

  const region =
    report.region
      ?.toLowerCase() || "";

  const activity =
    report.activityType
      ?.toLowerCase() || "";

  return (

    workerName.includes(
      search.toLowerCase()
    )

    &&

    region.includes(
      regionFilter.toLowerCase()
    )

    &&

    activity.includes(
      activityFilter.toLowerCase()
    )
  );
});


return (


<div>

  <Title order={2} mb={20}>
    All Reports
  </Title>


  <SimpleGrid cols={3} mb={30}>

    <TextInput
      placeholder="Search Worker"
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    <TextInput
      placeholder="Filter Region"
      value={regionFilter}
      onChange={(e) =>
        setRegionFilter(
          e.target.value
        )
      }
    />

    <TextInput
      placeholder="Filter Activity"
      value={activityFilter}
      onChange={(e) =>
        setActivityFilter(
          e.target.value
        )
      }
    />

  </SimpleGrid>



  <ScrollArea>
    <Table highlightOnHover verticalSpacing="md">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Worker</Table.Th>
          <Table.Th>Activity</Table.Th>
          <Table.Th>Region</Table.Th>
          <Table.Th>Beneficiaries</Table.Th>
         
          <Table.Th>Issues</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {filteredReports.map((report) => (
          <Table.Tr key={report._id}>
            <Table.Td>{report.workerId?.name}</Table.Td>
            <Table.Td>{report.activityType}</Table.Td>
            <Table.Td>{report.region}</Table.Td>
            <Table.Td>{report.beneficiariesCount}</Table.Td>
            
            <Table.Td>{report.issues}</Table.Td>
            <Table.Td>{report.description}</Table.Td>
            <Table.Td>
              <Group spacing="xs">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={async () => {
                    const newDesc = window.prompt("Edit description", report.description || "");
                    if (newDesc !== null) {
                      try {
                        await API.put(`/api/reports/${report._id}`, { description: newDesc });
                        window.location.reload();
                      } catch (err) {
                        console.error(err);
                        alert("Failed to update report");
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
                    if (window.confirm("Delete this report?")) {
                      try {
                        await API.delete(`/api/reports/${report._id}`);
                        window.location.reload();
                      } catch (err) {
                        console.error(err);
                        alert("Failed to delete report");
                      }
                    }
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </ScrollArea>

</div>


);
};

export default AllReports;
