import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Badge,
  Button,
  Group,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import {
  AlertTriangle,
  Brain,
  Lightbulb,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import API from "../../Services/api";

const extractSection = (summary, heading) => {
  const sectionPattern = new RegExp(
    `(?:^|\\n)##\\s*${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`,
    "i"
  );

  const match = summary.match(sectionPattern);
  return match?.[1]?.trim() || "";
};

const AISummary = () => {
  const [summary, setSummary] = useState("");
  const [reportCount, setReportCount] = useState(0);
  const [generatedAt, setGeneratedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAISummary = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/admin/ai-summary");

      setSummary(response.data?.summary || "");
      setReportCount(response.data?.reportCount || 0);
      setGeneratedAt(response.data?.generatedAt || "");
    } catch (err) {
      console.error("Failed to fetch AI summary:", err);
      setError(
        err.response?.data?.message ||
          "Unable to generate the AI summary right now."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Summary is generated from the latest report data when the route mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAISummary();
  }, []);

  const sections = useMemo(
    () => ({
      overview: extractSection(summary, "Overview") || summary,
      issues: extractSection(summary, "Issues"),
      regions: extractSection(summary, "High Activity Regions"),
      risks: extractSection(summary, "Operational Risks"),
      recommendations: extractSection(summary, "Recommendations"),
    }),
    [summary]
  );

  const formattedGeneratedAt = generatedAt
    ? new Date(generatedAt).toLocaleString()
    : "Not generated yet";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <Paper
        p="xl"
        radius="md"
        withBorder
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #f6fbf8 52%, #edf7ff 100%)",
        }}
      >
        <Group justify="space-between" align="flex-start" gap="md">
          <div>
            <Group gap="sm" mb={8}>
              <Brain size={24} color="#0f766e" />
              <Title order={2}>AI NGO Intelligence</Title>
            </Group>

            
          </div>

          <Button
            leftSection={<RefreshCw size={16} />}
            variant="filled"
            color="teal"
            onClick={fetchAISummary}
            loading={loading}
          >
            Refresh
          </Button>
        </Group>
      </Paper>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        <Paper p="md" radius="md" withBorder>
          <Text size="sm" c="dimmed">
            Reports Reviewed
          </Text>
          <Title order={3}>{reportCount}</Title>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Text size="sm" c="dimmed">
            Intelligence Mode
          </Text>
          <Badge color="teal" variant="light" mt={8}>
            Gemini 2.5 Flash
          </Badge>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Text size="sm" c="dimmed">
            Last Generated
          </Text>
          <Text fw={600} mt={6}>
            {formattedGeneratedAt}
          </Text>
        </Paper>
      </SimpleGrid>

      {error && (
        <Alert color="red" title="AI summary unavailable">
          {error}
        </Alert>
      )}

      <Paper p="xl" radius="md" withBorder>
        {loading ? (
          <Group justify="center" py={70}>
            <Loader color="teal" />
            <Text c="dimmed">Generating NGO operational intelligence...</Text>
          </Group>
        ) : (
          <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="lg">
            <Paper p="md" radius="md" withBorder>
              <Group gap="sm" mb="sm">
                <TrendingUp size={18} color="#1971c2" />
                <Title order={4}>Overview</Title>
              </Group>

              <ScrollArea h={260} offsetScrollbars>
                <Text style={{ whiteSpace: "pre-line" }}>
                  {sections.overview || "No overview available."}
                </Text>
              </ScrollArea>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Group gap="sm" mb="sm">
                <AlertTriangle size={18} color="#e03131" />
                <Title order={4}>Issues</Title>
              </Group>

              <ScrollArea h={260} offsetScrollbars>
                <Text style={{ whiteSpace: "pre-line" }}>
                  {[sections.issues, sections.risks]
                    .filter(Boolean)
                    .join("\n\n") || "No issues or risks detected."}
                </Text>
              </ScrollArea>
            </Paper>

            <Paper p="md" radius="md" withBorder>
              <Group gap="sm" mb="sm">
                <Lightbulb size={18} color="#f08c00" />
                <Title order={4}>Recommendations</Title>
              </Group>

              <ScrollArea h={260} offsetScrollbars>
                <Text style={{ whiteSpace: "pre-line" }}>
                  {sections.recommendations ||
                    "No recommendations available."}
                </Text>
              </ScrollArea>
            </Paper>
          </SimpleGrid>
        )}
      </Paper>

      {!loading && sections.regions && (
        <Paper p="lg" radius="md" withBorder>
          <Title order={4} mb="sm">
            High Activity Regions
          </Title>

          <Text style={{ whiteSpace: "pre-line" }}>{sections.regions}</Text>
        </Paper>
      )}
    </div>
  );
};

export default AISummary;
