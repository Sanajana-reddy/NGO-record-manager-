import { useEffect, useState } from "react";

import {
Card,
Text,
Title,
SimpleGrid,
TextInput,
} from "@mantine/core";

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



  {
    filteredReports.map((report) => (

      <Card
        key={report._id}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mb={20}
      >

        <Title order={4} mb={10}>
          {report.activityType}
        </Title>

        <Text>
          Worker:
          {report.workerId?.name}
        </Text>

        <Text>
          Email:
          {report.workerId?.email}
        </Text>

        <Text>
          Region:
          {report.region}
        </Text>

        <Text>
          Beneficiaries:
          {report.beneficiariesCount}
        </Text>

        <Text>
          Attendance:
          {report.attendance}
        </Text>

        <Text>
          Issues:
          {report.issues}
        </Text>

        <Text>
          Description:
          {report.description}
        </Text>

      </Card>
    ))
  }

</div>


);
};

export default AllReports;
